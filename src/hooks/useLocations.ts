import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Location } from '../vite-env';
import { useUserSettings } from '.';

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

export const useLocations = () => {
  const [locations, setLocations] = useLocalStorage<Array<Location>>('locations', [DEFAULT_LOCATION]);
  const [{ currentLocationId }] = useUserSettings();

  const current = useMemo(
    () => locations.find((item) => item.id === currentLocationId) ?? DEFAULT_LOCATION,
    [locations, currentLocationId],
  );

  return {
    current,
    locations,
    setLocations,
  };
};
