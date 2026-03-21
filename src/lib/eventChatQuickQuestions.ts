import {
  getProviderName,
  parseEventLocalDateTime,
  type GetKikiEventResponse,
} from "@/lib/eventApi";

export type EventFaqPlaceholderParams = {
  eventTitle: string;
  city: string;
  venue: string;
  provider: string;
  dateTimeLabel: string;
};

function replacePlaceholders(
  text: string | undefined,
  params: EventFaqPlaceholderParams
): string {
  const str = text ?? "";
  return str
    .replace(/{eventTitle}/g, params.eventTitle)
    .replace(/{city}/g, params.city)
    .replace(/{venue}/g, params.venue)
    .replace(/{provider}/g, params.provider)
    .replace(/{dateTimeLabel}/g, params.dateTimeLabel);
}

/** Same first four FAQ prompts as EventFaqSection — used as WhatsApp chat quick questions on event flows. */
const FAQ_Q_KEYS = [
  "event_detail.faq.q1",
  "event_detail.faq.q2",
  "event_detail.faq.q3",
  "event_detail.faq.q4",
] as const;

export function buildEventChatQuickQuestions(
  t: (key: string, defaultText?: string) => string,
  params: EventFaqPlaceholderParams
): string[] {
  return FAQ_Q_KEYS.map((key) => replacePlaceholders(t(key, ""), params));
}

/** Date/time line aligned with EventDetail / EventConfirmation FAQ placeholders. */
function formatEventDateTimeLabelForFaq(
  data: GetKikiEventResponse,
  locale: string,
  startsBetweenLabel: string
): string {
  const start = parseEventLocalDateTime(data.datetime_local);
  const date = start.toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const startTime = start.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
  });
  const latest = (data.datetime_local_latest || "").trim();
  if (!latest) return `${date} · ${startTime}`;
  const latestTime = parseEventLocalDateTime(latest).toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} · ${startsBetweenLabel} ${startTime}–${latestTime}`;
}

export function buildEventFaqParamsFromEventData(
  data: GetKikiEventResponse,
  locale: string,
  startsBetweenLabel: string
): EventFaqPlaceholderParams {
  return {
    eventTitle: data.title,
    city: data.city_label || "",
    venue: data.place,
    provider: getProviderName(data.provider),
    dateTimeLabel: formatEventDateTimeLabelForFaq(data, locale, startsBetweenLabel),
  };
}
