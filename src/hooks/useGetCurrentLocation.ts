import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useGeolocated } from 'react-geolocated';

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

export const useGetCurrentLocation = () => {
  const [location, setLocation] = useState<null | Location>(null);
  const [error, setError] = useState<null | AxiosError | GeolocationPositionError>(null);

  const { isGeolocationAvailable, isGeolocationEnabled, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    suppressLocationOnMount: true,
    onSuccess: ({ coords }) => {
      axios
        .get<ReverseGeocodeLocation>(REVERSE_GEOCODING_API_URL, {
          params: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            localityLanguage: 'en',
          },
        })
        .then(({ data }) => setLocation(reverseGeocodeLocationToLocation(data)))
        .catch(setError);
    },
    onError: (error?: GeolocationPositionError) => setError(error ?? null),
  });

  return { isReady: isGeolocationAvailable || isGeolocationEnabled, error, location, locate: getPosition };
};
