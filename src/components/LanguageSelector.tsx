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
  width = "200px"  // Wider to avoid wrapping
}: LanguageSelectorProps) => {
  const { currentLanguage } = useLanguage();

  const showLanguageSelector = currentLanguage !== "en" || (language && language !== currentLanguage);
  if (!showLanguageSelector) return null;

  const getLanguageUrl = (targetLang: string) => {
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const hostname = urlObj.hostname;
    const hostParts = hostname.split('.');

    if (targetLang === 'en') {
      if (hostParts.length > 2 && hostParts[0].length === 2) {
        urlObj.hostname = hostParts.slice(1).join('.');
      }
    } else {
      if (hostParts.length > 2 && hostParts[0].length === 2) {
        hostParts[0] = targetLang;
        urlObj.hostname = hostParts.join('.');
      } else {
        urlObj.hostname = `${targetLang}.${hostname}`;
      }
    }

    return urlObj.toString();
  };

  const getLanguageLabel = (code: string) => {
    switch (code) {
      case "en": return "English Speakers";
      case "es": return "Hablantes de Español";
      case "fr": return "Francophones";
      case "de": return "Deutschsprachige";
      case "pt": return "Falantes de Português";
      default: return code.toUpperCase();
    }
  };

  const textColor = variant === "dark" ? "text-white" : "text-black";
  const iconColor = variant === "dark" ? "text-white" : "text-black";

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
className={`w-auto min-w-[200px] bg-transparent ${textColor} justify-start px-2 border-none shadow-none outline-none ring-0 text-left whitespace-nowrap`}
>

          <div className="flex items-center gap-2">
            <Globe size={16} className={iconColor} />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{`${getLanguageLabel("en")}`}</SelectItem>
          {language && language !== "en" && (
            <SelectItem value={language}>
              {`${getLanguageLabel(language)}`}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
