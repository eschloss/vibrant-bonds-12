
// Mock translations for demonstration
// In a real app, these would be loaded from a server or JSON files

export const translations = {
  en: {
    "hero.title": "Meet New Friends in Your City",
    "hero.description": "We match like-minded people into group chats where AI sparks conversations and plans real-life meetups.",
    "hero.cta": "Meet Your Crew",
    // Add more English translations here
    
    "mission_deadline.group_mission": "Group Mission",
    "mission_deadline.seven_day_mission": "7 Day Mission",
    "mission_deadline.to": "to",
    "mission_deadline.meet_in_real_life": "Meet in Real Life",
    "mission_deadline.description": "Every crew has the same mission: connect and plan a real-life activity within the 7-day deadline. Start by taking our personality quiz to find your crew!",
    "mission_deadline.get_matched": "Get Matched",
    "mission_deadline.next_friend_match": "Next friend match happens in...",
    "mission_deadline.meet_in_person": "Meet in Person",
    "mission_deadline.countdown_begins": "Countdown begins after joining a group."
  },
  es: {
    "hero.title": "Conoce Nuevos Amigos en Tu Ciudad",
    "hero.description": "Emparejamos personas afines en chats grupales donde la IA inicia conversaciones y planea encuentros en la vida real.",
    "hero.cta": "Conoce a Tu Grupo",
    // Add more Spanish translations here
    
    "mission_deadline.group_mission": "Misión del Grupo",
    "mission_deadline.seven_day_mission": "Misión de 7 Días",
    "mission_deadline.to": "para",
    "mission_deadline.meet_in_real_life": "Conocerse en la Vida Real",
    "mission_deadline.description": "Cada grupo tiene la misma misión: conectarse y planear una actividad en la vida real dentro del plazo de 7 días. ¡Comienza tomando nuestro cuestionario de personalidad para encontrar tu grupo!",
    "mission_deadline.get_matched": "Consigue Tu Grupo",
    "mission_deadline.next_friend_match": "La próxima asignación de amigos sucede en...",
    "mission_deadline.meet_in_person": "Conócete en Persona",
    "mission_deadline.countdown_begins": "La cuenta regresiva comienza después de unirse a un grupo."
  },
  // Add more languages as needed
};

export const fetchTranslations = async (lang: string) => {
  // In a real app, this would fetch from an API
  return translations[lang as keyof typeof translations] || translations.en;
};
