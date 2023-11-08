import uvIdxNA from '@bybas/weather-icons/production/fill/all/uv-index.svg';
import uvIdx1 from '@bybas/weather-icons/production/fill/all/uv-index-1.svg';
import uvIdx2 from '@bybas/weather-icons/production/fill/all/uv-index-2.svg';
import uvIdx3 from '@bybas/weather-icons/production/fill/all/uv-index-3.svg';
import uvIdx4 from '@bybas/weather-icons/production/fill/all/uv-index-4.svg';
import uvIdx5 from '@bybas/weather-icons/production/fill/all/uv-index-5.svg';
import uvIdx6 from '@bybas/weather-icons/production/fill/all/uv-index-6.svg';
import uvIdx7 from '@bybas/weather-icons/production/fill/all/uv-index-7.svg';
import uvIdx8 from '@bybas/weather-icons/production/fill/all/uv-index-8.svg';
import uvIdx9 from '@bybas/weather-icons/production/fill/all/uv-index-9.svg';
import uvIdx10 from '@bybas/weather-icons/production/fill/all/uv-index-10.svg';
import uvIdx11 from '@bybas/weather-icons/production/fill/all/uv-index-11.svg';

const UV_INDEX = new Map([
  [1, uvIdx1],
  [2, uvIdx2],
  [3, uvIdx3],
  [4, uvIdx4],
  [5, uvIdx5],
  [6, uvIdx6],
  [7, uvIdx7],
  [8, uvIdx8],
  [9, uvIdx9],
  [10, uvIdx10],
  [11, uvIdx11],
]);

export function uvIndexToScale(index: number) {
  const approximateIdx = Math.round(index);
  let description = 'N/A';

  switch (true) {
    case approximateIdx <= 2:
      description = 'Low';
      break;
    case 3 <= approximateIdx && approximateIdx <= 5:
      description = 'Moderate';
      break;
    case 6 <= approximateIdx && approximateIdx <= 7:
      description = 'High';
      break;
    case 8 < approximateIdx && approximateIdx <= 9:
      description = 'Very High';
      break;
    case 11 <= approximateIdx:
      description = 'Extreme';
      break;
    default:
      break;
  }

  return {
    value: approximateIdx,
    description,
    iconUrl: UV_INDEX.get(approximateIdx) || uvIdxNA,
  };
}
