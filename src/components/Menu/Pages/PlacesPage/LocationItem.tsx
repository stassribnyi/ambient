import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import { Stack, Checkbox, Typography } from '@mui/material';

import { useForecastPreview } from '@/hooks';
import { safeJoin } from '@/utils';

import { WMOIcon, Temperature, ActionItem, Meteocon } from '@/components';

import { Location } from '@/vite-env';

export const LocationItem: FC<
  Readonly<{
    isEdit?: boolean;
    selected?: boolean;
    value: Location;
    onSelect: (value: Location) => void;
    onLongPress: (value: Location) => void;
  }>
> = ({ isEdit, selected, value, onSelect, onLongPress }) => {
  const { t } = useTranslation();
  const { data: preview } = useForecastPreview(value.id);

  return (
    <ActionItem
      type="button"
      onClick={() => onSelect(value)}
      onLongPress={() => onLongPress(value)}
      start={
        isEdit ? (
          <Checkbox
            checked={selected}
            color="secondary"
            icon={<RadioButtonUnchecked />}
            checkedIcon={<CheckCircle />}
            sx={{ width: '48px', height: '48px' }}
          />
        ) : preview ? (
          <WMOIcon animated variant={preview.isDay ? 'day' : 'night'} code={preview.weathercode} />
        ) : (
          <Meteocon alt={t('common.not_available')} name="not-available" />
        )
      }
      end={
        !isEdit ? (
          <Typography
            color="secondary.light"
            sx={{ fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.00833em' }}
            variant="h5"
          >
            {preview ? <Temperature value={preview.temperature} /> : t('common.not_available')}
          </Typography>
        ) : null
      }
    >
      <Stack>
        <Typography sx={{ fontSize: '1.125rem' }}>{value.name}</Typography>
        <Typography variant="caption" color="secondary">
          {safeJoin([value.admin1, value.country])}
        </Typography>
      </Stack>
    </ActionItem>
  );
};
