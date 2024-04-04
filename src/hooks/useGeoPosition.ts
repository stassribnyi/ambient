import axios from 'axios';
import { Location } from '../vite-env';
import { useQuery } from '@tanstack/react-query';

// FIXME: move to .env file
const REVERSE_GEOCODING_API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

enum AdminAreaLevel {
  COUNTRY = 2,
  STATE = 4,
  CITY = 7,
}

type Informative = Readonly<{
  name: string;
  geonameId?: number;
}>;

type Administrative = Readonly<
  Informative & {
    adminLevel: AdminAreaLevel;
  }
>;

type ReverseGeocodeLocation = Readonly<{
  latitude: number;
  longitude: number;
  countryName: string;
  principalSubdivision: string;
  city: string;
  localityInfo: Readonly<{
    administrative: Array<Administrative>;
    informative: Array<Informative>;
  }>;
}>;

// TODO: move to mappers?
function mapToLocation({
  city,
  countryName,
  principalSubdivision,
  latitude,
  longitude,
  localityInfo,
}: ReverseGeocodeLocation): Location {
  const cityInfo = localityInfo.administrative.find(
    (info) => info.adminLevel === AdminAreaLevel.CITY || info.name === city,
  );

  const locationId = cityInfo?.geonameId || [city, countryName, principalSubdivision].join(',');

  return {
    id: locationId,
    name: city,
    country: countryName,
    admin1: principalSubdivision,
    latitude: latitude,
    longitude: longitude,
  };
}

// TODO: move to utils?
function getPosition(options?: PositionOptions) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    const geolocation = typeof navigator !== 'undefined' ? navigator.geolocation : undefined;

    if (!geolocation) {
      reject(new Error('POSITION_UNAVAILABLE'));

      return;
    }

    geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export function useGeoPosition() {
  return useQuery({
    queryKey: ['geoposition'],
    queryFn: async () => {
      const { coords } = await getPosition();

      const { data } = await axios.get<ReverseGeocodeLocation>(REVERSE_GEOCODING_API_URL, {
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          localityLanguage: 'en',
        },
      });

      return mapToLocation(data);
    },
  });
}
