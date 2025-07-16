import { useQuery, QueryFunction } from '@tanstack/react-query';

interface Resource {
  name: string;
  height: string;
  mass: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

interface Homeworld {
  name: string;
}

interface EnrichedResource extends Omit<Resource, 'homeworld' | 'films' | 'vehicles' | 'starships'> {
  homeworld: Homeworld;
  films: any[];
  vehicles: any[];
  starships: any[];
}

const fetchResourceDetail = async (id: string): Promise<Resource> => {
  const res = await fetch(`${import.meta.env.VITE_SWAPI_BASE_URL}/people/${id}`);
  if (!res.ok) throw new Error('Failed to fetch resource');
  return res.json();
};

const fetchHomeworld = async (url: string): Promise<Homeworld> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch homeworld');
  return res.json();
};

const fetchRelatedResources = async (urls: string[]): Promise<any[]> => {
  const promises = urls.map(async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch related resource: ${url}`);
    return res.json();
  });
  return Promise.all(promises);
};

const fetchEnrichedResource: QueryFunction<EnrichedResource, [string, string]> = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const resource = await fetchResourceDetail(id);

  const [homeworld, films, vehicles, starships] = await Promise.all([
    fetchHomeworld(resource.homeworld),
    fetchRelatedResources(resource.films),
    fetchRelatedResources(resource.vehicles),
    fetchRelatedResources(resource.starships),
  ]);

  return {
    ...resource,
    homeworld,
    films,
    vehicles,
    starships,
  };
};

export const useResourceDetail = (id: string) => {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: fetchEnrichedResource,
  });
};