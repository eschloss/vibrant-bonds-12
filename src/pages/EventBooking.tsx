import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { Seo } from "@/hooks/useSeo";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPrefetchJsonPromise } from "@/lib/apiPrefetchBridge";
import { buildEventContext, buildGetKikiUrl, type GetKikiEventResponse } from "@/lib/eventApi";
import { useChatContext } from "@/contexts/ChatContext";

const EventBooking = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { pathname } = useLocation();
  const { setChatContext } = useChatContext();
  const [eventData, setEventData] = React.useState<GetKikiEventResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    if (!eventSlug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const url = buildGetKikiUrl(eventSlug);
    let cancelled = false;

    const run = async () => {
      const prefetchP = getPrefetchJsonPromise(url);
      if (prefetchP) {
        try {
          const data = (await prefetchP) as GetKikiEventResponse;
          if (cancelled) return;
          setEventData(data);
          setLoading(false);
          return;
        } catch {
          /* fall through */
        }
      }
      if (cancelled) return;

      try {
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { accept: "application/json" },
        });
        if (cancelled) return;
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const json = (await res.json()) as GetKikiEventResponse;
        if (cancelled) return;
        setEventData(json);
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError" && !cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [eventSlug]);

  React.useEffect(() => {
    if (!eventData || notFound) return;
    setChatContext(buildEventContext(eventData, "en-US", pathname), eventData.title);
    return () => setChatContext(null);
  }, [eventData, notFound, pathname, setChatContext]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen dark">
        <PageLoadingOverlay show={true} />
        <Navbar />
        <main className="flex-grow" />
        <Footer />
      </div>
    );
  }

  if (notFound || !eventData) return <NotFound />;

  const data = eventData;
  const confirmationHref = `/events/${data.slug}/confirmation`;

  return (
    <>
      <Seo
        title={{ en: `Book: ${data.title} | Pulse`, es: `Reservar: ${data.title} | Pulse` }}
        description={{ en: data.short_description, es: data.short_description }}
        pathname={`/events/${data.slug}/booking`}
        image={data.primary_image}
        type="website"
      />
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="px-4 pt-32 pb-16">
          <div className="w-full max-w-3xl mx-auto">
            <Card className="bg-gray-800/35 backdrop-blur-lg border-white/10">
              <CardContent className="p-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                  Booking
                </h1>
                <p className="mt-2 text-white/70">
                  Booking for this event is handled inside the Pulse app. Continue to the confirmation step.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="w-full sm:w-auto">
                    <Link to={confirmationHref}>Continue</Link>
                  </Button>
                  <Link
                    to={`/events/${data.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition-colors"
                  >
                    Back to event details
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EventBooking;
