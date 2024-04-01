import localforage from 'localforage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ForecastSnapshot } from '../vite-env';

const STORE_NAME = 'forecast-snapshots';

export const useForecastSnapshot = (locationId: ForecastSnapshot['locationId']) => {
  const { data: snapshot } = useQuery({
    queryKey: [STORE_NAME, locationId],
    queryFn: async () => {
      const items = await localforage.getItem<Array<ForecastSnapshot>>(STORE_NAME);

      return items?.find((item) => item.locationId === locationId) ?? null;
    },
  });

  return snapshot;
};

export const useForecastSnapshotMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationKey: [STORE_NAME],
    mutationFn: async (snapshots: Array<ForecastSnapshot>) => {
      await localforage.setItem(STORE_NAME, snapshots);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [STORE_NAME] });
    },
  });

  return mutateAsync;
};
