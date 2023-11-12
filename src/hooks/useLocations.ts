import { useMemo, useRef } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Location } from '../vite-env';
import { useUserSettings } from './useUserSettings';

// const DEFAULT_LOCATION: Location = {
//   id: 703448,
//   name: 'Kyiv',
//   country: 'Ukraine',
//   admin1: 'Kyiv City',
//   latitude: 50.45466,
//   longitude: 30.5238,
// };

function deepCompare<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

// TODO:
// * refresh button
export const useLocations = () => {
  const valueRef = useRef<Array<Location>>([]);
  const [value, setValue] = useLocalStorage<Array<Location>>('locations', []);
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
    () => locations.find((item) => item.id === currentLocationId),
    [locations, currentLocationId],
  );

  return {
    current,
    locations,
    setLocations: setValue,
  };
};
