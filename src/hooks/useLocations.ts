import { useEffect, useMemo, useRef } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Location } from '../vite-env';
import { useUserSettings } from './useUserSettings';
import { useGetCurrentLocation } from '.';

const DEFAULT_LOCATION: Location = {
  id: 703448,
  name: 'Kyiv',
  country: 'Ukraine',
  admin1: 'Kyiv City',
  latitude: 50.45466,
  longitude: 30.5238,
};

function deepCompare<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

// TODO:
// * refresh button
export const useLocations = () => {
  const { isReady, locate, location } = useGetCurrentLocation();
  const valueRef = useRef<Array<Location>>([]);
  const [value, setValue] = useLocalStorage<Array<Location>>('locations', []);
  const [{ currentLocationId }, setUserSettings] = useUserSettings();

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

  useEffect(() => {
    if (!isReady || locations.length > 0) {
      return;
    }

    locate();
  }, [isReady, locate, locations]);

  useEffect(() => {
    if (!location || locations.length > 0) {
      return;
    }

    setValue([location]);
    setUserSettings((settings) => ({ ...settings, currentLocationId: location.id }));
  }, [location, locations, setValue, setUserSettings]);

  return {
    current,
    locations,
    setLocations: setValue,
  };
};
