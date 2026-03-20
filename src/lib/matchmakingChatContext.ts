import { pathShowsChatBubbleForCityPages } from "@/contexts/ChatContext";

function formatSlugLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function extractCitySlug(pathname: string): string | null {
  const p = pathname.split("?")[0] ?? pathname;
  const eventsCities = /^\/events\/cities\/([^/]+)/.exec(p);
  if (eventsCities?.[1]) return eventsCities[1];
  const cities = /^\/cities\/([^/]+)/.exec(p);
  if (cities?.[1]) return cities[1];
  const neighborhoods = /^\/neighborhoods\/([^/]+)/.exec(p);
  if (neighborhoods?.[1]) return neighborhoods[1];
  return null;
}

function describeSurface(pathname: string): string {
  const parts = pathname.split("?")[0]?.split("/").filter(Boolean) ?? [];

  if (pathname.startsWith("/events/cities/")) {
    return "Events-by-city directory for this city; user is in the Friend Group Matching / city onboarding flow (not a single event ticket page).";
  }
  if (pathname.startsWith("/neighborhoods/")) {
    const citySlug = parts[1];
    const neighborhood = parts[2];
    const cityLabel = citySlug ? formatSlugLabel(citySlug) : "this city";
    return neighborhood
      ? `Neighborhood: ${formatSlugLabel(neighborhood)} under ${cityLabel} (Friend Group Matching).`
      : `Neighborhood page (Friend Group Matching, ${cityLabel}).`;
  }
  if (parts[0] === "cities" && parts.length >= 2) {
    const cityLabel = formatSlugLabel(parts[1]);
    if (parts.length === 2) {
      return `Friend Group Matching · main city hub (${cityLabel}) — how matching works, joining, pricing.`;
    }
    if (parts[2] === "queer") {
      return parts.length > 3
        ? `Friend Group Matching · queer-inclusive · ${formatSlugLabel(parts[3] ?? "")} (${cityLabel}).`
        : `Friend Group Matching · queer-inclusive city track (${cityLabel}).`;
    }
    return `Friend Group Matching · community/affinity: ${formatSlugLabel(parts[2] ?? "")} (${cityLabel}).`;
  }
  return "Friend Group Matching city page.";
}

/**
 * Multiline context for the site chat webhook on whitelisted matchmaking city routes.
 * Clarifies this is Friend Group Matching, not Events checkout/detail.
 */
export function buildMatchmakingCityChatContext(pathname: string): string {
  if (!pathShowsChatBubbleForCityPages(pathname)) return "";
  const slug = extractCitySlug(pathname);
  if (!slug) return "";
  const cityLabel = formatSlugLabel(slug);
  const p = pathname.split("?")[0] ?? pathname;
  const lines = [
    "Page type: Friend Group Matching (Pulse matchmaking / friend introductions).",
    "This is NOT an Events page: not event ticket purchase, not a single-event detail page, not checkout.",
    `Path: ${p}`,
    `City: ${cityLabel} (slug: ${slug})`,
    `Surface: ${describeSurface(pathname)}`,
    "Prefer answering about matchmaking, waitlist, introductions, and city availability; only discuss events if the user asks.",
  ];
  return lines.join("\n");
}
