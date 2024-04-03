import localforage from 'localforage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Location } from '../vite-env';

const STORE_NAME = 'locations';

export const useLocations = () => {
  const queryClient = useQueryClient();

  const { data: locations = [], isPending } = useQuery({
    queryKey: [STORE_NAME],
    queryFn: async () => {
      const items = await localforage.getItem<Array<Location>>(STORE_NAME);

      return items || [];
    },
    refetchOnMount: false,
  });

  const { mutateAsync: addLocation } = useMutation({
    mutationKey: [STORE_NAME],
    mutationFn: async (location: Location) => {
      locations.forEach((item) => {
        item.isPrimary = false;
      });

      await localforage.setItem(STORE_NAME, [
        ...locations.filter((item) => item.id !== location.id),
        { ...location, isPrimary: true },
      ]);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [STORE_NAME] }),
  });

  const { mutateAsync: deleteLocations } = useMutation({
    mutationKey: [STORE_NAME],
    mutationFn: async (ids: Array<Location['id']>) => {
      await localforage.setItem(
        STORE_NAME,
        locations.filter((location) => !ids.some((id) => id === location.id)),
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [STORE_NAME] }),
  });

  return {
    primary: locations.find((location) => location.isPrimary),
    isPending,
    locations,
    addLocation,
    deleteLocations,
  };
};
