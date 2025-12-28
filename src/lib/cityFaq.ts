export type CityFaqContext = {
  city: string;
  neighborhood?: string | null;
  cityName?: string | null;
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

// IMPORTANT: Do not change this copy; only interpolate {{descriptor}}, {{neighborhood}}, and {{cityName}}.
const FAQ_TEMPLATES_EN: CityFaqTemplate[] = [
  {
    question: "How can I meet new {{descriptor}} friends in {{neighborhood}} with Pulse?",
    answer:
      "Pulse helps you meet new {{descriptor}} friends in {{neighborhood}} by matching you into a small group of people who also live around {{neighborhood}} and genuinely want real friendships. Instead of endless chatting or awkward cold intros, Pulse nudges the group toward simple, real-life plans and shared experiences in {{neighborhood}}. It's a friendly way to build a social circle in {{cityName}} without having to start from zero every weekend."
  },
  {
    question: "Is Pulse the best app to make {{descriptor}} friends in {{neighborhood}}?",
    answer:
      "If you want real friendships in {{neighborhood}} and you're over swipe culture, Pulse is made for exactly that. Pulse is for friendship, not dating, and there is no swiping through profiles. The goal is simple: help you make {{descriptor}} friends in {{neighborhood}} by creating a small local group and getting you to an in-person meetup in {{neighborhood}}, not stuck in \"we should hang out sometime\" mode."
  },
  {
    question: "What are the best ways to make {{descriptor}} friends in {{neighborhood}}?",
    answer:
      "The best ways to make {{descriptor}} friends in {{neighborhood}} are meeting people nearby, doing activities you actually enjoy, and seeing each other regularly. Pulse makes that easier by matching you with people in {{neighborhood}} who share your vibe, then helping your group pick a low-pressure first hangout. You spend less time coordinating across {{cityName}} and more time actually building friendships in {{neighborhood}}."
  },
  {
    question: "How does Pulse work for meeting {{descriptor}} friends in {{neighborhood}}?",
    answer:
      "When you sign up for Pulse in {{neighborhood}}, you take a quick Vibe Test and join the local matching pool for {{neighborhood}}. There's no swiping, no guessing, no awkward DM roulette. Once enough compatible people in {{neighborhood}} have joined, Pulse forms a small group, opens a group chat, and helps you plan a real-life meetup in {{neighborhood}} so things move from online to in-person."
  },
  {
    question: "How do I sign up to meet {{descriptor}} friends in {{neighborhood}} with Pulse?",
    answer:
      "To meet {{descriptor}} friends in {{neighborhood}} with Pulse, choose {{neighborhood}} during signup, complete the Vibe Test, and join the local pool. After that, Pulse does the matching and lets you know when your {{neighborhood}} group is ready. Then you can start chatting, pick something easy, and meet up in {{neighborhood}} to kick off real friendships in {{cityName}}."
  }
];

// Spanish translations of the same 5 FAQs (copy is a translation; still only interpolates {{descriptor}}, {{neighborhood}}, and {{cityName}}).
const FAQ_TEMPLATES_ES: CityFaqTemplate[] = [
  {
    question: "¿Cómo puedo conocer nuevos amigues {{descriptor}} en {{neighborhood}} con Pulse?",
    answer:
      "Pulse te ayuda a conocer nuevos amigues {{descriptor}} en {{neighborhood}} al emparejarte en un grupo pequeño de personas que también viven cerca de {{neighborhood}} y realmente quieren amistades reales. En lugar de chatear sin parar o presentaciones incómodas, Pulse empuja al grupo hacia planes simples y experiencias compartidas en la vida real en {{neighborhood}}. Es una forma amigable de construir un círculo social en {{cityName}} sin tener que empezar desde cero cada fin de semana."
  },
  {
    question: "¿Es Pulse la mejor app para hacer amigues {{descriptor}} en {{neighborhood}}?",
    answer:
      "Si quieres amistades reales en {{neighborhood}} y estás harto de la cultura del swipe, Pulse está hecho exactamente para eso. Pulse es para amistad, no para citas, y no hay swipe a través de perfiles. El objetivo es simple: ayudarte a hacer amigues {{descriptor}} en {{neighborhood}} creando un grupo local pequeño y llevándote a una quedada en persona en {{neighborhood}}, no atascado en modo \"deberíamos quedar algún día\"."
  },
  {
    question: "¿Cuáles son las mejores formas de hacer amigues {{descriptor}} en {{neighborhood}}?",
    answer:
      "Las mejores formas de hacer amigues {{descriptor}} en {{neighborhood}} son conocer personas cerca, hacer actividades que realmente disfrutas, y verse regularmente. Pulse lo hace más fácil emparejándote con personas en {{neighborhood}} que comparten tu onda, luego ayudando a tu grupo a elegir una primera quedada sin presión. Pasas menos tiempo coordinando por {{cityName}} y más tiempo construyendo amistades en {{neighborhood}}."
  },
  {
    question: "¿Cómo funciona Pulse para conocer amigues {{descriptor}} en {{neighborhood}}?",
    answer:
      "Cuando te registras en Pulse en {{neighborhood}}, haces un Vibe Test rápido y te unes al pool local de matching para {{neighborhood}}. No hay swipe, no hay adivinanzas, no hay ruleta de DMs incómodas. Una vez que suficientes personas compatibles en {{neighborhood}} se hayan unido, Pulse forma un grupo pequeño, abre un chat grupal, y te ayuda a planear una quedada en la vida real en {{neighborhood}} para que las cosas pasen de online a en persona."
  },
  {
    question: "¿Cómo me registro para conocer amigues {{descriptor}} en {{neighborhood}} con Pulse?",
    answer:
      "Para conocer amigues {{descriptor}} en {{neighborhood}} con Pulse, elige {{neighborhood}} durante el registro, completa el Vibe Test, y únete al pool local. Después de eso, Pulse hace el matching y te avisa cuando tu grupo de {{neighborhood}} esté listo. Luego puedes empezar a chatear, elegir algo fácil, y quedar en {{neighborhood}} para iniciar amistades reales en {{cityName}}."
  }
];

function inject(text: string, descriptor: string, neighborhood: string, cityName: string): string {
  // Keep copy identical except placeholder substitution and whitespace normalization.
  const replaced = text
    .replace(/\{\{descriptor\}\}/g, descriptor)
    .replace(/\{\{neighborhood\}\}/g, neighborhood)
    .replace(/\{\{cityName\}\}/g, cityName);

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
  
  // For neighborhood pages: use neighborhood name, otherwise use city name
  // For city name context: use neighborhoodsSectionCityName if provided, otherwise use city name
  const neighborhood = ctx.neighborhood ? String(ctx.neighborhood).trim() : city;
  const cityName = ctx.cityName ? String(ctx.cityName).trim() : city;
  
  return templates.map((t) => ({
    question: inject(t.question, descriptor, neighborhood, cityName),
    answer: inject(t.answer, descriptor, neighborhood, cityName),
    descriptor,
    city
  }));
}


