import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { getEventBySlug } from "@/data/events";

const EventBooking = () => {
  const { cityName, eventSlug } = useParams<{ cityName: string; eventSlug: string }>();
  const navigate = useNavigate();
  const [iframeHeight, setIframeHeight] = useState("100vh");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const checkTimeoutRef = useRef<NodeJS.Timeout>();
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  const event =
    cityName && eventSlug
      ? getEventBySlug(cityName, eventSlug)
      : undefined;

  const iframeSrc = event?.bookingUrl ?? "";

  useEffect(() => {
    if (!event || !cityName || !eventSlug) {
      navigate("/events/cities", { replace: true });
      return;
    }
  }, [event, cityName, eventSlug, navigate]);

  useEffect(() => {
    if (!iframeSrc || shouldRedirect) return;

    const checkIframeBlocked = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          setShouldRedirect(true);
          return;
        }
      } catch {
        setShouldRedirect(true);
      }
    };

    checkTimeoutRef.current = setTimeout(checkIframeBlocked, 2000);
    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [iframeSrc, shouldRedirect]);

  useEffect(() => {
    if (shouldRedirect && iframeSrc) {
      window.location.href = iframeSrc;
    }
  }, [shouldRedirect, iframeSrc]);

  const handleIframeLoad = () => {
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }
    setTimeout(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          setShouldRedirect(true);
        }
      } catch {
        setShouldRedirect(true);
      }
    }, 500);
  };

  const handleIframeError = () => {
    if (iframeSrc) setShouldRedirect(true);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      const height =
        (window as Window & { visualViewport?: { height: number } }).visualViewport?.height ??
        window.innerHeight;
      updateTimeoutRef.current = window.setTimeout(
        () => setIframeHeight(`${height}px`),
        100
      );
    };

    const initialHeight =
      (window as Window & { visualViewport?: { height: number } }).visualViewport?.height ??
      window.innerHeight;
    setIframeHeight(`${initialHeight}px`);

    const vv = (window as Window & { visualViewport?: { addEventListener: typeof window.addEventListener } }).visualViewport;
    if (vv) {
      vv.addEventListener("resize", updateHeight);
      vv.addEventListener("scroll", updateHeight);
    }
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    return () => {
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
      if (vv) {
        vv.removeEventListener("resize", updateHeight);
        vv.removeEventListener("scroll", updateHeight);
      }
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event || !cityName || !eventSlug) {
    return null;
  }

  const formattedCityName = cityName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  if (shouldRedirect) {
    return (
      <>
        <Seo
          title={{ en: `Book: ${event.title} | Pulse`, es: `Reservar: ${event.title} | Pulse` }}
          description={{ en: event.shortDescription, es: event.shortDescription }}
          pathname={`/events/${cityName}/${eventSlug}/booking`}
        />
        <div className="flex flex-col min-h-screen bg-gray-900">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pulse-pink mx-auto mb-4"></div>
              <p className="text-gray-300">Redirecting...</p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title={{ en: `Book: ${event.title} | Pulse`, es: `Reservar: ${event.title} | Pulse` }}
        description={{ en: event.shortDescription, es: event.shortDescription }}
        pathname={`/events/${cityName}/${eventSlug}/booking`}
      />
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <div className="px-4 py-3 flex items-center gap-4 bg-gray-800/50 border-b border-gray-700">
          <button
            onClick={() => navigate(`/events/${cityName}/${eventSlug}`)}
            className="flex items-center text-pulse-pink hover:text-pulse-pink-300 transition-colors text-sm"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to event
          </button>
          <span className="text-gray-400 text-sm truncate">
            {event.title} · {formattedCityName}
          </span>
        </div>
        <main className="flex-1">
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            className="w-full"
            style={{
              border: "none",
              height: iframeHeight,
              minHeight: iframeHeight,
              maxHeight: "100dvh",
            }}
            loading="eager"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            title={`Book: ${event.title}`}
          />
          <div className="sr-only">
            <a href={iframeSrc}>Open booking form in new tab</a>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EventBooking;
