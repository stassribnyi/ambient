import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { MeasurementSystem } from '../vite-env';

// const UNIT_MAPPING = {
//   mph : { unit : 'km/h', ratio : 1.609 },
//   lbs : { unit : 'kg', ratio : 0.45 },
//   pounds : { unit : 'kg', ratio : 0.45 }
// } as const;

type UserSettings = Readonly<{
  units: MeasurementSystem;
  currentLocationId: number;
}>;

export const useUserSettings = (): [
  UserSettings,
  Dispatch<
    SetStateAction<{
      units: MeasurementSystem;
      currentLocationId: number;
    }>
  >,
] => {
  const [settings, setSettings] = useLocalStorage<UserSettings>('userSettings', {
    units: 'metric',
    currentLocationId: 703448, // Kyiv
  });

  return [settings, setSettings];
};
