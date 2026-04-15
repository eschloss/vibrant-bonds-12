/** Appended to organizer/API event blurbs so meta always reflects Pulse’s friend-group value prop. */
const PULSE_EVENT_VALUE_LINE_EN_MICRO =
  "Pulse matches you with other solo attendees in a small group chat so you can meet friends before you go.";

const PULSE_EVENT_VALUE_LINE_ES_MICRO =
  "Pulse te empareja con otras personas que van solas en un chat grupal pequeño para que conozcas gente antes del evento.";

const PULSE_EVENT_VALUE_LINE_EN_SINGLE_GROUP =
  "Pulse connects you with other solo attendees going to the same event, then puts everyone in one group chat so you can meet before you go.";

const PULSE_EVENT_VALUE_LINE_ES_SINGLE_GROUP =
  "Pulse te conecta con otras personas que van solas al mismo evento y luego os reúne en un único chat grupal para que os conozcáis antes de llegar.";

export type EventSeoGroupMode = "micro" | "single_group";

/** Booking step: same Pulse line, with a short lead-in for the /booking route. */
const BOOKING_LEAD_EN = "Complete booking in the Pulse app.";
const BOOKING_LEAD_ES = "Completa la reserva en la app Pulse.";

export function buildEventSeoDescriptions(
  shortDescription: string | undefined | null,
  options?: { variant?: "detail" | "booking"; groupMode?: EventSeoGroupMode }
): { en: string; es: string } {
  const base = (shortDescription ?? "").trim();
  const variant = options?.variant ?? "detail";
  const groupMode: EventSeoGroupMode = options?.groupMode ?? "micro";
  const pulseEn = groupMode === "micro" ? PULSE_EVENT_VALUE_LINE_EN_MICRO : PULSE_EVENT_VALUE_LINE_EN_SINGLE_GROUP;
  const pulseEs = groupMode === "micro" ? PULSE_EVENT_VALUE_LINE_ES_MICRO : PULSE_EVENT_VALUE_LINE_ES_SINGLE_GROUP;

  if (variant === "booking") {
    return {
      en: base
        ? `${base} ${BOOKING_LEAD_EN} ${pulseEn}`
        : `${BOOKING_LEAD_EN} ${pulseEn}`,
      es: base
        ? `${base} ${BOOKING_LEAD_ES} ${pulseEs}`
        : `${BOOKING_LEAD_ES} ${pulseEs}`,
    };
  }

  return {
    en: base ? `${base} ${pulseEn}` : pulseEn,
    es: base ? `${base} ${pulseEs}` : pulseEs,
  };
}

export function buildEventSeoKeywords(parts: {
  title?: string;
  cityLabel?: string;
  providerName?: string;
}): string[] {
  return [
    parts.title,
    parts.cityLabel,
    "event",
    "activities",
    "meet friends",
    "Pulse events",
    parts.providerName,
  ].filter(Boolean) as string[];
}
