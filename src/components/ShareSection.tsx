import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Send } from 'lucide-react';
import { Button } from './ui/button';

const ShareSection: React.FC = () => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(
    `Join me on Pulse! The more people join in your area, the sooner we launch. 🚀`
  );

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5 text-white" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-5 h-5 text-white" />,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5 text-white" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5 text-white" />,
      url: `mailto:?subject=Join%20me%20on%20Pulse!&body=${shareText}%0A${shareUrl}`,
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5 text-white" />,
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    },
  ];

  return (
    <div className="bg-white/5 dark:bg-black/20 border border-primary/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg mt-8">
      <h3 className="text-white text-2xl font-semibold mb-6">Share Pulse</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="ghost"
            size="lg"
            className="flex items-center gap-2 text-white border border-white/20 hover:bg-white/10 backdrop-blur-md transition-all"
            onClick={() => window.open(link.url, '_blank')}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ShareSection;
