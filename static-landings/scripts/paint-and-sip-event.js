/**
 * Paint-and-sip static event page: footer year, SPA warm-up iframe, hero carousel,
 * group chat preview reveal + lightbox, sticky CTA, future invites (reCAPTCHA v3 + API).
 * kiki_id must match get_kiki for slug paint-and-sip-lagos (see HTML data-kiki-id).
 */
(function () {
  "use strict";

  var RECAPTCHA_SITE_KEY = "6LcZtiArAAAAAO1kjOaw8dH6fZ-cR1krOe0Q_LOL";
  var GROUP_CHAT_IMG = "https://s.kikiapp.eu/img/Group+Chinchillas.webp";
  var STICKY_SCROLL_THRESHOLD = 80;
  var STICKY_MIN_DELAY_MS = 3000;

  function hashToBucket(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h) % 4;
  }

  function shardApiUrl(url) {
    try {
      var parsed = new URL(url);
      if (parsed.hostname === "staging-api.kikiapp.eu") return url;
      if (parsed.hostname === "api.kikiapp.eu") {
        var pathAndSearch = parsed.pathname + parsed.search;
        var bucket = hashToBucket(pathAndSearch);
        var shardHost = bucket === 0 ? "api" : "api" + (bucket + 1);
        parsed.hostname = shardHost + ".kikiapp.eu";
        return parsed.toString();
      }
    } catch (e) {}
    return url;
  }

  function afterIdle(cb) {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(cb, { timeout: 8000 });
    } else {
      setTimeout(cb, 0);
    }
  }

  /* Footer year */
  var yEl = document.getElementById("y");
  if (yEl) yEl.textContent = String(new Date().getFullYear());

  /* Idle iframe warm-up */
  window.addEventListener("load", function () {
    afterIdle(function () {
      var f = document.createElement("iframe");
      f.setAttribute("width", "0");
      f.setAttribute("height", "0");
      f.setAttribute("hidden", "");
      f.setAttribute("aria-hidden", "true");
      f.setAttribute("tabindex", "-1");
      f.setAttribute("title", "Pulse app warm-up");
      f.src = "https://pulsenow.app/events/paint-and-sip-lagos";
      document.body.appendChild(f);
    });
  });

  /* Group chat image: decode then show */
  var chatWrap = document.querySelector(".event-hero-chat-wrap");
  if (chatWrap) {
    var pre = new Image();
    pre.onload = pre.onerror = function () {
      chatWrap.classList.add("is-ready");
    };
    pre.src = GROUP_CHAT_IMG;
  }

  /* Hero carousel + dots */
  var carousel = document.getElementById("hero-carousel");
  var dots = document.querySelectorAll(".event-hero-dot");
  if (carousel && dots.length) {
    function setActive(idx) {
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("is-active", i === idx);
        dots[i].setAttribute("aria-selected", i === idx ? "true" : "false");
      }
    }
    function slideIndex() {
      var w = carousel.clientWidth || 1;
      return Math.round(carousel.scrollLeft / w);
    }
    function goTo(i) {
      var w = carousel.clientWidth;
      carousel.scrollTo({ left: i * w, behavior: "smooth" });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
      });
    });
    var scrollEndTimer;
    carousel.addEventListener(
      "scroll",
      function () {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(function () {
          setActive(slideIndex());
        }, 80);
      },
      { passive: true }
    );
    window.addEventListener(
      "resize",
      function () {
        setActive(slideIndex());
      },
      { passive: true }
    );
    setActive(0);
  }

  /* Chat lightbox */
  var chatBtn = document.querySelector(".event-hero-chat-btn");
  var lightbox = document.getElementById("chat-lightbox");
  if (chatBtn && lightbox) {
    function openLb() {
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      var c = lightbox.querySelector(".event-lightbox__close");
      if (c) c.focus();
    }
    function closeLb() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      chatBtn.focus();
    }
    chatBtn.addEventListener("click", openLb);
    lightbox.querySelectorAll("[data-close-lightbox]").forEach(function (el) {
      el.addEventListener("click", closeLb);
    });
    lightbox.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
    });
  }

  /* Sticky CTA */
  var sticky = document.getElementById("event-sticky-cta");
  var minDelayOk = false;
  setTimeout(function () {
    minDelayOk = true;
    updateSticky();
  }, STICKY_MIN_DELAY_MS);

  function updateSticky() {
    if (!sticky) return;
    var show = minDelayOk && window.scrollY > STICKY_SCROLL_THRESHOLD;
    var doc = document.documentElement;
    var nearBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 120;
    sticky.hidden = !show || nearBottom;
  }
  window.addEventListener("scroll", updateSticky, { passive: true });
  window.addEventListener("resize", updateSticky, { passive: true });

  /* reCAPTCHA v3: wait for script onload, then for grecaptcha.ready (append alone is not enough). */
  var recaptchaLoadPromise = null;

  function ensureRecaptchaLoaded() {
    if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
      return Promise.resolve();
    }
    if (recaptchaLoadPromise) {
      return recaptchaLoadPromise;
    }
    recaptchaLoadPromise = new Promise(function (resolve, reject) {
      var scriptId = "recaptcha-script";
      var existing = document.getElementById(scriptId);

      function waitForApi() {
        var n = 0;
        var id = window.setInterval(function () {
          if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
            window.clearInterval(id);
            resolve();
          } else if (++n > 160) {
            window.clearInterval(id);
            recaptchaLoadPromise = null;
            reject(new Error("Security check failed to initialize."));
          }
        }, 50);
      }

      if (existing) {
        if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
          resolve();
          return;
        }
        function onLoad() {
          existing.removeEventListener("load", onLoad);
          existing.removeEventListener("error", onErr);
          waitForApi();
        }
        function onErr() {
          existing.removeEventListener("load", onLoad);
          existing.removeEventListener("error", onErr);
          recaptchaLoadPromise = null;
          reject(new Error("Security check failed to load."));
        }
        existing.addEventListener("load", onLoad);
        existing.addEventListener("error", onErr);
        /* If the script was cached, load may have fired before we subscribed. */
        window.setTimeout(function () {
          if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
            existing.removeEventListener("load", onLoad);
            existing.removeEventListener("error", onErr);
            waitForApi();
          }
        }, 0);
        return;
      }

      var script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://www.google.com/recaptcha/api.js?render=" +
        encodeURIComponent(RECAPTCHA_SITE_KEY);
      script.async = true;
      script.onload = function () {
        waitForApi();
      };
      script.onerror = function () {
        recaptchaLoadPromise = null;
        reject(new Error("Security check failed to load."));
      };
      document.head.appendChild(script);
    });
    return recaptchaLoadPromise;
  }

  /* Future invites dialog */
  var dialog = document.getElementById("future-invites-dialog");
  var kikiInput = document.querySelector('input[name="paint_sip_kiki_id"]');
  var kikiId = kikiInput ? parseInt(kikiInput.value, 10) : NaN;

  function openFutureInvites() {
    if (!dialog) return;
    ensureRecaptchaLoaded().catch(function () {});
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    var email = document.getElementById("future-invites-email");
    if (email) setTimeout(function () { email.focus(); }, 50);
  }

  function closeFutureInvites() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      resetFutureInvitesForm();
    }
  }

  function resetFutureInvitesForm() {
    var form = document.getElementById("future-invites-form");
    var err = document.getElementById("future-invites-error");
    var success = document.getElementById("future-invites-success");
    var main = document.getElementById("future-invites-main");
    if (form) {
      form.reset();
      document.querySelectorAll('input[name="fi_suggestions"]:checked').forEach(function (cb) {
        cb.checked = false;
      });
    }
    if (err) {
      err.textContent = "";
      err.hidden = true;
    }
    if (success) success.hidden = true;
    if (main) main.hidden = false;
  }

  document.querySelectorAll("[data-open-future-invites]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openFutureInvites();
    });
  });

  if (dialog) {
    dialog.addEventListener("close", function () {
      resetFutureInvitesForm();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-breakdown-toggle]").forEach(function (btn) {
      var panel = btn.nextElementSibling;
      var chev = btn.querySelector(".sign-breakdown-chevron");
      btn.addEventListener("click", function () {
        var open = panel && panel.hidden === false;
        if (panel) panel.hidden = !open;
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (chev) chev.style.transform = open ? "" : "rotate(180deg)";
      });
    });
    document.querySelectorAll("[data-fi-close]").forEach(function (b) {
      b.addEventListener("click", function () {
        closeFutureInvites();
      });
    });
    document.querySelectorAll(".fi-chip input").forEach(function (cb) {
      function syncChip() {
        var lab = cb.closest(".fi-chip");
        if (lab) lab.classList.toggle("is-selected", cb.checked);
      }
      cb.addEventListener("change", syncChip);
      syncChip();
    });
  });

  var fiForm = document.getElementById("future-invites-form");
  if (fiForm) {
    fiForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailEl = document.getElementById("future-invites-email");
      var errEl = document.getElementById("future-invites-error");
      var email = emailEl ? emailEl.value.trim() : "";
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        if (errEl) {
          errEl.textContent = "Email is required";
          errEl.hidden = false;
        }
        return;
      }
      if (!emailRe.test(email)) {
        if (errEl) {
          errEl.textContent = "Please enter a valid email address";
          errEl.hidden = false;
        }
        return;
      }
      if (!kikiId || isNaN(kikiId)) {
        if (errEl) {
          errEl.textContent = "Something went wrong. Please try again.";
          errEl.hidden = false;
        }
        return;
      }

      var submitBtn = fiForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
      }
      if (errEl) errEl.hidden = true;

      ensureRecaptchaLoaded()
        .catch(function () {
          throw new Error("Security check failed. Please refresh and try again.");
        })
        .then(function () {
          return new Promise(function (resolve, reject) {
            window.grecaptcha.ready(function () {
              window.grecaptcha
                .execute(RECAPTCHA_SITE_KEY, { action: "future_invite_signup" })
                .then(resolve)
                .catch(reject);
            });
          });
        })
        .then(function (token) {
          var suggestions = [];
          document.querySelectorAll('input[name="fi_suggestions"]:checked').forEach(function (cb) {
            var lab = cb.closest ? cb.closest("label") : null;
            if (lab) {
              var t = lab.textContent.trim().replace(/\s+/g, " ");
              suggestions.push(t);
            }
          });
          var payload = {
            recaptcha: token,
            email: email.toLowerCase(),
            kiki_id: kikiId,
          };
          if (suggestions.length) payload.suggestions = suggestions;

          return fetch(shardApiUrl("https://api.kikiapp.eu/events/future-invite-signup/"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }).then(function (res) {
            return res.json().then(function (body) {
              return { res: res, body: body };
            });
          });
        })
        .then(function (_ref) {
          var res = _ref.res;
          var body = _ref.body;
          if (res.status === 429) {
            throw new Error("Too many attempts. Please try again in a minute.");
          }
          if (!body || !body.success) {
            throw new Error((body && body.error) || "Something went wrong. Please try again.");
          }
          var main = document.getElementById("future-invites-main");
          var success = document.getElementById("future-invites-success");
          if (main) main.hidden = true;
          if (success) success.hidden = false;
        })
        .catch(function (err) {
          if (errEl) {
            errEl.textContent = err.message || "Something went wrong. Please try again.";
            errEl.hidden = false;
          }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
