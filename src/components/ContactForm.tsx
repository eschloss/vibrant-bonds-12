
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters"
  }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to our terms and privacy policy"
  })
});
type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
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
      script.src = "https://www.google.com/recaptcha/api.js?render=6LcZtiArAAAAAO1kjOaw8dH6fZ-cR1krOe0Q_LOL";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadReCaptcha();

    return () => {
      // ✅ Cleanup: remove reCAPTCHA script
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }

      // ✅ Also remove badge (invisible reCAPTCHA v3 badge that sticks around)
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) {
        badge.remove();
      }

      // ✅ Optional: reset window.grecaptcha reference
      if ((window as any).grecaptcha) {
        delete (window as any).grecaptcha;
      }
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      // Ensure reCAPTCHA script is available
      if (!(window as any).grecaptcha) {
        throw new Error("reCAPTCHA not loaded");
      }

      const token = await new Promise<string>((resolve, reject) => {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute("6LcZtiArAAAAAO1kjOaw8dH6fZ-cR1krOe0Q_LOL", { action: "contact_form" })
            .then(resolve)
            .catch(reject);
        });
      });


      const response = await fetch("https://api.kikiapp.eu/contact/", {
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
      
      /*
      const params = new URLSearchParams({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        recaptcha: token
      }).toString();
      const response = await fetch(`https://api.kikiapp.eu/contact/?${params}`);
      */

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err: any) {
      toast({
        title: "Oops!",
        description: err.message || "We couldn’t send your message.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Your name" {...field} className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Your email address" type="email" {...field} className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Phone (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Your phone number" type="tel" {...field} className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea placeholder="What would you like to tell us?" {...field} className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500 min-h-[120px]" />
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
                className="border border-pulse-blue data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />            
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I agree to the <a href="/terms" className="text-purple-400 hover:underline">terms of service</a> and <a href="/privacy" className="text-purple-400 hover:underline">privacy policy</a>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )} />
        <Button type="submit" className="w-full bg-gradient-to-r from-pulse-purple to-pulse-blue hover:from-pulse-blue hover:to-pulse-purple" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Message
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
