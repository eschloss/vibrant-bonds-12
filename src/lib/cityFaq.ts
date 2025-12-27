export type CityFaqContext = {
  city: string;
  identity?: string | null;
  affinity?: string | null;
  language?: "en" | "es";
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
const FAQ_TEMPLATES_EN: CityFaqTemplate[] = [
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

// Spanish translations of the same 5 FAQs (copy is a translation; still only interpolates {{descriptor}} and {{city}}).
const FAQ_TEMPLATES_ES: CityFaqTemplate[] = [
  {
    question: "¿Cómo puedo conocer nuevos amigues {{descriptor}} en {{city}} con Pulse?",
    answer:
      "Pulse te ayuda a conocer nuevos amigues {{descriptor}} en {{city}} al emparejarte con un grupo pequeño de personas que viven en {{city}} y que están buscando activamente construir amistades reales. En lugar de chatear sin parar, Pulse se enfoca en juntar a la gente para que se conozca en la vida real a través de planes y experiencias compartidas en {{city}}."
  },
  {
    question: "¿Es Pulse la mejor app para hacer amigues {{descriptor}} en {{city}}?",
    answer:
      "Pulse está diseñado específicamente para crear amistades {{descriptor}} reales en {{city}}, no para citas ni para “scrollear” socialmente sin intención. A diferencia de las apps sociales tradicionales, Pulse forma pequeños grupos locales en {{city}} y les guía para que se conozcan en persona, lo que lo convierte en una de las maneras más efectivas de construir amistades significativas en {{city}}."
  },
  {
    question: "¿Cuáles son las mejores formas de hacer amigues {{descriptor}} en {{city}}?",
    answer:
      "Las mejores formas de hacer amigues {{descriptor}} en {{city}} son conocer a personas que viven cerca, compartir actividades y verse con regularidad. Pulse lo hace más fácil en {{city}} al emparejar a personas que quieren el mismo tipo de conexión y al fomentar quedadas en el mundo real, en lugar de quedarse online."
  },
  {
    question: "¿Cómo funciona Pulse para conocer amigues {{descriptor}} en {{city}}?",
    answer:
      "Cuando te registras en Pulse en {{city}}, completas un Vibe Test corto y entras en un pool local de matching. Cuando se han unido suficientes personas en {{city}}, Pulse forma pequeños grupos de amigues {{descriptor}}, abre un chat grupal y ayuda al grupo a planear una quedada en persona en {{city}}."
  },
  {
    question: "¿Cómo me registro para conocer amigues {{descriptor}} en {{city}} con Pulse?",
    answer:
      "Para conocer amigues {{descriptor}} en {{city}} con Pulse, elige {{city}} durante el registro, completa el Vibe Test y entra en el pool local de matching. Pulse te avisará cuando tu grupo en {{city}} esté listo, y podrás empezar a chatear y planear tu primera quedada."
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
  const language = ctx.language === "es" ? "es" : "en";
  const templates = language === "es" ? FAQ_TEMPLATES_ES : FAQ_TEMPLATES_EN;
  return templates.map((t) => ({
    question: inject(t.question, descriptor, city),
    answer: inject(t.answer, descriptor, city),
    descriptor,
    city
  }));
}


