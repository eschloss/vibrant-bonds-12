import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Calendar, CheckCircle2, Clock, Copy, Mail, MapPin, Ticket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { Seo } from "@/hooks/useSeo";
import { useTranslation } from "@/hooks/useTranslation";
import { getEventBySlug, getEventPriceBreakdown, getEventProviderDetails } from "@/data/events";
import { Card, CardContent } from "@/components/ui/card";
import { trackMetaPixelEvent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import EventConfirmationNextSteps from "@/components/EventConfirmationNextSteps";

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} · ${time}`;
}

function getOrCreateConfirmationNumber(key: string): string {
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const uuidLike =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
    const compact = uuidLike.replace(/-/g, "").toUpperCase();
    const confirmation = `PC-${compact.slice(0, 10)}`;
    sessionStorage.setItem(key, confirmation);
    return confirmation;
  } catch {
    return "PC-PENDING";
  }
}

const EventConfirmation = () => {
  const { cityName, eventSlug } = useParams<{ cityName: string; eventSlug: string }>();
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();

  const event = cityName && eventSlug ? getEventBySlug(cityName, eventSlug) : undefined;
  if (!event) return <NotFound />;

  const providerDetails = getEventProviderDetails(event);
  const priceBreakdown = getEventPriceBreakdown(event);
  const confirmationPath = `/events/${cityName}/${event.slug}/confirmation`;

  const confirmationNumber = React.useMemo(() => {
    return getOrCreateConfirmationNumber(`event_confirmation_number:${event.id}`);
  }, [event.id]);

  const VIBE_CHECK_URL = "https://form.typeform.com/to/REPLACE_ME";
  const vibeCheckUrlWithParams = React.useMemo(() => {
    try {
      const url = new URL(VIBE_CHECK_URL);
      url.searchParams.set("city", cityName || "");
      url.searchParams.set("event_slug", event.slug);
      url.searchParams.set("event_title", event.title);
      url.searchParams.set("confirmation_number", confirmationNumber);
      return url.toString();
    } catch {
      return VIBE_CHECK_URL;
    }
  }, [VIBE_CHECK_URL, cityName, event.slug, event.title, confirmationNumber]);

  const seoProps = {
    title: {
      en: t(
        "event_confirmation.seo.title",
        `Confirmed: ${event.title} | Pulse`
      ),
      es: t(
        "event_confirmation.seo.title",
        `Confirmado: ${event.title} | Pulse`
      ),
    },
    description: {
      en: t(
        "event_confirmation.seo.desc",
        `You're confirmed for ${event.title}. Complete your vibe check for the best group match.`
      ),
      es: t(
        "event_confirmation.seo.desc",
        `Ya estás confirmado/a para ${event.title}. Completa tu vibe check para el mejor match de grupo.`
      ),
    },
    pathname: confirmationPath,
    image: event.primaryImage,
    keywords: ["event", "confirmation", "tickets", "Pulse", event.title, cityName, event.organiser, providerDetails.name].filter(Boolean),
    type: "website" as const,
  };

  React.useEffect(() => {
    const payload = {
      city: cityName,
      event_slug: event.slug,
      event_title: event.title,
      provider: providerDetails.name,
      confirmation_number: confirmationNumber,
      path: location.pathname + location.search,
    };
    trackMetaPixelEvent("event_signup_confirmation_view", payload, { custom: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleVibeCheckClick = () => {
    trackMetaPixelEvent(
      "event_vibe_check_cta_click",
      {
        city: cityName,
        event_slug: event.slug,
        event_title: event.title,
        confirmation_number: confirmationNumber,
        destination: vibeCheckUrlWithParams,
        path: location.pathname + location.search,
      },
      { custom: true }
    );
    window.location.href = vibeCheckUrlWithParams;
  };

  const handleCopyConfirmation = async () => {
    try {
      await navigator.clipboard.writeText(confirmationNumber);
      toast({
        title: t("event_confirmation.copy.success_title", "Copied"),
        description: t("event_confirmation.copy.success_desc", "Confirmation number copied to clipboard."),
      });
      trackMetaPixelEvent(
        "event_confirmation_copy_confirmation_number",
        {
          city: cityName,
          event_slug: event.slug,
          event_title: event.title,
          confirmation_number: confirmationNumber,
          path: location.pathname + location.search,
        },
        { custom: true }
      );
    } catch {
      toast({
        title: t("event_confirmation.copy.error_title", "Couldn’t copy"),
        description: t("event_confirmation.copy.error_desc", "Please copy it manually."),
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Seo {...seoProps} />
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />

        {/* Header */}
        <section className="relative pt-32 pb-6 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600/25 blur-3xl" />
            <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-pink-600/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.45)_35%,rgba(0,0,0,0)_70%)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm mb-4">
                <CheckCircle2 className="w-7 h-7 text-[#38D1BF]" />
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                {t("event_confirmation.header.title", "Order successful")}
              </h1>
              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                {t(
                  "event_confirmation.header.subtitle",
                  "Thanks — your ticket is on the way. Next step: complete your vibe check so we can match you with the right people."
                )}
              </p>
            </div>
          </div>
        </section>

        <main className="px-4 pt-6 pb-16">
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: receipt */}
              <Card className="lg:col-span-8 bg-gray-800/35 backdrop-blur-lg border-white/10">
                <CardContent className="p-6">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-purple-600/15 blur-3xl" />
                      <div className="absolute -bottom-20 right-0 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl" />
                    </div>

                    <div className="relative flex items-start justify-between gap-4 flex-col md:flex-row">
                      <div className="flex items-start gap-4 min-w-0">
                        <img
                          src={event.primaryImage}
                          alt={event.title}
                          className="w-20 h-20 rounded-xl object-cover border border-white/10 bg-black/20 shrink-0"
                          loading="eager"
                          decoding="async"
                        />
                        <div className="min-w-0">
                          <div className="text-xs uppercase tracking-wider text-white/60">
                            {t("event_confirmation.receipt.event_label", "Event")}
                          </div>
                          <div className="text-lg md:text-xl font-bold text-white leading-snug">
                            {event.title}
                          </div>
                          <div className="mt-2 space-y-2 text-sm text-white/75">
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2">
                              <div className="flex items-start gap-2 min-w-0">
                                <Calendar size={16} className="text-pulse-blue shrink-0 mt-0.5" />
                                <span className="leading-snug min-w-0">
                                  {formatDateTime(event.dateTime)}
                                </span>
                              </div>
                              <div className="flex items-start gap-2 min-w-0">
                                <MapPin size={16} className="text-[#38D1BF] shrink-0 mt-0.5" />
                                <span className="leading-snug min-w-0">
                                  {event.place}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2">
                              <div className="flex items-start gap-2 min-w-0">
                                <Clock size={16} className="text-amber-300 shrink-0 mt-0.5" />
                                <span className="leading-snug min-w-0">
                                  {event.duration}
                                </span>
                              </div>
                              <div className="flex items-start gap-2 min-w-0">
                                <Ticket size={16} className="text-purple-300 shrink-0 mt-0.5" />
                                <span className="leading-snug min-w-0">
                                  {providerDetails.name} <span className="text-white/50">•</span> {event.organiser}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-auto md:text-right">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs text-white/75">
                          <CheckCircle2 size={14} className="text-[#38D1BF]" />
                          {t("event_confirmation.confirmation.status", "Payment confirmed")}
                        </div>
                        <div className="mt-2 text-xs uppercase tracking-wider text-white/60">
                          {t("event_confirmation.receipt.confirmation_number", "Confirmation #")}
                        </div>
                        <div className="mt-1 inline-flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/25 px-3 py-2 shadow-sm shadow-black/20">
                          <span className="font-mono text-xs sm:text-sm text-white/90 whitespace-nowrap tracking-wide">
                            {confirmationNumber}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyConfirmation}
                            className="text-white/70 hover:text-white transition-colors"
                            aria-label={t("event_confirmation.confirmation.copy", "Copy")}
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="text-sm font-semibold text-white">
                      {t("event_confirmation.receipt.title", "Receipt")}
                    </div>

                    <div className="mt-3 space-y-2 text-sm text-white/80">
                      {priceBreakdown ? (
                        <>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-white/70">{t("event_confirmation.receipt.ticket", "Ticket")}</span>
                            <span>{priceBreakdown.ticketPrice}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-white/70">{t("event_confirmation.receipt.pulse_fee", "Pulse fee")}</span>
                            <span>{priceBreakdown.pulseFee}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 pt-2 mt-2 border-t border-white/10">
                            <span className="font-semibold text-white">{t("event_confirmation.receipt.total", "Total")}</span>
                            <span className="font-semibold text-white">{priceBreakdown.totalPrice}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-semibold text-white">{t("event_confirmation.receipt.total", "Total")}</span>
                          <span className="font-semibold text-white">{event.price}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="text-sm font-semibold text-white">
                      {t("event_confirmation.next_steps.title", "Next steps")}
                    </div>
                    <div className="mt-3 text-sm text-white/70">
                      {t(
                        "event_confirmation.next_steps.moved_note",
                        "See the full next-steps checklist below."
                      )}
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row gap-3">
                      <Button onClick={handleVibeCheckClick} className="w-full sm:w-auto">
                        {t("event_confirmation.vibe_check.cta", "Complete vibe check")}
                      </Button>
                      <Link
                        to={`/events/${cityName}/${event.slug}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition-colors"
                      >
                        {t("event_confirmation.back_to_event", "Back to event details")}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right: action cards */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <Card className="bg-gray-800/35 backdrop-blur-lg border-white/10">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-white">
                      {t("event_confirmation.vibe_check.title", "Complete vibe check")}
                    </div>
                    <p className="text-sm text-white/70 mt-2">
                      {t(
                        "event_confirmation.vibe_check.subtitle",
                        "This helps us match you with the right people for this event."
                      )}
                    </p>
                    <Button className="w-full mt-4" onClick={handleVibeCheckClick}>
                      {t("event_confirmation.vibe_check.cta", "Complete vibe check")}
                    </Button>
                    <p className="text-[13px] text-white/55 mt-3">
                      {t("event_confirmation.vibe_check.note", "Takes ~2 minutes.")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/35 backdrop-blur-lg border-white/10">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-white">
                      {t("event_confirmation.email.title", "Check your email")}
                    </div>
                    <p className="text-sm text-white/70 mt-2">
                      {t(
                        "event_confirmation.email.subtitle",
                        "Ticket sent — and we’ll email you again when your group chat is ready."
                      )}
                    </p>
                    <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70 flex items-start gap-2">
                      <Mail size={16} className="text-[#38D1BF] shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        {t(
                          "event_confirmation.email.note",
                          "When the chat is ready, you’ll get a link and instructions. Then you’ll download Pulse and start chatting with your group."
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8">
              <EventConfirmationNextSteps onPrimaryCta={handleVibeCheckClick} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EventConfirmation;

