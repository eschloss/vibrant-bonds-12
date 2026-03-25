/** Appended to organizer/API event blurbs so meta always reflects Pulse’s friend-group value prop. */
const PULSE_EVENT_VALUE_LINE_EN =
  "Pulse matches you with other solo attendees in a small group chat so you can meet friends before you go.";

const PULSE_EVENT_VALUE_LINE_ES =
  "Pulse te empareja con otras personas que van solas en un chat grupal pequeño para que conozcas gente antes del evento.";

/** Booking step: same Pulse line, with a short lead-in for the /booking route. */
const BOOKING_LEAD_EN = "Complete booking in the Pulse app.";
const BOOKING_LEAD_ES = "Completa la reserva en la app Pulse.";

export function buildEventSeoDescriptions(
  shortDescription: string | undefined | null,
  options?: { variant?: "detail" | "booking" }
): { en: string; es: string } {
  const base = (shortDescription ?? "").trim();
  const variant = options?.variant ?? "detail";

  if (variant === "booking") {
    return {
      en: base
        ? `${base} ${BOOKING_LEAD_EN} ${PULSE_EVENT_VALUE_LINE_EN}`
        : `${BOOKING_LEAD_EN} ${PULSE_EVENT_VALUE_LINE_EN}`,
      es: base
        ? `${base} ${BOOKING_LEAD_ES} ${PULSE_EVENT_VALUE_LINE_ES}`
        : `${BOOKING_LEAD_ES} ${PULSE_EVENT_VALUE_LINE_ES}`,
    };
  }

  return {
    en: base ? `${base} ${PULSE_EVENT_VALUE_LINE_EN}` : PULSE_EVENT_VALUE_LINE_EN,
    es: base ? `${base} ${PULSE_EVENT_VALUE_LINE_ES}` : PULSE_EVENT_VALUE_LINE_ES,
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
