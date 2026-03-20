import React, { createContext, useContext, useState, useCallback } from "react";

interface ChatContextValue {
  /** Multiline context for the chat webhook: event details on event flows; Friend Group Matching on city pages. Cleared when leaving. */
  chatContext: string | null;
  /** Event title for WhatsApp prefill. Set by event pages, cleared when leaving. */
  eventTitle: string | null;
  setChatContext: (context: string | null, eventTitle?: string | null) => void;
  /** Whether to show the chat bubble. null = use path-based default. true/false = explicit override. */
  showChatBubble: boolean | null;
  setShowChatBubble: (value: boolean | null) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    return {
      chatContext: null,
      eventTitle: null,
      setChatContext: () => {},
      showChatBubble: null,
      setShowChatBubble: () => {},
    };
  }
  return ctx;
}

/** City URL slugs that show the chat bubble on city/neighborhood routes. Expand when rolling out beyond Lagos. */
export const CITY_SLUGS_SHOWING_CHAT = ["lagos"] as const;

const CITY_SLUG_CHAT_SET = new Set(
  CITY_SLUGS_SHOWING_CHAT.map((s) => s.toLowerCase())
);

function citySlugShowsChat(slug: string): boolean {
  return CITY_SLUG_CHAT_SET.has(slug.toLowerCase());
}

/**
 * True when pathname is a city-scoped page for a whitelisted slug (e.g. Lagos):
 * /events/cities/:city, /cities/:city/..., /neighborhoods/:city/...
 */
export function pathShowsChatBubbleForCityPages(pathname: string): boolean {
  const p = pathname.split("?")[0] ?? pathname;
  const eventsCities = /^\/events\/cities\/([^/]+)/.exec(p);
  if (eventsCities?.[1]) return citySlugShowsChat(eventsCities[1]);
  const cities = /^\/cities\/([^/]+)/.exec(p);
  if (cities?.[1]) return citySlugShowsChat(cities[1]);
  const neighborhoods = /^\/neighborhoods\/([^/]+)/.exec(p);
  if (neighborhoods?.[1]) return citySlugShowsChat(neighborhoods[1]);
  return false;
}

export type ChatContentVariant = "events" | "matchmaking";

/** Matchmaking copy (starters, bubbles, prefill) on whitelisted city routes; events everywhere else. */
export function getChatContentVariant(pathname: string): ChatContentVariant {
  return pathShowsChatBubbleForCityPages(pathname) ? "matchmaking" : "events";
}

/**
 * Returns true if the given pathname should show the chat bubble by default.
 * Events: /events, /events/:slug, checkout, confirmation.
 * City pages: only whitelisted city slugs (see CITY_SLUGS_SHOWING_CHAT), e.g. /cities/lagos, /events/cities/lagos.
 * Other /events/cities/:city and non-whitelisted city URLs: hidden.
 */
export function pathShowsChatBubbleByDefault(pathname: string): boolean {
  if (pathShowsChatBubbleForCityPages(pathname)) return true;
  if (pathname === "/events") return true;
  if (pathname.startsWith("/events/cities")) return false;
  if (/^\/events\/[^/]+\/checkout$/.test(pathname)) return true;
  if (/^\/events\/[^/]+\/confirmation$/.test(pathname)) return true;
  if (/^\/events\/[^/]+$/.test(pathname)) return true; // /events/:slug
  return false;
}

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const [chatContext, setChatContextState] = useState<string | null>(null);
  const [eventTitle, setEventTitleState] = useState<string | null>(null);
  const [showChatBubble, setShowChatBubbleState] = useState<boolean | null>(null);
  const setChatContext = useCallback((context: string | null, title?: string | null) => {
    setChatContextState(context);
    setEventTitleState(context === null ? null : (title ?? null));
  }, []);
  const setShowChatBubble = useCallback((value: boolean | null) => {
    setShowChatBubbleState(value);
  }, []);
  return (
    <ChatContext.Provider
      value={{
        chatContext,
        eventTitle,
        setChatContext,
        showChatBubble,
        setShowChatBubble,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
