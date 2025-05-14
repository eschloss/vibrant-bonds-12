
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  language?: string;
  variant?: "light" | "dark";
  width?: string;
}

const LanguageSelector = ({ 
  language, 
  variant = "light",
  width = "120px" 
}: LanguageSelectorProps) => {
  const { currentLanguage } = useLanguage();

  // Only show when website language is not English OR when API language differs from current site language
  const showLanguageSelector = currentLanguage !== "en" || (language && language !== currentLanguage);

  if (!showLanguageSelector) return null;

  // Function to get URL for a specific language
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

  // Get language display name
  const getLanguageLabel = (code: string) => {
    switch (code) {
      case "en":
        return "English";
      case "es":
        return "Español";
      case "fr":
        return "Français";
      case "de":
        return "Deutsch";
      case "pt":
        return "Português";
      default:
        return code.toUpperCase();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select 
        defaultValue={currentLanguage}
        onValueChange={(value) => {
          if (value !== currentLanguage) {
            window.location.href = getLanguageUrl(value);
          }
        }}
      >
        <SelectTrigger 
          className={`w-[${width}] ${
            variant === "light" 
              ? "bg-white/90 backdrop-blur-sm border border-gray-200" 
              : "bg-white/10 backdrop-blur-sm border border-white/30 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <Globe size={16} className={variant === "light" ? "text-gray-500" : "text-white/70"} />
            <SelectValue placeholder={currentLanguage.toUpperCase()} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{getLanguageLabel("en")}</SelectItem>
          {language && language !== "en" && (
            <SelectItem value={language}>
              {getLanguageLabel(language)}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
