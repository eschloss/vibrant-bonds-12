
import { CitiesResponse } from "@/types/city";

export const fetchCities = async (): Promise<CitiesResponse> => {
  const response = await fetch("https://api.kikiapp.eu/auth/get_all_cities");
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  return response.json();
};
