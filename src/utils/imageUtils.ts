import { FALLBACK_IMAGES } from './fallbackImages';
export const getImageUrl = (category: string, itemUrl: string): string => {
  const baseUrl = import.meta.env.VITE_GITHUB_ASSETS_URL;

  // Normalize category
  const CATEGORY_MAP: Record<string, keyof typeof FALLBACK_IMAGES> = {
    person: 'people',
    people: 'people',
    film: 'films',
    films: 'films',
    starship: 'starships',
    starships: 'starships',
    vehicle: 'vehicles',
    vehicles: 'vehicles',
    species: 'species',
    planet: 'planets',
    planets: 'planets',
  };

  const normalized = CATEGORY_MAP[category] ?? 'default';

  // Try to extract ID
  const idMatch = itemUrl?.match(/\/([0-9]+)\/?$/);
  const id = idMatch?.[1];

  if (id) {
    return `${baseUrl}/${normalized}/${id}.jpg`;
  }

  // No id, return fallback immediately
  return FALLBACK_IMAGES[normalized] || FALLBACK_IMAGES.default;
};