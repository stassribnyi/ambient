import { useCallback, useMemo } from 'react';
import { useUserSettings } from './useUserSettings';
import { MeasurementSystem } from '../vite-env';

function kphToMph(value: number) {
  return value / 1.609344;
}

function celsiusToFahrenheit(value: number) {
  return value * (9 / 5) + 32;
}

const UNITS: {
  [key in MeasurementSystem]: {
    windspeed: string;
    temperature: string;
  };
} = {
  metric: {
    windspeed: 'km/h',
    temperature: 'celsius',
  },
  imperial: {
    windspeed: 'mp/h',
    temperature: 'fahrenheit',
  },
} as const;

export const useUnitsConverter = () => {
  const [{ units }] = useUserSettings();

  const convert = useCallback(
    (target: keyof (typeof UNITS)[keyof typeof UNITS], value: number) => {
      if (units === 'metric') {
        return value;
      }

      switch (target) {
        case 'windspeed':
          return kphToMph(value);
        case 'temperature':
          return celsiusToFahrenheit(value);
        default:
          return value;
      }
    },
    [units],
  );

  return useMemo(
    () => ({
      convert,
      units: UNITS[units],
    }),
    [convert, units],
  );
};
