import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
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
import {
  buildGetKikiUrl,
  type GetKikiEventResponse,
  formatEventPrice,
  getEventPriceOpts,
} from "@/lib/eventApi";

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
const stripePromise = stripePk ? loadStripe(stripePk) : null;

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

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    try {
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
            Pay securely with card or local payment methods.
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
                          className="border-white/30 data-[state=checked]:bg-pulse-pink data-[state=checked]:border-pulse-pink"
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

                <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                  <PaymentElement />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="xl"
                  className="w-full rounded-full"
                  disabled={!stripe || !elements || submitting}
                >
                  {submitting ? "Processing..." : `Pay ${formattedTotalPrice || ""}`.trim()}
                </Button>
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
                  appearance: { theme: "night" },
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

