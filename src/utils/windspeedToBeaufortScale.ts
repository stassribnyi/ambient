import { BeaufortScale } from '../vite-env';

// TODO: are there any better ways of processing windspeed?
export function windspeedToBeaufortScale(windspeed: number): BeaufortScale {
  switch (true) {
    case windspeed < 1:
      return 0;
    case 1 <= windspeed && windspeed <= 5:
      return 1;
    case 5 < windspeed && windspeed <= 11:
      return 2;
    case 11 < windspeed && windspeed <= 19:
      return 3;
    case 19 < windspeed && windspeed <= 28:
      return 4;
    case 28 < windspeed && windspeed <= 38:
      return 5;
    case 38 < windspeed && windspeed <= 49:
      return 6;
    case 49 < windspeed && windspeed <= 61:
      return 7;
    case 61 < windspeed && windspeed <= 74:
      return 8;
    case 74 < windspeed && windspeed <= 88:
      return 9;
    case 88 < windspeed && windspeed <= 102:
      return 10;
    case 102 < windspeed && windspeed <= 117:
      return 11;
    case 117 < windspeed:
      return 12;
    default:
      return 0;
  }
}
