import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Seo } from "@/hooks/useSeo";

interface JobOpening {
  id: string;
  title: string;
  type: string;
  location: string;
  isRemote: boolean;
  isPartTime: boolean;
  isUnpaid: boolean;
  tldr: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  howToApply: string;
  applicationUrl?: string;
  applicationEmail?: string;
}

const JobOpening = () => {
  const { jobId } = useParams<{ jobId: string }>();

  // Job openings data - in a real app, this would come from an API
  const jobOpenings: Record<string, JobOpening> = {
    "social-growth-intern": {
      id: "social-growth-intern",
      title: "Social Growth & Community Intern",
      type: "Internship",
      location: "Remote",
      isRemote: true,
      isPartTime: true,
      isUnpaid: true,
      tldr: "Pulse is an AI-powered friendship app fighting the loneliness epidemic. We match like-minded people into small groups and use AI to break the ice and plan spontaneous in-person meetups—think salsa classes, laser tag, paint nights, hikes, and more.\n\nWe're looking for creative, self-starting interns to take ownership of a niche growth channel (like Portland Gaymers or meetnewfriends.org) and build a community around a specific identity—Book Lovers, Founders, Expats, Queer Creatives, etc.\n\nThis internship is unpaid, but you'll have the chance to earn commissions—and work directly with experienced founders in tech and growth.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Own a niche community growth project (e.g., Instagram, TikTok, subreddit, SEO microsite, newsletter)",
        "Choose or propose a community identity to grow (e.g. Gaymers, Expats, Book Nerds, Founders, Fitness Buffs)",
        "Create or curate content, engage the community, and drive signups or bookings",
        "Connect people to real-life experiences and meetups through Pulse",
        "Talk to early users and help activate them",
        "Optionally support local partnerships, events, or matchmaking",
        "Share learnings with the team and contribute to our overall growth strategy"
      ],
      requirements: [
        "Passionate about solving loneliness and creating genuine human connection",
        "Curious, creative, and not afraid to take initiative",
        "Comfortable with Instagram, TikTok, Reddit, or SEO (or eager to learn!)",
        "Deeply engaged in at least one niche or identity-based community",
        "Fluent in English or Spanish",
        "Bonus: you've hosted events, built online communities, or run your own project"
      ],
      benefits: [
        "Be part of a mission-driven team tackling the global loneliness crisis",
        "Own a growth project from scratch—with full creative freedom",
        "Learn directly from experienced founders with deep backgrounds in tech, product, and growth strategy",
        "Get mentorship and build a real portfolio project",
        "Priority access to future paid roles or full-time opportunities",
        "Earn commissions: Interns are eligible for our ambassador referral program, which pays 5% commission on all bookings made by users or partners you refer—for a full year after signup. If your growth experiment drives traction, you'll get paid for it."
      ],
      howToApply: "Fill out this quick form. It only takes a few minutes. You'll be asked:\n\n• What community you'd love to grow (and why)\n• A link to your socials or something you've made\n• What excites you about Pulse\n\nNo résumé needed. Just bring ideas, energy, and a desire to help people meet for real 💫",
      applicationUrl: "https://482tykjn26x.typeform.com/to/ifow6R9S"
    }
  };

  const job = jobOpenings[jobId || ""];

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-gray-300 mb-8">The job opening you're looking for doesn't exist.</p>
          <Link to="/careers" className="text-pulse-pink hover:underline">
            ← Back to Careers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const seoProps = {
    title: {
      en: `${job.title} at Pulse | Careers | Pulse`,
      es: `${job.title} en Pulse | Carreras | Pulse`
    },
    description: {
      en: `Join Pulse as a ${job.title}. ${job.tldr.split('\n')[0]}`,
      es: `Únete a Pulse como ${job.title}. ${job.tldr.split('\n')[0]}`
    },
    keywords: ["careers", "jobs", "pulse careers", "internship", "remote work", job.title.toLowerCase()],
    type: "website"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[85px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link to="/careers" className="text-pulse-pink hover:underline text-sm">
                ← Back to Careers
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-gray-800/60 border border-gray-700 px-3 py-1 rounded-full text-sm">
                {job.type}
              </span>
              {job.isRemote && (
                <span className="bg-green-500/20 border border-green-500/30 text-green-300 px-3 py-1 rounded-full text-sm">
                  Remote
                </span>
              )}
              {job.isPartTime && (
                <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm">
                  Part-Time
                </span>
              )}
              {job.isUnpaid && (
                <span className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-3 py-1 rounded-full text-sm">
                  Unpaid
                </span>
              )}
            </div>
            <p className="text-gray-300 text-lg">
              {job.location}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-0 relative bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-0">
            
            {/* TL;DR Section */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 rounded-t-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-pulse-pink">TL;DR</h2>
                <div className="text-gray-300 space-y-4">
                  {job.tldr.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About Pulse */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 rounded-none border-t-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">About Pulse</h2>
                <div className="text-gray-300 space-y-4">
                  {job.about.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What You'll Do */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 rounded-none border-t-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">What You'll Do</h2>
                <ul className="text-gray-300 space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-pulse-pink text-lg mt-0.5">•</span>
                      <span className="leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Who You Are */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 rounded-none border-t-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Who You Are</h2>
                <ul className="text-gray-300 space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-pulse-pink text-lg mt-0.5">•</span>
                      <span className="leading-relaxed">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Why Join */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 rounded-none border-t-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Why Join?</h2>
                <ul className="text-gray-300 space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-pulse-pink text-lg mt-0.5">•</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* How to Apply */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 rounded-none border-t-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">How to Apply</h2>
                <div className="text-gray-300 space-y-4 mb-6">
                  {job.howToApply.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {job.applicationUrl && (
                  <Button asChild className="w-full md:w-auto bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                    <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                      Apply Now
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Back to Careers */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 text-center">
          <Link to="/careers" className="text-pulse-pink hover:underline text-lg">
            ← Back to All Openings
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobOpening;
