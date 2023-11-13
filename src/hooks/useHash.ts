import { useState, useCallback, useEffect } from 'react';

export function useHash(): [string, (value?: string | null) => void] {
  const [hash, setHash] = useState(() => window.location.hash.replace('#', ''));

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash.replace('#', ''));
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback(
    (newHash?: string | null) => {
      if (newHash !== hash) {
        window.location.hash = newHash ?? '';
      }
    },
    [hash],
  );

  return [hash, updateHash];
}
