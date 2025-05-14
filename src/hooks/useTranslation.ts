
import { useLanguage } from "@/contexts/LanguageContext";

export const useTranslation = () => {
  const { currentLanguage, translate } = useLanguage();
  
  return {
    t: translate,
    currentLanguage,
  };
};
