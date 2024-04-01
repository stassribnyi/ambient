import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Location } from '../vite-env';

// FIXME: move to .env file
const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

const SEARCH_OPTIONS = {
  count: '10',
  format: 'json',
  language: 'en',
} as const;

type SearchResult = Readonly<{ generationtime_ms: number; results?: Array<Location> }>;

export function useSearch(name: string) {
  const {
    data: results,
    isLoading: isSearching,
    error,
  } = useQuery({
    queryKey: ['locations', name],
    queryFn: async ({ signal }) => {
      const {
        data: { results = [] },
      } = await axios.get<SearchResult>(GEOCODING_API_URL, {
        params: { ...SEARCH_OPTIONS, name },
        signal,
      });

      return results;
    },
    enabled: !!name,
    placeholderData: [],
  });

  return { isSearching, results, error };
}
