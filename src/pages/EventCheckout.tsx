import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { Seo } from "@/hooks/useSeo";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  buildGetKikiUrl,
  type GetKikiEventResponse,
  formatEventPrice,
  getEventPriceOpts,
} from "@/lib/eventApi";
import EventProviderSection from "@/components/EventProviderSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, CalendarDays, Clock, Info, Lock, MapPin, ShieldCheck, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CREATE_INTENT_URL =
  "https://staging-api.kikiapp.eu/payments/kiki/create_payment_intent/";
const ATTACH_EMAILS_URL =
  "https://staging-api.kikiapp.eu/payments/kiki/attach_order_emails/";

function getOrCreateSessionKey(key: string): string {
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const uuidLike =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
    sessionStorage.setItem(key, uuidLike);
    return uuidLike;
  } catch {
    return `${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
  }
}

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email");

const checkoutSchema = z
  .object({
    buyerEmail: emailSchema,
    attendeeSameAsBuyer: z.boolean(),
    attendeeEmail: z.string().trim().optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.attendeeSameAsBuyer) {
      const attendee = (val.attendeeEmail || "").trim();
      if (!attendee) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["attendeeEmail"],
          message: "Attendee email is required",
        });
        return;
      }
      const parsed = emailSchema.safeParse(attendee);
      if (!parsed.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["attendeeEmail"],
          message: "Enter a valid attendee email",
        });
      }
    }
  });

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

type CreateIntentResponse = {
  order_id: string;
  idempotency_key: string;
  payment_intent_id: string;
  client_secret: string;
};

const stripePk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePk
  ? loadStripe(
      stripePk,
      import.meta.env.DEV ? ({ advancedFraudSignals: false } as any) : undefined
    )
  : null;

function CheckoutForm({
  eventSlug,
  eventData,
  orderId,
}: {
  eventSlug: string;
  eventData: GetKikiEventResponse;
  orderId: string;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      buyerEmail: "",
      attendeeSameAsBuyer: true,
      attendeeEmail: "",
    },
    mode: "onTouched",
  });

  const attendeeSameAsBuyer = form.watch("attendeeSameAsBuyer");
  const buyerEmailValue = form.watch("buyerEmail");
  const buyerEmailReadyForPayment = React.useMemo(() => {
    return emailSchema.safeParse((buyerEmailValue || "").trim()).success;
  }, [buyerEmailValue]);

  const [showLockedPaymentDialog, setShowLockedPaymentDialog] = React.useState(false);

  React.useEffect(() => {
    if (buyerEmailReadyForPayment) setShowLockedPaymentDialog(false);
  }, [buyerEmailReadyForPayment]);

  React.useEffect(() => {
    if (attendeeSameAsBuyer) {
      form.clearErrors("attendeeEmail");
    }
  }, [attendeeSameAsBuyer, form]);

  const confirmationReturnUrl = React.useMemo(() => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const url = new URL(`/events/${eventSlug}/confirmation`, base);
    url.searchParams.set("order_id", orderId);
    return url.toString();
  }, [eventSlug, orderId]);

  const priceOpts = getEventPriceOpts(eventData);
  const formattedTotalPrice = formatEventPrice(eventData.total_price, priceOpts);
  const eventDateTime = React.useMemo(() => {
    const start = new Date(eventData.datetime_local);
    const date = start.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const startTime = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    const latest = (eventData.datetime_local_latest || "").trim();
    if (!latest) return { text: `${date} · ${startTime}`, hasWindow: false };
    const latestTime = new Date(latest).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return { text: `${date} · Starts between ${startTime}–${latestTime}`, hasWindow: true };
  }, [eventData.datetime_local, eventData.datetime_local_latest]);

  const entranceTimeTooltip =
    "Your entrance time depends on the group we match you into — it can be any time in this range. This helps your match group meet each other (instead of mixing with everyone at once).";

  const attachEmails = React.useCallback(
    async (values: CheckoutFormValues) => {
      const buyerEmail = values.buyerEmail.trim().toLowerCase();
      const attendeeEmail = values.attendeeSameAsBuyer
        ? buyerEmail
        : (values.attendeeEmail || "").trim().toLowerCase();

      const attachRes = await fetch(ATTACH_EMAILS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          buyer_email: buyerEmail,
          attendee_email: attendeeEmail,
        }),
      });
      if (!attachRes.ok) {
        const msg = await attachRes
          .json()
          .then((j) => j?.detail || "Couldn't save emails")
          .catch(() => "Couldn't save emails");
        throw new Error(msg);
      }
      await attachRes.json().catch(() => null);
    },
    [orderId],
  );

  const confirmStripePayment = React.useCallback(async () => {
    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      throw new Error(submitError.message || "Please check your payment details.");
    }

    const confirmResult = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: confirmationReturnUrl },
      redirect: "if_required",
    });

    if (confirmResult.error) {
      throw new Error(confirmResult.error.message || "Payment failed");
    }

    const status = confirmResult.paymentIntent?.status;
    if (status === "succeeded" || status === "processing" || status === "requires_capture") {
      navigate(`/events/${eventSlug}/confirmation?order_id=${encodeURIComponent(orderId)}`, {
        replace: true,
      });
      return;
    }

    // Fallback: send user to confirmation anyway (some methods complete async after redirect).
    navigate(`/events/${eventSlug}/confirmation?order_id=${encodeURIComponent(orderId)}`, {
      replace: true,
    });
  }, [confirmationReturnUrl, elements, eventSlug, navigate, orderId, stripe]);

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!stripe || !elements) return;
    if (!buyerEmailReadyForPayment) return;
    setSubmitting(true);
    try {
      await attachEmails(values);
      await confirmStripePayment();
    } catch (err: any) {
      toast({
        title: "Checkout error",
        description: err?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onExpressConfirm = async () => {
    if (!stripe || !elements) return;
    if (!buyerEmailReadyForPayment) {
      form.setFocus("buyerEmail");
      return;
    }
    setSubmitting(true);
    try {
      const ok = await form.trigger(["buyerEmail", "attendeeSameAsBuyer", "attendeeEmail"]);
      if (!ok) return;
      await attachEmails(form.getValues());
      await confirmStripePayment();
    } catch (err: any) {
      toast({
        title: "Checkout error",
        description: err?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const durationText = React.useMemo(() => {
    const h = eventData.duration_hours;
    if (!h || h <= 0) return null;
    if (h < 1) return `${Math.round(h * 60)} min`;
    if (h === Math.floor(h)) return `${h}h`;
    const hrs = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    return `${hrs}h ${mins}min`;
  }, [eventData.duration_hours]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
      {/* ── Left panel: Order summary ── */}
      <div className="order-1 lg:order-1 lg:col-span-5 bg-[#070C14] flex flex-col border-r border-white/[0.07]">
        {/* Back nav */}
        <div className="px-8 pt-6 lg:px-10 lg:pt-12 pb-4 lg:pb-6">
          <Link
            to={`/events/${eventSlug}`}
            className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to event
          </Link>
        </div>

        {/* Event image */}
        {eventData.primary_image ? (
          <div className="hidden lg:block relative mx-8 lg:mx-10 rounded-xl overflow-hidden aspect-[16/9] mb-7 shrink-0">
            <img
              src={eventData.primary_image}
              alt={eventData.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070C14]/80 via-transparent to-transparent" />
          </div>
        ) : null}

        <div className="flex-1 flex flex-col px-8 lg:px-10 pb-10 lg:pb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2.5">
            Order summary
          </div>
          <h2 className="text-xl font-semibold text-white leading-snug mb-3">
            {eventData.title}
          </h2>

          {eventData.short_description ? (
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              {eventData.short_description}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/65 mb-7">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-white/40" />
              <span className="inline-flex items-center gap-2">
                <span>{eventDateTime.text}</span>
                {eventDateTime.hasWindow ? (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-black/20 text-[11px] font-semibold text-white/80 hover:bg-black/30 hover:text-white transition-colors"
                          aria-label="Entrance time info"
                        >
                          ?
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="max-w-[260px] text-xs leading-relaxed border-white/15 bg-[#131B2E] text-white/90"
                      >
                        {entranceTimeTooltip}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-white/40" />
              <span>{eventData.place}</span>
            </div>
            {durationText ? (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-white/40" />
                <span>{durationText}</span>
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <EventProviderSection
              provider={eventData.provider}
              providerEventUrl={eventData.provider_event_url}
              compact
            />
          </div>

          <div className="border-t border-white/[0.08] pt-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/55">Ticket</span>
              <span className="text-white/82">{formatEventPrice(eventData.ticket_price, priceOpts)}</span>
            </div>
            {eventData.provider_fee > 0 ? (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-white/55">
                  Provider fee
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-white/35 hover:text-white/70 transition-colors cursor-default shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="max-w-[220px] text-xs leading-relaxed border-white/15 bg-[#131B2E] text-white/85"
                      >
                        This fee is charged by the event organiser. We show it here so there are no surprises at payment.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
                <span className="text-white/82">{formatEventPrice(eventData.provider_fee, priceOpts)}</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between text-sm pb-4 border-b border-white/[0.07]">
              <span className="text-white/55">Pulse fee</span>
              <span className="text-white/82">{formatEventPrice(eventData.platform_fee, priceOpts)}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-base font-semibold text-white">Total today</span>
              <span className="text-3xl font-bold text-white">{formattedTotalPrice}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="h-3.5 w-3.5 text-[#38D1BF]/60 shrink-0" />
              Payment encrypted and processed securely by Stripe.
            </div>
            <div className="text-[11px] text-white/35 font-mono">
              Order: {orderId}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: Payment form ── */}
      <div className="order-2 lg:order-2 lg:col-span-7 bg-[#0C1220] flex flex-col px-8 pt-6 pb-8 lg:px-12 lg:pt-8 lg:pb-10">
        <h1 className="text-xl font-semibold text-white mb-6">Complete your booking</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 flex-1">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="buyerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70 text-xs font-medium uppercase tracking-wide">
                      Buyer email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="mt-1.5 h-11 rounded-lg bg-white/[0.05] border-white/15 text-white placeholder:text-white/35 focus-visible:ring-[#38D1BF]/35 focus-visible:border-[#38D1BF]/60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attendeeSameAsBuyer"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 space-y-0 py-2.5 border-t border-b border-white/[0.07]">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(Boolean(v))}
                        className="border-white/30 data-[state=checked]:bg-[#38D1BF] data-[state=checked]:border-[#38D1BF]"
                      />
                    </FormControl>
                    <FormLabel className="text-white/70 text-sm font-normal cursor-pointer leading-none">
                      Ticket is for me
                    </FormLabel>
                  </FormItem>
                )}
              />

              {!attendeeSameAsBuyer ? (
                <FormField
                  control={form.control}
                  name="attendeeEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-xs font-medium uppercase tracking-wide">
                        Attendee email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="attendee@example.com"
                          className="mt-1.5 h-11 rounded-lg bg-white/[0.05] border-white/15 text-white placeholder:text-white/35 focus-visible:ring-[#38D1BF]/35 focus-visible:border-[#38D1BF]/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
            </div>

            <div className="space-y-4">
              <div
                className={cn(
                  "relative rounded-xl",
                  !buyerEmailReadyForPayment && "opacity-60",
                )}
                aria-disabled={!buyerEmailReadyForPayment}
              >
                {!buyerEmailReadyForPayment ? (
                  <>
                    <button
                      type="button"
                      className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px] cursor-pointer"
                      onClick={() => setShowLockedPaymentDialog(true)}
                      aria-label="Payment section locked. Click for details."
                    />
                    {showLockedPaymentDialog ? (
                      <div
                        className="absolute inset-0 z-20 flex items-start justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Payment section locked"
                        onClick={() => setShowLockedPaymentDialog(false)}
                      >
                        <div
                          className="relative w-full max-w-md rounded-xl border border-white/15 bg-[#0D1322] shadow-[0_20px_60px_rgba(0,0,0,0.65)] p-5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => setShowLockedPaymentDialog(false)}
                            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors"
                            aria-label="Close"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <div className="flex items-start gap-3.5 pr-8">
                            <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] border border-white/15 shrink-0">
                              <Lock className="h-4 w-4 text-white/70" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-white">
                                Enter your email first
                              </div>
                              <div className="mt-1.5 text-xs leading-relaxed text-white/70">
                                Add a valid buyer email above to unlock Apple Pay, Google Pay, and card payment options.
                              </div>
                              <button
                                type="button"
                                className="mt-4 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/[0.09] hover:border-white/25 transition-colors"
                                onClick={() => {
                                  setShowLockedPaymentDialog(false);
                                  form.setFocus("buyerEmail");
                                }}
                              >
                                Add email
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}

                <div
                  className={cn(
                    "space-y-3",
                    !buyerEmailReadyForPayment && "pointer-events-none select-none pt-20",
                  )}
                >
                  <ExpressCheckoutElement
                    onConfirm={onExpressConfirm}
                    options={{
                      buttonTheme: {
                        applePay: "black",
                        googlePay: "black",
                      },
                      buttonType: {
                        applePay: "buy",
                        googlePay: "buy",
                      },
                      layout: { maxColumns: 2, overflow: "auto" },
                    }}
                  />

                  <PaymentElement
                    options={{
                      layout: { type: "tabs" },
                      wallets: { applePay: "never", googlePay: "never" },
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-[11px] text-white/45">
                  Details are encrypted and sent directly to Stripe.
                </div>
                <a
                  href="https://stripe.com"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="Powered by Stripe"
                >
                  <img
                    src="https://s.kikiapp.eu/desktop/stripe/PoweredBywhite.svg"
                    alt="Powered by Stripe"
                    className="h-4"
                    loading="lazy"
                  />
                </a>
              </div>

              <Button
                type="submit"
                size="xl"
                className="w-full h-12 rounded-xl bg-[#38D1BF] text-[#041712] hover:bg-[#2FC0AF] focus-visible:ring-[#38D1BF]/45 font-semibold text-base"
                disabled={!stripe || !elements || submitting || !buyerEmailReadyForPayment}
              >
                {submitting
                  ? "Processing..."
                  : buyerEmailReadyForPayment
                    ? `Pay ${formattedTotalPrice || ""}`.trim()
                    : "Enter email to continue"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

const EventCheckout = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { toast } = useToast();
  const { changeLanguage } = useLanguage();

  const [eventData, setEventData] = React.useState<GetKikiEventResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  const [intentLoading, setIntentLoading] = React.useState(false);
  const [intentError, setIntentError] = React.useState<string | null>(null);
  const [orderId, setOrderId] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!eventSlug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const url = buildGetKikiUrl(eventSlug);
    fetch(url, { signal: controller.signal, headers: { accept: "application/json" } })
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (json) {
          const data = json as GetKikiEventResponse;
          setEventData(data);
          if (data.language) changeLanguage(data.language);
        }
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setNotFound(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [eventSlug, changeLanguage]);

  const idempotencyKey = React.useMemo(() => {
    const key = `kiki_checkout_idempotency_key:${eventSlug || ""}`;
    return getOrCreateSessionKey(key);
  }, [eventSlug]);

  const createIntent = React.useCallback(async () => {
    if (!eventSlug) return;
    setIntentError(null);
    setIntentLoading(true);
    try {
      const res = await fetch(CREATE_INTENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({ kiki_slug: eventSlug, idempotency_key: idempotencyKey }),
      });
      if (!res.ok) {
        const msg = await res
          .json()
          .then((j) => j?.detail || "Couldn't start checkout")
          .catch(() => "Couldn't start checkout");
        throw new Error(msg);
      }
      const json = (await res.json()) as CreateIntentResponse;
      if (!json?.client_secret || !json?.order_id) {
        throw new Error("Missing client secret from server");
      }
      setOrderId(json.order_id);
      setClientSecret(json.client_secret);
    } catch (err: any) {
      const message = err?.message || "Couldn't start checkout";
      setIntentError(message);
      toast({
        title: "Checkout error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIntentLoading(false);
    }
  }, [eventSlug, idempotencyKey, toast]);

  React.useEffect(() => {
    if (!eventSlug) return;
    if (!stripePromise) return;
    void createIntent();
  }, [createIntent, eventSlug]);

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

  if (notFound || !eventData || !eventSlug) return <NotFound />;

  const checkoutPath = `/events/${eventSlug}/checkout`;
  const seoProps = {
    title: { en: `Checkout: ${eventData.title} | Pulse`, es: `Checkout: ${eventData.title} | Pulse` },
    description: { en: eventData.short_description, es: eventData.short_description },
    pathname: checkoutPath,
    image: eventData.primary_image,
    type: "website" as const,
  };

  if (!stripePromise) {
    return (
      <>
        <Seo {...seoProps} />
        <div className="min-h-screen bg-[#090D14] text-white">
          <Navbar />
          <main className="px-6 pt-32 pb-16">
            <div className="w-full max-w-xl mx-auto">
              <Card className="border-white/10 bg-[#0C1220]">
                <CardContent className="p-8">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45 mb-2">Checkout</div>
                  <div className="text-2xl font-semibold text-white">Checkout unavailable</div>
                  <div className="mt-2 text-sm text-white/65">
                    Stripe is not configured. Please set{" "}
                    <span className="font-mono text-white/80">VITE_STRIPE_PUBLISHABLE_KEY</span>.
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/events/${eventSlug}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white/85 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to event
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
  }

  return (
    <>
      <Seo {...seoProps} />
      <div className="min-h-screen bg-[#090D14] text-white">
        <Navbar />
        <main className="pt-20">
          {intentLoading && !clientSecret ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
              <div className="lg:col-span-5 bg-[#070C14] px-8 py-10 lg:px-10 lg:py-12 border-r border-white/[0.07] space-y-5">
                <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
                <div className="aspect-[16/9] rounded-xl bg-white/10 animate-pulse" />
                <div className="h-6 w-56 rounded-lg bg-white/10 animate-pulse" />
                <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-48 rounded bg-white/10 animate-pulse" />
                <div className="mt-6 pt-5 border-t border-white/[0.07] space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                  </div>
                  <div className="flex justify-between pt-3">
                    <div className="h-5 w-24 rounded bg-white/10 animate-pulse" />
                    <div className="h-8 w-28 rounded bg-white/10 animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 bg-[#0C1220] px-8 py-10 lg:px-12 lg:py-12 space-y-6">
                <div className="h-7 w-40 rounded-lg bg-white/10 animate-pulse" />
                <div className="h-4 w-56 rounded bg-white/10 animate-pulse" />
                <div className="space-y-3 mt-6">
                  <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
                  <div className="h-11 rounded-lg bg-white/10 animate-pulse" />
                </div>
                <div className="h-64 rounded-xl bg-white/10 animate-pulse mt-4" />
                <div className="h-12 rounded-xl bg-[#38D1BF]/20 animate-pulse" />
              </div>
              <PageLoadingOverlay show={true} />
            </div>
          ) : intentError ? (
            <div className="px-6 py-16">
              <div className="w-full max-w-xl mx-auto">
                <Card className="border-white/10 bg-[#0C1220]">
                  <CardContent className="p-8">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45 mb-2">Checkout</div>
                    <div className="text-2xl font-semibold text-white">Couldn't start checkout</div>
                    <div className="mt-2 text-sm text-white/65">{intentError}</div>
                    <div className="mt-6 flex gap-3 flex-col sm:flex-row">
                      <Button
                        onClick={createIntent}
                        disabled={intentLoading}
                        className="rounded-lg bg-[#38D1BF] text-[#041712] hover:bg-[#2FC0AF] font-semibold"
                      >
                        Try again
                      </Button>
                      <Link
                        to={`/events/${eventSlug}`}
                        className="inline-flex items-center gap-2 justify-center rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-sm font-medium text-white/85 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to event
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : clientSecret && orderId ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "night",
                  variables: {
                    colorPrimary: "#38D1BF",
                    colorBackground: "#0C1220",
                    colorText: "#FFFFFF",
                    colorTextSecondary: "rgba(255,255,255,0.78)",
                    colorTextPlaceholder: "rgba(255,255,255,0.38)",
                    colorDanger: "#FF4D4D",
                    borderRadius: "10px",
                    fontFamily:
                      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                    spacingUnit: "5px",
                    fontSizeBase: "16px",
                  },
                  rules: {
                    ".PaymentMethodMessaging": {
                      color: "#FFFFFF",
                    },
                    ".Link": {
                      color: "#FFFFFF",
                    },
                    ".SecondaryLink": {
                      color: "#FFFFFF",
                    },
                    ".Label": {
                      color: "rgba(255,255,255,0.72)",
                      fontWeight: "500",
                      fontSize: "13px",
                    },
                    ".Input": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.20)",
                      boxShadow: "none",
                      padding: "11px 14px",
                    },
                    ".Input::placeholder": {
                      color: "rgba(255,255,255,0.30)",
                    },
                    ".Input:focus": {
                      backgroundColor: "rgba(255,255,255,0.10)",
                      borderColor: "rgba(56,209,191,0.80)",
                      boxShadow: "0 0 0 3px rgba(56,209,191,0.18)",
                    },
                    ".Input--autocomplete": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.20)",
                      boxShadow: "none",
                    },
                    ".Input--invalid": {
                      borderColor: "rgba(255,90,90,0.85)",
                      boxShadow: "0 0 0 3px rgba(255,90,90,0.18)",
                    },
                    ".Tab": {
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      padding: "10px 16px",
                    },
                    ".TabLabel": {
                      color: "rgba(255,255,255,0.82)",
                      fontWeight: "500",
                    },
                    ".Tab:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(255,255,255,0.28)",
                    },
                    ".Tab--selected": {
                      backgroundColor: "rgba(56,209,191,0.12)",
                      borderColor: "rgba(56,209,191,0.90)",
                      boxShadow: "0 0 0 1px rgba(56,209,191,0.40)",
                    },
                    ".Tab--selected:hover": {
                      backgroundColor: "rgba(56,209,191,0.15)",
                    },
                    ".TabIcon--selected": {
                      fill: "#FFFFFF",
                    },
                    ".Block": {
                      backgroundColor: "transparent",
                    },
                    ".Error": {
                      color: "rgba(255,90,90,0.95)",
                    },
                  },
                },
              }}
            >
              <CheckoutForm
                eventSlug={eventSlug}
                eventData={eventData}
                orderId={orderId}
              />
            </Elements>
          ) : (
            <div className="px-6 py-16">
              <div className="w-full max-w-xl mx-auto">
                <Card className="border-white/10 bg-[#0C1220]">
                  <CardContent className="p-8">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45 mb-2">Checkout</div>
                    <div className="text-2xl font-semibold text-white">Loading checkout</div>
                    <div className="mt-2 text-sm text-white/65">
                      Please wait while we prepare your payment.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EventCheckout;
