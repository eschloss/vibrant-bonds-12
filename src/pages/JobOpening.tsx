import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Seo } from "@/hooks/useSeo";
import { trackTypeformRedirect } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();

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
    },
    "social-media-intern": {
      id: "social-media-intern",
      title: "Social Media Intern",
      type: "Internship",
      location: "Remote",
      isRemote: true,
      isPartTime: true,
      isUnpaid: true,
      tldr: "Help shape the voice of a social app rethinking friendship.\n\nPulse is an AI-powered friendship app designed to fight the loneliness epidemic. We match like-minded people into small groups and use AI to break the ice and plan spontaneous real-life meetups—salsa classes, paint nights, hikes, laser tag, and more.\n\nWe're looking for a Social Media Intern to help grow and manage our official brand presence across platforms like Instagram, TikTok, and LinkedIn. This is your chance to own the online voice of a mission-led startup from the very beginning.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Plan, create, and post content for Pulse's official social media accounts (IG, TikTok, LinkedIn, possibly Twitter)",
        "Work with the founding team on messaging, visuals, and brand tone",
        "Develop and maintain a social content calendar",
        "Brainstorm and execute fun, creative, mission-aligned campaigns",
        "Monitor trends and recommend ways for Pulse to participate or stand out",
        "Track engagement metrics and iterate based on what's working",
        "Optional: support with user interviews, video content, or community spotlights"
      ],
      requirements: [
        "A strong communicator with a great sense of visual and written tone",
        "Deeply familiar with how social media works—especially Instagram & TikTok",
        "Organized, proactive, and able to work independently with minimal oversight",
        "Passionate about Pulse's mission to build real-life friendships",
        "Excited to contribute ideas, test formats, and help shape a brand from scratch",
        "Fluent in English (Spanish is a bonus!)",
        "Bonus: Experience with Canva, CapCut, Figma, or editing tools is a plus"
      ],
      benefits: [
        "Be the voice of a startup tackling one of the most urgent issues of our time: loneliness",
        "Help shape and scale the online presence of a brand from day one",
        "Get hands-on experience with content creation, brand strategy, and digital storytelling",
        "Work closely with experienced startup founders with deep product + growth backgrounds",
        "Priority access to future paid roles or full-time opportunities",
        "Earn commissions: All interns are eligible for our ambassador referral program, earning 5% commission on any bookings driven by users or partners you refer—for 12 months from signup"
      ],
      howToApply: "Fill out this quick form:\n\n👉 https://482tykjn26x.typeform.com/to/ifow6R9S",
      applicationUrl: "https://482tykjn26x.typeform.com/to/ifow6R9S"
    },
    "partnership-manager-intern": {
      id: "partnership-manager-intern",
      title: "Partnership Manager Intern",
      type: "Internship",
      location: "Remote",
      isRemote: true,
      isPartTime: true,
      isUnpaid: true,
      tldr: "Build real-world connections. Get partners excited about friendship. Earn commissions.\n\nPulse is an AI-powered friendship app designed to fight the loneliness epidemic. We match like-minded people into small groups and use AI to plan spontaneous real-life meetups—like salsa classes, paint nights, city hikes, and more.\n\nWe're looking for a Partnership Manager Intern to help us grow our network of local experience providers—yoga studios, escape rooms, wine tastings, and everything in between. You'll be responsible for reaching out to potential partners, pitching Pulse, and onboarding them onto the platform.\n\nYou'll earn a commission on every booking made through partners you bring in—for a full year.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Research and identify local businesses, event organizers, and experience providers in our launch cities",
        "Reach out via email, phone, social, or in-person to pitch Pulse as a new channel for driving group bookings",
        "Explain the value of Pulse and get partners signed up",
        "Walk new partners through onboarding and profile creation",
        "Help partners choose the right activities to offer on the platform",
        "Track conversations and follow up with interested leads",
        "Share feedback with the team to improve partner onboarding and experience"
      ],
      requirements: [
        "A great communicator who enjoys talking to people and building relationships",
        "Comfortable reaching out cold and explaining a new product",
        "Passionate about community, experiences, and real-life social connection",
        "Organized, reliable, and detail-oriented",
        "Excited to work in a startup environment where you can take ownership",
        "Fluent in English or Spanish",
        "Bonus: experience with partnerships, sales, customer success, or event planning"
      ],
      benefits: [
        "Help launch a startup that's rethinking friendship and solving loneliness",
        "Learn practical skills in partnerships, sales, and customer onboarding",
        "Work directly with founders experienced in product, growth, and business development",
        "Take ownership of real results and see your impact from day one",
        "Earn commissions: Interns are eligible for our ambassador referral program, which pays a 5% commission on all bookings made through any partner you sign up—for one year from their sign-up date. That means the more value you bring, the more you earn.",
        "This role is currently unpaid, but Pulse expects to generate revenue in the coming months—and we are committed to hiring from within for future paid roles"
      ],
      howToApply: "Fill out this quick form:\n\n👉 https://482tykjn26x.typeform.com/to/ifow6R9S",
      applicationUrl: "https://482tykjn26x.typeform.com/to/ifow6R9S"
    },
    "affiliate-marketing-manager-intern": {
      id: "affiliate-marketing-manager-intern",
      title: "Affiliate Marketing Manager Intern",
      type: "Internship",
      location: "Remote",
      isRemote: true,
      isPartTime: true,
      isUnpaid: true,
      tldr: "Grow our ambassador network. Recruit the right people. Earn commission on their success.\n\nPulse is an AI-powered friendship app helping people make real-life friends by matching like-minded people into small groups—and using AI to break the ice and plan in-person meetups like salsa classes, laser tag, hikes, and paint nights.\n\nWe're building a global network of Pulse Ambassadors—local champions who help grow communities, host events, and promote Pulse. As an Affiliate Marketing Manager Intern, your mission is to find, recruit, and activate new ambassadors across cities, campuses, and online communities.\n\n💸 You earn 2.5% commission on all bookings made through the ambassadors you recruit—for 12 months from their signup date. The more successful they are, the more you earn.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Identify potential ambassadors through online communities, social platforms, Discords, and student groups",
        "Reach out with personalized DMs, emails, or posts to pitch the program",
        "Help onboard new ambassadors and answer their questions",
        "Share recruitment content across platforms (Instagram, Reddit, Twitter, LinkedIn, etc.)",
        "Track who you've signed up and how they're performing",
        "Collaborate with the Pulse team to improve our ambassador materials and onboarding",
        "Optional: help shape the ambassador playbook, resources, or content strategy"
      ],
      requirements: [
        "A strong communicator who enjoys reaching out and building relationships",
        "Familiar with influencer marketing, ambassador programs, or affiliate models",
        "Organized, self-driven, and able to manage your own outreach pipeline",
        "Passionate about helping people connect and build real-life friendships",
        "Fluent in English or Spanish",
        "Bonus: experience with affiliate platforms, email tools, or social media marketing"
      ],
      benefits: [
        "Be part of a mission-driven team working to solve the loneliness epidemic",
        "Learn practical skills in affiliate marketing, outreach, and brand growth",
        "Work directly with experienced startup founders on real growth strategy",
        "Get priority for future paid roles or full-time jobs as Pulse grows",
        "Earn commissions: Earn 2.5% commission on all bookings made through ambassadors you recruit. Their commission is 5%—you get half of what they earn, for one year from their signup date. The more high-performing ambassadors you bring in, the more recurring revenue you earn.",
        "This internship is unpaid, but includes commission-based earnings with no cap"
      ],
      howToApply: "Fill out this quick form:\n\n👉 https://482tykjn26x.typeform.com/to/ifow6R9S",
      applicationUrl: "https://482tykjn26x.typeform.com/to/ifow6R9S"
    },
    "social-media-talent-pool": {
      id: "social-media-talent-pool",
      title: "Join Pulse's Social Media Talent Pool",
      type: "Talent Pipeline",
      location: "Remote",
      isRemote: true,
      isPartTime: false,
      isUnpaid: false,
      tldr: "Let's start the conversation now—so we're ready to build together later.\n\nPulse is a fast-growing AI-powered friendship app built to fight the loneliness epidemic. We match like-minded people into small groups and use AI to plan real-life meetups like salsa classes, laser tag, hikes, and paint nights.\n\nWe're building a brand that lives on social—visually, narratively, and culturally. As we grow, we'll need a dream team of social media storytellers, strategists, and creators to help us scale our voice and reach new communities.\n\nWe're not hiring for a specific role yet, but we want to start conversations with talented people who might be a fit for future roles.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Future Roles We're Hiring For:",
        "Head of Social Media & Brand - Set the voice of the brand. Lead strategy. Manage creators. Own growth.",
        "Social Media Channel Manager(s) - Run and grow individual Pulse accounts (TikTok, Instagram, LinkedIn, Reddit, etc.)",
        "Content Creators & Designers - Make short-form videos, memes, carousels, stories, and visuals for our platforms",
        "Community Creators & Collaborators - Help us launch and run city-specific or niche community accounts",
        "Ambassador Program Content Leads - Create tools and templates that help our ambassadors promote Pulse on social"
      ],
      requirements: [
        "You live and breathe social media",
        "You know how to make content that people actually engage with—not just post and pray",
        "You understand how voice, visuals, and timing combine to create vibes",
        "You care about helping people connect in real life and fight loneliness through community",
        "You've got experience—or serious potential—in one or more platforms, especially Instagram, TikTok, Reddit, YouTube Shorts, or Twitter/X",
        "Bonus points if you're: A former content creator, social strategist, or brand manager; A skilled video editor, meme-maker, or storyteller; Involved in niche online communities or IRL social groups; Fluent in English (Spanish is a big plus)"
      ],
      benefits: [
        "We're solving a real problem with a joyful solution",
        "Our brand is playful, bold, and full of heart—no corporate cringe here",
        "You'll work closely with product, growth, and creative from day one",
        "We're early, growing fast, and committed to hiring great people as we scale",
        "This isn't an open role yet—but we want to meet you now, so we can move fast when the moment comes",
        "Get ahead of the curve and be first in line when we start hiring for these roles"
      ],
      howToApply: "Interested? Let's talk.\n\nFill out this short form to join our Social Media Talent Pool:\n\n👉 https://482tykjn26x.typeform.com/to/yiGEfBbk",
      applicationUrl: "https://482tykjn26x.typeform.com/to/yiGEfBbk"
    },
    "growth-team-talent-pool": {
      id: "growth-team-talent-pool",
      title: "Join Pulse's Growth Team Talent Pool",
      type: "Talent Pipeline",
      location: "Remote",
      isRemote: true,
      isPartTime: false,
      isUnpaid: false,
      tldr: "We're assembling our growth dream team. Let's get you on our radar.\n\nPulse is an AI-powered friendship app designed to fight the loneliness epidemic. We match like-minded people into small groups and use AI to break the ice and plan spontaneous real-life meetups—like hikes, wine tastings, laser tag, and paint nights.\n\nWe're already running lean, creative, AI-powered growth experiments—from SEO microsites and niche Reddit funnels to ambassador automation and referral systems. As we gear up to scale, we're building a Growth Team Dream List so we can move fast when it's time to hire.\n\nThis isn't a job opening yet—but if you're great at growing things, we want to start the conversation now.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Future Roles We'll Be Hiring For:",
        "Growth Engineers - Builders who combine product, code, and creativity to unlock scalable acquisition channels",
        "SEO Strategists & Content Operators - Experts at niche site strategy, programmatic SEO, AI-powered content engines, and link-building",
        "Growth Hackers / Technical Marketers - Funnel optimizers, automation tinkerers, landing page wizards, and channel explorers",
        "Retention & Referral Experts - Builders of smart loops, clever incentives, and delightful nudges that bring users back and get them talking",
        "Analytics & Experimentation Leads - People who know how to run growth like a science lab—tracking, learning, and iterating fast"
      ],
      requirements: [
        "You've worked in growth, SEO, technical marketing, or early-stage startups",
        "You know your way around tools and APIs like Supabase, Vercel, Airtable, Notion, Webflow, Zapier, etc.",
        "You're fluent in AI tools (ChatGPT, Claude, DataForSEO, etc.) and know how to build or leverage them for scale",
        "You're a systems thinker with a maker mindset—comfortable testing fast, breaking things, and learning as you go",
        "Bonus: you've worked on AI-first or consumer social products"
      ],
      benefits: [
        "We're building something meaningful—friendship, not FOMO",
        "We ship fast, run lean, and automate where possible",
        "You'll collaborate with founders who've built products, scaled growth, and hustled in the trenches",
        "Our early growth is already working—and now we're ready to build a real engine",
        "This isn't an open role yet—but we're assembling the people we'll call first when it is",
        "Get ahead of the curve and be first in line when we start hiring for these roles"
      ],
      howToApply: "Want In? Add Yourself to the Talent Pool\n\nFill out this quick form to get on our Growth Team radar:\n\n👉 https://482tykjn26x.typeform.com/to/yiGEfBbk",
      applicationUrl: "https://482tykjn26x.typeform.com/to/yiGEfBbk"
    },
    "technical-talent-pool": {
      id: "technical-talent-pool",
      title: "Join Pulse's Technical Talent Pool",
      type: "Talent Pipeline",
      location: "Remote",
      isRemote: true,
      isPartTime: false,
      isUnpaid: false,
      tldr: "We're building a world-class team of makers, builders, and AI-first engineers. Let's connect now.\n\nPulse is an AI-powered friendship app built to solve the loneliness epidemic. We match like-minded people into small groups and use AI to break the ice and plan spontaneous real-life meetups—from paint nights to hiking adventures to salsa classes.\n\nWe're currently in closed beta, scaling fast, and running lean. We've already shipped the first version of the product—but now we're gearing up to build smarter, faster, and more magical. That means assembling our technical talent pool so we're ready to hire when the time is right.\n\nThis isn't a live job opening—but if you want to build products that help people meet in real life, we want you on our radar.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Roles We'll Be Hiring For:",
        "Fullstack Engineers (Frontend + Backend) - Build core product experiences, internal tools, and API integrations using modern stacks (we use Vercel, Supabase, Typescript, etc.)",
        "Frontend/UI Engineers - Craft delightful and responsive web/mobile experiences—fast, beautiful, and scalable",
        "AI/ML Developers - Help us integrate LLMs, agents, and AI-driven workflows that spark real-world interactions",
        "Data Scientists & Analysts - Turn messy human data into actionable insight—powering better matches, smarter suggestions, and meaningful metrics",
        "QA Engineers / Automation Testers - Help us deliver high-quality releases at speed with smart, scalable testing and bug-squashing",
        "DevOps / Infra Engineers - Ensure smooth deploys, fast performance, and reliable uptime across environments"
      ],
      requirements: [
        "You've worked in fast-moving teams and know how to ship without drama",
        "You're fluent in modern frameworks and tools (Next.js, React, Supabase, Tailwind, Typescript, etc.)",
        "You're curious about AI and know how to build with (or around) LLMs and agents",
        "You write clean, maintainable code—and care about UX as much as infrastructure",
        "Bonus if you've built or contributed to social apps, marketplaces, or early-stage products"
      ],
      benefits: [
        "We're tackling one of the most human problems with smart, AI-assisted design",
        "You'll work directly with experienced founders across product, growth, and engineering",
        "We ship fast, learn quickly, and believe in low ego, high trust teams",
        "We don't do bloated roadmaps—we solve real user problems and iterate rapidly",
        "We value great code, but value real-world connection even more",
        "Get ahead of the curve and be first in line when we start hiring for these roles"
      ],
      howToApply: "How to Join the Talent Pool\n\nFill out this short form:\n\n👉 https://482tykjn26x.typeform.com/to/yiGEfBbk",
      applicationUrl: "https://482tykjn26x.typeform.com/to/yiGEfBbk"
    },
    "partnership-talent-pool": {
      id: "partnership-talent-pool",
      title: "Join Pulse's Partnership Talent Pool",
      type: "Talent Pipeline",
      location: "Remote",
      isRemote: true,
      isPartTime: false,
      isUnpaid: false,
      tldr: "Help us build the real-world engine behind real-life friendships.\n\nPulse is an AI-powered friendship app designed to fight the loneliness epidemic. We match like-minded people into small groups and use AI to plan spontaneous in-person meetups—like salsa classes, wine tastings, paint nights, hikes, and more.\n\nTo make these experiences magical, we partner with incredible local businesses in every city we launch—from escape rooms to yoga studios, from cafés to community centers. We're now building our Partnership Team Talent Pool to connect with future collaborators who can help us land, grow, and nurture partnerships at scale.\n\nThese aren't open roles yet, but if you live and breathe local partnerships, we want to hear from you now.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Future Roles We'll Be Hiring For:",
        "Partnership Manager - Own outreach, onboarding, and relationship-building with local experience providers in new and existing cities",
        "City Partnerships Lead - Build and manage a portfolio of local partners in a specific city or region; help Pulse become a trusted local player",
        "Partner Success Manager - Ensure partners feel supported, get results, and love working with Pulse—turning first-time collaborators into long-term champions",
        "Expansion & Launch Specialists - Help us identify and enter new cities by scouting partners, building early traction, and laying the groundwork for growth",
        "Strategic Partnerships & Collaborations - Secure high-impact brand and event partnerships that elevate Pulse and drive visibility across cities or verticals"
      ],
      requirements: [
        "You have a strong network and deep understanding of your local business scene",
        "You're a relationship builder who follows up, follows through, and genuinely cares about people",
        "You know how to pitch creatively and make partnerships feel win-win",
        "You're energized by working across industries—fitness, food, arts, entertainment, nightlife, wellness, etc.",
        "You're fluent in English (Spanish or other local languages are a major plus)",
        "Bonus: You've worked in community-building, sales, biz dev, events, or local marketing"
      ],
      benefits: [
        "You'll help us bring people together in real life—and see the impact of your work in every meetup",
        "You'll collaborate with a fast-moving, mission-driven team that values both heart and hustle",
        "We're early-stage and rapidly growing, which means room to shape your role and scale with us",
        "You'll work directly with experienced founders and growth leads to build local strategy from the ground up",
        "You'll be first in line for paid roles and city launches as we grow",
        "Get ahead of the curve and be first in line when we start hiring for these roles"
      ],
      howToApply: "Want to Get on Our Radar?\n\nFill out this quick form:\n\n👉 https://482tykjn26x.typeform.com/to/yiGEfBbk",
      applicationUrl: "https://482tykjn26x.typeform.com/to/yiGEfBbk"
    },
    "community-manager-talent-pool": {
      id: "community-manager-talent-pool",
      title: "Join Pulse's Community Manager Talent Pool",
      type: "Talent Pipeline",
      location: "Remote",
      isRemote: true,
      isPartTime: false,
      isUnpaid: false,
      tldr: "Bring people together. Make friendship feel local, creative, and real.\n\nPulse is an AI-powered friendship app built to fight the loneliness epidemic. We match like-minded people into small groups and use AI to help them break the ice and plan spontaneous real-life meetups—from paint nights and city hikes to laser tag and book clubs.\n\nWe believe communities are the beating heart of real-life connection. Whether it's Gaymers in Portland, Salsa Lovers in Madrid, Expats in Lisbon, or Founders in New York, we're building with and for the people already doing the work of bringing others together.\n\nWe're now building our Community Manager Talent Pool—to connect with creative, curious people who want to lead the charge in engaging, partnering with, and empowering communities in the cities we operate in.",
      about: "We believe real-life friendship should be easier. Pulse helps people connect in person by matching them into small groups based on shared interests, then suggesting curated local experiences they can enjoy together.\n\nWe're currently in closed beta and growing fast through niche SEO sites and social-first accounts. This is your chance to help shape a social app from the ground up—and build something people actually want.",
      responsibilities: [
        "Future Roles We'll Be Hiring For:",
        "City Community Manager - Lead community activation efforts in a specific city—build relationships, host events, and nurture partnerships with local groups",
        "Interest-Based Community Manager - Engage and grow identity- or interest-specific communities across cities (e.g., Queer Creatives, Book Lovers, Introverts, Fitness Buffs)",
        "Community Partnerships Lead - Build relationships with local organizations, clubs, student groups, and meetup hosts to co-create authentic friendship experiences",
        "Event & Activation Specialist - Plan and execute community-driven events in collaboration with local creators, hosts, and partners",
        "Online Community Moderator / Host - Spark connection inside digital spaces—moderate chats, plan group intros, and keep vibes high in the Pulse experience"
      ],
      requirements: [
        "You've worked with communities before—online, offline, or both",
        "You know how to create momentum, spark engagement, and make people feel like they belong",
        "You're culturally curious and deeply tuned into your local scene",
        "You're creative in how you partner—thinking beyond flyers and posters",
        "You love IRL connection and understand the social dynamics behind real-world friendship",
        "Fluent in English (bonus: Spanish, Portuguese, or local languages depending on city)",
        "Bonus points if you've: Run a club, collective, Discord server, Instagram community, or niche blog; Collaborated with local orgs, artists, businesses, or influencers; Worked on events, outreach, or member onboarding for a community-based org or startup"
      ],
      benefits: [
        "You'll help build something joyful and meaningful in your city",
        "You'll work directly with product, growth, and partnerships to shape how Pulse shows up locally",
        "We're small and early—which means your ideas can directly shape how we engage with people",
        "We're mission-first, design-obsessed, and community-led at our core",
        "You'll be first in line for future paid roles and city launch teams as we scale",
        "Get ahead of the curve and be first in line when we start hiring for these roles"
      ],
      howToApply: "Want to Join the Talent Pool?\n\nFill out this short form:\n\n👉 https://482tykjn26x.typeform.com/to/ifow6R9S",
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
              {t("careers.job.back_to_careers", "← Back to Careers")}
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
                  {t("careers.positions.remote", "Remote")}
                </span>
              )}
              {job.isPartTime && (
                <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {t("careers.positions.part_time", "Part-Time")}
                </span>
              )}
              {job.isUnpaid && (
                <span className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-3 py-1 rounded-full text-sm">
                  {t("careers.positions.unpaid", "Unpaid")}
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
                <h2 className="text-2xl font-bold mb-4 text-pulse-pink">{t("careers.job.tldr", "TL;DR")}</h2>
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
                <h2 className="text-2xl font-bold mb-4 text-white">{t("careers.job.about", "About Pulse")}</h2>
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
                <h2 className="text-2xl font-bold mb-4 text-white">{t("careers.job.what_you_do", "What You'll Do")}</h2>
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
                <h2 className="text-2xl font-bold mb-4 text-white">{t("careers.job.who_you_are", "Who You Are")}</h2>
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
                <h2 className="text-2xl font-bold mb-4 text-white">{t("careers.job.why_join", "Why Join?")}</h2>
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
                <h2 className="text-2xl font-bold mb-4 text-white">{t("careers.job.how_to_apply", "How to Apply")}</h2>
                <div className="text-gray-300 space-y-4 mb-6">
                  {job.howToApply.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {job.applicationUrl && (
                  <Button asChild className="w-full md:w-auto bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                    <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'careers:job_opening', extra: { jobId } })}>
                      {t("careers.job.apply_now", "Apply Now")}
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
            {t("careers.job.back_to_all", "← Back to All Openings")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobOpening;
