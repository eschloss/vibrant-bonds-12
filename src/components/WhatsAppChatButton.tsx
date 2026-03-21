import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MessageCircle,
  Send,
  Instagram,
  Mail,
  MoreVertical,
  X,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getChatContentVariant,
  pathShowsChatBubbleForCityPages,
  useChatContext,
} from "@/contexts/ChatContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackMetaPixelEvent } from "@/lib/utils";

const CHAT_WEBHOOK_URL =
  import.meta.env.VITE_CHAT_WEBHOOK_URL ??
  "https://hook.eu1.make.com/dg34o52nt49w34s424o3jdko7mvdyrzw";

/** Persists across refreshes (same browser/profile). Hashed before sending. */
const THREAD_STORAGE_KEY = "pulse_site_chat_thread";
const MESSAGES_STORAGE_KEY = "pulse_site_chat_messages";

function getOrCreateRawThreadKey(): string {
  try {
    let id = localStorage.getItem(THREAD_STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(THREAD_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `session_${crypto.randomUUID()}`;
  }
}

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

let cachedThreadId: string | null = null;
async function getThreadId(): Promise<string> {
  if (cachedThreadId) return cachedThreadId;
  const raw = getOrCreateRawThreadKey();
  const full = await sha256Hex(raw);
  cachedThreadId = full.slice(-8);
  return cachedThreadId;
}

const WHATSAPP_PHONE = "+16172303465";
const INSTAGRAM_URL = "https://ig.me/m/meetfriendslagos";
const MESSENGER_URL = "https://m.me/meetfriendslagos";
const EMAIL_ADDRESS = "info@pulsenow.app";

/** Helper messages for chat bubble prompts (shown when chat is closed) — event flows. */
const CHAT_BUBBLE_MESSAGES_EVENTS = {
  en: [
    "Have any questions?",
    "Need help? We're here!",
    "Questions about our events?",
    "Chat with us anytime!",
    "We'd love to help!",
    "Something on your mind?",
    "Want to know more? Just ask!",
    "We're here if you need us.",
  ],
  es: [
    "¿Tienes alguna pregunta?",
    "¿Necesitas ayuda? ¡Estamos aquí!",
    "¿Preguntas sobre nuestros eventos?",
    "¡Chatea con nosotros cuando quieras!",
    "¡Nos encantaría ayudarte!",
    "¿Algo en lo que podamos ayudarte?",
    "¿Quieres saber más? ¡Solo pregunta!",
    "Estamos aquí si nos necesitas.",
  ],
} as const;

/** Bubble teasers on matchmaking city pages (Lagos-only for now). */
const CHAT_BUBBLE_MESSAGES_MATCHMAKING = {
  en: [
    "Curious how matching works?",
    "Questions about Pulse in Lagos?",
    "Want to know who can join?",
    "Chat with us about matchmaking!",
    "We'd love to help you get started.",
    "Wondering about introductions?",
    "Ask us about the waitlist or pricing.",
    "We're here if you need us.",
  ],
  es: [
    "¿Te interesa cómo funciona el matchmaking?",
    "¿Preguntas sobre Pulse en Lagos?",
    "¿Quieres saber quién puede unirse?",
    "¡Escríbenos sobre el matchmaking!",
    "Nos encantaría ayudarte a empezar.",
    "¿Dudas sobre las presentaciones?",
    "Pregunta por la lista de espera o precios.",
    "Estamos aquí si nos necesitas.",
  ],
} as const;

const BUBBLE_DELAYS_MS = [20000, 60000, 120000, 200000, 300000, 420000, 560000]; // 20s, 1m, 2m, 3m20s, 5m, 7m, 9m20s
const BUBBLE_VISIBLE_MS = 5000; // How long the bubble stays visible

function getRandomBubbleMessage(
  isSpanish: boolean,
  variant: "events" | "matchmaking"
): string {
  const bundle =
    variant === "matchmaking" ? CHAT_BUBBLE_MESSAGES_MATCHMAKING : CHAT_BUBBLE_MESSAGES_EVENTS;
  const list = bundle[isSpanish ? "es" : "en"];
  return list[Math.floor(Math.random() * list.length)] ?? list[0];
}

function getWhatsAppPrefill(
  eventTitle: string | null,
  isSpanish: boolean,
  variant: "events" | "matchmaking"
): string {
  if (eventTitle) {
    return isSpanish
      ? `Tengo una pregunta sobre el evento ${eventTitle}`
      : `I have a question about the event ${eventTitle}`;
  }
  if (variant === "matchmaking") {
    return isSpanish
      ? "Tengo una pregunta sobre el matchmaking en Lagos"
      : "I have a question about matchmaking in Lagos";
  }
  return isSpanish ? "Tengo una pregunta" : "I have a question";
}

const CONVERSATION_STARTERS_EVENTS = [
  "What happens after I book?",
  "Will I meet my group before the event?",
  "Who gets matched together?",
  "What's included in the ticket?",
] as const;

const CONVERSATION_STARTERS_MATCHMAKING_EN = [
  "How does matching work in my city?",
  "When do I get introduced to people?",
  "Who can join — is there a waitlist?",
  "How much does it cost?",
] as const;

const CONVERSATION_STARTERS_MATCHMAKING_ES = [
  "¿Cómo funciona el matchmaking en mi ciudad?",
  "¿Cuándo me presentan a la gente?",
  "¿Quién puede unirse? ¿Hay lista de espera?",
  "¿Cuánto cuesta?",
] as const;

function getChatBubblePixelEvent(pathname: string): string {
  if (pathShowsChatBubbleForCityPages(pathname)) return "chat_bubble_clicked_matchmaking";
  if (
    pathname === "/events" ||
    /^\/events\/[^/]+\/checkout$/.test(pathname) ||
    /^\/events\/[^/]+\/confirmation$/.test(pathname) ||
    /^\/events\/[^/]+$/.test(pathname)
  ) {
    return "chat_bubble_clicked_events";
  }
  return "chat_bubble_clicked_general";
}

/** Renders text with URLs as clickable links. Handles bare https? URLs and [text](url) markdown. */
function MessageText({
  text,
  linkClassName,
}: {
  text: string;
  linkClassName: string;
}) {
  const parts: React.ReactNode[] = [];
  // Markdown [text](url) takes precedence; then bare URLs (use \S+ to include dots in domains like .app)
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/\S+)/g;

  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match[1] !== undefined) {
      // [text](url) - skip if this match overlaps a bare-URL match (url part would be captured by bare pattern)
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <a
          key={key++}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {match[1]}
        </a>
      );
      lastIndex = regex.lastIndex;
    } else {
      // Bare URL (match[3]) - trim trailing punctuation for href, but include full match in consumed length
      const raw = match[3] ?? "";
      const url = raw.replace(/[.,;:!?)\]}'"]+$/, "");
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {url}
        </a>
      );
      lastIndex = match.index + raw.length;
    }
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts.length > 0 ? parts : text}</>;
}

