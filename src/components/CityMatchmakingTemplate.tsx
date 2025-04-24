import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const CityMatchmakingTemplate = ({ city }: { city: string }) => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Join me on Pulse in ${city}! The more people join, the sooner we'll launch. 🚀`);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=Join%20me%20on%20Pulse!&body=${shareText}%0A${shareUrl}`
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`
    }
  ];

  const progressValue = Math.min(100, Math.floor(Math.random() * (70 - 30 + 1) + 30));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
        Pulse is coming to {city}!
      </h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Get Notified First</CardTitle>
          <CardDescription>
            We're building a community in {city}. Join the waitlist to be the first to know when we launch!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Badge variant="secondary">
                {progressValue}% Complete
              </Badge>
              <Progress value={progressValue} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Estimated Launch: Soon</p>
          <Button>Join Waitlist</Button>
        </CardFooter>
      </Card>

      <p className="text-xl md:text-xl font-normal mt-24 text-gray-800">
        Want it sooner? Share Pulse with friends nearby! Every signup moves your city up the list.
      </p>
      
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
            onClick={() => window.open(link.url, '_blank')}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Button>
        ))}
      </div>

    </div>
  );
};

export default CityMatchmakingTemplate;
