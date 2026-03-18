import React, { useState, useRef, useEffect } from "react";
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

// Mockup: placeholder values. Replace with env/constants when wiring up backend.
const MOCK_PHONE = "15551234567";
const MOCK_PREFILL = "Hi! I have a question about Pulse.";
const MOCK_FACEBOOK_URL = "https://www.facebook.com/messages";
const MOCK_INSTAGRAM_URL = "https://www.instagram.com/direct/inbox/";
const MOCK_EMAIL = "mailto:contact@pulsenow.app";

function buildWhatsAppUrl(phone: string, prefill?: string): string {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  if (prefill?.trim()) {
    return `${base}?text=${encodeURIComponent(prefill.trim())}`;
  }
  return base;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function WhatsAppChatButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Hi! How can we help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const hasUserSentMessage = messages.some((m) => m.isUser);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const sendMessage = (e?: React.FormEvent, text?: string) => {
    e?.preventDefault();
    const message = (text ?? inputValue).trim();
    if (!message) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: message,
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setInputValue("");
  };

  const CONVERSATION_STARTERS = [
    "How do I get started?",
    "Is Pulse available in my city?",
    "I have a question about events",
    "Tell me more about the app",
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <div ref={panelRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
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
                  <Avatar className="h-12 w-12 shrink-0 border-2 border-white/20">
                    <AvatarImage
                      src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/PIP%20hello.png"
                      alt="Pulse"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-pulse-pink via-pulse-purple to-pulse-blue text-lg font-semibold text-white">
                      P
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium text-white/90">
                      Chat with
                    </p>
                    <p className="font-semibold text-white">Pulse</p>
                    <p className="mt-0.5 text-xs font-normal text-white/70">
                      We&apos;re online
                    </p>
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
                      <DropdownMenuItem asChild>
                        <a
                          href={buildWhatsAppUrl(MOCK_PHONE, MOCK_PREFILL)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
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
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={MOCK_FACEBOOK_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0084FF]">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
                              <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l2.98-.87c.17-.06.36-.09.53-.06 1.05.27 2.1.4 3.15.4 5.64 0 10.36-4.13 10.36-9.7C22 6.13 17.64 2 12 2zm5.63 7.46l-2.93 4.67c-.47.73-1.47.92-2.17.37l-2.34-1.73c-.21-.16-.51-.16-.72 0l-2.76 2.4c-.42.33-.97-.17-.68-.63l2.93-4.67c.47-.73 1.47-.92 2.17-.37l2.34 1.73c.21.16.51.16.72 0l2.76-2.4c.42-.33.97.17.68.63z" />
                            </svg>
                          </div>
                          Messenger
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={MOCK_INSTAGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]">
                            <Instagram className="h-3.5 w-3.5 text-white" />
                          </div>
                          Instagram
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={MOCK_EMAIL}
                          className="flex items-center gap-2"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-600">
                            <Mail className="h-3.5 w-3.5 text-white" />
                          </div>
                          Email
                        </a>
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
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}

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
                          href={buildWhatsAppUrl(MOCK_PHONE, MOCK_PREFILL)}
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
                          href={MOCK_FACEBOOK_URL}
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
                          href={MOCK_INSTAGRAM_URL}
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
                        {CONVERSATION_STARTERS.map((starter) => (
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
                    className="flex h-10 w-10 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-95 active:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pulse-pink/50 focus:ring-offset-2 focus:ring-offset-gray-900 touch-manipulation"
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
