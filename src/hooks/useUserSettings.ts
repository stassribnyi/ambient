import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { MeasurementSystem } from '../vite-env';

type UserSettings = Readonly<{
  units: MeasurementSystem;
}>;

export const useUserSettings = (): [UserSettings, Dispatch<SetStateAction<UserSettings>>] => {
  const [settings, setSettings] = useLocalStorage<UserSettings>('userSettings', {
    units: 'metric',
  });

  return [settings, setSettings];
};
