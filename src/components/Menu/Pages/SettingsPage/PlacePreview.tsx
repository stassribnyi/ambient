import { FC } from 'react';

import { Card, CardActionArea, Grid, Stack, Typography } from '@mui/material';

import { WMOIcon, Temperature } from '@/components';
import { useForecastPreview } from '@/hooks';
import { safeJoin } from '@/utils';
import { Location } from '@/vite-env';

// TODO: consider reusing location item
export const PlacePreview: FC<{ value: Location; onClick: () => void }> = ({ value, onClick }) => {
  const { data: preview } = useForecastPreview(value.id);

  return (
    <Card>
      <CardActionArea sx={{ p: 2 }} onClick={onClick}>
        <Grid container gap={1}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <WMOIcon
                animated
                code={preview?.weathercode}
                variant={preview?.isDay ? 'day' : 'night'}
                size={64}
                sx={{
                  m: '-0.75rem 0',
                }}
              />
              <Typography sx={{ fontSize: '1.5rem', letterSpacing: '-0.0125rem' }}>
                {preview ? <Temperature value={preview.temperature} /> : 'N/A'}
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="body2"
              color="secondary"
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {safeJoin([value.name, value.admin1, value.country])}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
