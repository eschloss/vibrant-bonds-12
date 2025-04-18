
export interface City {
  code: string;
  en_name: string;
  es_name: string;
  timezone: string;
  lat: number;
  lng: number;
  language: string;
  max_radius: number;
  main_search_city: boolean;
  is_imperial_system: boolean;
  agg_users: number;
  country_code: number;
  url1: string;
  url2: string;
  en_state: string;
  es_state: string;
  en_country: string;
  es_country: string;
}

export interface CitiesResponse {
  cities: City[];
}
