/**
 * Events data and helpers.
 * Designed so swapping to a real events API later is mainly a data-source change.
 */

import type { EventVibeId } from "./eventVibes";

export type EventProviderDetails = {
  name: string;
  shortBio?: string;
  logoUrl?: string;
  /** URL to the provider's event page (not Pulse). */
  eventDetailsUrl?: string;
};

export interface Event {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  primaryImage: string;
  images: string[];
  dateTime: string;
  place: string;
  organiser: string;
  /** Total price shown on the event page (ticket + Pulse fee). */
  price: string;
  /** Ticket price charged by the organiser/provider (excluding Pulse fee). */
  ticketPrice?: string;
  /** Pulse fee charged for the group + chat experience. */
  pulseFee?: string;
  provider: string;
  duration: string;
  bookingUrl: string;
  citySlug: string;
  categoryId?: EventVibeId;
  providerDetails?: EventProviderDetails;
  /** Dummy / CMS: no remaining spots (list UI only until detail page supports it). */
  soldOut?: boolean;
}

function startOfToday(now = new Date()): Date {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** True when the event start is before the start of the local calendar day of `now`. */
export function isEventPast(event: Event, now = new Date()): boolean {
  return new Date(event.dateTime).getTime() < startOfToday(now).getTime();
}

export function partitionCityEvents(events: Event[], now = new Date()): {
  upcoming: Event[];
  past: Event[];
} {
  const upcoming: Event[] = [];
  const past: Event[] = [];
  for (const e of events) {
    if (isEventPast(e, now)) past.push(e);
    else upcoming.push(e);
  }
  past.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  upcoming.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  return { upcoming, past };
}

/**
 * City page list order: (1) upcoming with spots, soonest first; (2) upcoming sold out, soonest first;
 * (3) past, most recent first.
 */
export function orderEventsForCityPage(events: Event[], now = new Date()): {
  upcomingAvailable: Event[];
  upcomingSoldOut: Event[];
  past: Event[];
} {
  const { upcoming, past } = partitionCityEvents(events, now);
  const upcomingAvailable = upcoming.filter((e) => !e.soldOut);
  const upcomingSoldOut = upcoming.filter((e) => Boolean(e.soldOut));
  return { upcomingAvailable, upcomingSoldOut, past };
}

function normalizeSlug(s: string): string {
  return s.toLowerCase().replace(/^\//, "").trim();
}

export type EventPriceBreakdown = {
  ticketPrice: string;
  pulseFee: string;
  totalPrice: string;
};

export function getEventPriceBreakdown(event: Event): EventPriceBreakdown | undefined {
  if (!event.ticketPrice || !event.pulseFee) return undefined;
  return { ticketPrice: event.ticketPrice, pulseFee: event.pulseFee, totalPrice: event.price };
}

const DEFAULT_PROVIDER_DETAILS: Record<string, Omit<EventProviderDetails, "eventDetailsUrl"> & { websiteUrl?: string }> = {
  fever: {
    name: "Fever",
    shortBio: "Fever is an experiences marketplace where you can discover and book events.",
    logoUrl: "https://feverup.com/favicon.ico",
    websiteUrl: "https://feverup.com",
  },
  typeform: {
    name: "Typeform",
    shortBio: "Pulse uses a Typeform RSVP for this event. The event itself is organised by the organiser listed on this page.",
    logoUrl: "https://www.typeform.com/favicon.ico",
    websiteUrl: "https://www.typeform.com",
  },
};

export function getEventProviderDetails(event: Event): EventProviderDetails {
  const providerKey = (event.provider || "").toLowerCase().trim();
  const defaults = DEFAULT_PROVIDER_DETAILS[providerKey];
  const merged: EventProviderDetails = {
    name: defaults?.name || event.provider || "Provider",
    shortBio: defaults?.shortBio,
    logoUrl: defaults?.logoUrl,
    ...(event.providerDetails || {}),
  };

  return {
    ...merged,
    eventDetailsUrl:
      merged.eventDetailsUrl ||
      event.bookingUrl ||
      defaults?.websiteUrl ||
      undefined,
  };
}

const EVENTS: Event[] = [
  // New York
  {
    id: "ny-salsa-1",
    title: "Salsa Night Under the Stars",
    slug: "salsa-night-under-the-stars",
    shortDescription: "Join us for an evening of salsa dancing in the heart of Brooklyn. All levels welcome.",
    longDescription: "Experience the vibrant energy of salsa in one of New York's most iconic neighborhoods. Our expert instructors will guide you through the basics, and then the floor is yours. No partner required—we rotate partners throughout the night. Complimentary refreshments included.",
    primaryImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-10T19:00:00",
    place: "Brooklyn Rooftop, Williamsburg",
    organiser: "Brooklyn Rooftop",
    price: "$25",
    ticketPrice: "$20",
    pulseFee: "$5",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "new-york",
    categoryId: "create",
  },
  {
    id: "ny-trivia-1",
    title: "Pub Trivia Champions Night",
    slug: "pub-trivia-champions-night",
    shortDescription: "Test your knowledge and make new friends at our weekly trivia night in Manhattan.",
    longDescription: "Gather your team (or join one on the spot) for an evening of brain-teasing fun. Categories include pop culture, history, science, and local NYC lore. Prizes for the top three teams. Great food and drinks available.",
    primaryImage: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-04-25T19:30:00",
    place: "The Wayward Tavern, East Village",
    organiser: "The Wayward Tavern",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "new-york",
    categoryId: "play",
  },
  {
    id: "ny-rooftop-1",
    title: "Sunset Rooftop Social",
    slug: "sunset-rooftop-social",
    shortDescription: "Watch the skyline light up while mingling with fellow New Yorkers.",
    longDescription: "An intimate rooftop gathering with stunning views of the Manhattan skyline. Perfect for making new connections in a relaxed setting. Light bites and one complimentary drink included.",
    primaryImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-06-15T18:00:00",
    place: "Sky Lounge, Midtown",
    organiser: "Sky Lounge",
    price: "$35",
    ticketPrice: "$30",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2.5 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "new-york",
    categoryId: "create",
    soldOut: true,
  },
  {
    id: "ny-past-winter-wine-walk",
    title: "Winter Wine Walk (Past)",
    slug: "past-winter-wine-walk-nyc",
    shortDescription: "A cozy evening of wine tastings in Chelsea — this one’s already wrapped.",
    longDescription: "Sample pours from local wineries and meet fellow wine lovers. Event has ended.",
    primaryImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-01-18T18:00:00",
    place: "Chelsea Market, Manhattan",
    organiser: "Chelsea Market",
    price: "$40",
    ticketPrice: "$35",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "new-york",
    categoryId: "experience",
  },
  {
    id: "ny-past-dumpling-night",
    title: "Dumpling Night Social (Past)",
    slug: "past-dumpling-night-nyc",
    shortDescription: "A sold-out dumpling crawl in Flushing — thanks to everyone who joined.",
    longDescription: "We hit three spots for soup dumplings and tea. This event has ended.",
    primaryImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-12T19:00:00",
    place: "Flushing, Queens",
    organiser: "Flushing Food Walks",
    price: "$28",
    ticketPrice: "$23",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2.5 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "new-york",
    categoryId: "experience",
  },
  {
    id: "ny-sold-summer-jazz",
    title: "Summer Jazz in the Park",
    slug: "summer-jazz-in-the-park-nyc",
    shortDescription: "Live jazz at Central Park — fully booked for Pulse groups.",
    longDescription: "An evening of live jazz with a Pulse group chat. No spots left.",
    primaryImage: "https://images.unsplash.com/photo-1415201364244-1124d58a7fce?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1415201364244-1124d58a7fce?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-07-22T19:30:00",
    place: "Central Park, Manhattan",
    organiser: "NYC Parks",
    price: "$20",
    ticketPrice: "$15",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "new-york",
    categoryId: "create",
    soldOut: true,
  },
  {
    id: "ny-sold-broadway-brunch",
    title: "Broadway Brunch Club",
    slug: "broadway-brunch-club-nyc",
    shortDescription: "Brunch and a matinee vibe — this date is fully booked.",
    longDescription: "Meet your crew in chat before brunch near the Theatre District. Spots are full.",
    primaryImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-08-02T11:00:00",
    place: "Hell's Kitchen, Manhattan",
    organiser: "Broadway Brunch Club",
    price: "$45",
    ticketPrice: "$40",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "new-york",
    categoryId: "create",
    soldOut: true,
  },
  // Boston
  {
    id: "boston-harbor-1",
    title: "Harbor Cruise & Mixer",
    slug: "harbor-cruise-mixer",
    shortDescription: "Sail around Boston Harbor while meeting new people. Includes light refreshments.",
    longDescription: "Join us for a scenic cruise through Boston Harbor. Take in views of the skyline, USS Constitution, and the islands while connecting with fellow Bostonians. Perfect for a weekend afternoon.",
    primaryImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-14T14:00:00",
    place: "Long Wharf, Boston",
    organiser: "Long Wharf",
    price: "$45",
    ticketPrice: "$40",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "boston",
    categoryId: "move",
  },
  {
    id: "boston-coffee-1",
    title: "Coffee & Conversation",
    slug: "coffee-conversation",
    shortDescription: "A low-key morning meetup for friendly chats over great coffee.",
    longDescription: "Start your weekend with new friends. We'll gather at a cozy café in Cambridge for casual conversation. No agenda—just good coffee and great people.",
    primaryImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-05-10T10:00:00",
    place: "Café Luna, Cambridge",
    organiser: "Café Luna",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "1.5 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "boston",
    categoryId: "create",
  },
  {
    id: "boston-past-historic-tour",
    title: "Freedom Trail Highlights (Past)",
    slug: "past-freedom-trail-boston",
    shortDescription: "A winter walk through Revolutionary Boston — already happened.",
    longDescription: "We explored the Freedom Trail with a local guide. Event completed.",
    primaryImage: "https://images.unsplash.com/photo-1599829930426-c70e87d9b87b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599829930426-c70e87d9b87b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-01-25T10:00:00",
    place: "Boston Common",
    organiser: "Boston Walks",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "boston",
    categoryId: "experience",
  },
  {
    id: "boston-past-board-game",
    title: "Board Game Café Night (Past)",
    slug: "past-board-game-night-boston",
    shortDescription: "Casual games and coffee in Somerville — thanks for coming.",
    longDescription: "Tabletop night at a local café. Event has ended.",
    primaryImage: "https://images.unsplash.com/photo-1611371805429-8fd466810887?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611371805429-8fd466810887?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-08T19:00:00",
    place: "Somerville, MA",
    organiser: "Tabletop Somerville",
    price: "$12",
    ticketPrice: "$10",
    pulseFee: "$2",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "boston",
    categoryId: "play",
  },
  {
    id: "boston-sold-sailing",
    title: "Charles River Sailing Social",
    slug: "charles-river-sailing-boston",
    shortDescription: "Learn-to-sail afternoon — fully booked for Pulse.",
    longDescription: "Small groups on the Charles. No Pulse spots left.",
    primaryImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-06-20T14:00:00",
    place: "Charles River",
    organiser: "Community Boating",
    price: "$55",
    ticketPrice: "$50",
    pulseFee: "$5",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "boston",
    categoryId: "move",
    soldOut: true,
  },
  {
    id: "boston-sold-comedy",
    title: "Comedy Cellar Night Out",
    slug: "comedy-cellar-night-boston",
    shortDescription: "Stand-up showcase — Pulse allocation sold out.",
    longDescription: "Laughs and drinks downtown. No remaining Pulse spots.",
    primaryImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-07-08T20:00:00",
    place: "Downtown Boston",
    organiser: "Laugh Boston",
    price: "$35",
    ticketPrice: "$30",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "boston",
    categoryId: "experience",
    soldOut: true,
  },
  // London
  {
    id: "london-thames-1",
    title: "Thames Riverside Walk",
    slug: "thames-riverside-walk",
    shortDescription: "A guided walk along the South Bank with stops at hidden gems.",
    longDescription: "Explore the best of the South Bank with a small group. We'll stroll past the London Eye, Tate Modern, and Borough Market, with plenty of time to chat and take photos. Ends at a pub for optional drinks.",
    primaryImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560930950-5cc20e80e392?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-22T11:00:00",
    place: "South Bank, London",
    organiser: "South Bank",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2.5 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "london",
    categoryId: "move",
  },
  {
    id: "london-pottery-1",
    title: "Pottery Workshop for Beginners",
    slug: "pottery-workshop-beginners",
    shortDescription: "Get your hands dirty and create your own ceramic piece. No experience needed.",
    longDescription: "A hands-on introduction to pottery in a relaxed studio setting. You'll learn basic techniques and create a piece to take home. All materials included. Perfect for beginners and curious creatives.",
    primaryImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560930950-5cc20e80e392?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-05-18T14:00:00",
    place: "Mud & Clay Studio, Shoreditch",
    organiser: "Mud & Clay Studio",
    price: "$55",
    ticketPrice: "$50",
    pulseFee: "$5",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "london",
    categoryId: "experience",
  },
  {
    id: "london-past-museum-lates",
    title: "Museum Lates: After Hours (Past)",
    slug: "past-museum-lates-london",
    shortDescription: "Exclusive evening at a major museum — event completed.",
    longDescription: "Private viewing and talks. Thanks to everyone who joined.",
    primaryImage: "https://images.unsplash.com/photo-1566127444979-b3d2b64e9325?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566127444979-b3d2b64e9325?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-01-30T18:30:00",
    place: "South Kensington",
    organiser: "Museum Lates",
    price: "£25",
    ticketPrice: "£20",
    pulseFee: "£5",
    provider: "Fever",
    duration: "2.5 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "london",
    categoryId: "experience",
  },
  {
    id: "london-past-pub-quiz",
    title: "Pub Quiz in Camden (Past)",
    slug: "past-pub-quiz-camden",
    shortDescription: "Weekly quiz night — this round is over.",
    longDescription: "Teams and pints in Camden. Event ended.",
    primaryImage: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-05T19:30:00",
    place: "Camden Town",
    organiser: "The Camden Arms",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "london",
    categoryId: "play",
  },
  {
    id: "london-sold-kew-gardens",
    title: "Kew Gardens Picnic Day",
    slug: "kew-gardens-picnic-london",
    shortDescription: "Day trip with Pulse groups — fully booked.",
    longDescription: "Picnic and strolls at Kew. No Pulse spots left.",
    primaryImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-06-28T10:00:00",
    place: "Kew Gardens",
    organiser: "Kew",
    price: "£18",
    ticketPrice: "£13",
    pulseFee: "£5",
    provider: "Fever",
    duration: "4 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "london",
    categoryId: "move",
    soldOut: true,
  },
  {
    id: "london-sold-west-end",
    title: "West End Show & Drinks",
    slug: "west-end-show-drinks-london",
    shortDescription: "Pre-show meetup — Pulse tickets sold out.",
    longDescription: "Chat before the theatre. Fully booked for Pulse.",
    primaryImage: "https://images.unsplash.com/photo-1503096785549-1e9427e7a9a8?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1503096785549-1e9427e7a9a8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-08-15T18:00:00",
    place: "West End",
    organiser: "Pulse x Theatre",
    price: "£90",
    ticketPrice: "£85",
    pulseFee: "£5",
    provider: "Fever",
    duration: "4 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "london",
    categoryId: "experience",
    soldOut: true,
  },
  // Los Angeles
  {
    id: "la-hike-1",
    title: "Griffith Park Sunrise Hike",
    slug: "griffith-park-sunrise-hike",
    shortDescription: "Start the day with a scenic hike and new friends. Moderate difficulty.",
    longDescription: "Beat the heat and the crowds with an early-morning hike in Griffith Park. We'll tackle a moderate trail with stunning views of the city and the Hollywood Sign. Coffee and pastries at the summit.",
    primaryImage: "https://images.unsplash.com/photo-1534190760961-74e8657d76fe?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1534190760961-74e8657d76fe?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-28T06:30:00",
    place: "Griffith Park Observatory Trail",
    organiser: "Griffith Park Observatory Trail",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2.5 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "los-angeles",
    categoryId: "move",
  },
  {
    id: "la-beach-1",
    title: "Beach Volleyball & Bonfire",
    slug: "beach-volleyball-bonfire",
    shortDescription: "An afternoon of volleyball followed by a sunset bonfire on the beach.",
    longDescription: "Join us at Venice Beach for a friendly volleyball tournament. All skill levels welcome. After the games, we'll gather around a bonfire for s'mores and conversation as the sun sets.",
    primaryImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-05-22T15:00:00",
    place: "Venice Beach",
    organiser: "Venice Beach",
    price: "$15",
    ticketPrice: "$10",
    pulseFee: "$5",
    provider: "Fever",
    duration: "4 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "los-angeles",
    categoryId: "move",
  },
  {
    id: "la-past-food-hall",
    title: "Food Hall Crawl (Past)",
    slug: "past-food-hall-crawl-la",
    shortDescription: "A tour of DTLA food halls — event completed.",
    longDescription: "We sampled bites across the Arts District. Thanks everyone.",
    primaryImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-08T18:00:00",
    place: "Arts District, LA",
    organiser: "LA Food Walks",
    price: "$35",
    ticketPrice: "$30",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2.5 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "los-angeles",
    categoryId: "experience",
  },
  {
    id: "la-past-yoga",
    title: "Sunset Yoga (Past)",
    slug: "past-sunset-yoga-la",
    shortDescription: "Beach yoga in Santa Monica — already happened.",
    longDescription: "Stretch and breathe by the ocean. Event ended.",
    primaryImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-10T18:30:00",
    place: "Santa Monica Beach",
    organiser: "Beach Yoga LA",
    price: "$15",
    ticketPrice: "$10",
    pulseFee: "$5",
    provider: "Typeform",
    duration: "1.5 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "los-angeles",
    categoryId: "move",
  },
  {
    id: "la-sold-outdoor-cinema",
    title: "Outdoor Cinema Night",
    slug: "outdoor-cinema-night-la",
    shortDescription: "Rooftop screening — Pulse spots fully booked.",
    longDescription: "Meet in chat before the film. No availability left.",
    primaryImage: "https://images.unsplash.com/photo-1489599849927-2ee91cedd3d8?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cedd3d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-08-10T20:30:00",
    place: "Downtown LA",
    organiser: "Rooftop Cinema",
    price: "$35",
    ticketPrice: "$30",
    pulseFee: "$5",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "los-angeles",
    categoryId: "create",
    soldOut: true,
  },
  {
    id: "la-sold-karaoke",
    title: "Karaoke Night Koreatown",
    slug: "karaoke-night-koreatown-la",
    shortDescription: "Private room karaoke — Pulse group is full.",
    longDescription: "Sing and meet friends. Sold out for Pulse.",
    primaryImage: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-07-25T21:00:00",
    place: "Koreatown, LA",
    organiser: "K-Town Karaoke",
    price: "$28",
    ticketPrice: "$23",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "los-angeles",
    categoryId: "play",
    soldOut: true,
  },
  // Chicago
  {
    id: "chi-comedy-1",
    title: "Improv Comedy Night",
    slug: "improv-comedy-night",
    shortDescription: "Laugh the night away at a live improv show. Optional workshop before the show.",
    longDescription: "Chicago is the birthplace of improv. Experience it with a group at a renowned local theater. Arrive early for an optional 30-minute intro workshop, then enjoy the main show. Drinks available.",
    primaryImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-01T19:00:00",
    place: "Second City, Old Town",
    organiser: "Second City",
    price: "$30",
    ticketPrice: "$25",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "chicago",
    categoryId: "experience",
  },
  {
    id: "chi-pizza-1",
    title: "Deep Dish Pizza Tour",
    slug: "deep-dish-pizza-tour",
    shortDescription: "Taste the best deep dish in Chicago with a small group of food lovers.",
    longDescription: "A guided tour of Chicago's legendary deep dish pizza spots. We'll hit two iconic pizzerias and debate which style reigns supreme. Includes slices at each stop and plenty of conversation.",
    primaryImage: "https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-05-05T12:00:00",
    place: "Downtown Chicago",
    organiser: "Downtown Chicago",
    price: "$40",
    ticketPrice: "$35",
    pulseFee: "$5",
    provider: "Typeform",
    duration: "3 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "chicago",
    categoryId: "experience",
  },
  {
    id: "chi-past-architecture-river",
    title: "Architecture River Cruise (Past)",
    slug: "past-architecture-river-chicago",
    shortDescription: "Chicago River architecture tour — completed.",
    longDescription: "Boat tour with commentary. Event ended.",
    primaryImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-01-20T14:00:00",
    place: "Chicago Riverwalk",
    organiser: "Chicago Cruises",
    price: "$42",
    ticketPrice: "$37",
    pulseFee: "$5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "chicago",
    categoryId: "experience",
  },
  {
    id: "chi-past-winter-market",
    title: "Winter Market Social (Past)",
    slug: "past-winter-market-chicago",
    shortDescription: "Holiday market meetup — thanks for joining.",
    longDescription: "Hot cocoa and vendors in the Loop. Past event.",
    primaryImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-12T16:00:00",
    place: "Daley Plaza",
    organiser: "Chicago Markets",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "chicago",
    categoryId: "create",
  },
  {
    id: "chi-sold-blues",
    title: "Blues Club Night",
    slug: "blues-club-night-chicago",
    shortDescription: "South Side blues — Pulse allocation sold out.",
    longDescription: "Live music and drinks. No Pulse spots left.",
    primaryImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-06-12T20:00:00",
    place: "South Side",
    organiser: "Blues Chicago",
    price: "$40",
    ticketPrice: "$35",
    pulseFee: "$5",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "chicago",
    categoryId: "experience",
    soldOut: true,
  },
  {
    id: "chi-sold-boat-party",
    title: "Lake Michigan Sunset Boat Party",
    slug: "lake-michigan-boat-party-chicago",
    shortDescription: "Yacht social — fully booked for Pulse.",
    longDescription: "Dancing on the water. Sold out.",
    primaryImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-07-30T18:30:00",
    place: "Navy Pier",
    organiser: "Lake Cruises",
    price: "$65",
    ticketPrice: "$60",
    pulseFee: "$5",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "chicago",
    categoryId: "move",
    soldOut: true,
  },
  // Berlin
  {
    id: "berlin-beer-1",
    title: "Beer Garden Meetup",
    slug: "beer-garden-meetup",
    shortDescription: "Classic Berlin experience: beers, pretzels, and great company in a leafy beer garden.",
    longDescription: "Join us at one of Berlin's beloved beer gardens. Relax under the chestnut trees with a cold beer and meet fellow Berliners and expats. Perfect for a lazy weekend afternoon.",
    primaryImage: "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-16T15:00:00",
    place: "Prater Garten, Prenzlauer Berg",
    organiser: "Prater Garten",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "berlin",
    categoryId: "create",
  },
  {
    id: "berlin-gallery-1",
    title: "East Side Gallery Walking Tour",
    slug: "east-side-gallery-walking-tour",
    shortDescription: "Explore the iconic murals and hear the stories behind the Berlin Wall art.",
    longDescription: "A guided walk along the East Side Gallery, the longest open-air gallery in the world. Learn the history and symbolism behind the murals, and connect with others who share an interest in art and history.",
    primaryImage: "https://images.unsplash.com/photo-1560930950-5cc20e80e392?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560930950-5cc20e80e392?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-04-28T10:00:00",
    place: "East Side Gallery, Friedrichshain",
    organiser: "East Side Gallery",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "berlin",
    categoryId: "experience",
  },
  {
    id: "berlin-past-christmas-market",
    title: "Winter Market Stroll (Past)",
    slug: "past-winter-market-berlin",
    shortDescription: "Glühwein and crafts in Mitte — event ended.",
    longDescription: "Festive stroll through the market. Thanks for coming.",
    primaryImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-01-10T17:00:00",
    place: "Alexanderplatz",
    organiser: "Berlin Markets",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "berlin",
    categoryId: "create",
  },
  {
    id: "berlin-past-run-club",
    title: "Run Club Tempelhof (Past)",
    slug: "past-run-club-tempelhof-berlin",
    shortDescription: "5K loop at the old airport — completed.",
    longDescription: "Casual pace group run. Event finished.",
    primaryImage: "https://images.unsplash.com/photo-1534190760961-74e8657d76fe?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1534190760961-74e8657d76fe?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-14T08:00:00",
    place: "Tempelhofer Feld",
    organiser: "Berlin Run Club",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "1.5 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "berlin",
    categoryId: "move",
  },
  {
    id: "berlin-sold-open-air",
    title: "Open-Air Electronic Night",
    slug: "open-air-electronic-berlin",
    shortDescription: "Warehouse district party — Pulse sold out.",
    longDescription: "Meet in chat before doors. No spots left.",
    primaryImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-06-25T22:00:00",
    place: "Friedrichshain",
    organiser: "Berlin Nights",
    price: "€45",
    ticketPrice: "€40",
    pulseFee: "€5",
    provider: "Fever",
    duration: "5 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "berlin",
    categoryId: "create",
    soldOut: true,
  },
  {
    id: "berlin-sold-museum",
    title: "Museum Sunday: Special Exhibit",
    slug: "museum-sunday-special-berlin",
    shortDescription: "Curator-led tour — fully booked.",
    longDescription: "Small group Pulse visit. Sold out.",
    primaryImage: "https://images.unsplash.com/photo-1566127444979-b3d2b64e9325?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566127444979-b3d2b64e9325?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-08-02T11:00:00",
    place: "Museum Island",
    organiser: "Berlin Museums",
    price: "€18",
    ticketPrice: "€13",
    pulseFee: "€5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "berlin",
    categoryId: "experience",
    soldOut: true,
  },
  // Madrid
  {
    id: "madrid-tapas-1",
    title: "Tapas Crawl",
    slug: "tapas-crawl",
    shortDescription: "Experience authentic Madrid tapas culture with a group of food enthusiasts.",
    longDescription: "We'll visit three classic tapas bars in La Latina, sampling the best of Spanish cuisine. Each stop includes a drink and a selection of tapas. A local guide will share stories and recommendations.",
    primaryImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-20T20:00:00",
    place: "La Latina, Madrid",
    organiser: "La Latina",
    price: "€35",
    ticketPrice: "€30",
    pulseFee: "€5",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "madrid",
    categoryId: "experience",
  },
  {
    id: "madrid-flamenco-1",
    title: "Flamenco Show & Dinner",
    slug: "flamenco-show-dinner",
    shortDescription: "An evening of passionate flamenco with a traditional Spanish dinner.",
    longDescription: "Immerse yourself in the soul of Spanish culture. Enjoy a three-course dinner followed by an intimate flamenco performance. Seating is limited for an authentic experience.",
    primaryImage: "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-05-30T21:00:00",
    place: "Tablao Flamenco, Las Letras",
    organiser: "Tablao Flamenco",
    price: "€55",
    ticketPrice: "€50",
    pulseFee: "€5",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "madrid",
    categoryId: "experience",
  },
  {
    id: "madrid-past-retiro-picnic",
    title: "Retiro Park Picnic (Past)",
    slug: "past-retiro-picnic-madrid",
    shortDescription: "Sunday picnic in the park — completed.",
    longDescription: "Blankets and snacks with new friends. Event ended.",
    primaryImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-01-26T12:00:00",
    place: "El Retiro",
    organiser: "Madrid Social",
    price: "Free",
    ticketPrice: "Free",
    pulseFee: "Free",
    provider: "Typeform",
    duration: "2 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "madrid",
    categoryId: "create",
  },
  {
    id: "madrid-past-art-walk",
    title: "Art Walk in Malasaña (Past)",
    slug: "past-art-walk-malasana-madrid",
    shortDescription: "Gallery hopping — thanks for joining.",
    longDescription: "Small groups visiting galleries. Past event.",
    primaryImage: "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-11T17:00:00",
    place: "Malasaña",
    organiser: "Madrid Art Walks",
    price: "€15",
    ticketPrice: "€10",
    pulseFee: "€5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "madrid",
    categoryId: "experience",
  },
  {
    id: "madrid-sold-pride-brunch",
    title: "Pride Brunch Weekend",
    slug: "pride-brunch-weekend-madrid",
    shortDescription: "Brunch and parade meetup — Pulse full.",
    longDescription: "Celebrate with your crew. No Pulse spots left.",
    primaryImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-07-05T11:00:00",
    place: "Chueca",
    organiser: "Madrid Social",
    price: "€35",
    ticketPrice: "€30",
    pulseFee: "€5",
    provider: "Fever",
    duration: "2 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "madrid",
    categoryId: "create",
    soldOut: true,
  },
  {
    id: "madrid-sold-rooftop",
    title: "Rooftop Pool Day",
    slug: "rooftop-pool-day-madrid",
    shortDescription: "Hotel pool + DJ — fully booked.",
    longDescription: "Sun and pool with Pulse. Sold out.",
    primaryImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-08-20T14:00:00",
    place: "Gran Vía",
    organiser: "Pulse x Hotel",
    price: "€55",
    ticketPrice: "€50",
    pulseFee: "€5",
    provider: "Fever",
    duration: "4 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "madrid",
    categoryId: "experience",
    soldOut: true,
  },
  // Lagos
  {
    id: "lagos-beach-1",
    title: "Lekki Beach Social",
    slug: "lekki-beach-social",
    shortDescription: "A relaxed beach day with volleyball, music, and great company.",
    longDescription: "Escape the city for a day at Lekki Beach. We'll set up a spot for volleyball, music, and mingling. Bring your swimsuit and sunscreen. Light snacks and drinks provided.",
    primaryImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-12T11:00:00",
    place: "Lekki Beach, Lagos",
    organiser: "Lekki Beach",
    price: "₦5,000",
    ticketPrice: "₦4,000",
    pulseFee: "₦1,000",
    provider: "Typeform",
    duration: "4 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "lagos",
    categoryId: "move",
  },
  {
    id: "lagos-rooftop-1",
    title: "Lagos Rooftop Sunset Party",
    slug: "lagos-rooftop-sunset-party",
    shortDescription: "Watch the sunset over Lagos from a stunning rooftop venue.",
    longDescription: "An exclusive rooftop gathering with panoramic views of the city and ocean. Live DJ, cocktails, and canapés. Dress code: smart casual. The perfect way to start your weekend.",
    primaryImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-05-14T18:00:00",
    place: "Sky Bar, Victoria Island",
    organiser: "Sky Bar",
    price: "₦15,000",
    ticketPrice: "₦14,000",
    pulseFee: "₦1,000",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "lagos",
    categoryId: "create",
  },
  {
    id: "lagos-past-food-festival",
    title: "Street Food Festival (Past)",
    slug: "past-street-food-festival-lagos",
    shortDescription: "Vendors and live music — event completed.",
    longDescription: "Taste of Lagos in one afternoon. Thanks everyone.",
    primaryImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-02-01T14:00:00",
    place: "Victoria Island",
    organiser: "Lagos Eats",
    price: "₦3,000",
    ticketPrice: "₦2,000",
    pulseFee: "₦1,000",
    provider: "Typeform",
    duration: "3 hours",
    bookingUrl: "https://typeform.com",
    citySlug: "lagos",
    categoryId: "experience",
  },
  {
    id: "lagos-past-art-fair",
    title: "Contemporary Art Fair (Past)",
    slug: "past-art-fair-lagos",
    shortDescription: "Gallery day in Ikoyi — already happened.",
    longDescription: "We explored local artists. Event ended.",
    primaryImage: "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517519574384-c400db42c117?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-03-16T10:00:00",
    place: "Ikoyi",
    organiser: "Lagos Art Fair",
    price: "₦8,000",
    ticketPrice: "₦7,000",
    pulseFee: "₦1,000",
    provider: "Fever",
    duration: "3 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "lagos",
    categoryId: "experience",
  },
  {
    id: "lagos-sold-afrobeats",
    title: "Afrobeats Live & Dance",
    slug: "afrobeats-live-dance-lagos",
    shortDescription: "Concert night — Pulse tickets sold out.",
    longDescription: "Meet in chat before doors. Fully booked.",
    primaryImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-06-18T21:00:00",
    place: "Eko Atlantic",
    organiser: "Lagos Live",
    price: "₦25,000",
    ticketPrice: "₦24,000",
    pulseFee: "₦1,000",
    provider: "Fever",
    duration: "4 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "lagos",
    categoryId: "create",
    soldOut: true,
  },
  {
    id: "lagos-sold-yacht",
    title: "Yacht Brunch & Swim",
    slug: "yacht-brunch-swim-lagos",
    shortDescription: "Saturday on the water — fully booked.",
    longDescription: "Brunch cruise with Pulse. No spots left.",
    primaryImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    ],
    dateTime: "2026-08-08T09:00:00",
    place: "Lagos Marina",
    organiser: "Lagos Yacht Club",
    price: "₦45,000",
    ticketPrice: "₦44,000",
    pulseFee: "₦1,000",
    provider: "Fever",
    duration: "5 hours",
    bookingUrl: "https://feverup.com",
    citySlug: "lagos",
    categoryId: "move",
    soldOut: true,
  },
];

export function getEventsByCity(citySlug: string): Event[] {
  const slug = normalizeSlug(citySlug);
  return EVENTS.filter((e) => normalizeSlug(e.citySlug) === slug).sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
}

export function getEventBySlug(citySlug: string, eventSlug: string): Event | undefined {
  const c = normalizeSlug(citySlug);
  const s = normalizeSlug(eventSlug);
  return EVENTS.find(
    (e) =>
      normalizeSlug(e.citySlug) === c &&
      normalizeSlug(e.slug) === s
  );
}

/**
 * Get upcoming events across all cities.
 *
 * Notes for dummy data:
 * - In production we should filter strictly to future dates.
 * - In local dummy mode, if everything is in the past (relative to the user's clock),
 *   we fall back to returning the soonest events anyway so pages don't render empty.
 */
export function getUpcomingEvents(limit = 10, now = new Date()): Event[] {
  const sorted = EVENTS.slice().sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  const future = sorted.filter((e) => new Date(e.dateTime).getTime() >= now.getTime());
  const base = future.length > 0 ? future : sorted;
  return base.slice(0, Math.max(0, limit));
}

/** Convenience helper for hero collages, tiles, etc. */
export function getFeaturedEventImages(limit = 10): string[] {
  const images: string[] = [];
  for (const e of getUpcomingEvents(50)) {
    images.push(e.primaryImage);
    for (const img of (e.images || []).slice(0, 3)) images.push(img);
    if (images.length >= limit * 3) break;
  }
  return Array.from(new Set(images.filter(Boolean))).slice(0, Math.max(0, limit));
}

export type CityFromApi = {
  en_name: string;
  es_name?: string;
  url2: string;
  en_country?: string;
  es_country?: string;
  image?: string;
  [key: string]: unknown;
};

export function getCitiesWithEvents(citiesFromApi: CityFromApi[]): Array<{
  citySlug: string;
  name: string;
  image?: string;
  eventCount: number;
}> {
  const citySlugSet = new Set(
    EVENTS.map((e) => normalizeSlug(e.citySlug))
  );
  const countByCity = EVENTS.reduce<Record<string, number>>((acc, e) => {
    const s = normalizeSlug(e.citySlug);
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  return citiesFromApi
    .filter((c) => {
      const slug = normalizeSlug(c.url2);
      return citySlugSet.has(slug);
    })
    .map((c) => {
      const slug = normalizeSlug(c.url2);
      const name = c.en_name || c.es_name || slug;
      return {
        citySlug: slug,
        name,
        image: c.image,
        eventCount: countByCity[slug] ?? 0,
      };
    })
    .filter((c) => c.eventCount > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Group events by week (start of week, Sunday). */
export function groupEventsByWeek(events: Event[]): Array<{ weekLabel: string; events: Event[] }> {
  const byWeek = new Map<string, Event[]>();
  for (const e of events) {
    const d = new Date(e.dateTime);
    const start = new Date(d);
    start.setDate(d.getDate() - d.getDay());
    start.setHours(0, 0, 0, 0);
    const key = start.toISOString().slice(0, 10);
    const arr = byWeek.get(key) ?? [];
    arr.push(e);
    byWeek.set(key, arr);
  }
  const entries = Array.from(byWeek.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  return entries.map(([key, evs]) => {
    const start = new Date(key);
    const weekLabel = `Week of ${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
    return { weekLabel, events: evs.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()) };
  });
}
