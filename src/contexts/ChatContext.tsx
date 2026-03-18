import React, { createContext, useContext, useState, useCallback } from "react";

interface ChatContextValue {
  /** Multiline event context (day, name, price, breakdown, what's included). Set by event pages, cleared when leaving. */
  chatContext: string | null;
  /** Event title for WhatsApp prefill. Set by event pages, cleared when leaving. */
  eventTitle: string | null;
  setChatContext: (context: string | null, eventTitle?: string | null) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    return {
      chatContext: null,
      eventTitle: null,
      setChatContext: () => {},
    };
  }
  return ctx;
}

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const [chatContext, setChatContextState] = useState<string | null>(null);
  const [eventTitle, setEventTitleState] = useState<string | null>(null);
  const setChatContext = useCallback((context: string | null, title?: string | null) => {
    setChatContextState(context);
    setEventTitleState(context === null ? null : (title ?? null));
  }, []);
  return (
    <ChatContext.Provider value={{ chatContext, eventTitle, setChatContext }}>
      {children}
    </ChatContext.Provider>
  );
}
