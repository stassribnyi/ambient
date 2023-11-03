import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { MeasurementSystem } from '../vite-env';

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
