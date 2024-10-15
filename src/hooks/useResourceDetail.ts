import { useQuery } from '@tanstack/react-query';

export const useResourceDetail = <T>(resourceUrl: string) => {
  return useQuery<T, Error>({
    queryKey: ['resource', resourceUrl],  
    queryFn: async () => {
      const response = await fetch(resourceUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!resourceUrl,
  });
};
