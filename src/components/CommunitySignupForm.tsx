
import React from "react";
import { Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  communityName: z.string().min(2, "Community name must be at least 2 characters"),
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Invalid email address"),
  communitySize: z.string().min(1, "Please select a community size"),
});
type FormValues = z.infer<typeof formSchema>;

const CommunitySignupForm = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityName: "",
      name: "",
      email: "",
      communitySize: "",
    }
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Form submitted successfully!",
      description: "We'll get back to you soon about " + data.communityName,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700 p-6 space-y-4">
        <FormField control={form.control} name="communityName" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">Community Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Stanford Alumni Network" className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">Your Name</FormLabel>
            <FormControl>
              <Input placeholder="Your full name" className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your@email.com" className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="communitySize" render={({ field }) => (
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
                <SelectItem value="enterprise">Enterprise (10,000+ members)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300">
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Users size={18} />
              Get Started
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CommunitySignupForm;
