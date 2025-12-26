export type CityFaqContext = {
  city: string;
  identity?: string | null;
  affinity?: string | null;
};

/**
 * Returns the descriptor phrase used inside the city FAQ templates.
 *
 * Examples:
 * - "" (no identity, no affinity)
 * - "hiker"
 * - "queer"
 * - "queer hiker"
 */
export function getDescriptor(identity?: string | null, affinity?: string | null): string {
  const id = typeof identity === "string" ? identity.trim() : "";
  const aff = typeof affinity === "string" ? affinity.trim() : "";
  return [id, aff].filter(Boolean).join(" ");
}

type CityFaqTemplate = {
  question: string;
  answer: string;
};

// IMPORTANT: Do not change this copy; only interpolate {{descriptor}} and {{city}}.
const FAQ_TEMPLATES: CityFaqTemplate[] = [
  {
    question: "How can I meet new {{descriptor}} friends in {{city}} with Pulse?",
    answer:
      "Pulse helps you meet new {{descriptor}} friends in {{city}} by matching you with a small group of people who live in {{city}} and are actively looking to build real friendships. Instead of endless chatting, Pulse focuses on bringing people together to meet in real life through shared plans and experiences in {{city}}."
  },
  {
    question: "Is Pulse the best app to make {{descriptor}} friends in {{city}}?",
    answer:
      "Pulse is designed specifically for making real {{descriptor}} friendships in {{city}}, not for dating or casual social browsing. Unlike traditional social apps, Pulse forms small, local groups in {{city}} and guides them toward meeting in person, which makes it one of the most effective ways to build meaningful friendships in {{city}}."
  },
  {
    question: "What are the best ways to make {{descriptor}} friends in {{city}}?",
    answer:
      "The best ways to make {{descriptor}} friends in {{city}} are by meeting people who live nearby, sharing activities, and seeing each other regularly. Pulse makes this easier in {{city}} by matching people who want the same type of connection and encouraging real-world meetups instead of staying online."
  },
  {
    question: "How does Pulse work for meeting {{descriptor}} friends in {{city}}?",
    answer:
      "When you sign up for Pulse in {{city}}, you complete a short Vibe Test and join a local matching pool. Once enough people in {{city}} have joined, Pulse forms small groups of {{descriptor}} friends, opens a group chat, and helps the group plan a real-life meetup in {{city}}."
  },
  {
    question: "How do I sign up to meet {{descriptor}} friends in {{city}} with Pulse?",
    answer:
      "To meet {{descriptor}} friends in {{city}} with Pulse, choose {{city}} during signup, complete the Vibe Test, and join the local matching pool. Pulse will notify you when your group in {{city}} is ready, and you can start chatting and planning your first meetup."
  }
];

function inject(text: string, descriptor: string, city: string): string {
  // Keep copy identical except placeholder substitution and whitespace normalization.
  const replaced = text
    .replaceAll("{{descriptor}}", descriptor)
    .replaceAll("{{city}}", city);

  // Avoid awkward double spaces when descriptor is empty (also helps JSON-LD output).
  return replaced
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([?.!,])/g, "$1")
    .trim();
}

export function buildCityFaqs(ctx: CityFaqContext): Array<{
  question: string;
  answer: string;
  descriptor: string;
  city: string;
}> {
  const city = String(ctx.city || "").trim();
  const descriptor = getDescriptor(ctx.identity, ctx.affinity);
  return FAQ_TEMPLATES.map((t) => ({
    question: inject(t.question, descriptor, city),
    answer: inject(t.answer, descriptor, city),
    descriptor,
    city
  }));
}


