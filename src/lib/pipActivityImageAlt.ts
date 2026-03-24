/**
 * SEO-focused alt text for Pip activity images (s.kikiapp.eu/img/pip/{stem}.webp).
 * Keys are filename stems without extension. Mascot assets (pip*) are excluded.
 */
export const PIP_ACTIVITY_ALT: Record<string, string> = {
  arcade: "Meet new friends at the arcade with the Pulse app",
  pottery: "Meet new friends at a pottery class with the Pulse app",
  surfing: "Meet new friends through surfing with the Pulse app",
  hiking: "Meet new friends on a group hike with the Pulse app",
  winetasting: "Meet new friends at a wine tasting with the Pulse app",
  pilates: "Meet new friends at pilates with the Pulse app",
  rockclimbing: "Meet new friends through rock climbing with the Pulse app",
  tennis: "Meet new friends through tennis with the Pulse app",
  gardening: "Meet new friends through gardening with the Pulse app",
  escaperoom: "Meet new friends at an escape room with the Pulse app",
  cycling: "Meet new friends on a group bike ride with the Pulse app",
  yogaoutdoors: "Meet new friends at outdoor yoga with the Pulse app",
  music: "Meet new friends through live music with the Pulse app",
  soccer: "Meet new friends through soccer with the Pulse app",
  basketball: "Meet new friends through basketball with the Pulse app",
  karaoke: "Meet new friends at karaoke with the Pulse app",
  foodwalkingtour: "Meet new friends on a food walking tour with the Pulse app",
  paintingclass: "Meet new friends at a painting class with the Pulse app",
  brewery: "Meet new friends at a brewery with the Pulse app",
  trivia: "Meet new friends at trivia night with the Pulse app",
  pool: "Meet new friends over a game of pool with the Pulse app",
  poker: "Meet new friends at poker night with the Pulse app",
  cocktailbar: "Meet new friends at a cocktail bar with the Pulse app",
  tour: "Meet new friends on a day tour with the Pulse app",
  gaybar: "Meet new friends at an LGBTQ+ bar with the Pulse app",
  photography: "Meet new friends through photography outings with the Pulse app",
  picnic: "Meet new friends at a picnic with the Pulse app",
  cafe: "Meet new friends over coffee with the Pulse app",
  dancing: "Meet new friends through dancing with the Pulse app",
  camping: "Meet new friends on a camping trip with the Pulse app",
  beachvolleyball: "Meet new friends through beach volleyball with the Pulse app",
  boat: "Meet new friends on a boat outing with the Pulse app",
  boardgames: "Meet new friends at board game night with the Pulse app",
  lasertag: "Meet new friends at laser tag with the Pulse app",
  bowling: "Meet new friends at bowling with the Pulse app",
  paintball: "Meet new friends at paintball with the Pulse app",
  cooking: "Meet new friends at a cooking class with the Pulse app",
  golf: "Meet new friends through golf with the Pulse app",
  skiing: "Meet new friends on a ski trip with the Pulse app",
  bookclub: "Meet new friends at a book club with the Pulse app",
  meditation: "Meet new friends at a meditation group with the Pulse app",
  scavengerhunt: "Meet new friends on a scavenger hunt with the Pulse app",
  pickleball: "Meet new friends through pickleball with the Pulse app",
};

export function getPipActivityImageAlt(imageUrl: string): string | undefined {
  const m = imageUrl.match(/\/pip\/([^/]+)\.webp$/i);
  if (!m) return undefined;
  const stem = m[1].toLowerCase();
  if (stem.startsWith("pip")) return undefined;
  return PIP_ACTIVITY_ALT[stem];
}
