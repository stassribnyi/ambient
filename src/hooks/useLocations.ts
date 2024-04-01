import localforage from 'localforage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Location } from '../vite-env';

const STORE_NAME = 'locations';

export const useLocations = () => {
  const queryClient = useQueryClient();

  const { data: locations = [] } = useQuery({
    queryKey: [STORE_NAME],
    queryFn: async () => {
      const items = await localforage.getItem<Array<Location>>(STORE_NAME);

      return items || [];
    },
  });

  const { mutateAsync: addLocation } = useMutation({
    mutationFn: async (location: Location) => {
      if (locations.some((item) => item.id === location.id)) {
        return;
      }

      await localforage.setItem(STORE_NAME, [...locations, location]);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [STORE_NAME] });
    },
  });

  const { mutateAsync: setPrimaryLocation } = useMutation({
    mutationFn: async (id: Location['id']) => {
      await localforage.setItem(
        STORE_NAME,
        locations.map((item) => ({ ...item, isPrimary: item.id === id })),
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [STORE_NAME] });
    },
  });

  const { mutateAsync: deleteLocations } = useMutation({
    mutationFn: async (ids: Array<Location['id']>) => {
      await localforage.setItem(
        STORE_NAME,
        locations.filter((location) => !ids.some((id) => id === location.id)),
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [STORE_NAME] });
    },
  });

  return {
    current: locations.find((location) => location.isPrimary),
    locations,
    addLocation,
    deleteLocations,
    setPrimaryLocation,
  };
};
