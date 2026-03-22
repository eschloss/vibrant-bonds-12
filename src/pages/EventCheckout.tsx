import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  cn,
  trackMetaPixelEvent,
  initMetaPixelAdvancedMatching,
  buildCheckoutEventParams,
} from "@/lib/utils";
import {
  buildEventContext,
  buildGetKikiUrl,
  type GetKikiEventResponse,
  formatEventPrice,
  getEventPriceOpts,
  EVENTS_API_BASE_URL,
  parseEventLocalDateTime,
} from "@/lib/eventApi";
import {
  buildEventChatQuickQuestions,
  buildEventFaqParamsFromEventData,
} from "@/lib/eventChatQuickQuestions";
import { shardApiUrl } from "@/lib/urlShard";
import EventProviderSection from "@/components/EventProviderSection";
import { EventHeaderProvider, useEventTrackCheckoutClick } from "@/contexts/EventHeaderContext";
import { useChatContext } from "@/contexts/ChatContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsLg, useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, CalendarDays, ChevronDown, ChevronUp, CircleCheck, Clock, Copy, Info, Lock, MapPin, Minus, Plus, ShieldCheck, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CREATE_INTENT_URL = shardApiUrl(`${EVENTS_API_BASE_URL}/payments/kiki/create_payment_intent/`);
const ATTACH_EMAILS_URL = shardApiUrl(`${EVENTS_API_BASE_URL}/payments/kiki/attach_order_emails/`);

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

/** FastAPI-style error bodies: `{ detail: string | [...] }` */
function parsePaymentIntentErrorDetail(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const d = (body as { detail?: unknown }).detail;
  if (typeof d === "string") return d.trim();
  if (Array.isArray(d) && d.length > 0) {
    const first = d[0] as { msg?: unknown };
    if (first && typeof first.msg === "string") return first.msg.trim();
  }
  return "";
}

type CheckoutIntentFailure =
  | null
  | { kind: "sold_out" }
  | { kind: "generic"; message: string };

function createCheckoutSchema(t: (key: string, fallback: string) => string) {
  const emailSchema = z
    .string()
    .trim()
    .min(1, t("event_checkout.validation.email_required", "Email is required"))
    .email(t("event_checkout.validation.email_invalid", "Enter a valid email"));

  const firstNameSchema = z
    .string()
    .trim()
    .min(1, t("event_checkout.validation.first_name_required", "Your name is required"));

  return z
    .object({
      firstName: firstNameSchema,
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
            message: t("event_checkout.validation.attendee_required", "Attendee email is required"),
          });
          return;
        }
        const parsed = emailSchema.safeParse(attendee);
        if (!parsed.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["attendeeEmail"],
            message: t("event_checkout.validation.attendee_invalid", "Enter a valid attendee email"),
          });
        }
      }
    });
}

type CheckoutFormValues = z.infer<ReturnType<typeof createCheckoutSchema>>;