function buildWhatsAppUrl(phone: string, prefill?: string): string {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  const params = new URLSearchParams({ ref: "website" });
  if (prefill?.trim()) {
    params.set("text", prefill.trim());
  }
  return `${base}?${params.toString()}`;
}

const BOT_TEXT_KEYS = [
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
] as const;

function pickStringFromObject(o: Record<string, unknown>): string | null {
  for (const k of BOT_TEXT_KEYS) {
    const v = o[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

/** Reads webhook body: plain text, or JSON string / { message|reply|text|… }. */
async function parseBotMessageFromWebhookResponse(
  res: Response
): Promise<string | null> {
  const raw = (await res.text()).trim();
  if (!raw) return null;

  try {
    const j = JSON.parse(raw) as unknown;
    if (typeof j === "string") return j.trim() || null;
    if (j && typeof j === "object" && !Array.isArray(j)) {
      const o = j as Record<string, unknown>;
      const direct = pickStringFromObject(o);
      if (direct) return direct;
      if (o.data && typeof o.data === "object" && o.data !== null) {
        const nested = pickStringFromObject(o.data as Record<string, unknown>);
        if (nested) return nested;
      }
    }
    if (Array.isArray(j) && j.length > 0) {
      const first = j[0];
      if (typeof first === "string") return first.trim() || null;
      if (first && typeof first === "object") {
        const fromEl = pickStringFromObject(first as Record<string, unknown>);
        if (fromEl) return fromEl;
      }
    }
    return null;
  } catch {
    return raw;
  }
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const DEFAULT_WELCOME: ChatMessage = {
  id: "welcome",
  text: "Hi! How can we help you today?",
  isUser: false,
  timestamp: new Date(),
};

function loadMessagesFromStorage(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (!raw) return [DEFAULT_WELCOME];
    const parsed = JSON.parse(raw) as { id: string; text: string; isUser: boolean; timestamp: string }[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [DEFAULT_WELCOME];
    return parsed.map((m) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
  } catch {
    return [DEFAULT_WELCOME];
  }
}

function saveMessagesToStorage(messages: ChatMessage[]): void {
  try {
    const toSave = messages.map((m) => ({
      ...m,
      timestamp: m.timestamp.toISOString(),
    }));
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // ignore quota / private mode
  }
}

export function WhatsAppChatButton() {
  const [open, setOpen] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessagesFromStorage);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const webhookDelayRef = useRef<number | null>(null);
  const bubbleTimersRef = useRef<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { chatContext, eventTitle, eventQuickQuestions } = useChatContext();
  const { currentLanguage } = useLanguage();
  const isSpanish = currentLanguage === "es";
  const chatVariant = getChatContentVariant(pathname);

  const conversationStarters = useMemo(() => {
    if (chatVariant === "matchmaking") {
      return isSpanish
        ? [...CONVERSATION_STARTERS_MATCHMAKING_ES]
        : [...CONVERSATION_STARTERS_MATCHMAKING_EN];
    }
    if (eventQuickQuestions?.length) {
      return [...eventQuickQuestions];
    }
    return [...CONVERSATION_STARTERS_EVENTS];
  }, [chatVariant, isSpanish, eventQuickQuestions]);

  const whatsAppPrefill = getWhatsAppPrefill(eventTitle, isSpanish, chatVariant);
  const whatsAppHref = buildWhatsAppUrl(WHATSAPP_PHONE, whatsAppPrefill);
  const instagramHref = `${INSTAGRAM_URL}?ref=website`;
  const messengerHref = `${MESSENGER_URL}?ref=website`;
  const emailHref = `mailto:${EMAIL_ADDRESS}`;

  const hasUserSentMessage = messages.some((m) => m.isUser);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // Dropdown content renders in a portal, so it's outside panelRef - don't close when clicking dropdown items
      const isDropdownClick = (target as Element)?.closest?.('[role="menu"]');
      if (panelRef.current && !panelRef.current.contains(target) && !isDropdownClick) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      if (webhookDelayRef.current) {
        clearTimeout(webhookDelayRef.current);
        webhookDelayRef.current = null;
      }
      bubbleTimersRef.current.forEach((id) => clearTimeout(id));
      bubbleTimersRef.current = [];
    };
  }, []);

  // Timed chat bubble prompts when chat is closed
  useEffect(() => {
    if (open) {
      setBubbleVisible(false);
      setBubbleMessage(null);
      bubbleTimersRef.current.forEach((id) => clearTimeout(id));
      bubbleTimersRef.current = [];
      return;
    }

    const timeouts: number[] = [];
    BUBBLE_DELAYS_MS.forEach((delayMs) => {
      const id = window.setTimeout(() => {
        if (open) return;
        const msg = getRandomBubbleMessage(isSpanish, chatVariant);
        setBubbleMessage(msg);
        setBubbleVisible(true);
        const hideId = window.setTimeout(() => {
          setBubbleVisible(false);
          setBubbleMessage(null);
        }, BUBBLE_VISIBLE_MS);
        timeouts.push(hideId);
      }, delayMs);
      timeouts.push(id);
    });
    bubbleTimersRef.current = timeouts;

    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      bubbleTimersRef.current = [];
    };
  }, [open, isSpanish, chatVariant]);

  // Scroll so the latest message (or typing indicator) is fully visible
  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    saveMessagesToStorage(messages);
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent, text?: string) => {
    e?.preventDefault();
    const message = (text ?? inputValue).trim();
    if (!message || sending) return;
    const isFirstUserMessage = !messages.some((m) => m.isUser);
    if (isFirstUserMessage && eventTitle?.trim()) {
      trackMetaPixelEvent(
        "event_qualified_lead",
        {
          lead_source: "event_chat_message",
          path: pathname,
          event_title: eventTitle,
        },
        { custom: true }
      );
    }
    const userMsgId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        text: message,
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setInputValue("");
    setSending(true);
    setIsTyping(false);

    // Wait 5s, then show is_typing; wait 7s more (12s total), then send webhook
    const TYPING_DELAY_MS = 5000;
    const WEBHOOK_DELAY_MS = 7000;

    typingTimeoutRef.current = window.setTimeout(() => setIsTyping(true), TYPING_DELAY_MS);

    const runWebhook = async () => {
      try {
        const thread_id = await getThreadId();
        const userMessageCount = messages.filter((m) => m.isUser).length;
        const count = userMessageCount + 1;
        const payload: { thread_id: string; message: string; count: number; context?: string } = {
          thread_id,
          message,
          count,
        };
        if (chatContext?.trim()) payload.context = chatContext.trim();
        const res = await fetch(CHAT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Webhook error");
        const botText = await parseBotMessageFromWebhookResponse(res);
        if (botText) {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              text: botText,
              isUser: false,
              timestamp: new Date(),
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            text: "We couldn't send that. Please try again or reach us via WhatsApp below.",
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      } finally {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
        setIsTyping(false);
        setSending(false);
      }
    };

    webhookDelayRef.current = window.setTimeout(
      () => {
        webhookDelayRef.current = null;
        runWebhook();
      },
      TYPING_DELAY_MS + WEBHOOK_DELAY_MS
    );
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div ref={panelRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        {/* Animated chat bubble prompt when chat is closed */}
        {!open && bubbleVisible && bubbleMessage && (
          <div
            className="absolute right-0 bottom-full mb-2 w-max max-w-[min(300px,90vw)] rounded-2xl p-[2px] bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue shadow-lg shadow-purple-500/25 animate-chat-bubble"
            role="status"
            aria-live="polite"
          >
            <div className="rounded-[calc(1rem-2px)] bg-gray-900/95 backdrop-blur-sm px-4 py-3 border border-white/5">
              <p className="whitespace-nowrap text-sm text-white/95">{bubbleMessage}</p>
            </div>
          </div>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => {
                setOpen((o) => {
                  if (!o) {
                    const path = window.location.pathname;
                    trackMetaPixelEvent(getChatBubblePixelEvent(path), { path });
                  }
                  return !o;
                });
              }}
              aria-label="Open chat"
              aria-expanded={open}
              className="relative flex h-14 w-14 min-w-[56px] min-h-[56px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg animate-chat-pulse transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-background touch-manipulation active:scale-95"
            >
              <div className="relative">
                <MessageCircle className="h-7 w-7" strokeWidth={2} />
                <span
                  className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500"
                  aria-hidden
                />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={8}>
            <p>Chat with us</p>
          </TooltipContent>
        </Tooltip>

        {open && (
          <div className="fixed inset-x-3 bottom-14 sm:inset-x-auto sm:right-0 sm:left-auto sm:bottom-16 sm:w-[340px] sm:max-h-[520px] max-h-[85vh] overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl flex flex-col">
            {/* Header - dark navy with avatar, name, status, and actions */}
            <div className="relative overflow-hidden rounded-t-2xl bg-[#1e3a5f] px-4 pt-4 pb-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <Avatar className="h-12 w-12 border-2 border-white/20">
                      <AvatarImage
                        src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/PIP%20hello.png"
                        alt="Pulse"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-pulse-pink via-pulse-purple to-pulse-blue text-lg font-semibold text-white">
                        P
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-[#1e3a5f] bg-[#22c55e]"
                      aria-label="Online"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/90">
                      Chat with
                    </p>
                    <p className="font-semibold text-white">Pulse</p>
                  </div>
                </div>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="rounded p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center sm:p-2 sm:min-w-0 sm:min-h-0 text-white/80 hover:bg-white/10 hover:text-white touch-manipulation"
                        aria-label="More options"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="bottom"
                      sideOffset={4}
                      className="w-56 border-gray-700 bg-gray-900 text-white [&_[data-highlighted]]:bg-gray-800 [&_[data-highlighted]]:text-white"
                    >
                      <DropdownMenuLabel className="text-xs font-normal text-gray-400 pb-2">
                        Contact us on...
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onSelect={() => window.open(whatsAppHref, "_blank", "noopener,noreferrer")}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-3.5 w-3.5 text-white"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </div>
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => window.open(messengerHref, "_blank", "noopener,noreferrer")}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0084FF]">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
                              <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l2.98-.87c.17-.06.36-.09.53-.06 1.05.27 2.1.4 3.15.4 5.64 0 10.36-4.13 10.36-9.7C22 6.13 17.64 2 12 2zm5.63 7.46l-2.93 4.67c-.47.73-1.47.92-2.17.37l-2.34-1.73c-.21-.16-.51-.16-.72 0l-2.76 2.4c-.42.33-.97-.17-.68-.63l2.93-4.67c.47-.73 1.47-.92 2.17-.37l2.34 1.73c.21.16.51.16.72 0l2.76-2.4c.42-.33.97.17.68.63z" />
                            </svg>
                          </div>
                          Messenger
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => window.open(instagramHref, "_blank", "noopener,noreferrer")}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]">
                            <Instagram className="h-3.5 w-3.5 text-white" />
                          </div>
                          Instagram
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => { window.location.href = emailHref; }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-600">
                            <Mail className="h-3.5 w-3.5 text-white" />
                          </div>
                          Email
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center sm:p-2 sm:min-w-0 sm:min-h-0 text-white/80 hover:bg-white/10 hover:text-white touch-manipulation"
                    aria-label="Close chat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {/* Wavy bottom separator */}
              <div className="absolute bottom-0 left-0 right-0 h-4">
                <svg
                  viewBox="0 0 340 16"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                  aria-hidden
                >
                  <path
                    d="M0 8 Q 85 0 170 8 T 340 8 L 340 16 L 0 16 Z"
                    fill="#111827"
                  />
                </svg>
              </div>
            </div>

            {/* Content: messages + options (until user sends) + input */}
            <div className="flex flex-col flex-1 min-h-0">
              {/* Messages */}
              <div className="flex min-h-[140px] max-h-[70vh] sm:max-h-[400px] flex-1 flex-col gap-2 overflow-y-auto p-3 sm:p-4 overscroll-contain">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        msg.isUser
                          ? "bg-[#25D366] text-white"
                          : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words [&_a]:underline [&_a]:underline-offset-1 [&_a]:font-medium [&_a]:cursor-pointer hover:[&_a]:opacity-90">
                        <MessageText
                          text={msg.text}
                          linkClassName={
                            msg.isUser
                              ? "text-white/95 hover:text-white"
                              : "text-[#38D1BF] hover:text-[#4dd9c9]"
                          }
                        />
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start" aria-live="polite" aria-busy="true">
                    <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-gray-700 text-gray-100">
                      <span className="text-sm inline-flex gap-0.5" aria-label="Typing">
                        <span className="animate-typing-dot">.</span>
                        <span className="animate-typing-dot animation-delay-200">.</span>
                        <span className="animate-typing-dot animation-delay-400">.</span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} aria-hidden />

                {/* Social icons + conversation starters - hide after user sends a message */}
                {!hasUserSentMessage && (
                  <div className="mt-3 space-y-4">
                    {/* Social icons - label + evenly spaced icon buttons */}
                    <div>
                      <p className="mb-3 text-sm text-gray-400">
                        Or chat with us on...
                      </p>
                      <div className="flex justify-evenly items-center gap-4 sm:gap-8">
                        <a
                          href={whatsAppHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110 active:scale-95 touch-manipulation"
                          aria-label="Chat on WhatsApp"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
                            aria-hidden
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                        <a
                          href={messengerHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-[#0084FF] text-white transition-transform hover:scale-110 active:scale-95 touch-manipulation"
                          aria-label="Chat on Messenger"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
                            aria-hidden
                          >
                            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l2.98-.87c.17-.06.36-.09.53-.06 1.05.27 2.1.4 3.15.4 5.64 0 10.36-4.13 10.36-9.7C22 6.13 17.64 2 12 2zm5.63 7.46l-2.93 4.67c-.47.73-1.47.92-2.17.37l-2.34-1.73c-.21-.16-.51-.16-.72 0l-2.76 2.4c-.42.33-.97-.17-.68-.63l2.93-4.67c.47-.73 1.47-.92 2.17-.37l2.34 1.73c.21.16.51.16.72 0l2.76-2.4c.42-.33.97.17.68.63z" />
                          </svg>
                        </a>
                        <a
                          href={instagramHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-transform hover:scale-110 active:scale-95 touch-manipulation"
                          aria-label="Chat on Instagram"
                        >
                          <Instagram className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
                        </a>
                      </div>
                    </div>

                    {/* Conversation starters */}
                    <div>
                      <p className="mb-2 text-xs text-gray-400">
                        Quick questions:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {conversationStarters.map((starter) => (
                          <button
                            key={starter}
                            type="button"
                            onClick={() => sendMessage(undefined, starter)}
                            className="rounded-full border border-gray-600 bg-gray-800/80 px-4 py-2.5 text-sm text-gray-200 transition-colors hover:border-pulse-pink/50 hover:bg-gray-700 active:bg-gray-700 touch-manipulation min-h-[44px]"
                          >
                            {starter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat input */}
              <form
                onSubmit={(e) => sendMessage(e)}
                className="shrink-0 border-t border-gray-700 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
              >
                <div className="flex items-center gap-2 rounded-full border border-gray-600 bg-gray-800/80 px-2 py-1.5 sm:px-1.5 sm:py-1 focus-within:ring-2 focus-within:ring-pulse-pink/30 focus-within:border-pulse-pink/50 transition-colors">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-base sm:text-sm text-white placeholder:text-gray-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex h-10 w-10 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-95 active:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pulse-pink/50 focus:ring-offset-2 focus:ring-offset-gray-900 touch-manipulation disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default WhatsAppChatButton;
