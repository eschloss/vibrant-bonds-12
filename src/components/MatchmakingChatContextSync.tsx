import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pathShowsChatBubbleForCityPages, useChatContext } from "@/contexts/ChatContext";
import { buildMatchmakingCityChatContext } from "@/lib/matchmakingChatContext";

/** Sets ChatContext for the floating chat webhook on Friend Group Matching (Lagos) city routes. */
export default function MatchmakingChatContextSync() {
  const { pathname } = useLocation();
  const { setChatContext } = useChatContext();

  useEffect(() => {
    if (!pathShowsChatBubbleForCityPages(pathname)) return;
    setChatContext(buildMatchmakingCityChatContext(pathname), null);
    return () => setChatContext(null);
  }, [pathname, setChatContext]);

  return null;
}
