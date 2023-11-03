import { useMemo, useRef } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Location } from '../vite-env';
import { useUserSettings } from './useUserSettings';

const DEFAULT_LOCATION: Location = {
  admin1: 'Kyiv City',
  admin1_id: 703447,
  country: 'Ukraine',
  country_code: 'UA',
  country_id: 690791,
  elevation: 187,
  feature_code: 'PPLC',
  id: 703448,
  latitude: 50.45466,
  longitude: 30.5238,
  name: 'Kyiv',
  population: 2797553,
  timezone: 'Europe/Kyiv',
};

function deepCompare<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export const useLocations = () => {
  const valueRef = useRef<Array<Location>>([]);
  const [value, setValue] = useLocalStorage<Array<Location>>('locations', [DEFAULT_LOCATION]);
  const [{ currentLocationId }] = useUserSettings();

  // this is temp workaround to prevent locations value to be changed each time localStorage gets modified
  // TODO: wrap or reimplement useLocalStorage logic, so if value hasn't changed reference stays the same
  const locations = useMemo(() => {
    if (!deepCompare(value, valueRef.current)) {
      valueRef.current = value;
    }

    return valueRef.current;
  }, [value]);

  const current = useMemo(
    () => locations.find((item) => item.id === currentLocationId) ?? DEFAULT_LOCATION,
    [locations, currentLocationId],
  );

  return {
    current,
    locations,
    setLocations: setValue,
  };
};
