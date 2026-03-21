/** Stable ids for future-invite `suggestions` (POST JSON list of strings). */

export const FUTURE_INVITE_SUGGESTION_IDS = [
  "music_live",
  "food_drink",
  "classes_workshops",
  "outdoors_nature",
  "sports_fitness",
  "games_social",
  "arts_culture",
  "nightlife_dj",
  "wellness",
  "creative",
] as const;

export type FutureInviteSuggestionId = (typeof FUTURE_INVITE_SUGGESTION_IDS)[number];

/** English strings stored in the API (stable, human-readable). */
export const FUTURE_INVITE_SUGGESTION_STORED_LABELS: Record<FutureInviteSuggestionId, string> = {
  music_live: "Music & live shows",
  food_drink: "Food & drink",
  classes_workshops: "Classes & workshops",
  outdoors_nature: "Outdoors & nature",
  sports_fitness: "Sports & fitness",
  games_social: "Games & social",
  arts_culture: "Arts & culture",
  nightlife_dj: "Nightlife & DJ",
  wellness: "Wellness",
  creative: "Creative",
};

export function suggestionsForApi(selectedIds: string[]): string[] {
  const out: string[] = [];
  for (const id of selectedIds) {
    if (id in FUTURE_INVITE_SUGGESTION_STORED_LABELS) {
      out.push(FUTURE_INVITE_SUGGESTION_STORED_LABELS[id as FutureInviteSuggestionId]);
    }
  }
  return out;
}
