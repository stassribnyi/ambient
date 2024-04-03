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

// FIXME: fix types, locations should return array and not undefined
export function useSearch(name: string) {
  return useQuery({
    queryKey: ['search', name],
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
}
