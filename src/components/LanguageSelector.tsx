
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";

interface LanguageSelectorProps {
  className?: string;
  variant?: "light" | "dark";
}

const LanguageSelector = ({ className = "", variant = "light" }: LanguageSelectorProps) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything when on the client and language is English
  if (mounted && currentLanguage === "en") {
    return null;
  }

  // Get URL for a specific language
  const getLanguageUrl = (targetLang: string) => {
    // Get current URL
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const hostname = urlObj.hostname;
    
    // Split the hostname into parts
    const hostParts = hostname.split('.');
    
    // If target language is English, remove any language subdomain
    if (targetLang === 'en') {
      // If we have a subdomain that's a language code (2 letters), remove it
      if (hostParts.length > 2 && hostParts[0].length === 2) {
        const newHostname = hostParts.slice(1).join('.');
        urlObj.hostname = newHostname;
      }
    } else {
      // For non-English languages, add/replace the language subdomain
      if (hostParts.length > 2 && hostParts[0].length === 2) {
        // Replace existing language subdomain
        hostParts[0] = targetLang;
        urlObj.hostname = hostParts.join('.');
      } else {
        // Add language subdomain
        urlObj.hostname = `${targetLang}.${hostname}`;
      }
    }
    
    return urlObj.toString();
  };

  // Determine styles based on variant
  const styles = {
    light: {
      trigger: "bg-white/90 backdrop-blur-sm border border-gray-200",
      icon: "text-gray-500"
    },
    dark: {
      trigger: "bg-white/10 backdrop-blur-sm border border-white/30 text-white",
      icon: "text-white/70"
    }
  };

  const selectedStyles = styles[variant];

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Select 
        defaultValue={currentLanguage}
        onValueChange={(value) => {
          if (value !== currentLanguage) {
            window.location.href = getLanguageUrl(value);
          }
        }}
      >
        <SelectTrigger className={`w-[120px] ${selectedStyles.trigger}`}>
          <div className="flex items-center gap-2">
            <Globe size={16} className={selectedStyles.icon} />
            <SelectValue placeholder={currentLanguage.toUpperCase()} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
