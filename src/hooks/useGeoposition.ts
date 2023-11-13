import axios from 'axios';
import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';

import { Location } from '../vite-env';

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

function reverseGeocodeLocationToLocation({
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

async function getLocationByCoords(coords: GeolocationCoordinates) {
  const { data } = await axios.get<ReverseGeocodeLocation>(REVERSE_GEOCODING_API_URL, {
    params: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      localityLanguage: 'en',
    },
  });

  return reverseGeocodeLocationToLocation(data);
}

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

export function useGeoposition() {
  const [position, setPosition] = useState<null | Location>(null);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError | GeolocationPositionError>(null);

  const requestPosition = useCallback(async () => {
    try {
      setIsRequesting(true);

      const { coords } = await getPosition();
      setPosition(await getLocationByCoords(coords));
    } catch (error) {
      setError(error as AxiosError | GeolocationPositionError);
    } finally {
      setIsRequesting(false);
    }
  }, []);

  return { isRequesting, position, requestPosition, error };
}
