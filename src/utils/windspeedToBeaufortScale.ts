import { BeaufortScale } from '../vite-env';

// TODO: are there any better ways of processing windspeed?
export function windspeedToBeaufortScale(windspeed: number) {
  let windIndex: BeaufortScale = 0;

  switch (true) {
    case windspeed < 1:
      windIndex = 0;
      break;
    case 1 <= windspeed && windspeed <= 5:
      windIndex = 1;
      break;
    case 5 < windspeed && windspeed <= 11:
      windIndex = 2;
      break;
    case 11 < windspeed && windspeed <= 19:
      windIndex = 3;
      break;
    case 19 < windspeed && windspeed <= 28:
      windIndex = 4;
      break;
    case 28 < windspeed && windspeed <= 38:
      windIndex = 5;
      break;
    case 38 < windspeed && windspeed <= 49:
      windIndex = 6;
      break;
    case 49 < windspeed && windspeed <= 61:
      windIndex = 7;
      break;
    case 61 < windspeed && windspeed <= 74:
      windIndex = 8;
      break;
    case 74 < windspeed && windspeed <= 88:
      windIndex = 9;
      break;
    case 88 < windspeed && windspeed <= 102:
      windIndex = 10;
      break;
    case 102 < windspeed && windspeed <= 117:
      windIndex = 11;
      break;
    case 117 < windspeed:
      windIndex = 12;
      break;
    default:
      break;
  }

  return windIndex;
}
