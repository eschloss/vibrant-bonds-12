export type EventVibeId = "create" | "experience" | "move" | "play";

export type EventVibeDefinition = {
  id: EventVibeId;
  titleKey: string;
  descriptionKey: string;
  defaultTitle: string;
  defaultDescription: string;
  chipKeys: string[];
  defaultChips: string[];
  /** Background image URL for the vibe card. */
  backgroundImage: string;
};

export const EVENT_VIBES: EventVibeDefinition[] = [
  {
    id: "create",
    titleKey: "eventsLanding.vibes.create_title",
    descriptionKey: "eventsLanding.vibes.create_desc",
    defaultTitle: "Create Together",
    defaultDescription: "Hands‑on, low‑pressure activities where conversation flows naturally.",
    chipKeys: [
      "eventsLanding.vibes.chip_pottery",
      "eventsLanding.vibes.chip_art_sip",
      "eventsLanding.vibes.chip_candle_making",
    ],
    defaultChips: ["Pottery", "Art & sip", "Candle making"],
    backgroundImage: "https://s.kikiapp.eu/img/events/workshop-category.webp",
  },
  {
    id: "experience",
    titleKey: "eventsLanding.vibes.experience_title",
    descriptionKey: "eventsLanding.vibes.experience_desc",
    defaultTitle: "Experience Together",
    defaultDescription: "Shared emotional or atmospheric moments that create bonding.",
    chipKeys: [
      "eventsLanding.vibes.chip_candlelit_concerts",
      "eventsLanding.vibes.chip_theatre",
      "eventsLanding.vibes.chip_poetry",
    ],
    defaultChips: ["Candlelit concerts", "Theatre", "Poetry"],
    backgroundImage: "https://s.kikiapp.eu/img/events/experience-cat.webp",
  },
  {
    id: "move",
    titleKey: "eventsLanding.vibes.move_title",
    descriptionKey: "eventsLanding.vibes.move_desc",
    defaultTitle: "Move Together",
    defaultDescription: "Physical activities that reduce social anxiety and build connection through movement.",
    chipKeys: ["eventsLanding.vibes.chip_kayaking", "eventsLanding.vibes.chip_hiking", "eventsLanding.vibes.chip_dance_classes"],
    defaultChips: ["Kayaking", "Hiking", "Dance classes"],
    backgroundImage: "https://s.kikiapp.eu/img/events/move-cat.webp",
  },
  {
    id: "play",
    titleKey: "eventsLanding.vibes.play_title",
    descriptionKey: "eventsLanding.vibes.play_desc",
    defaultTitle: "Play Together",
    defaultDescription: "High‑energy, fun formats that spark quick chemistry.",
    chipKeys: ["eventsLanding.vibes.chip_game_nights", "eventsLanding.vibes.chip_trivia", "eventsLanding.vibes.chip_karaoke"],
    defaultChips: ["Game nights", "Trivia", "Karaoke"],
    backgroundImage: "https://s.kikiapp.eu/img/events/play-cat.webp",
  },
];

export function getEventVibeById(id: string | undefined): EventVibeDefinition | undefined {
  if (!id) return undefined;
  return EVENT_VIBES.find((v) => v.id === id);
}

