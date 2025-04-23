import React, { useEffect } from "react";
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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  communityName: z.string().min(2, "Community name must be at least 2 characters"),
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Invalid email address"),
  communitySize: z.string().min(1, "Please select a community size")
});

export type FormValues = z.infer<typeof formSchema>;

const CommunitySignupForm = () => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityName: "",
      name: "",
      email: "",
      communitySize: ""
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
      const script = document.getElementById(scriptId);
      if (script) script.remove();
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.remove();
      if ((window as any).grecaptcha) delete (window as any).grecaptcha;
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
          phone: "", // Optional field in this form
          title: `Community Signup: ${data.communityName}`,
          message: `Community size: ${data.communitySize}`,
          recaptcha: token,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Submitted!",
          description: "We'll be in touch soon.",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err: any) {
      toast({
        title: "Oops!",
        description: err.message || "We couldn’t process your submission.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700 p-6 space-y-4"
      >
        <FormField
          control={form.control}
          name="communityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Community Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Stanford Alumni Network"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-soft-gray" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your full name"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-soft-gray" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-soft-gray" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="communitySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Community Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500">
                    <SelectValue placeholder="Select size..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="small">Small (50-500 members)</SelectItem>
                  <SelectItem value="medium">Medium (500-2,000 members)</SelectItem>
                  <SelectItem value="large">Large (2,000-10,000 members)</SelectItem>
                  <SelectItem value="enterprise">Extra-Large (10,000+ members)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-soft-gray" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-pink/90 hover:via-accent/90 hover:to-pulse-blue/90 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span>Get Started</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CommunitySignupForm;
