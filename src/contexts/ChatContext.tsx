import React, { createContext, useContext, useState, useCallback } from "react";

interface ChatContextValue {
  /** Multiline event context (day, name, price, breakdown, what's included). Set by event pages, cleared when leaving. */
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

/**
 * Returns true if the given pathname should show the chat bubble by default.
 * Pages: /events, /events/:slug, /events/:slug/checkout, /events/:slug/confirmation.
 * Excludes /events/cities and /events/cities/:cityName.
 */
export function pathShowsChatBubbleByDefault(pathname: string): boolean {
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
