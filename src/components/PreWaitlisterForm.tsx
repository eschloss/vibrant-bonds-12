import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { RECAPTCHA_SITE_KEY, API_BASE_URL } from "@/lib/constants";

interface PreWaitlisterFormProps {
  cityName: string;
  city?: string;
}

const FieldShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl p-[1.5px] overflow-hidden bg-[linear-gradient(135deg,#FF2D8D,#8010E0,#00D0C0)]">
    <div className="rounded-[1rem] bg-white">
      {children}
    </div>
  </div>
);

const PreWaitlisterForm = ({ cityName, city }: PreWaitlisterFormProps) => {
  const { t } = useTranslation();
  const showOtherCity = !city || city === "oth";

  const formSchema = z.object({
    email: z.string().email({
      message: t(
        "pre_waitlister.validation.email",
        "Please enter a valid email address"
      ),
    }),
    other_city: showOtherCity
      ? z.string().min(1, {
          message: t(
            "pre_waitlister.validation.other_city",
            "Please enter your city"
          ),
        })
      : z.string().optional(),
  });

  type FormValues = z.infer<typeof formSchema>;
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      other_city: "",
    },
  });

  useEffect(() => {
    const scriptId = "recaptcha-script";
    const loadReCaptcha = () => {
      if (document.getElementById(scriptId)) return;
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadReCaptcha();

    return () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.remove();
      if ((window as any).grecaptcha) {
        delete (window as any).grecaptcha;
      }
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      if (!(window as any).grecaptcha) {
        throw new Error("reCAPTCHA not loaded");
      }

      const token = await new Promise<string>((resolve, reject) => {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: "pre_waitlister" })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch(`${API_BASE_URL}/pre-waitlister/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          newsletter: false,
          city: city || data.other_city,
          other_city: showOtherCity ? data.other_city : "",
          recaptcha: token,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: t(
            "pre_waitlister.form.success.title",
            "You're on the waitlist!"
          ),
          description: t(
            "pre_waitlister.form.success.description",
            "Sign up now, and as soo
