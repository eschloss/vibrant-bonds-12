/**
 * Pulse floating chat — static landings (parity with src/components/WhatsAppChatButton.tsx).
 * Configure via data-* on this script tag: data-variant="matchmaking"|"events",
 * optional data-event-title, data-webhook-context, data-storage-id.
 */
(function () {
  var CHAT_WEBHOOK_URL =
    "https://hook.eu1.make.com/dg34o52nt49w34s424o3jdko7mvdyrzw";
  var WHATSAPP_PHONE = "+16172303465";
  var INSTAGRAM_URL = "https://ig.me/m/meetfriendslagos";
  var MESSENGER_URL = "https://m.me/meetfriendslagos";
  var EMAIL_ADDRESS = "info@pulsenow.app";
  var AVATAR_URL =
    "https://s.kikiapp.eu/img/pip/piphello.webp";

  var BUBBLE_DELAYS_MS = [
    20000, 60000, 120000, 200000, 300000, 420000, 560000,
  ];
  var BUBBLE_VISIBLE_MS = 5000;
  var TYPING_DELAY_MS = 5000;
  var WEBHOOK_DELAY_MS = 7000;

  var CHAT_BUBBLE_MESSAGES_EVENTS_EN = [
    "Have any questions?",
    "Need help? We're here!",
    "Questions about our events?",
    "Chat with us anytime!",
    "We'd love to help!",
    "Something on your mind?",
    "Want to know more? Just ask!",
    "We're here if you need us.",
  ];

  var CHAT_BUBBLE_MESSAGES_MATCHMAKING_EN = [
    "Curious how matching works?",
    "Questions about Pulse in Lagos?",
    "Want to know who can join?",
    "Chat with us about matchmaking!",
    "We'd love to help you get started.",
    "Wondering about introductions?",
    "Ask us about the waitlist or pricing.",
    "We're here if you need us.",
  ];

  var CONVERSATION_STARTERS_EVENTS = [
    "What happens after I book?",
    "Will I meet my group before the event?",
    "Who gets matched together?",
    "What's included in the ticket?",
  ];

  var CONVERSATION_STARTERS_MATCHMAKING_EN = [
    "How does matching work in my city?",
    "When do I get introduced to people?",
    "Who can join — is there a waitlist?",
    "How much does it cost?",
  ];

  var BOT_TEXT_KEYS = [
    "message",
    "reply",
    "text",
    "answer",
    "body",
    "content",
    "response",
    "output",
    "bot_message",
    "result",
    "msg",
  ];

  var scriptEl = document.currentScript;
  if (!scriptEl || !scriptEl.src || scriptEl.src.indexOf("pulse-whatsapp-chat.js") === -1) {
    scriptEl = document.querySelector(
      'script[src*="pulse-whatsapp-chat.js"][data-variant]'
    );
  }
  if (!scriptEl) {
    return;
  }

  /** Resolve next to this script so no render-blocking <link> is needed in HTML. */
  var CHAT_CSS_HREF = (function () {
    try {
      return new URL("pulse-whatsapp-chat.css", scriptEl.src).href;
    } catch (e) {
      return "";
    }
  })();

  function loadChatStylesheet(done) {
    if (!CHAT_CSS_HREF) {
      done();
      return;
    }
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].href === CHAT_CSS_HREF) {
        done();
        return;
      }
    }
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CHAT_CSS_HREF;
    link.onload = function () {
      done();
    };
    link.onerror = function () {
      done();
    };
    document.head.appendChild(link);
  }

  var variantRaw = (scriptEl.getAttribute("data-variant") || "").toLowerCase();
  var variant = variantRaw === "matchmaking" ? "matchmaking" : "events";
  var eventTitle = scriptEl.getAttribute("data-event-title") || "";
  var webhookContextAttr = scriptEl.getAttribute("data-webhook-context");
  var storageId =
    scriptEl.getAttribute("data-storage-id") ||
    (variant === "matchmaking" ? "static-lagos-mm" : "static-events");

  var THREAD_KEY = "pulse_site_chat_thread_" + storageId;
  var MESSAGES_KEY = "pulse_site_chat_messages_" + storageId;

  var DEFAULT_LAGOS_MATCHMAKING_CONTEXT =
    "Page type: Friend Group Matching (Pulse matchmaking / friend introductions).\n" +
    "This is NOT an Events page: not event ticket purchase, not a single-event detail page, not checkout.\n" +
    "Path: /cities/lagos\n" +
    "City: Lagos (slug: lagos)\n" +
    "Surface: Friend Group Matching · main city hub (Lagos) — how matching works, joining, pricing.\n" +
    "Prefer answering about matchmaking, waitlist, introductions, and city availability; only discuss events if the user asks.";

  var DEFAULT_EVENTS_STATIC_CONTEXT =
    "Page type: Pulse public event — static marketing / info landing (not checkout only).\n" +
    "Event slug: paint-and-sip-lagos\n" +
    "Canonical: https://pulsenow.app/events/paint-and-sip-lagos\n" +
    "User may ask about tickets, group matching, or event logistics.";

  function resolveWebhookContext() {
    if (webhookContextAttr && webhookContextAttr.trim()) {
      return webhookContextAttr.trim();
    }
    if (variant === "matchmaking") {
      return DEFAULT_LAGOS_MATCHMAKING_CONTEXT;
    }
    return DEFAULT_EVENTS_STATIC_CONTEXT;
  }

  var chatContext = resolveWebhookContext();

  function trackMetaPixelEvent(eventName, params, custom) {
    try {
      if (typeof window.fbq === "function") {
        if (custom) {
          window.fbq("trackCustom", eventName, params || {});
        } else {
          window.fbq("track", eventName, params || {});
        }
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params || {});
      }
    } catch (e) {}
  }

  function getPixelEventForOpen() {
    if (variant === "matchmaking") {
      return "chat_bubble_clicked_matchmaking";
    }
    return "chat_bubble_clicked_events";
  }

  function getRandomBubbleMessage() {
    var list =
      variant === "matchmaking"
        ? CHAT_BUBBLE_MESSAGES_MATCHMAKING_EN
        : CHAT_BUBBLE_MESSAGES_EVENTS_EN;
    return list[Math.floor(Math.random() * list.length)] || list[0];
  }

  function getWhatsAppPrefill() {
    if (eventTitle.trim()) {
      return "I have a question about the event " + eventTitle.trim();
    }
    if (variant === "matchmaking") {
      return "I have a question about matchmaking in Lagos";
    }
    return "I have a question";
  }

  function buildWhatsAppUrl(phone, prefill) {
    var base = "https://wa.me/" + phone.replace(/\D/g, "");
    var q = "ref=website";
    if (prefill && prefill.trim()) {
      q +=
        "&text=" + encodeURIComponent(prefill.trim());
    }
    return base + "?" + q;
  }

  function getOrCreateRawThreadKey() {
    try {
      var id = localStorage.getItem(THREAD_KEY);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(THREAD_KEY, id);
      }
      return id;
    } catch (e) {
      return "session_" + crypto.randomUUID();
    }
  }

  var cachedThreadId = null;
  function getThreadId() {
    if (cachedThreadId) return Promise.resolve(cachedThreadId);
    var raw = getOrCreateRawThreadKey();
    return crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(raw))
      .then(function (buf) {
        var hex = Array.from(new Uint8Array(buf))
          .map(function (b) {
            return b.toString(16).padStart(2, "0");
          })
          .join("");
        cachedThreadId = hex.slice(-8);
        return cachedThreadId;
      });
  }

  function pickStringFromObject(o) {
    for (var i = 0; i < BOT_TEXT_KEYS.length; i++) {
      var k = BOT_TEXT_KEYS[i];
      var v = o[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    return null;
  }

  function parseBotMessageFromWebhookResponse(res) {
    return res.text().then(function (raw) {
      raw = raw.trim();
      if (!raw) return null;
      try {
        var j = JSON.parse(raw);
        if (typeof j === "string") return j.trim() || null;
        if (j && typeof j === "object" && !Array.isArray(j)) {
          var direct = pickStringFromObject(j);
          if (direct) return direct;
          if (j.data && typeof j.data === "object") {
            var nested = pickStringFromObject(j.data);
            if (nested) return nested;
          }
        }
        if (Array.isArray(j) && j.length > 0) {
          var first = j[0];
          if (typeof first === "string") return first.trim() || null;
          if (first && typeof first === "object") {
            var fromEl = pickStringFromObject(first);
            if (fromEl) return fromEl;
          }
        }
        return null;
      } catch (e) {
        return raw;
      }
    });
  }

  var DEFAULT_WELCOME = {
    id: "welcome",
    text: "Hi! How can we help you today?",
    isUser: false,
    timestamp: new Date(),
  };

  function loadMessagesFromStorage() {
    try {
      var raw = localStorage.getItem(MESSAGES_KEY);
      if (!raw) return [DEFAULT_WELCOME];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return [DEFAULT_WELCOME];
      }
      return parsed.map(function (m) {
        return {
          id: m.id,
          text: m.text,
          isUser: m.isUser,
          timestamp: new Date(m.timestamp),
        };
      });
    } catch (e) {
      return [DEFAULT_WELCOME];
    }
  }

  function saveMessagesToStorage(messages) {
    try {
      var toSave = messages.map(function (m) {
        return {
          id: m.id,
          text: m.text,
          isUser: m.isUser,
          timestamp: m.timestamp.toISOString(),
        };
      });
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(toSave));
    } catch (e) {}
  }

  function renderMessageText(text, linkClass) {
    var p = document.createElement("p");
    p.className = "pulse-wa-chat__msg-text-inner";
    var regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/\S+)/g;
    var lastIndex = 0;
    var match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        p.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index))
        );
      }
      if (match[1] !== undefined) {
        var a = document.createElement("a");
        a.href = match[2];
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = linkClass;
        a.textContent = match[1];
        p.appendChild(a);
        lastIndex = regex.lastIndex;
      } else {
        var rawUrl = match[3] || "";
        var url = rawUrl.replace(/[.,;:!?)\]}'"]+$/, "");
        var a2 = document.createElement("a");
        a2.href = url;
        a2.target = "_blank";
        a2.rel = "noopener noreferrer";
        a2.className = linkClass;
        a2.textContent = url;
        p.appendChild(a2);
        lastIndex = match.index + rawUrl.length;
      }
    }
    if (lastIndex < text.length) {
      p.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    if (!p.childNodes.length) {
      p.textContent = text;
    }
    return p;
  }

  function h(tag, className, attrs, children) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (attrs) {
      for (var k in attrs) {
        if (attrs[k] != null) el.setAttribute(k, attrs[k]);
      }
    }
    (children || []).forEach(function (ch) {
      if (typeof ch === "string") el.appendChild(document.createTextNode(ch));
      else if (ch) el.appendChild(ch);
    });
    return el;
  }

  function svgIcon(pathD, size) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", size || 24);
    svg.setAttribute("height", size || 24);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", pathD);
    svg.appendChild(path);
    return svg;
  }

  var ICON_MSG =
    "M7.9 20A9 9 0 1 0 4 16.1L2 22Z";
  var ICON_X = "M18 6 6 18M6 6l12 12";
  var ICON_MORE =
    "M12 12h.01M12 5h.01M12 19h.01";
  var ICON_MAIL =
    "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7";
  var ICON_INSTAGRAM =
    "M12 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6Z M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm5.5-3.5a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z";

  function mount() {
    var whatsAppPrefill = getWhatsAppPrefill();
    var whatsAppHref = buildWhatsAppUrl(WHATSAPP_PHONE, whatsAppPrefill);
    var instagramHref = INSTAGRAM_URL + "?ref=website";
    var messengerHref = MESSENGER_URL + "?ref=website";
    var emailHref = "mailto:" + EMAIL_ADDRESS;

    var starters =
      variant === "matchmaking"
        ? CONVERSATION_STARTERS_MATCHMAKING_EN.slice()
        : CONVERSATION_STARTERS_EVENTS.slice();

    var messages = loadMessagesFromStorage();
    var open = false;
    var panelBuilt = false;
    var inputValue = "";
    var sending = false;
    var isTyping = false;
    var bubbleMessage = null;
    var bubbleVisible = false;
    var typingTimeoutId = null;
    var webhookDelayId = null;
    var bubbleTimerIds = [];

    var root = h("div", "pulse-wa-chat", { "aria-live": "polite" });
    var bubbleWrap = h("div", "pulse-wa-chat__bubble-wrap", {
      role: "status",
      hidden: "true",
    });
    var bubbleInner = h("div", "pulse-wa-chat__bubble-inner");
    var bubbleText = h("p", "pulse-wa-chat__bubble-text");
    bubbleInner.appendChild(bubbleText);
    bubbleWrap.appendChild(bubbleInner);

    var fab = h("button", "pulse-wa-chat__fab", {
      type: "button",
      "aria-label": "Open chat",
      "aria-expanded": "false",
    });
    fab.appendChild(svgIcon(ICON_MSG, 28));
    fab.appendChild(h("span", "pulse-wa-chat__fab-dot", { "aria-hidden": "true" }));

    var panel = h("div", "pulse-wa-chat__panel", { hidden: "true" });

    var extrasWrap = h("div", "pulse-wa-chat__extras");
    var form = h("form", "pulse-wa-chat__form");
    var input = h("input", "pulse-wa-chat__input", {
      type: "text",
      placeholder: "Type a message...",
      autocomplete: "off",
    });
    var sendBtn = h("button", "pulse-wa-chat__send", {
      type: "submit",
      "aria-label": "Send message",
    });
    sendBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>';

    var inputRow = h("div", "pulse-wa-chat__input-row", null, [input, sendBtn]);
    form.appendChild(inputRow);

    function hasUserSentMessage() {
      return messages.some(function (m) {
        return m.isUser;
      });
    }

    function scrollToEnd() {
      requestAnimationFrame(function () {
        var end = panel.querySelector("[data-pulse-wa-messages-end]");
        if (end) end.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }

    function renderMessages() {
      var messagesEl = h("div", "pulse-wa-chat__messages");
      var messagesEnd = h("div", null, {
        "aria-hidden": "true",
        "data-pulse-wa-messages-end": "true",
      });
      messages.forEach(function (msg) {
        var row = h("div", "pulse-wa-chat__row " + (msg.isUser ? "pulse-wa-chat__row--user" : "pulse-wa-chat__row--bot"));
        var bubble = h(
          "div",
          "pulse-wa-chat__msg pulse-wa-chat__msg--" + (msg.isUser ? "user" : "bot")
        );
        var linkClass = msg.isUser
          ? "pulse-wa-chat__msg--user a"
          : "pulse-wa-chat__msg--bot a";
        bubble.appendChild(renderMessageText(msg.text, linkClass));
        row.appendChild(bubble);
        messagesEl.appendChild(row);
      });
      if (isTyping) {
        var tyRow = h("div", "pulse-wa-chat__row pulse-wa-chat__row--bot");
        var tyBubble = h("div", "pulse-wa-chat__msg pulse-wa-chat__msg--bot");
        var ty = h("span", "pulse-wa-chat__typing", { "aria-label": "Typing" });
        ty.appendChild(h("span", null, null, ["."]));
        ty.appendChild(h("span", null, null, ["."]));
        ty.appendChild(h("span", null, null, ["."]));
        tyBubble.appendChild(ty);
        tyRow.appendChild(tyBubble);
        messagesEl.appendChild(tyRow);
      }

      extrasWrap.innerHTML = "";
      if (!hasUserSentMessage()) {
        var socialBlock = h("div", null);
        socialBlock.appendChild(
          h("p", "pulse-wa-chat__extras-title", null, ["Or chat with us on..."])
        );
        var socialRow = h("div", "pulse-wa-chat__social-row");
        var waBtn = h("a", "pulse-wa-chat__social-btn", {
          href: whatsAppHref,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Chat on WhatsApp",
          style: "background:#25D366",
        });
        waBtn.innerHTML =
          '<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
        var msBtn = h("a", "pulse-wa-chat__social-btn", {
          href: messengerHref,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Chat on Messenger",
          style: "background:#0084FF",
        });
        msBtn.innerHTML =
          '<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l2.98-.87c.17-.06.36-.09.53-.06 1.05.27 2.1.4 3.15.4 5.64 0 10.36-4.13 10.36-9.7C22 6.13 17.64 2 12 2zm5.63 7.46l-2.93 4.67c-.47.73-1.47.92-2.17.37l-2.34-1.73c-.21-.16-.51-.16-.72 0l-2.76 2.4c-.42.33-.97-.17-.68-.63l2.93-4.67c.47-.73 1.47-.92 2.17-.37l2.34 1.73c.21.16.51.16.72 0l2.76-2.4c.42-.33.97.17.68.63z"/></svg>';
        var igBtn = h("a", "pulse-wa-chat__social-btn", {
          href: instagramHref,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Chat on Instagram",
          style:
            "background:linear-gradient(135deg,#f09433,#dc2743,#bc1888)",
        });
        igBtn.innerHTML =
          '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>';
        socialRow.appendChild(waBtn);
        socialRow.appendChild(msBtn);
        socialRow.appendChild(igBtn);
        socialBlock.appendChild(socialRow);

        var stLabel = h("p", "pulse-wa-chat__starters-label", null, [
          "Quick questions:",
        ]);
        var stRow = h("div", "pulse-wa-chat__starters");
        starters.forEach(function (st) {
          var b = h("button", "pulse-wa-chat__starter", { type: "button" });
          b.textContent = st;
          b.addEventListener("click", function () {
            sendMessage(null, st);
          });
          stRow.appendChild(b);
        });
        extrasWrap.appendChild(socialBlock);
        extrasWrap.appendChild(stLabel);
        extrasWrap.appendChild(stRow);
        messagesEl.appendChild(extrasWrap);
      }

      messagesEl.appendChild(messagesEnd);

      var bodyCol = h("div", "pulse-wa-chat__body");
      bodyCol.appendChild(messagesEl);
      return bodyCol;
    }

    function updatePanelContent() {
      if (!panelBuilt) return;
      var body = panel.querySelector(".pulse-wa-chat__body");
      if (body) body.remove();
      var newBody = renderMessages();
      panel.insertBefore(newBody, form);
      scrollToEnd();
    }

    function setMessages(next) {
      messages = next;
      saveMessagesToStorage(messages);
      updatePanelContent();
    }

    function sendMessage(e, text) {
      if (e) e.preventDefault();
      var message = (text != null ? text : input.value).trim();
      if (!message || sending) return;
      var isFirstUserMessage = !messages.some(function (m) {
        return m.isUser;
      });
      if (isFirstUserMessage && eventTitle.trim()) {
        trackMetaPixelEvent(
          "event_qualified_lead",
          {
            lead_source: "event_chat_message",
            path: window.location.pathname,
            event_title: eventTitle.trim(),
          },
          true
        );
      }
      var userMsgId = crypto.randomUUID();
      var prevUserCount = messages.filter(function (m) {
        return m.isUser;
      }).length;
      var messageCountForWebhook = prevUserCount + 1;
      setMessages(
        messages.concat([
          {
            id: userMsgId,
            text: message,
            isUser: true,
            timestamp: new Date(),
          },
        ])
      );
      input.value = "";
      inputValue = "";
      sending = true;
      isTyping = false;

      if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
        typingTimeoutId = null;
      }
      if (webhookDelayId) {
        clearTimeout(webhookDelayId);
        webhookDelayId = null;
      }

      typingTimeoutId = window.setTimeout(function () {
        isTyping = true;
        updatePanelContent();
      }, TYPING_DELAY_MS);

      webhookDelayId = window.setTimeout(function () {
        webhookDelayId = null;
        getThreadId().then(function (thread_id) {
          var payload = {
            thread_id: thread_id,
            message: message,
            count: messageCountForWebhook,
          };
          if (chatContext && chatContext.trim()) {
            payload.context = chatContext.trim();
          }
          fetch(CHAT_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then(function (res) {
              if (!res.ok) throw new Error("Webhook error");
              return parseBotMessageFromWebhookResponse(res);
            })
            .then(function (botText) {
              if (typingTimeoutId) {
                clearTimeout(typingTimeoutId);
                typingTimeoutId = null;
              }
              isTyping = false;
              sending = false;
              if (botText) {
                setMessages(
                  messages.concat([
                    {
                      id: crypto.randomUUID(),
                      text: botText,
                      isUser: false,
                      timestamp: new Date(),
                    },
                  ])
                );
              } else {
                updatePanelContent();
              }
            })
            .catch(function () {
              if (typingTimeoutId) {
                clearTimeout(typingTimeoutId);
                typingTimeoutId = null;
              }
              isTyping = false;
              sending = false;
              setMessages(
                messages.concat([
                  {
                    id: crypto.randomUUID(),
                    text:
                      "We couldn't send that. Please try again or reach us via WhatsApp below.",
                    isUser: false,
                    timestamp: new Date(),
                  },
                ])
              );
            });
        });
      }, TYPING_DELAY_MS + WEBHOOK_DELAY_MS);
    }

    function buildPanel() {
      panel.innerHTML = "";
      var header = h("div", "pulse-wa-chat__header");
      var headerRow = h("div", "pulse-wa-chat__header-row");
      var brand = h("div", "pulse-wa-chat__brand");
      var avWrap = h("div", "pulse-wa-chat__avatar-wrap");
      var img = h("img", "pulse-wa-chat__avatar", {
        src: AVATAR_URL,
        alt: "Pulse",
      });
      img.addEventListener("error", function () {
        img.style.display = "none";
        if (!avWrap.querySelector(".pulse-wa-chat__avatar-fallback")) {
          avWrap.appendChild(
            h("div", "pulse-wa-chat__avatar-fallback", null, ["P"])
          );
        }
      });
      avWrap.appendChild(img);
      avWrap.appendChild(h("span", "pulse-wa-chat__online", { "aria-label": "Online" }));
      var titles = h("div");
      titles.appendChild(
        h("p", "pulse-wa-chat__title-sm", null, ["Chat with"])
      );
      titles.appendChild(h("p", "pulse-wa-chat__title-lg", null, ["Pulse"]));
      brand.appendChild(avWrap);
      brand.appendChild(titles);

      var actions = h("div", "pulse-wa-chat__header-actions");
      var dropdown = h("div", "pulse-wa-chat__dropdown");
      var moreBtn = h(
        "button",
        "pulse-wa-chat__icon-btn",
        { type: "button", "aria-label": "More options", "aria-expanded": "false" },
        [svgIcon(ICON_MORE, 20)]
      );
      var ddPanel = h("div", "pulse-wa-chat__dropdown-panel", { role: "menu" });
      ddPanel.appendChild(
        h("div", "pulse-wa-chat__dropdown-label", null, ["Contact us on..."])
      );

      function addDdItem(label, iconHtml, bg, onClick) {
        var btn = h("button", "pulse-wa-chat__dropdown-item", { type: "button" });
        var ic = h("span", "pulse-wa-chat__dropdown-icon", { style: "background:" + bg });
        ic.innerHTML = iconHtml;
        btn.appendChild(ic);
        btn.appendChild(document.createTextNode(label));
        btn.addEventListener("click", onClick);
        ddPanel.appendChild(btn);
      }

      addDdItem(
        "WhatsApp",
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
        "#25D366",
        function () {
          window.open(whatsAppHref, "_blank", "noopener,noreferrer");
          closeDropdown();
        }
      );
      addDdItem(
        "Messenger",
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l2.98-.87c.17-.06.36-.09.53-.06 1.05.27 2.1.4 3.15.4 5.64 0 10.36-4.13 10.36-9.7C22 6.13 17.64 2 12 2zm5.63 7.46l-2.93 4.67c-.47.73-1.47.92-2.17.37l-2.34-1.73c-.21-.16-.51-.16-.72 0l-2.76 2.4c-.42.33-.97-.17-.68-.63l2.93-4.67c.47-.73 1.47-.92 2.17-.37l2.34 1.73c.21.16.51.16.72 0l2.76-2.4c.42-.33.97.17.68.63z"/></svg>',
        "#0084FF",
        function () {
          window.open(messengerHref, "_blank", "noopener,noreferrer");
          closeDropdown();
        }
      );
      addDdItem(
        "Instagram",
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
        "linear-gradient(135deg,#f09433,#dc2743,#bc1888)",
        function () {
          window.open(instagramHref, "_blank", "noopener,noreferrer");
          closeDropdown();
        }
      );
      addDdItem(
        "Email",
        '<svg viewBox="0 0 24 24" width="14" height="14" stroke="#fff" fill="none" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        "#4b5563",
        function () {
          window.location.href = emailHref;
          closeDropdown();
        }
      );

      function closeDropdown() {
        dropdown.classList.remove("pulse-wa-chat__dropdown--open");
        moreBtn.setAttribute("aria-expanded", "false");
      }

      function toggleDropdown(e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.toggle("pulse-wa-chat__dropdown--open");
        moreBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }

      moreBtn.addEventListener("click", toggleDropdown);

      dropdown.appendChild(moreBtn);
      dropdown.appendChild(ddPanel);

      var closeBtn = h(
        "button",
        "pulse-wa-chat__icon-btn",
        { type: "button", "aria-label": "Close chat" },
        [svgIcon(ICON_X, 20)]
      );
      closeBtn.addEventListener("click", function () {
        setOpen(false);
      });

      actions.appendChild(dropdown);
      actions.appendChild(closeBtn);
      headerRow.appendChild(brand);
      headerRow.appendChild(actions);
      header.appendChild(headerRow);

      var wave = h("div", "pulse-wa-chat__wave");
      wave.innerHTML =
        '<svg viewBox="0 0 340 16" preserveAspectRatio="none" aria-hidden="true" style="width:100%;height:100%"><path fill="#111827" d="M0 8 Q 85 0 170 8 T 340 8 L 340 16 L 0 16 Z"/></svg>';
      header.appendChild(wave);

      panel.appendChild(header);
      panel.appendChild(renderMessages());
      panel.appendChild(form);

      document.addEventListener("click", function (e) {
        var t = e.target;
        if (!t || !dropdown.contains(t)) closeDropdown();
      });

      return panel;
    }

    /** Mobile: cap chat height to the visible viewport and shrink when the keyboard opens (VisualViewport). */
    function syncMobilePanelHeight() {
      if (!panelBuilt || !panel) return;
      if (window.matchMedia("(min-width: 640px)").matches) {
        panel.style.height = "";
        panel.style.maxHeight = "";
        return;
      }
      var vv = window.visualViewport;
      if (!vv) return;
      var rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      var bottomStr = getComputedStyle(panel).bottom;
      var bottomPx = parseFloat(bottomStr);
      if (bottomStr.indexOf("rem") !== -1) bottomPx *= rootFont;
      else if (bottomStr.indexOf("px") === -1 || isNaN(bottomPx)) bottomPx = 3.5 * rootFont;
      var topPad = 12 + Math.max(0, vv.offsetTop);
      var maxH = vv.height - bottomPx - topPad;
      maxH = Math.max(200, Math.min(maxH, vv.height * 0.9));
      panel.style.height = maxH + "px";
      panel.style.maxHeight = maxH + "px";
    }

    function setOpen(v) {
      open = v;
      fab.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
      if (open) {
        if (!panelBuilt) {
          buildPanel();
          panelBuilt = true;
        }
        updatePanelContent();
        requestAnimationFrame(function () {
          syncMobilePanelHeight();
          requestAnimationFrame(syncMobilePanelHeight);
        });
      } else {
        if (window.matchMedia("(max-width: 639.98px)").matches) {
          panel.style.height = "";
          panel.style.maxHeight = "";
        }
      }
      scheduleBubbleTimers();
      updateBubbleDom();
    }

    function updateBubbleDom() {
      if (!open && bubbleVisible && bubbleMessage) {
        bubbleWrap.hidden = false;
        bubbleText.textContent = bubbleMessage;
      } else {
        bubbleWrap.hidden = true;
      }
    }

    function clearBubbleTimers() {
      bubbleTimerIds.forEach(function (id) {
        clearTimeout(id);
      });
      bubbleTimerIds = [];
    }

    function scheduleBubbleTimers() {
      clearBubbleTimers();
      if (open) return;
      BUBBLE_DELAYS_MS.forEach(function (delayMs) {
        var id = window.setTimeout(function () {
          if (open) return;
          bubbleMessage = getRandomBubbleMessage();
          bubbleVisible = true;
          updateBubbleDom();
          var hideId = window.setTimeout(function () {
            bubbleVisible = false;
            bubbleMessage = null;
            updateBubbleDom();
          }, BUBBLE_VISIBLE_MS);
          bubbleTimerIds.push(hideId);
        }, delayMs);
        bubbleTimerIds.push(id);
      });
    }

    fab.addEventListener("click", function () {
      if (!open) {
        trackMetaPixelEvent(
          getPixelEventForOpen(),
          { path: window.location.pathname },
          true
        );
      }
      setOpen(!open);
    });

    form.addEventListener("submit", sendMessage);

    root.appendChild(bubbleWrap);
    root.appendChild(fab);
    root.appendChild(panel);
    document.body.appendChild(root);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", syncMobilePanelHeight);
      window.visualViewport.addEventListener("scroll", syncMobilePanelHeight);
    }
    window.addEventListener("resize", syncMobilePanelHeight);
    window.addEventListener("orientationchange", syncMobilePanelHeight);

    function onDocMouseDown(e) {
      if (!open) return;
      var t = e.target;
      if (root.contains(t)) return;
      if (t.closest && t.closest('[role="menu"]')) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);

    scheduleBubbleTimers();
    updateBubbleDom();
  }

  window.addEventListener("load", function () {
    function run() {
      loadChatStylesheet(mount);
    }
    if ("requestIdleCallback" in window) {
      requestIdleCallback(run, { timeout: 3000 });
    } else {
      setTimeout(run, 0);
    }
  });
})();