type CreateIntentResponse = {
  order_id: string;
  customer_id?: string;
  idempotency_key: string;
  payment_intent_id?: string;
  client_secret?: string;
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
  selectedAddons,
  initialFormValues,
  bankTransferOrderId,
  onRequestBankTransferIntent,
  bankTransferLoading,
  onBackToAddons,
}: {
  eventSlug: string;
  eventData: GetKikiEventResponse;
  orderId: string;
  selectedAddons: Record<number, number>;
  initialFormValues?: CheckoutFormValues;
  bankTransferOrderId: string | null;
  onRequestBankTransferIntent: (values: CheckoutFormValues) => Promise<void>;
  bankTransferLoading: boolean;
  onBackToAddons?: () => void;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, currentLanguage } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = React.useState(false);
  const hasDirectBankTransfer = (eventData.direct_bank_details ?? "").trim().length > 0;
  const [paymentMethodTab, setPaymentMethodTab] = React.useState<"stripe" | "bank">("stripe");
  const [bankTransferConfirmedPaid, setBankTransferConfirmedPaid] = React.useState(false);
  const bankTransferCodeReady = bankTransferConfirmedPaid; // when true, we send "user_clicked_i_paid"

  const confirmAndSubmitRef = React.useRef(false);
  const hasFiredInitiateCheckout = React.useRef(false);
  const hasFiredFirstNameFocus = React.useRef(false);
  const hasFiredFirstNameShared = React.useRef(false);
  const hasFiredEmailShared = React.useRef(false);
  const hasFiredTermsAccepted = React.useRef(false);

  const checkoutSchema = React.useMemo(() => createCheckoutSchema(t), [t]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      buyerEmail: "",
      attendeeSameAsBuyer: true,
      attendeeEmail: "",
    },
    mode: "onTouched",
  });

  React.useEffect(() => {
    if (initialFormValues) {
      form.reset(initialFormValues);
    }
  }, [initialFormValues, form]);

  const attendeeSameAsBuyer = form.watch("attendeeSameAsBuyer");
  const firstNameValue = form.watch("firstName");
  const buyerEmailValue = form.watch("buyerEmail");
  const attendeeEmailValue = form.watch("attendeeEmail");
  const nameReady = (firstNameValue || "").trim().length > 0;
  const isMobile = useIsMobile();

  const paymentRequirementsMet = React.useMemo(() => {
    const emailOk = z.string().trim().min(1).email().safeParse((buyerEmailValue || "").trim()).success;
    const firstNameOk = (firstNameValue || "").trim().length > 0;
    const attendeeOk =
      attendeeSameAsBuyer ||
      z.string().trim().min(1).email().safeParse((attendeeEmailValue || "").trim()).success;
    return emailOk && firstNameOk && attendeeOk;
  }, [attendeeSameAsBuyer, attendeeEmailValue, buyerEmailValue, firstNameValue]);

  const [showLockedPaymentDialog, setShowLockedPaymentDialog] = React.useState(false);
  const [whatsIncludedOpen, setWhatsIncludedOpen] = React.useState(false);

  React.useEffect(() => {
    if (paymentRequirementsMet) setShowLockedPaymentDialog(false);
  }, [paymentRequirementsMet]);

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
  const addonsTotalMajor = React.useMemo(() => {
    const addons = eventData.addons ?? [];
    return addons.reduce((sum, a) => sum + (a.price * (selectedAddons[a.id] ?? 0)), 0);
  }, [eventData.addons, selectedAddons]);
  const totalWithAddons = eventData.ticket_price + eventData.provider_fee + eventData.platform_fee + addonsTotalMajor;
  const formattedTotalPrice = formatEventPrice(totalWithAddons, priceOpts);
  const locale = currentLanguage === "es" ? "es" : "en-US";

  const eventDateTime = React.useMemo(() => {
    const start = parseEventLocalDateTime(eventData.datetime_local);
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
    const latest = (eventData.datetime_local_latest || "").trim();
    if (!latest) return { text: `${date} · ${startTime}`, hasWindow: false };
    const latestTime = parseEventLocalDateTime(latest).toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
    });
    const startsBetween = t("event_checkout.starts_between", "Starts between");
    return { text: `${date} · ${startsBetween} ${startTime}–${latestTime}`, hasWindow: true };
  }, [eventData.datetime_local, eventData.datetime_local_latest, locale, t]);

  const entranceTimeTooltip = t(
    "event_checkout.entrance_time_tooltip",
    "Your entrance time depends on the group we match you into — it can be any time in this range. This helps your match group meet each other (instead of mixing with everyone at once)."
  );

  const activeOrderId = paymentMethodTab === "bank" && bankTransferOrderId ? bankTransferOrderId : orderId;
  const baseCheckoutParams = React.useMemo(
    () => buildCheckoutEventParams(eventData, activeOrderId),
    [eventData, activeOrderId]
  );

  React.useEffect(() => {
    if (
      hasDirectBankTransfer &&
      paymentMethodTab === "bank" &&
      !bankTransferOrderId &&
      paymentRequirementsMet &&
      !bankTransferLoading
    ) {
      const values = form.getValues();
      const buyerOk = z.string().trim().min(1).email().safeParse((values.buyerEmail || "").trim()).success;
      const attendeeOk =
        values.attendeeSameAsBuyer ||
        z.string().trim().min(1).email().safeParse((values.attendeeEmail || "").trim()).success;
      if (buyerOk && attendeeOk) {
        void onRequestBankTransferIntent(values);
      }
    }
  }, [
    hasDirectBankTransfer,
    paymentMethodTab,
    bankTransferOrderId,
    paymentRequirementsMet,
    bankTransferLoading,
    onRequestBankTransferIntent,
    form,
  ]);

  React.useEffect(() => {
    if (hasFiredInitiateCheckout.current) return;
    hasFiredInitiateCheckout.current = true;
    const contentId = String(eventData.event_id ?? eventData.id);
    trackMetaPixelEvent("InitiateCheckout", {
      ...baseCheckoutParams,
      content_ids: [contentId],
      content_type: "product",
      content_name: eventData.title,
      value: eventData.total_price,
      currency: eventData.currency,
    });
  }, [baseCheckoutParams, eventData]);

  const lastEarlyAttachKeyRef = React.useRef<string | null>(null);

  const attachEmails = React.useCallback(
    async (
      values: CheckoutFormValues,
      opts?: {
        orderIdOverride?: string;
        directBankTransfer?: boolean;
        bankTransferConfirmationCode?: string;
      }
    ) => {
      const firstName = values.firstName.trim();
      const buyerEmail = values.buyerEmail.trim().toLowerCase();
      const attendeeEmail = values.attendeeSameAsBuyer
        ? buyerEmail
        : (values.attendeeEmail || "").trim().toLowerCase();

      // Fallback: fire form engagement events if autofill prevented onFocus/onBlur from firing
      if (!hasFiredFirstNameFocus.current && firstName.length > 0) {
        hasFiredFirstNameFocus.current = true;
        trackMetaPixelEvent("event_checkout_first_name_focused", { ...baseCheckoutParams }, { custom: true });
      }
      if (!hasFiredFirstNameShared.current && firstName.length >= 2) {
        hasFiredFirstNameShared.current = true;
        trackMetaPixelEvent("event_payment_first_name_shared", { ...baseCheckoutParams }, { custom: true });
        initMetaPixelAdvancedMatching({ fn: firstName, ct: eventData.city_label || undefined });
      }

      if (!hasFiredEmailShared.current && buyerEmail) {
        const emailValid = z.string().trim().min(1).email().safeParse(buyerEmail).success;
        if (emailValid) {
          hasFiredEmailShared.current = true;
          trackMetaPixelEvent("event_payment_email_shared", { ...baseCheckoutParams }, { custom: true });
          initMetaPixelAdvancedMatching({
            em: buyerEmail,
            fn: firstName || undefined,
            ct: eventData.city_label || undefined,
          });
        }
      }

      const body: Record<string, unknown> = {
        order_id: opts?.orderIdOverride ?? orderId,
        first_name: firstName,
        last_name: "",
        buyer_email: buyerEmail,
        attendee_email: attendeeEmail,
      };
      if (opts?.directBankTransfer) {
        body.direct_bank_transfer = true;
        if (opts.bankTransferConfirmationCode?.trim()) {
          body.bank_transfer_confirmation_code = opts.bankTransferConfirmationCode.trim();
        }
      }

      const attachRes = await fetch(ATTACH_EMAILS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify(body),
      });
      if (!attachRes.ok) {
        const msg = await attachRes
          .json()
          .then((j) => j?.detail || t("event_checkout.couldnt_save_emails", "Couldn't save emails"))
          .catch(() => t("event_checkout.couldnt_save_emails", "Couldn't save emails"));
        throw new Error(msg);
      }
      await attachRes.json().catch(() => null);
    },
    [baseCheckoutParams, eventData, orderId, t],
  );

  const tryAttachEmailsEarly = React.useCallback(() => {
    if (hasDirectBankTransfer && paymentMethodTab === "bank") return;
    const values = form.getValues();
    const firstName = (values.firstName || "").trim();
    const buyerEmail = (values.buyerEmail || "").trim().toLowerCase();
    const attendeeSameAsBuyer = values.attendeeSameAsBuyer;
    const attendeeEmail = attendeeSameAsBuyer
      ? buyerEmail
      : (values.attendeeEmail || "").trim().toLowerCase();

    const emailValid = z.string().trim().min(1).email().safeParse(buyerEmail).success;
    const attendeeEmailValid =
      attendeeSameAsBuyer || z.string().trim().min(1).email().safeParse(attendeeEmail).success;

    if (firstName.length < 1 || !emailValid || !attendeeEmailValid) {
      return;
    }

    const key = `${firstName}|${buyerEmail}|${attendeeEmail}`;
    if (lastEarlyAttachKeyRef.current === key) return;
    lastEarlyAttachKeyRef.current = key;

    void attachEmails({
      ...values,
      firstName,
      buyerEmail,
      attendeeSameAsBuyer,
      attendeeEmail,
    }).catch(() => {
      lastEarlyAttachKeyRef.current = null;
    });
  }, [form, attachEmails, hasDirectBankTransfer, paymentMethodTab]);

  // Detect autocomplete: watch form values and call attach when we have enough data
  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const sub = form.watch(() => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = null;
        tryAttachEmailsEarly();
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [form, tryAttachEmailsEarly]);

  const confirmStripePayment = React.useCallback(async () => {
    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      throw new Error(submitError.message || t("event_checkout.check_payment_details", "Please check your payment details."));
    }

    const confirmResult = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: confirmationReturnUrl },
      redirect: "if_required",
    });

    if (confirmResult.error) {
      throw new Error(confirmResult.error.message || t("event_checkout.payment_failed", "Payment failed"));
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
    if (!paymentRequirementsMet) return;
    const isBankTransfer = hasDirectBankTransfer && paymentMethodTab === "bank";

    if (isBankTransfer) {
      if (!bankTransferOrderId) return;
      if (!bankTransferCodeReady && !confirmAndSubmitRef.current) return;
      confirmAndSubmitRef.current = false;
      trackMetaPixelEvent("event_bank_transfer_confirm_booking_click", { ...baseCheckoutParams }, { custom: true });
      setSubmitting(true);
      if (!hasFiredTermsAccepted.current) {
        hasFiredTermsAccepted.current = true;
        trackMetaPixelEvent("event_checkout_terms_accepted", { ...baseCheckoutParams }, { custom: true });
      }
      try {
        await attachEmails(values, {
          orderIdOverride: bankTransferOrderId,
          directBankTransfer: true,
          bankTransferConfirmationCode: "user_clicked_i_paid",
        });
        navigate(`/events/${eventSlug}/confirmation?order_id=${encodeURIComponent(bankTransferOrderId)}`, {
          replace: true,
        });
      } catch (err: any) {
        trackMetaPixelEvent(
          "event_checkout_attach_emails_failed",
          { ...baseCheckoutParams, error_message: err?.message },
          { custom: true }
        );
        toast({
          title: t("event_checkout.checkout_error", "Checkout error"),
          description: err?.message || t("event_checkout.something_went_wrong", "Something went wrong. Please try again."),
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (!stripe || !elements) return;
    setSubmitting(true);
    if (!hasFiredTermsAccepted.current) {
      hasFiredTermsAccepted.current = true;
      trackMetaPixelEvent("event_checkout_terms_accepted", { ...baseCheckoutParams }, { custom: true });
    }
    try {
      await attachEmails(values);
    } catch (err: any) {
      trackMetaPixelEvent(
        "event_checkout_attach_emails_failed",
        { ...baseCheckoutParams, error_message: err?.message },
        { custom: true }
      );
      toast({
        title: t("event_checkout.checkout_error", "Checkout error"),
        description: err?.message || t("event_checkout.something_went_wrong", "Something went wrong. Please try again."),
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    try {
      await confirmStripePayment();
    } catch (err: any) {
      trackMetaPixelEvent(
        "event_checkout_payment_failed",
        { ...baseCheckoutParams, error_message: err?.message },
        { custom: true }
      );
      toast({
        title: t("event_checkout.checkout_error", "Checkout error"),
        description: err?.message || t("event_checkout.something_went_wrong", "Something went wrong. Please try again."),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onExpressConfirm = async () => {
    if (!stripe || !elements) return;
    if (!paymentRequirementsMet) {
      const first = (form.getValues("firstName") || "").trim();
      const emailOk = z.string().trim().min(1).email().safeParse((form.getValues("buyerEmail") || "").trim()).success;
      if (!first) form.setFocus("firstName");
      else if (!emailOk) form.setFocus("buyerEmail");
      else if (!attendeeSameAsBuyer) form.setFocus("attendeeEmail");
      return;
    }
    setSubmitting(true);
    if (!hasFiredTermsAccepted.current) {
      hasFiredTermsAccepted.current = true;
      trackMetaPixelEvent("event_checkout_terms_accepted", { ...baseCheckoutParams }, { custom: true });
    }
    try {
      const ok = await form.trigger([
        "firstName",
        "buyerEmail",
        "attendeeSameAsBuyer",
        "attendeeEmail",
      ]);
      if (!ok) {
        setSubmitting(false);
        return;
      }
      await attachEmails(form.getValues());
    } catch (err: any) {
      trackMetaPixelEvent(
        "event_checkout_attach_emails_failed",
        { ...baseCheckoutParams, error_message: err?.message },
        { custom: true }
      );
      toast({
        title: t("event_checkout.checkout_error", "Checkout error"),
        description: err?.message || t("event_checkout.something_went_wrong", "Something went wrong. Please try again."),
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    try {
      await confirmStripePayment();
    } catch (err: any) {
      trackMetaPixelEvent(
        "event_checkout_payment_failed",
        { ...baseCheckoutParams, error_message: err?.message },
        { custom: true }
      );
      toast({
        title: t("event_checkout.checkout_error", "Checkout error"),
        description: err?.message || t("event_checkout.something_went_wrong", "Something went wrong. Please try again."),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const [entranceTimeTooltipOpen, setEntranceTimeTooltipOpen] = React.useState(false);
  const [providerFeeTooltipOpen, setProviderFeeTooltipOpen] = React.useState(false);
  const isLg = useIsLg();
  const showMinimalOrderSummary = isMobile; // mobile payment view: minimal summary (top + total only)

  const durationText = React.useMemo(() => {
    const h = eventData.duration_hours;
    if (!h || h <= 0) return null;
    if (h < 1) return `${Math.round(h * 60)} min`;
    if (h === Math.floor(h)) return `${h}h`;
    const hrs = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    return `${hrs}h ${mins}min`;
  }, [eventData.duration_hours]);

  const mobileOrderSummaryContent = (
    <>
      {onBackToAddons ? (
        <button
          type="button"
          onClick={onBackToAddons}
          className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 transition-colors w-fit mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("event_checkout.back_to_addons", "Back to add-ons")}
        </button>
      ) : (
        <Link
          to={`/events/${eventSlug}`}
          className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 transition-colors w-fit mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("event_checkout.back_to_event", "Back to event")}
        </Link>
      )}
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2.5">
        {t("event_checkout.order_summary", "Order summary")}
      </div>
      <h2 className="text-xl font-semibold text-white leading-snug mb-3">{eventData.title}</h2>
      <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/65 mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-white/40" />
          <span>{eventDateTime.text}</span>
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
      <div className="border-t border-white/[0.08] pt-5 space-y-3">
        <div className="flex items-center justify-between text-2xl font-semibold">
          <span className="text-white/80">{t("event_checkout.ticket", "Ticket")}</span>
          <span className="text-white tabular-nums">{formatEventPrice(eventData.ticket_price, priceOpts)}</span>
        </div>
        {(eventData.whats_included ?? []).length > 0 && (
          <Collapsible open={whatsIncludedOpen} onOpenChange={setWhatsIncludedOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 text-sm text-white/55 hover:text-white/70 transition-colors py-0.5 -ml-0.5"
              >
                <span>{t("event_checkout.see_whats_included", "See what's included")}</span>
                {whatsIncludedOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="list-disc list-inside text-sm text-white/55 space-y-0.5 pl-0.5 pt-1">
                {(eventData.whats_included ?? []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}
        {(eventData.addons ?? []).length > 0 &&
          (() => {
            const addonLines = (eventData.addons ?? []).filter((a) => (selectedAddons[a.id] ?? 0) > 0);
            return addonLines.length > 0 ? (
              <div className="space-y-1.5">
                {addonLines.map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-sm">
                    <span className="text-white/55">
                      {a.name}
                      {selectedAddons[a.id] > 1 ? ` ×${selectedAddons[a.id]}` : ""}
                    </span>
                    <span className="text-white/82">
                      {formatEventPrice(a.price * (selectedAddons[a.id] ?? 0), priceOpts)}
                    </span>
                  </div>
                ))}
              </div>
            ) : null;
          })()}
        {eventData.provider_fee > 0 ? (
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/55">{t("event_checkout.provider_fee", "Provider fee")}</span>
            <span className="text-white/82">{formatEventPrice(eventData.provider_fee, priceOpts)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between text-sm pb-4 border-b border-white/[0.07]">
          <span className="text-white/55">{t("event_checkout.pulse_fee", "Pulse fee")}</span>
          <span className="text-white/82">{formatEventPrice(eventData.platform_fee, priceOpts)}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-semibold text-white">{t("event_checkout.total", "Total")}</span>
          <span className="text-3xl font-bold text-white">{formattedTotalPrice}</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
      {/* ── Left panel: Order summary (desktop only on payment view) ── */}
      <div className={cn("order-1 lg:order-1 lg:col-span-5 bg-[#070C14] flex flex-col border-r border-white/[0.07]", isMobile && "hidden")}>
        {/* Back nav */}
        <div className="px-8 pt-4 lg:px-10 lg:pt-12 pb-4 lg:pb-6">
          <Link
            to={`/events/${eventSlug}`}
            className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("event_checkout.back_to_event", "Back to event")}
          </Link>
        </div>

        <div className="flex-1 flex flex-col px-8 lg:px-10 pb-10 lg:pb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2.5">
            {t("event_checkout.order_summary", "Order summary")}
          </div>
          <h2 className="text-xl font-semibold text-white leading-snug mb-3">
            {eventData.title}
          </h2>

          <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/65 mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-white/40" />
              <span className="inline-flex items-center gap-2">
                <span>{eventDateTime.text}</span>
                {!showMinimalOrderSummary && eventDateTime.hasWindow ? (
                  <TooltipProvider delayDuration={isLg ? 100 : 999999}>
                    <Tooltip open={entranceTimeTooltipOpen} onOpenChange={setEntranceTimeTooltipOpen}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setEntranceTimeTooltipOpen((prev) => !prev)}
                          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-black/20 text-[11px] font-semibold text-white/80 hover:bg-black/30 hover:text-white transition-colors"
                          aria-label={t("event_checkout.entrance_time_help", "Entrance time info")}
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
            {!showMinimalOrderSummary && durationText ? (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-white/40" />
                <span>{durationText}</span>
              </div>
            ) : null}
          </div>

          <div className={cn("mb-4", showMinimalOrderSummary ? "hidden" : "hidden lg:block")}>
            <EventProviderSection
              provider={eventData.provider}
              compact
              slim
              hideDescription
              hideEventLink
            />
          </div>

          <div className={cn("border-t border-white/[0.08] pt-5", showMinimalOrderSummary ? "" : "space-y-3")}>
            {!showMinimalOrderSummary && (
              <>
                <div className="flex items-center justify-between text-2xl font-semibold">
                  <span className="text-white/80">{t("event_checkout.ticket", "Ticket")}</span>
                  <span className="text-white tabular-nums">{formatEventPrice(eventData.ticket_price, priceOpts)}</span>
                </div>
                {(eventData.whats_included ?? []).length > 0 && (
                  <Collapsible open={whatsIncludedOpen} onOpenChange={setWhatsIncludedOpen}>
                    <CollapsibleTrigger asChild>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-2 text-sm text-white/55 hover:text-white/70 transition-colors py-0.5 -ml-0.5"
                      >
                        <span>{t("event_checkout.see_whats_included", "See what's included")}</span>
                        {whatsIncludedOpen ? (
                          <ChevronUp className="h-4 w-4 shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ul className="list-disc list-inside text-sm text-white/55 space-y-0.5 pl-0.5 pt-1">
                        {(eventData.whats_included ?? []).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                )}
                {(eventData.addons ?? []).length > 0 &&
                  (() => {
                    const addonLines = (eventData.addons ?? []).filter((a) => (selectedAddons[a.id] ?? 0) > 0);
                    return addonLines.length > 0 ? (
                      <div className="space-y-1.5">
                        {addonLines.map((a) => (
                          <div key={a.id} className="flex items-center justify-between text-sm">
                            <span className="text-white/55">
                              {a.name}
                              {selectedAddons[a.id] > 1 ? ` ×${selectedAddons[a.id]}` : ""}
                            </span>
                            <span className="text-white/82">
                              {formatEventPrice(a.price * (selectedAddons[a.id] ?? 0), priceOpts)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null;
                  })()}
                {eventData.provider_fee > 0 ? (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-white/55">
                  {t("event_checkout.provider_fee", "Provider fee")}
                  <TooltipProvider delayDuration={isLg ? 100 : 999999}>
                    <Tooltip open={providerFeeTooltipOpen} onOpenChange={setProviderFeeTooltipOpen}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setProviderFeeTooltipOpen((prev) => !prev)}
                          className="inline-flex cursor-default shrink-0 text-white/35 hover:text-white/70 transition-colors"
                          aria-label={t("event_checkout.provider_fee_tooltip", "This fee is charged by the event organiser. We show it here so there are no surprises at payment.")}
                        >
                          <Info className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="max-w-[220px] text-xs leading-relaxed border-white/15 bg-[#131B2E] text-white/85"
                      >
                        {t("event_checkout.provider_fee_tooltip", "This fee is charged by the event organiser. We show it here so there are no surprises at payment.")}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
                <span className="text-white/82">{formatEventPrice(eventData.provider_fee, priceOpts)}</span>
              </div>
            ) : null}
                <div className="flex items-center justify-between text-sm pb-4 border-b border-white/[0.07]">
                  <span className="text-white/55">{t("event_checkout.pulse_fee", "Pulse fee")}</span>
                  <span className="text-white/82">{formatEventPrice(eventData.platform_fee, priceOpts)}</span>
                </div>
              </>
            )}
            <div className={cn("flex items-center justify-between", showMinimalOrderSummary ? "pt-0" : "pt-1")}>
              <span className="text-base font-semibold text-white">{t("event_checkout.total", "Total")}</span>
              <span className="text-3xl font-bold text-white">{formattedTotalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: Payment form ── */}
      <div className={cn("order-2 lg:order-2 lg:col-span-7 bg-[#0C1220] flex flex-col px-8 pt-4 pb-8 lg:px-12 lg:pt-8 lg:pb-10", isMobile && "pb-24")}>
        <h1 className="text-xl font-semibold text-white mb-6">{t("event_checkout.complete_booking", "Complete your booking")}</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="form-autofill-dark flex flex-col gap-5 flex-1">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-xs font-medium uppercase tracking-wide">
                        {t("event_checkout.first_name", "Your name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("event_checkout.first_name_placeholder", "Jane")}
                          autoComplete="given-name"
                          className="mt-1.5 h-11 rounded-lg bg-white/[0.05] border-white/15 text-white placeholder:text-white/35 focus-visible:ring-[#38D1BF]/35 focus-visible:border-[#38D1BF]/60"
                          {...field}
                          onFocus={() => {
                            if (!hasFiredFirstNameFocus.current) {
                              hasFiredFirstNameFocus.current = true;
                              trackMetaPixelEvent(
                                "event_checkout_first_name_focused",
                                { ...baseCheckoutParams },
                                { custom: true }
                              );
                            }
                          }}
                          onBlur={(e) => {
                            field.onBlur();
                            const val = (e.target.value || "").trim();
                            if (val.length >= 2 && !hasFiredFirstNameShared.current) {
                              hasFiredFirstNameShared.current = true;
                              trackMetaPixelEvent(
                                "event_payment_first_name_shared",
                                { ...baseCheckoutParams },
                                { custom: true }
                              );
                              initMetaPixelAdvancedMatching({
                                fn: val,
                                ct: eventData.city_label || undefined,
                              });
                            }
                            tryAttachEmailsEarly();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {nameReady ? (
                <FormField
                  control={form.control}
                  name="buyerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-xs font-medium uppercase tracking-wide">
                        {t("event_checkout.buyer_email", "Email for your ticket")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("event_checkout.buyer_email_placeholder", "you@example.com")}
                          autoComplete="email"
                          className="mt-1.5 h-11 rounded-lg bg-white/[0.05] border-white/15 text-white placeholder:text-white/35 focus-visible:ring-[#38D1BF]/35 focus-visible:border-[#38D1BF]/60"
                          {...field}
                          onBlur={(e) => {
                            field.onBlur();
                            const emVal = (e.target.value || "").trim().toLowerCase();
                            if (emVal && !hasFiredEmailShared.current) {
                              const emailValid = z.string().trim().min(1).email().safeParse(emVal).success;
                              if (emailValid) {
                                hasFiredEmailShared.current = true;
                                trackMetaPixelEvent(
                                  "event_payment_email_shared",
                                  { ...baseCheckoutParams },
                                  { custom: true }
                                );
                                const fnVal = (form.getValues("firstName") || "").trim();
                                initMetaPixelAdvancedMatching({
                                  em: emVal,
                                  fn: fnVal || undefined,
                                  ct: eventData.city_label || undefined,
                                });
                              }
                            }
                            tryAttachEmailsEarly();
                          }}
                        />
                      </FormControl>
                      <p className="text-[11px] text-white/45 mt-1">
                        {t("event_checkout.buyer_email_helper", "We'll send your e-ticket here")}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}

              <p className="text-xs text-white/55 leading-relaxed">
                {t("event_checkout.terms_inline", "By continuing, you agree to the")}{" "}
                <Link
                  to="/event-booking-terms"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#38D1BF] hover:underline"
                >
                  {t("legal.event_booking_terms.link_text", "Event Booking Terms")}
                </Link>{" "}
                {t("event_checkout.booking_terms_and", "and")}{" "}
                <Link
                  to="/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#38D1BF] hover:underline"
                >
                  {t("legal.privacy.link_text", "privacy policy")}
                </Link>
                .
              </p>
            </div>

            <div className="space-y-4">
              {hasDirectBankTransfer ? (
                <Tabs
                  value={paymentMethodTab}
                  onValueChange={(v) => {
                    setPaymentMethodTab(v as "stripe" | "bank");
                    if (v === "bank") {
                      trackMetaPixelEvent("event_bank_transfer_tab_click", { ...baseCheckoutParams }, { custom: true });
                    }
                  }}
                  className="w-full"
                >
                  <TabsList className="mb-4 flex w-full rounded-xl border border-white/15 bg-white/[0.03] p-1">
                    <TabsTrigger
                      value="stripe"
                      className="flex-1 text-white/80 hover:text-white/90 data-[state=active]:bg-[#38D1BF]/15 data-[state=active]:text-[#38D1BF]"
                    >
                      {t("event_checkout.tab_pay_with_card", "Pay with card")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="bank"
                      disabled={!paymentRequirementsMet || bankTransferLoading}
                      className="flex-1 text-white/80 hover:text-white/90 data-[state=active]:bg-[#38D1BF]/15 data-[state=active]:text-[#38D1BF]"
                    >
                      {t("event_checkout.tab_direct_bank_transfer", "Direct bank transfer")}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="stripe" className="mt-0">
                    <div
                      className={cn(
                        "relative rounded-xl",
                        !paymentRequirementsMet && "opacity-60",
                      )}
                      aria-disabled={!paymentRequirementsMet}
                    >
                      {!paymentRequirementsMet ? (
                  <>
                    <button
                      type="button"
                      className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px] cursor-pointer"
                      onClick={() => setShowLockedPaymentDialog(true)}
                      aria-label={t("event_checkout.payment_section_locked", "Payment section locked. Click for details.")}
                    />
                    {showLockedPaymentDialog ? (
                      <div
                        className="absolute inset-0 z-20 flex items-start justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t("event_checkout.payment_section_locked_label", "Payment section locked")}
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
                            aria-label={t("event_checkout.close", "Close")}
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <div className="flex items-start gap-3.5 pr-8">
                            <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] border border-white/15 shrink-0">
                              <Lock className="h-4 w-4 text-white/70" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-white">
                                {t("event_checkout.enter_email_first", "Enter your name and email first")}
                              </div>
                              <div className="mt-1.5 text-xs leading-relaxed text-white/70">
                                {t("event_checkout.enter_email_desc", "Add your name and email for your ticket to unlock Apple Pay, Google Pay, and card payment options.")}
                              </div>
                              <button
                                type="button"
                                className="mt-4 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/[0.09] hover:border-white/25 transition-colors"
                                onClick={() => {
                                  setShowLockedPaymentDialog(false);
                                  const first = (form.getValues("firstName") || "").trim();
                                  if (!first) form.setFocus("firstName");
                                  else form.setFocus("buyerEmail");
                                }}
                              >
                                {t("event_checkout.add_email", "Add email")}
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
                    !paymentRequirementsMet && "pointer-events-none select-none pt-20",
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
                  </TabsContent>
                  <TabsContent value="bank" className="mt-0">
                    <div className="rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4">
                      {/* 1. Total amount to transfer — shown first so user knows exactly what to send */}
                      <div className="rounded-lg border border-[#38D1BF]/30 bg-[#38D1BF]/5 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-white/60 mb-1">
                          {t("event_checkout.bank_transfer_amount_label", "Amount to transfer")}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-[#38D1BF] tabular-nums">
                            {formattedTotalPrice}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              const amountToCopy = priceOpts.useComma
                                ? totalWithAddons.toFixed(2).replace(".", ",")
                                : totalWithAddons.toFixed(2);
                              trackMetaPixelEvent("event_bank_transfer_amount_copy_click", { ...baseCheckoutParams }, { custom: true });
                              void navigator.clipboard.writeText(amountToCopy);
                              toast({ title: t("event_checkout.amount_copied", "Amount copied") });
                            }}
                            className="text-[#38D1BF]/80 hover:text-[#38D1BF] transition-colors shrink-0"
                            aria-label={t("event_checkout.copy_amount", "Copy amount")}
                          >
                            <Copy size={18} />
                          </button>
                        </div>
                      </div>

                      {/* 2. Bank account details — where to send the money */}
                      <div>
                        <p className="text-sm text-white/80 mb-2">
                          {t("event_checkout.bank_transfer_intro", "Transfer directly to this bank account:")}
                        </p>
                        <pre className="text-sm text-white/90 whitespace-pre-wrap font-sans rounded-lg bg-black/20 p-4 border border-white/10">
                          {(eventData.direct_bank_details ?? "").trim()}
                        </pre>
                      </div>

                      {/* 3. Reference code — what to put in the transfer reference field */}
                      {bankTransferOrderId ? (
                        <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-4">
                          <p className="text-sm text-white/90 mb-2">
                            {t("event_checkout.bank_transfer_reference_hint", "Use this reference when making your bank transfer:")}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-lg text-amber-400 tracking-wide select-all">
                              {bankTransferOrderId}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                trackMetaPixelEvent("event_bank_transfer_reference_copy_click", { ...baseCheckoutParams }, { custom: true });
                                void navigator.clipboard.writeText(bankTransferOrderId);
                                toast({ title: t("event_checkout.reference_copied", "Reference copied") });
                              }}
                              className="text-amber-400/80 hover:text-amber-400 transition-colors shrink-0"
                              aria-label={t("event_checkout.copy_reference", "Copy reference")}
                            >
                              <Copy size={18} />
                            </button>
                          </div>
                        </div>
                      ) : null}

                      {bankTransferLoading && (
                        <p className="text-sm text-white/60">{t("event_checkout.processing", "Processing...")}</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div
                  className={cn(
                    "relative rounded-xl",
                    !paymentRequirementsMet && "opacity-60",
                  )}
                  aria-disabled={!paymentRequirementsMet}
                >
                  {!paymentRequirementsMet ? (
                    <>
                      <button
                        type="button"
                        className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px] cursor-pointer"
                        onClick={() => setShowLockedPaymentDialog(true)}
                        aria-label={t("event_checkout.payment_section_locked", "Payment section locked. Click for details.")}
                      />
                      {showLockedPaymentDialog ? (
                        <div
                          className="absolute inset-0 z-20 flex items-start justify-center p-4"
                          role="dialog"
                          aria-modal="true"
                          aria-label={t("event_checkout.payment_section_locked_label", "Payment section locked")}
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
                              aria-label={t("event_checkout.close", "Close")}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            <div className="flex items-start gap-3.5 pr-8">
                              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] border border-white/15 shrink-0">
                                <Lock className="h-4 w-4 text-white/70" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">
                                  {t("event_checkout.enter_email_first", "Enter your name and email first")}
                                </div>
                                <div className="mt-1.5 text-xs leading-relaxed text-white/70">
                                  {t("event_checkout.enter_email_desc", "Add your name and email for your ticket to unlock Apple Pay, Google Pay, and card payment options.")}
                                </div>
                                <button
                                  type="button"
                                  className="mt-4 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/[0.09] hover:border-white/25 transition-colors"
                                  onClick={() => {
                                    setShowLockedPaymentDialog(false);
                                    const first = (form.getValues("firstName") || "").trim();
                                    if (!first) form.setFocus("firstName");
                                    else form.setFocus("buyerEmail");
                                  }}
                                >
                                  {t("event_checkout.add_email", "Add email")}
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
                      !paymentRequirementsMet && "pointer-events-none select-none pt-20",
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
              )}

              {(!hasDirectBankTransfer || paymentMethodTab === "stripe") && (
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[11px] text-white/45">
                    {t("event_checkout.details_encrypted", "Details are encrypted and sent directly to Stripe.")}
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
              )}

              <div className="space-y-2">
                {!eventData.sold_out && (eventData.tickets_remaining ?? 20) > 0 ? (
                  <p className="text-sm text-amber-400/90">
                    {isMobile
                      ? t("event_detail.sticky.tickets_remaining_short", "Only {n} spots left for this event").replace("{n}", String(eventData.tickets_remaining ?? 20))
                      : t("event_detail.sticky.tickets_remaining", "Only {n} tickets left").replace("{n}", String(eventData.tickets_remaining ?? 20))}
                  </p>
                ) : null}
                {hasDirectBankTransfer && paymentMethodTab === "bank" ? (
                  <Button
                    type="button"
                    size="xl"
                    variant={bankTransferConfirmedPaid ? "secondary" : "default"}
                    className={cn(
                      "w-full h-12 rounded-xl font-semibold text-base transition-colors",
                      bankTransferConfirmedPaid
                        ? "bg-[#38D1BF]/20 border-[#38D1BF]/40 text-[#38D1BF] cursor-default"
                        : "bg-[#38D1BF] text-[#041712] hover:bg-[#2FC0AF] focus-visible:ring-[#38D1BF]/45"
                    )}
                    onClick={() => {
                      trackMetaPixelEvent("event_bank_transfer_i_paid_click", { ...baseCheckoutParams }, { custom: true });
                      confirmAndSubmitRef.current = true;
                      setBankTransferConfirmedPaid(true);
                      form.handleSubmit(onSubmit)();
                    }}
                    disabled={bankTransferConfirmedPaid || submitting || !bankTransferOrderId}
                  >
                    {submitting
                      ? t("event_checkout.processing", "Processing...")
                      : bankTransferConfirmedPaid ? (
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4" />
                          {t("event_checkout.bank_transfer_i_paid_done", "I've made the transfer")}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CircleCheck className="h-4 w-4" />
                          {t("event_checkout.bank_transfer_i_paid", "I confirm I've made the transfer")}
                        </span>
                      )}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="xl"
                    className="w-full h-12 rounded-xl bg-[#38D1BF] text-[#041712] hover:bg-[#2FC0AF] focus-visible:ring-[#38D1BF]/45 font-semibold text-base"
                    disabled={!stripe || !elements || submitting || !paymentRequirementsMet}
                  >
                    {submitting
                      ? t("event_checkout.processing", "Processing...")
                      : paymentRequirementsMet
                        ? t("event_checkout.pay_amount", "Book your spot {amount}").replace("{amount}", formattedTotalPrice || "")
                        : t("event_checkout.complete_details_to_continue", "Complete required details to continue")}
                  </Button>
                )}
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#38D1BF]/60 shrink-0" />
                  {t("event_checkout.payment_encrypted", "Payment encrypted and processed securely by Stripe.")}
                </div>
                <div className="text-[11px] text-white/35 font-mono">
                  {t("event_checkout.order_label", "Order:")} {orderId}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
      {isMobile && (
        <Drawer>
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#070C14] border-t border-white/[0.12] px-4 py-4 pb-[max(calc(1rem+3rem),calc(env(safe-area-inset-bottom)+3rem))]">
            <DrawerTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-xl bg-white/[0.06] border border-white/15 px-5 py-4 text-left hover:bg-white/[0.08] transition-colors"
              >
                <span className="text-sm text-white/70">{t("event_checkout.view_order_summary", "View order summary")}</span>
                <span className="flex items-center gap-2 text-lg font-bold text-white tabular-nums">
                  {formattedTotalPrice}
                  <ChevronUp className="h-5 w-5 text-white/60" />
                </span>
              </button>
            </DrawerTrigger>
          </div>
          <DrawerContent className="bg-[#070C14] border-white/[0.12] border-t max-h-[85vh] [&>div:first-of-type]:hidden">
            <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/20" aria-hidden />
            <div className="overflow-y-auto px-6 pb-8 pt-4">
              <DrawerHeader>
                <DrawerTitle className="text-white sr-only">{t("event_checkout.order_summary", "Order summary")}</DrawerTitle>
              </DrawerHeader>
              {mobileOrderSummaryContent}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

function CheckoutPrePayment({
  eventSlug,
  eventData,
  selectedAddons,
  setSelectedAddons,
  onContinueToPayment,
  intentLoading,
  t,
}: {
  eventSlug: string;
  eventData: GetKikiEventResponse;
  selectedAddons: Record<number, number>;
  setSelectedAddons: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  onContinueToPayment: (formValues: CheckoutFormValues) => Promise<void>;
  intentLoading: boolean;
  t: (key: string, fallback: string) => string;
}) {
  const checkoutSchema = React.useMemo(() => createCheckoutSchema(t), [t]);
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      buyerEmail: "",
      attendeeSameAsBuyer: true,
      attendeeEmail: "",
    },
    mode: "onTouched",
  });

  const priceOpts = getEventPriceOpts(eventData);
  const addonsTotalMajor = React.useMemo(() => {
    const addons = eventData.addons ?? [];
    return addons.reduce((sum, a) => sum + (a.price * (selectedAddons[a.id] ?? 0)), 0);
  }, [eventData.addons, selectedAddons]);
  const totalWithAddons =
    eventData.ticket_price + eventData.provider_fee + eventData.platform_fee + addonsTotalMajor;
  const formattedTotalPrice = formatEventPrice(totalWithAddons, priceOpts);

  const { currentLanguage } = useTranslation();
  const locale = currentLanguage === "es" ? "es" : "en-US";
  const eventDateTime = React.useMemo(() => {
    const start = parseEventLocalDateTime(eventData.datetime_local);
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
    const latest = (eventData.datetime_local_latest || "").trim();
    if (!latest) return { text: `${date} · ${startTime}`, hasWindow: false };
    const latestTime = parseEventLocalDateTime(latest).toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
    });
    const startsBetween = t("event_checkout.starts_between", "Starts between");
    return { text: `${date} · ${startsBetween} ${startTime}–${latestTime}`, hasWindow: true };
  }, [eventData.datetime_local, eventData.datetime_local_latest, locale, t]);

  const durationText = React.useMemo(() => {
    const h = eventData.duration_hours;
    if (!h || h <= 0) return null;
    if (h < 1) return `${Math.round(h * 60)} min`;
    if (h === Math.floor(h)) return `${h}h`;
    const hrs = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    return `${hrs}h ${mins}min`;
  }, [eventData.duration_hours]);

  const [entranceTimeTooltipOpen, setEntranceTimeTooltipOpen] = React.useState(false);
  const [providerFeeTooltipOpen, setProviderFeeTooltipOpen] = React.useState(false);
  const [showValidationBanner, setShowValidationBanner] = React.useState(false);
  const [mobileCheckoutStep, setMobileCheckoutStep] = React.useState<"summary" | "details">("summary");
  const [whatsIncludedOpen, setWhatsIncludedOpen] = React.useState(false);
  const [addonDescriptionTooltipId, setAddonDescriptionTooltipId] = React.useState<number | null>(null);
  const isLg = useIsLg();
  const isMobile = useIsMobile();

  const baseCheckoutParams = React.useMemo(
    () => buildCheckoutEventParams(eventData),
    [eventData]
  );

  const handleMobileContinueToDetails = React.useCallback(() => {
    trackMetaPixelEvent("event_checkout_mobile_continue_to_details", { ...baseCheckoutParams }, { custom: true });
    setMobileCheckoutStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [baseCheckoutParams]);

  // Focus firstName when transitioning to details step on mobile
  React.useEffect(() => {
    if (!isMobile || mobileCheckoutStep !== "details") return;
    const id = requestAnimationFrame(() => {
      setTimeout(() => form.setFocus("firstName"), 50);
    });
    return () => cancelAnimationFrame(id);
  }, [isMobile, mobileCheckoutStep, form]);

  const entranceTimeTooltip = t(
    "event_checkout.entrance_time_tooltip",
    "Your entrance time depends on the group we match you into — it can be any time in this range. This helps your match group meet each other (instead of mixing with everyone at once)."
  );

  const handleContinue = React.useCallback(async () => {
    const ok = await form.trigger();
    if (!ok) {
      setShowValidationBanner(true);
      // Focus first invalid field so user sees where the problem is
      const errors = form.formState.errors;
      if (errors.firstName) form.setFocus("firstName");
      else if (errors.buyerEmail) form.setFocus("buyerEmail");
      else if (errors.attendeeEmail) form.setFocus("attendeeEmail");
      return;
    }
    setShowValidationBanner(false);
    await onContinueToPayment(form.getValues());
  }, [form, onContinueToPayment]);

  const firstNameValue = form.watch("firstName");
  const buyerEmailValue = form.watch("buyerEmail");
  const isPrepaymentFormValid = React.useMemo(() => {
    const first = (firstNameValue || "").trim();
    const email = (buyerEmailValue || "").trim();
    const firstNameOk = first.length > 0;
    const emailOk = z.string().trim().min(1).email().safeParse(email).success;
    return firstNameOk && emailOk;
  }, [firstNameValue, buyerEmailValue]);

  // Clear validation banner when form becomes valid
  React.useEffect(() => {
    if (isPrepaymentFormValid) setShowValidationBanner(false);
  }, [isPrepaymentFormValid]);

  // Auto-trigger continue when name + email become valid (debounced)
  const autoContinueTriggeredRef = React.useRef(false);
  React.useEffect(() => {
    if (!isPrepaymentFormValid) {
      autoContinueTriggeredRef.current = false;
      return;
    }
    if (intentLoading) return;
    const t = setTimeout(() => {
      if (autoContinueTriggeredRef.current) return;
      autoContinueTriggeredRef.current = true;
      void handleContinue();
    }, 400);
    return () => clearTimeout(t);
  }, [isPrepaymentFormValid, intentLoading, handleContinue]);

  const setAddonQuantity = React.useCallback(
    (addonId: number, delta: number, maxQuantity?: number) => {
      setSelectedAddons((prev) => {
        const current = prev[addonId] ?? 0;
        let qty = current + delta;
        qty = Math.max(0, qty);
        if (maxQuantity != null && delta > 0) {
          qty = Math.min(qty, maxQuantity);
        }
        if (qty === 0) {
          const next = { ...prev };
          delete next[addonId];
          return next;
        }
        return { ...prev, [addonId]: qty };
      });
    },
    [setSelectedAddons]
  );

  const showOrderSummary = !isMobile || mobileCheckoutStep === "summary";
  const showFormSection = !isMobile || mobileCheckoutStep === "details";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
      <div
        className={cn(
          "order-1 lg:order-1 lg:col-span-5 bg-[#070C14] flex flex-col border-r border-white/[0.07]",
          !showOrderSummary && "hidden lg:flex"
        )}
      >
        <div className="px-8 pt-4 lg:px-10 lg:pt-12 pb-4 lg:pb-6">
          <Link
            to={`/events/${eventSlug}`}
            className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("event_checkout.back_to_event", "Back to event")}
          </Link>
        </div>
        <div className={cn(
          "flex-1 flex flex-col px-8 lg:px-10 overflow-visible",
          isMobile ? "pb-0 min-h-0" : "pb-10 lg:pb-12"
        )}>
          <div className={cn(
            "flex-1 flex flex-col min-h-0",
            isMobile && "overflow-y-auto pb-36"
          )}>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2.5">
            {t("event_checkout.order_summary", "Order summary")}
          </div>
          <h2 className="text-xl font-semibold text-white leading-snug mb-3">{eventData.title}</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/65 mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-white/40" />
              <span className="inline-flex items-center gap-2">
                <span>{eventDateTime.text}</span>
                {eventDateTime.hasWindow ? (
                  <TooltipProvider delayDuration={isLg ? 100 : 999999}>
                    <Tooltip open={entranceTimeTooltipOpen} onOpenChange={setEntranceTimeTooltipOpen}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setEntranceTimeTooltipOpen((prev) => !prev)}
                          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-black/20 text-[11px] font-semibold text-white/80 hover:bg-black/30 hover:text-white transition-colors"
                          aria-label={t("event_checkout.entrance_time_help", "Entrance time info")}
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
          <div className="hidden lg:block mb-4">
            <EventProviderSection
              provider={eventData.provider}
              compact
              slim
              hideDescription
              hideEventLink
            />
          </div>
          <div className="border-t border-white/[0.08] pt-5 space-y-3 -mr-8 lg:-mr-10">
            <div className="flex items-center justify-between text-2xl font-semibold pr-8 lg:pr-10">
              <span className="text-white/80">{t("event_checkout.ticket", "Ticket")}</span>
              <span className="text-white tabular-nums">{formatEventPrice(eventData.ticket_price, priceOpts)}</span>
            </div>
            {(eventData.whats_included ?? []).length > 0 && (
              <Collapsible open={whatsIncludedOpen} onOpenChange={setWhatsIncludedOpen} className="pr-8 lg:pr-10">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 text-sm text-white/55 hover:text-white/70 transition-colors py-0.5 -ml-0.5"
                  >
                    <span>{t("event_checkout.see_whats_included", "See what's included")}</span>
                    {whatsIncludedOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="list-disc list-inside text-sm text-white/55 space-y-0.5 pl-0.5 pt-1">
                    {(eventData.whats_included ?? []).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            )}
            {(eventData.addons ?? []).length > 0 ? (
              <div className="space-y-2.5 py-2">
                <div className="text-xs font-medium text-white/50 uppercase tracking-wider pr-8 lg:pr-10">
                  {t("event_checkout.addons", "Add-ons")}
                </div>
                {(eventData.addons ?? []).map((addon) => {
                  const qty = selectedAddons[addon.id] ?? 0;
                  const maxQty = addon.max_quantity;
                  const atMax = maxQty != null && qty >= maxQty;
                  return (
                  <div
                    key={addon.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] pl-3 pr-0 pt-3 pb-3 mr-4 lg:mr-6"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-white/90">{addon.name}</span>
                        {addon.description &&
                          isMobile && (
                            <TooltipProvider delayDuration={999999}>
                              <Tooltip
                                open={addonDescriptionTooltipId === addon.id}
                                onOpenChange={(open) => setAddonDescriptionTooltipId(open ? addon.id : null)}
                              >
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setAddonDescriptionTooltipId((prev) => (prev === addon.id ? null : addon.id));
                                    }}
                                    className="inline-flex shrink-0 p-1.5 -m-1.5 rounded-full text-white/45 hover:text-white/75 active:text-white/90 transition-colors touch-manipulation"
                                    aria-label={t("event_checkout.addon_description", "Add-on description")}
                                  >
                                    <Info className="h-3.5 w-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent
                                  side={isMobile ? "top" : "right"}
                                  collisionPadding={16}
                                  className="max-w-[min(260px,calc(100vw-2rem))] text-xs leading-relaxed border-white/15 bg-[#131B2E] text-white/90"
                                >
                                  {addon.description}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                      </div>
                      {addon.description && !isMobile && (
                        <p className="text-xs text-white/55 mt-0.5 line-clamp-2">{addon.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setAddonQuantity(addon.id, -1, addon.max_quantity)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                        aria-label={t("event_checkout.addon_decrease", "Decrease quantity")}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-medium text-white tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAddonQuantity(addon.id, 1, addon.max_quantity)}
                        disabled={atMax}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
                        aria-label={t("event_checkout.addon_increase", "Increase quantity")}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[5.5rem] text-right pl-2 pr-4 lg:pr-4 text-sm text-white/82 tabular-nums">
                        {formatEventPrice(addon.price, priceOpts)}
                      </span>
                    </div>
                  </div>
                  );
                })}
              </div>
            ) : null}
            {eventData.provider_fee > 0 ? (
              <div className="flex items-center justify-between text-sm pr-8 lg:pr-10">
                <span className="flex items-center gap-1.5 text-white/55">
                  {t("event_checkout.provider_fee", "Provider fee")}
                  <TooltipProvider delayDuration={isLg ? 100 : 999999}>
                    <Tooltip open={providerFeeTooltipOpen} onOpenChange={setProviderFeeTooltipOpen}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setProviderFeeTooltipOpen((p) => !p)}
                          className="inline-flex cursor-default shrink-0 text-white/35 hover:text-white/70 transition-colors"
                          aria-label={t("event_checkout.provider_fee_tooltip", "Provider fee info")}
                        >
                          <Info className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="max-w-[220px] text-xs leading-relaxed border-white/15 bg-[#131B2E] text-white/85"
                      >
                        {t("event_checkout.provider_fee_tooltip", "This fee is charged by the event organiser. We show it here so there are no surprises at payment.")}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
                <span className="text-white/82">{formatEventPrice(eventData.provider_fee, priceOpts)}</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between text-sm pb-4 border-b border-white/[0.07] pr-8 lg:pr-10">
              <span className="text-white/55">{t("event_checkout.pulse_fee", "Pulse fee")}</span>
              <span className="text-white/82">{formatEventPrice(eventData.platform_fee, priceOpts)}</span>
            </div>
          </div>
            {!isMobile ? (
              <div className="flex items-center justify-between pt-1 pr-8 lg:pr-10">
                <span className="text-base font-semibold text-white">{t("event_checkout.total", "Total")}</span>
                <span className="text-3xl font-bold text-white">{formattedTotalPrice}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {isMobile && showOrderSummary && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#070C14] border-t border-white/[0.12] px-4 py-4 pb-[max(calc(1rem+3rem),calc(env(safe-area-inset-bottom)+3rem))]">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-base font-semibold text-white">{t("event_checkout.total", "Total")}</span>
            <span className="text-2xl font-bold text-white tabular-nums">{formattedTotalPrice}</span>
          </div>
          <Button
            type="button"
            size="xl"
            className="w-full h-12 rounded-xl bg-[#38D1BF] text-[#041712] hover:bg-[#2FC0AF] focus-visible:ring-[#38D1BF]/45 font-semibold text-base"
            onClick={handleMobileContinueToDetails}
          >
            {t("event_checkout.continue_to_payment", "Continue")}
          </Button>
        </div>
      )}
      <div
        className={cn(
          "order-2 lg:order-2 lg:col-span-7 bg-[#0C1220] flex flex-col px-8 pt-4 pb-8 lg:px-12 lg:pt-8 lg:pb-10",
          !showFormSection && "hidden lg:flex"
        )}
      >
        {isMobile && (
          <button
            type="button"
            onClick={() => setMobileCheckoutStep("summary")}
            className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 transition-colors w-fit mb-4 lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("event_checkout.go_back", "Go back")}
          </button>
        )}
        <h1 className="text-xl font-semibold text-white mb-6">
          {t("event_checkout.complete_booking", "Complete your booking")}
        </h1>
        <Form {...form}>
          <form className="form-autofill-dark flex flex-col gap-5 flex-1">
            <CheckoutFormFields form={form} t={t} />
            {showValidationBanner ? (
              <div
                role="alert"
                className="rounded-lg border border-amber-500/50 bg-amber-500/15 px-4 py-3 text-sm text-amber-200"
              >
                {t(
                  "event_checkout.validation.complete_details_banner",
                  "Please enter your name and a valid email address to continue."
                )}
              </div>
            ) : null}
            <div className="space-y-2">
              {!eventData.sold_out && (eventData.tickets_remaining ?? 20) > 0 ? (
                <p className="text-sm text-amber-400/90">
                  {isMobile
                    ? t("event_detail.sticky.tickets_remaining_short", "Only {n} spots left for this event").replace("{n}", String(eventData.tickets_remaining ?? 20))
                    : t("event_detail.sticky.tickets_remaining", "Only {n} tickets left").replace("{n}", String(eventData.tickets_remaining ?? 20))}
                </p>
              ) : null}
              <Button
                type="button"
                size="xl"
                className="w-full h-12 rounded-xl bg-[#38D1BF] text-[#041712] hover:bg-[#2FC0AF] focus-visible:ring-[#38D1BF]/45 font-semibold text-base"
                disabled={intentLoading}
                onClick={handleContinue}
              >
                {intentLoading
                  ? t("event_checkout.processing", "Processing...")
                  : t("event_checkout.continue_to_payment", "Continue")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

function CheckoutFormFields({
  form,
  t,
}: {
  form: ReturnType<typeof useForm<CheckoutFormValues>>;
  t: (key: string, fallback: string) => string;
}) {
  const firstNameValue = form.watch("firstName");
  const nameReady = (firstNameValue || "").trim().length > 0;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/70 text-xs font-medium uppercase tracking-wide">
                {t("event_checkout.first_name", "Your name")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("event_checkout.first_name_placeholder", "Jane")}
                  autoComplete="given-name"
                  className="mt-1.5 h-11 rounded-lg bg-white/[0.05] border-white/15 text-white placeholder:text-white/35 focus-visible:ring-[#38D1BF]/35 focus-visible:border-[#38D1BF]/60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      {nameReady ? (
        <FormField
          control={form.control}
          name="buyerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/70 text-xs font-medium uppercase tracking-wide">
                {t("event_checkout.buyer_email", "Email for your ticket")}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("event_checkout.buyer_email_placeholder", "you@example.com")}
                  autoComplete="email"
                  className="mt-1.5 h-11 rounded-lg bg-white/[0.05] border-white/15 text-white placeholder:text-white/35 focus-visible:ring-[#38D1BF]/35 focus-visible:border-[#38D1BF]/60"
                  {...field}
                />
              </FormControl>
              <p className="text-[11px] text-white/45 mt-1">
                {t("event_checkout.buyer_email_helper", "We'll send your e-ticket here")}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : null}
      <p className="text-xs text-white/55 leading-relaxed">
        {t("event_checkout.terms_inline", "By continuing, you agree to the")}{" "}
        <Link to="/event-booking-terms" target="_blank" rel="noreferrer" className="text-[#38D1BF] hover:underline">
          {t("legal.event_booking_terms.link_text", "Event Booking Terms")}
        </Link>{" "}
        {t("event_checkout.booking_terms_and", "and")}{" "}
        <Link to="/privacy" target="_blank" rel="noreferrer" className="text-[#38D1BF] hover:underline">
          {t("legal.privacy.link_text", "privacy policy")}
        </Link>
        .
      </p>
    </div>
  );
}

const EventCheckout = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { t, currentLanguage } = useTranslation();
  const { changeLanguage } = useLanguage();
  const { setChatContext } = useChatContext();

  const [eventData, setEventData] = React.useState<GetKikiEventResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  const [intentLoading, setIntentLoading] = React.useState(false);
  const [intentFailure, setIntentFailure] = React.useState<CheckoutIntentFailure>(null);
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

  const locale = currentLanguage === "es" ? "es" : "en-US";

  React.useEffect(() => {
    if (!eventData || notFound) return;
    const faqParams = buildEventFaqParamsFromEventData(
      eventData,
      locale,
      t("event_detail.starts_between", "Starts between")
    );
    const quickQs = buildEventChatQuickQuestions(t, faqParams);
    setChatContext(buildEventContext(eventData, locale, pathname), eventData.title, quickQs);
    return () => setChatContext(null);
  }, [eventData, notFound, locale, pathname, setChatContext, t]);

  const idempotencyKey = React.useMemo(() => {
    const key = `kiki_checkout_idempotency_key:${eventSlug || ""}`;
    return getOrCreateSessionKey(key);
  }, [eventSlug]);
  const idempotencyKeyBank = React.useMemo(() => {
    const key = `kiki_checkout_idempotency_key_bank:${eventSlug || ""}`;
    return getOrCreateSessionKey(key);
  }, [eventSlug]);

  const checkoutHref = `/events/${eventSlug || ""}/checkout`;
  const trackCheckoutClick = useEventTrackCheckoutClick(eventData, notFound, checkoutHref);

  const [selectedAddons, setSelectedAddons] = React.useState<Record<number, number>>({});
  const selectedAddonsRef = React.useRef<Record<number, number>>({});
  React.useEffect(() => {
    selectedAddonsRef.current = selectedAddons;
  }, [selectedAddons]);

  const [pendingFormValues, setPendingFormValues] = React.useState<CheckoutFormValues | null>(null);
  const [bankTransferOrderId, setBankTransferOrderId] = React.useState<string | null>(null);
  const [bankTransferLoading, setBankTransferLoading] = React.useState(false);

  // Initialize addons from default_quantity when event data loads
  React.useEffect(() => {
    const addons = eventData?.addons ?? [];
    if (addons.length === 0) return;
    setSelectedAddons((prev) => {
      if (Object.keys(prev).length > 0) return prev;
      const initial: Record<number, number> = {};
      for (const a of addons) {
        const qty = a.default_quantity ?? 0;
        if (qty > 0) {
          const max = a.max_quantity ?? Infinity;
          initial[a.id] = Math.min(qty, max);
        }
      }
      return initial;
    });
  }, [eventData?.addons]);

  const createIntent = React.useCallback(async () => {
    if (!eventSlug) return;
    setIntentFailure(null);
    setIntentLoading(true);
    try {
      const currentAddons = selectedAddonsRef.current;
      const addons = Object.entries(currentAddons)
        .filter(([, qty]) => qty > 0)
        .map(([addonId, qty]) => ({ addon_id: Number(addonId), quantity: qty }));
      const res = await fetch(CREATE_INTENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          kiki_slug: eventSlug,
          idempotency_key: idempotencyKey,
          addons,
        }),
      });
      let body: unknown = {};
      try {
        body = await res.json();
      } catch {
        body = {};
      }
      if (!res.ok) {
        const detail = parsePaymentIntentErrorDetail(body);
        const msg =
          detail || t("event_checkout.couldnt_start_checkout", "Couldn't start checkout");
        setIntentFailure({ kind: "generic", message: msg });
        trackMetaPixelEvent(
          "event_checkout_create_intent_failed",
          {
            event_slug: eventSlug,
            error_message: msg,
          },
          { custom: true }
        );
        toast({
          title: t("event_checkout.checkout_error", "Checkout error"),
          description: msg,
          variant: "destructive",
        });
        return;
      }
      const json = body as CreateIntentResponse;
      if (!json?.client_secret || !json?.order_id) {
        const message = t("event_checkout.couldnt_start_checkout", "Couldn't start checkout");
        setIntentFailure({ kind: "generic", message });
        trackMetaPixelEvent(
          "event_checkout_create_intent_failed",
          {
            event_slug: eventSlug,
            error_message: "missing_client_secret",
          },
          { custom: true }
        );
        toast({
          title: t("event_checkout.checkout_error", "Checkout error"),
          description: message,
          variant: "destructive",
        });
        return;
      }
      if (eventData?.sold_out) {
        setIntentFailure({ kind: "sold_out" });
        trackMetaPixelEvent(
          "event_checkout_sold_out_after_intent",
          { event_slug: eventSlug },
          { custom: true }
        );
        toast({
          title: t("event_checkout.event_sold_out_title", "This event is sold out"),
          description: t(
            "event_checkout.event_sold_out_toast",
            "There are no tickets left for this event."
          ),
        });
        return;
      }
      setOrderId(json.customer_id ?? json.order_id);
      setClientSecret(json.client_secret);
    } catch (err: any) {
      const message = err?.message || t("event_checkout.couldnt_start_checkout", "Couldn't start checkout");
      setIntentFailure({ kind: "generic", message });
      trackMetaPixelEvent(
        "event_checkout_create_intent_failed",
        {
          event_slug: eventSlug,
          error_message: message,
        },
        { custom: true }
      );
      toast({
        title: t("event_checkout.checkout_error", "Checkout error"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setIntentLoading(false);
    }
  }, [eventSlug, idempotencyKey, eventData?.sold_out, toast, t]);

  const createBankTransferIntent = React.useCallback(
    async (values: CheckoutFormValues) => {
      if (!eventSlug) return;
      setBankTransferLoading(true);
      try {
        const buyerEmail = (values.buyerEmail || "").trim().toLowerCase();
        const attendeeEmail = values.attendeeSameAsBuyer
          ? buyerEmail
          : (values.attendeeEmail || "").trim().toLowerCase();
        const currentAddons = selectedAddonsRef.current;
        const addons = Object.entries(currentAddons)
          .filter(([, qty]) => qty > 0)
          .map(([addonId, qty]) => ({ addon_id: Number(addonId), quantity: qty }));
        const res = await fetch(CREATE_INTENT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            kiki_slug: eventSlug,
            idempotency_key: idempotencyKeyBank,
            direct_bank_transfer: true,
            buyer_email: buyerEmail,
            attendee_email: attendeeEmail,
            addons,
          }),
        });
        if (!res.ok) {
          let body: unknown = {};
          try {
            body = await res.json();
          } catch {
            body = {};
          }
          const detail = parsePaymentIntentErrorDetail(body);
          const msg =
            detail || t("event_checkout.couldnt_start_checkout", "Couldn't start checkout");
          throw new Error(msg);
        }
        const json = (await res.json()) as CreateIntentResponse;
        if (!json?.order_id) {
          throw new Error("Missing order ID from server");
        }
        if (eventData?.sold_out) {
          setClientSecret(null);
          setOrderId(null);
          setBankTransferOrderId(null);
          setPendingFormValues(null);
          setIntentFailure({ kind: "sold_out" });
          toast({
            title: t("event_checkout.event_sold_out_title", "This event is sold out"),
            description: t(
              "event_checkout.event_sold_out_toast",
              "There are no tickets left for this event."
            ),
          });
          return;
        }
        setBankTransferOrderId(json.customer_id ?? json.order_id);
      } catch (err: any) {
        const message = err?.message || t("event_checkout.couldnt_start_checkout", "Couldn't start checkout");
        toast({
          title: t("event_checkout.checkout_error", "Checkout error"),
          description: message,
          variant: "destructive",
        });
      } finally {
        setBankTransferLoading(false);
      }
    },
    [eventSlug, idempotencyKeyBank, eventData?.sold_out, toast, t]
  );

  const handleContinueToPayment = React.useCallback(
    async (formValues: CheckoutFormValues) => {
      setPendingFormValues(formValues);
      await createIntent();
    },
    [createIntent]
  );

  const handleBackToAddons = React.useCallback(() => {
    setClientSecret(null);
    setOrderId(null);
    setPendingFormValues(null);
    setBankTransferOrderId(null);
    setIntentFailure(null);
  }, []);

  const eventHeaderValue =
    eventSlug && checkoutHref
      ? { eventSlug, checkoutHref, trackCheckoutClick }
      : null;

  if (loading) {
    return eventHeaderValue ? (
      <EventHeaderProvider value={eventHeaderValue}>
        <div className="flex flex-col min-h-screen dark">
          <PageLoadingOverlay show={true} />
          <Navbar />
          <main className="flex-grow" />
          <Footer />
        </div>
      </EventHeaderProvider>
    ) : (
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
    title: { en: `Checkout: ${eventData.title} | Pulse`, es: `Pago: ${eventData.title} | Pulse` },
    description: { en: eventData.short_description, es: eventData.short_description },
    pathname: checkoutPath,
    image: eventData.primary_image,
    type: "website" as const,
  };

  if (!stripePromise) {
    const content = (
      <>
        <Seo {...seoProps} />
        <div className="min-h-screen bg-[#090D14] text-white">
          <Navbar />
          <main className="px-6 pt-20 lg:pt-32 pb-16">
            <div className="w-full max-w-xl mx-auto">
              <Card className="border-white/10 bg-[#0C1220]">
                <CardContent className="p-8">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45 mb-2">{t("event_checkout.checkout", "Checkout")}</div>
                  <div className="text-2xl font-semibold text-white">{t("event_checkout.checkout_unavailable", "Checkout unavailable")}</div>
                  <div className="mt-2 text-sm text-white/65">
                    {t("event_checkout.stripe_not_configured", "Stripe is not configured. Please set")}{" "}
                    <span className="font-mono text-white/80">VITE_STRIPE_PUBLISHABLE_KEY</span>.
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/events/${eventSlug}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white/85 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t("event_checkout.back_to_event", "Back to event")}
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
    return eventHeaderValue ? (
      <EventHeaderProvider value={eventHeaderValue}>{content}</EventHeaderProvider>
    ) : (
      content
    );
  }

  const mainContent = (
    <>
      <Seo {...seoProps} />
      <div className="min-h-screen bg-[#090D14] text-white">
        <Navbar />
        <main className="pt-16 lg:pt-20">
          {intentFailure?.kind === "sold_out" ? (
            <div className="px-6 py-16">
              <div className="w-full max-w-xl mx-auto">
                <Card className="border-amber-500/35 bg-[#0C1220] shadow-[0_0_0_1px_rgba(245,158,11,0.12)]">
                  <CardContent className="p-8">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-2">
                      {t("event_checkout.checkout", "Checkout")}
                    </div>
                    <div className="text-2xl font-semibold text-white">
                      {t("event_checkout.event_sold_out_title", "This event is sold out")}
                    </div>
                    <div
                      role="status"
                      className="mt-4 rounded-lg border border-amber-500/45 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-100/95"
                    >
                      {t(
                        "event_checkout.event_sold_out_body",
                        "There are no tickets left for this event. Head back to browse other experiences."
                      )}
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/events/${eventSlug}`}
                        className="inline-flex items-center gap-2 justify-center rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white/85 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {t("event_checkout.back_to_event", "Back to event")}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : intentFailure?.kind === "generic" ? (
            <div className="px-6 py-16">
              <div className="w-full max-w-xl mx-auto">
                <Card className="border-white/10 bg-[#0C1220]">
                  <CardContent className="p-8">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45 mb-2">{t("event_checkout.checkout", "Checkout")}</div>
                    <div className="text-2xl font-semibold text-white">{t("event_checkout.couldnt_start_checkout", "Couldn't start checkout")}</div>
                    <div className="mt-2 text-sm text-white/65">{intentFailure.message}</div>
                    <div className="mt-6 flex gap-3 flex-col sm:flex-row">
                      <Button
                        onClick={createIntent}
                        disabled={intentLoading}
                        className="rounded-lg bg-[#38D1BF] text-[#041712] hover:bg-[#2FC0AF] font-semibold"
                      >
                        {t("event_checkout.try_again", "Try again")}
                      </Button>
                      <Link
                        to={`/events/${eventSlug}`}
                        className="inline-flex items-center gap-2 justify-center rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-sm font-medium text-white/85 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {t("event_checkout.back_to_event", "Back to event")}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : clientSecret && orderId ? (
            <Elements
              key={orderId}
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
                selectedAddons={selectedAddons}
                initialFormValues={pendingFormValues ?? undefined}
                bankTransferOrderId={bankTransferOrderId}
                onRequestBankTransferIntent={createBankTransferIntent}
                bankTransferLoading={bankTransferLoading}
                onBackToAddons={handleBackToAddons}
              />
            </Elements>
          ) : (
            <CheckoutPrePayment
              eventSlug={eventSlug}
              eventData={eventData}
              selectedAddons={selectedAddons}
              setSelectedAddons={setSelectedAddons}
              onContinueToPayment={handleContinueToPayment}
              intentLoading={intentLoading}
              t={t}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
  return eventHeaderValue ? (
    <EventHeaderProvider value={eventHeaderValue}>{mainContent}</EventHeaderProvider>
  ) : (
    mainContent
  );
};

export default EventCheckout;
