import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardActionArea, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import { WMOIcon, Temperature, Meteocon } from '@/components';
import { useForecastPreview } from '@/hooks';
import { Location } from '@/vite-env';

// TODO: consider reusing location item
export const PlacePreview: FC<{ value: Location; onClick: () => void }> = ({ value, onClick }) => {
  const { t } = useTranslation();
  const { data: preview } = useForecastPreview(value.id);

  return (
    <Card>
      <CardActionArea sx={{ p: 1.5, pr: 2 }} onClick={onClick}>
        <Grid container gap={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="space-between">
              {preview ? (
                <>
                  <WMOIcon animated code={preview.weathercode} variant={preview.isDay ? 'day' : 'night'} />
                  <Typography sx={{ fontSize: '1.5rem', lineHeight: 1, letterSpacing: '-0.0125rem' }}>
                    <Temperature value={preview.temperature} />
                  </Typography>
                </>
              ) : (
                <>
                  <Meteocon alt={t('common.not_available')} name="not-available" />
                  <Typography sx={{ fontSize: '1.5rem', letterSpacing: '-0.0125rem' }}>
                    {t('common.not_available')}
                  </Typography>
                </>
              )}
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="body2"
              color="secondary"
              sx={{ lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {value.name}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
