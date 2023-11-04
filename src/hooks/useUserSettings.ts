import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Location, MeasurementSystem } from '../vite-env';

type UserSettings = Readonly<{
  units: MeasurementSystem;
  currentLocationId: Location['id'];
}>;

export const useUserSettings = (): [UserSettings, Dispatch<SetStateAction<UserSettings>>] => {
  const [settings, setSettings] = useLocalStorage<UserSettings>('userSettings', {
    units: 'metric',
    currentLocationId: 703448, // Kyiv
  });

  return [settings, setSettings];
};
