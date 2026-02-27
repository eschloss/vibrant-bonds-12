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
import { Lock, ShieldCheck, X } from "lucide-react";

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
          .then((j) => j?.detail || "Couldn’t save emails")
          .catch(() => "Couldn’t save emails");
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <Card className="lg:col-span-7 bg-gray-800/35 backdrop-blur-lg border-white/10">
        <CardContent className="p-6">
          <div className="text-sm font-semibold text-white">Checkout</div>
          <div className="mt-1 text-sm text-white/70">
            Payments are securely processed by Stripe. Enter your email to enable secure payment options.
          </div>

          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="buyerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Buyer email</FormLabel>
                      <div className="mt-1 text-xs text-white/60">
                        We’ll send your ticket (and receipt) to this email address.
                      </div>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/50"
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(v) => field.onChange(Boolean(v))}
                          className="border-white/30 data-[state=checked]:bg-pulse-blue data-[state=checked]:border-pulse-blue"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white/80">
                          Buyer and attendee are the same
                        </FormLabel>
                        <div className="text-xs text-white/55">
                          If you’re buying for someone else, uncheck and enter their email.
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                {!attendeeSameAsBuyer ? (
                  <FormField
                    control={form.control}
                    name="attendeeEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Attendee email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="attendee@example.com"
                            className="bg-black/20 border-white/10 text-white placeholder:text-white/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-white">Payment</div>
                    <div className="flex items-center gap-2 text-[12px] text-white/75">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Secure checkout</span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "relative rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 via-white/5 to-black/35 p-4 overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.45)]",
                      !buyerEmailReadyForPayment && "opacity-70",
                    )}
                    aria-disabled={!buyerEmailReadyForPayment}
                  >
                    {!buyerEmailReadyForPayment ? (
                      <>
                        <button
                          type="button"
                          className="absolute inset-0 z-10 bg-black/35 backdrop-blur-[2px] cursor-pointer"
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
                              className="relative w-full max-w-md rounded-2xl border border-white/15 bg-gradient-to-b from-gray-950 to-black shadow-[0_20px_60px_rgba(0,0,0,0.70)] p-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() => setShowLockedPaymentDialog(false)}
                                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black text-white/85 hover:text-white hover:border-white/20 transition-colors"
                                aria-label="Close"
                              >
                                <X className="h-4 w-4" />
                              </button>

                              <div className="flex items-start gap-4 pr-10">
                                <div className="mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-black border border-white/15">
                                  <Lock className="h-[18px] w-[18px] text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="text-[13px] font-semibold tracking-wide text-white">
                                      Payment panel locked
                                    </div>
                                    <div className="rounded-full border border-white/15 bg-black px-2 py-0.5 text-[11px] font-semibold text-white/80">
                                      Requires email
                                    </div>
                                  </div>
                                  <div className="mt-2 text-[12px] leading-relaxed text-white/80">
                                    This payment section is disabled until we have a valid buyer email.
                                  </div>
                                  <div className="mt-3 rounded-xl border border-white/12 bg-black px-3 py-2">
                                    <div className="text-[11px] font-semibold tracking-wide text-white/60">
                                      UNLOCKS
                                    </div>
                                    <div className="mt-1 text-[12px] leading-relaxed text-white/85">
                                      Apple Pay, Google Pay, and card payment options.
                                    </div>
                                  </div>
                                  <div className="mt-3 flex items-center justify-between gap-3">
                                    <div className="text-[12px] leading-relaxed text-white/75">
                                      Enter your email above, then return here.
                                    </div>
                                    <button
                                      type="button"
                                      className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/90 hover:bg-white/10 hover:border-white/25 transition-colors"
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
                          </div>
                        ) : null}
                      </>
                    ) : null}

                    <div
                      className={cn(
                        "space-y-4",
                        !buyerEmailReadyForPayment && "pointer-events-none select-none pt-16",
                      )}
                    >
                      <div className="space-y-2">
                        <div className="text-[12px] font-semibold text-white/80">Fast checkout</div>
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
                      </div>

                      <div className="flex items-center gap-3 py-1">
                        <div className="h-px flex-1 bg-white/15" />
                        <div className="text-[11px] font-semibold tracking-wide text-white/60">CARD</div>
                        <div className="h-px flex-1 bg-white/15" />
                      </div>

                      <PaymentElement
                        options={{
                          layout: { type: "accordion", defaultCollapsed: false, radios: true },
                          wallets: { applePay: "never", googlePay: "never" },
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[12px] text-white/70">
                      Your payment details are encrypted and sent directly to Stripe.
                    </div>
                    <a
                      href="https://stripe.com"
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 opacity-85 hover:opacity-100 transition-opacity"
                      aria-label="Powered by Stripe"
                      title="Powered by Stripe"
                    >
                      <img
                        src="https://s.kikiapp.eu/desktop/stripe/PoweredBywhite.svg"
                        alt="Powered by Stripe"
                        className="h-5"
                        loading="lazy"
                      />
                    </a>
                  </div>

                  <Button
                    type="submit"
                    size="xl"
                    className="w-full rounded-full bg-[#6366F1] text-white hover:bg-[#5558E6] focus-visible:ring-[#6366F1]/40"
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
        </CardContent>
      </Card>

      <Card className="lg:col-span-5 bg-gray-800/35 backdrop-blur-lg border-white/10">
        <CardContent className="p-6">
          <div className="text-sm font-semibold text-white">Order summary</div>
          <div className="mt-3 space-y-2 text-sm text-white/75">
            <div className="flex items-start justify-between gap-4">
              <span className="text-white/65">Event</span>
              <span className="text-right">{eventData.title}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-white/65">When</span>
              <span className="text-right">
                {new Date(eventData.datetime_local).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-white/65">Where</span>
              <span className="text-right">{eventData.place}</span>
            </div>
            <div className="pt-3 mt-3 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/65">Ticket</span>
                <span>{formatEventPrice(eventData.ticket_price, priceOpts)}</span>
              </div>
              {eventData.provider_fee > 0 ? (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/65">Provider fee</span>
                  <span>{formatEventPrice(eventData.provider_fee, priceOpts)}</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/65">Pulse fee</span>
                <span>{formatEventPrice(eventData.platform_fee, priceOpts)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-2 mt-2 border-t border-white/10">
                <span className="font-semibold text-white">Total</span>
                <span className="font-semibold text-white">{formattedTotalPrice}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to={`/events/${eventSlug}`}
              className="w-full inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition-colors"
            >
              Back to event details
            </Link>
          </div>

          <div className="mt-3 text-[12px] text-white/55">
            Order ID: <span className="font-mono">{orderId}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const EventCheckout = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { toast } = useToast();

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
        if (json) setEventData(json as GetKikiEventResponse);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setNotFound(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [eventSlug]);

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
          .then((j) => j?.detail || "Couldn’t start checkout")
          .catch(() => "Couldn’t start checkout");
        throw new Error(msg);
      }
      const json = (await res.json()) as CreateIntentResponse;
      if (!json?.client_secret || !json?.order_id) {
        throw new Error("Missing client secret from server");
      }
      setOrderId(json.order_id);
      setClientSecret(json.client_secret);
    } catch (err: any) {
      const message = err?.message || "Couldn’t start checkout";
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
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="px-4 pt-32 pb-16">
            <div className="w-full max-w-2xl mx-auto">
              <Card className="bg-gray-800/35 backdrop-blur-lg border-white/10">
                <CardContent className="p-6">
                  <div className="text-lg font-bold text-white">Checkout unavailable</div>
                  <div className="mt-2 text-sm text-white/70">
                    Stripe is not configured. Please set{" "}
                    <span className="font-mono">VITE_STRIPE_PUBLISHABLE_KEY</span>.
                  </div>
                  <div className="mt-5">
                    <Link
                      to={`/events/${eventSlug}`}
                      className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition-colors"
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
  }

  return (
    <>
      <Seo {...seoProps} />
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="px-4 pt-32 pb-16">
          <div className="w-full max-w-6xl mx-auto">
            {intentLoading && !clientSecret ? (
              <div className="py-10">
                <PageLoadingOverlay show={true} />
              </div>
            ) : intentError ? (
              <Card className="bg-gray-800/35 backdrop-blur-lg border-white/10">
                <CardContent className="p-6">
                  <div className="text-lg font-bold text-white">Couldn’t start checkout</div>
                  <div className="mt-2 text-sm text-white/70">{intentError}</div>
                  <div className="mt-6 flex gap-3 flex-col sm:flex-row">
                    <Button onClick={createIntent} disabled={intentLoading}>
                      Try again
                    </Button>
                    <Link
                      to={`/events/${eventSlug}`}
                      className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition-colors"
                    >
                      Back to event details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : clientSecret && orderId ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#38D1BF",
                      colorBackground: "#1A1C23",
                      colorText: "#FFFFFF",
                      colorTextSecondary: "rgba(255,255,255,0.82)",
                      colorTextPlaceholder: "rgba(255,255,255,0.55)",
                      colorDanger: "#FF4D4D",
                      borderRadius: "8px",
                      fontFamily:
                        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                      spacingUnit: "4px",
                      fontSizeBase: "16px",
                    },
                    rules: {
                      ".PaymentMethodMessaging": {
                        color: "#00D924",
                      },
                      ".Link": {
                        color: "#00D924",
                      },
                      ".SecondaryLink": {
                        color: "#00D924",
                      },
                      ".Label": {
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: "600",
                      },
                      ".Input": {
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.20)",
                        boxShadow: "none",
                      },
                      ".Input::placeholder": {
                        color: "rgba(255,255,255,0.55)",
                      },
                      ".Input:focus": {
                        backgroundColor: "rgba(255,255,255,0.06)",
                        borderColor: "rgba(255,255,255,0.35)",
                        boxShadow: "0 0 0 3px rgba(56,209,191,0.22)",
                      },
                      ".Input--autocomplete": {
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.20)",
                        boxShadow: "none",
                      },
                      ".Input--invalid": {
                        borderColor: "rgba(255,90,90,0.85)",
                        boxShadow: "0 0 0 3px rgba(255,90,90,0.18)",
                      },
                      ".Tab": {
                        backgroundColor: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.18)",
                      },
                      ".TabLabel": {
                        color: "rgba(255,255,255,0.88)",
                        fontWeight: "600",
                      },
                      ".Tab:hover": {
                        borderColor: "rgba(255,255,255,0.28)",
                      },
                      ".Tab--selected": {
                        backgroundColor: "rgba(56,209,191,0.14)",
                        borderColor: "rgba(56,209,191,0.95)",
                        boxShadow:
                          "0 0 0 1px rgba(56,209,191,0.45), 0 10px 24px rgba(0,0,0,0.35)",
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
              <Card className="bg-gray-800/35 backdrop-blur-lg border-white/10">
                <CardContent className="p-6">
                  <div className="text-lg font-bold text-white">Checkout loading</div>
                  <div className="mt-2 text-sm text-white/70">
                    Please wait while we prepare your payment.
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EventCheckout;

