import { FC } from 'react';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import { Card, ButtonBase, CardContent, Stack, Checkbox, Typography } from '@mui/material';

import { useLongPress, useUnitsConverter } from '../../../hooks';
import { Location } from '../../../vite-env';
import { WMO } from '../../../wmo';

export const LocationItem: FC<
  Readonly<{
    isEdit?: boolean;
    selected?: boolean;
    value: Location;
    onSelect: (value: Location) => void;
    onLongPress: (value: Location) => void;
  }>
> = ({ isEdit, selected, value, onSelect, onLongPress }) => {
  const handleLongPress = useLongPress();
  const { convert } = useUnitsConverter();

  const weatherInfo = value.weathercode !== undefined ? WMO[value.weathercode]?.day : null;

  return (
    <Card sx={{ mb: 2, borderRadius: '28px' }}>
      <ButtonBase onClick={() => onSelect(value)} sx={{ width: '100%' }} {...handleLongPress(() => onLongPress(value))}>
        <CardContent sx={{ width: '100%', p: '1.5rem 1rem' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" gap={1}>
              {isEdit && (
                <Checkbox
                  sx={{
                    width: '48px',
                    height: '48px',
                  }}
                  checked={selected}
                  color="secondary"
                  icon={<RadioButtonUnchecked />}
                  checkedIcon={<CheckCircle />}
                />
              )}
              {!isEdit && weatherInfo && (
                <img alt={weatherInfo.description} src={weatherInfo.iconUrl} style={{ width: '48px' }} />
              )}
              <Stack alignItems="start">
                <Typography sx={{ fontSize: '1.125rem' }}>{value.name}</Typography>
                <Typography variant="caption" color="secondary">
                  {[value.admin1, value.country].filter(Boolean).join(', ')}
                </Typography>
              </Stack>
            </Stack>
            {!isEdit && (
              <Typography
                color="secondary.light"
                sx={{ fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.00833em' }}
                variant="h5"
              >
                {value.temperature ? `${Math.floor(convert('temperature', value.temperature))}°` : 'N/A'}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};
