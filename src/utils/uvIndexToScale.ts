import { UVIndexScale } from '../vite-env';

// TODO: revisit later
export function uvIndexToScale(index: number): UVIndexScale {
  const approximateIndex = Math.round(index);

  if (approximateIndex < 1) {
    return 1;
  }

  if (11 < approximateIndex) {
    return 11;
  }

  return approximateIndex as UVIndexScale;
}
