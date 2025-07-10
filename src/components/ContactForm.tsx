
import React, { useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/hooks/useTranslation";
import { RECAPTCHA_SITE_KEY, API_BASE_URL } from "@/lib/constants";

const ContactForm = () => {
  const { t } = useTranslation();

  // Create the form schema with translated validation messages
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("contact.validation.name", "Name must be at least 2 characters")
    }),
    email: z.string().email({
      message: t("contact.validation.email", "Please enter a valid email address")
    }),
    phone: z.string().optional(),
    message: z.string().min(10, {
      message: t("contact.validation.message", "Message must be at least 10 characters")
    }),
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: t("contact.validation.terms", "You must agree to our terms and privacy policy")
    })
  });
  
  type FormValues = z.infer<typeof formSchema>;
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreeToTerms: false,
    }
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
      if (script) {
        script.remove();
      }

      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) {
        badge.remove();
      }

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
            .execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          recaptcha: token,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: t("contact.form.success.title", "Message sent!"),
          description: t("contact.form.success.description", "Thank you for contacting us. We'll get back to you soon."),
        });
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err: any) {
      toast({
        title: t("contact.form.error.title", "Oops!"),
        description: err.message || t("contact.form.error.description", "We couldn't send your message."),
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <div className="flex items-center">
              <FormLabel className="font-medium">{t("contact.form.name", "Name")}</FormLabel>
              <h3 className="sr-only">{t("contact.form.name", "Name")}</h3>
            </div>
            <FormControl>
              <Input 
                placeholder={t("contact.form.name_placeholder", "Your name")}
                {...field} 
                className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500 placeholder:text-gray-500" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <div className="flex items-center">
              <FormLabel className="font-medium">{t("contact.form.email", "Email")}</FormLabel>
              <h3 className="sr-only">{t("contact.form.email", "Email")}</h3>
            </div>
            <FormControl>
              <Input 
                placeholder={t("contact.form.email_placeholder", "Your email address")}
                type="email" 
                {...field} 
                className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500 placeholder:text-gray-500" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <div className="flex items-center">
              <FormLabel className="font-medium">{t("contact.form.phone", "Phone (optional)")}</FormLabel>
              <h3 className="sr-only">{t("contact.form.phone", "Phone (optional)")}</h3>
            </div>
            <FormControl>
              <Input 
                placeholder={t("contact.form.phone_placeholder", "Your phone number")}
                type="tel" 
                {...field} 
                className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500 placeholder:text-gray-500" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <div className="flex items-center">
              <FormLabel className="font-medium">{t("contact.form.message", "Message")}</FormLabel>
              <h3 className="sr-only">{t("contact.form.message", "Message")}</h3>
            </div>
            <FormControl>
              <Textarea 
                placeholder={t("contact.form.message_placeholder", "What would you like to tell us?")}
                {...field} 
                className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500 placeholder:text-gray-500 min-h-[120px]" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange} 
                className="border-pulse-blue data-[state=checked]:bg-pulse-blue" 
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {t("contact.form.agree_terms", "I agree to the")} <a target="_blank" href="https://legal.pulsenow.app/terms.html" className="text-pulse-blue hover:underline">terms of service</a> {t("contact.form.and", "and")} <a target="_blank" href="https://legal.pulsenow.app/privacy.html" className="text-pulse-blue hover:underline">privacy policy</a>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )} />
        <Button 
          type="submit" 
          className="w-full bg-pulse-blue hover:bg-pulse-blue/90 transition-colors duration-300" 
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t("contact.form.sending", "Sending...")}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              {t("contact.form.submit", "Send Message")}
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
