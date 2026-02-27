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
    dateTime: "2025-03-08T19:00:00",
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
    dateTime: "2025-03-12T19:30:00",
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
    dateTime: "2025-03-15T18:00:00",
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
    dateTime: "2025-03-09T14:00:00",
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
    dateTime: "2025-03-16T10:00:00",
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
    dateTime: "2025-03-07T11:00:00",
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
    dateTime: "2025-03-14T14:00:00",
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
    dateTime: "2025-03-10T06:30:00",
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
    dateTime: "2025-03-16T15:00:00",
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
    dateTime: "2025-03-11T19:00:00",
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
    dateTime: "2025-03-15T12:00:00",
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
    dateTime: "2025-03-09T15:00:00",
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
    dateTime: "2025-03-13T10:00:00",
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
    dateTime: "2025-03-08T20:00:00",
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
    dateTime: "2025-03-14T21:00:00",
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
    dateTime: "2025-03-09T11:00:00",
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
    dateTime: "2025-03-15T18:00:00",
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
