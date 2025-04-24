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
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=Join%20me%20on%20Pulse!&body=${shareText}%0A${shareUrl}`,
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    },
  ];

  return (
    <div className="mt-16 text-center">
      <p className="text-xl text-gray-800">
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

export default ShareSection;
