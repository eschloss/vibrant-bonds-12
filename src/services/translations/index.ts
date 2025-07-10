
import { shared } from './shared';
import { about } from './about';
import { mission } from './mission';
import { city } from './city';
import { citylist } from './citylist';
import { communities } from './communities';
import { contact } from './contact';
import { forms } from './forms';
import { hero } from './hero';
import { howItWorks } from './howItWorks';
import { icebreakers } from './icebreakers';
import { team } from './team';

// Combine all translation categories
export const translations = {
  en: {
    ...shared.en,
    ...about.en,
    ...mission.en,
    ...city.en,
    ...citylist.en,
    ...communities.en,
    ...contact.en,
    ...forms.en,
    ...hero.en,
    ...howItWorks.en,
    ...icebreakers.en,
    ...team.en,
  },
  es: {
    ...shared.es,
    ...about.es,
    ...mission.es,
    ...city.es,
    ...citylist.es,
    ...communities.es,
    ...contact.es,
    ...forms.es,
    ...hero.es,
    ...howItWorks.es,
    ...icebreakers.es,
    ...team.es,
  }
};

// Function to fetch translations (can be expanded to load from API in the future)
export const fetchTranslations = async (lang: string) => {
  // In a real app, this would fetch from an API
  return translations[lang as keyof typeof translations] || translations.en;
};
