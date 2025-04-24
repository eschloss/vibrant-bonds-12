import React from 'react';
import { Facebook, X, Linkedin, Mail, Send } from 'lucide-react';
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
      name: 'X',
      icon: "",
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    },
    {
    name: 'Reddit',
    icon: "",
    url: `https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}`,
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
      name: 'WhatsApp',
      icon: <Send className="w-5 h-5" />, // or consider a WhatsApp icon if available
      url: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    },

  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="lg"
          className="flex items-center gap-2 text-white px-5 py-3 rounded-full border border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-pulse-pink/30 transition-all duration-300"
          onClick={() => window.open(link.url, '_blank')}
          aria-label={`Share on ${link.name}`}
        >
          {link.icon && <div className="text-white">{link.icon}</div>}
          <span className="hidden sm:inline font-medium">{link.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default ShareSection;
