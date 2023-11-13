import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

import { Location } from '../vite-env';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

const LOCATION_OPTIONS = {
  count: '10',
  format: 'json',
  language: 'en',
  name: 'Kyiv',
} as const;

type SearchResult = Readonly<{ generationtime_ms: number; results?: Array<Location> }>;

export function useSearch(name: string) {
  const [results, setResults] = useState<Array<Location>>([]);
  const [error, setError] = useState<null | AxiosError>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (!name) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setIsSearching(true);

    axios
      .get<SearchResult>(GEOCODING_API_URL, {
        params: {
          ...LOCATION_OPTIONS,
          name,
        },
        signal,
      })
      .then(({ data: { results } }) => setResults(results ?? []))
      .catch((error) => setError(error?.code !== AxiosError.ERR_CANCELED ? error : null))
      .finally(() => setIsSearching(false));

    return () => controller.abort();
  }, [name]);

  return { isSearching, results, error };
}
