import { FC } from 'react';

import { Card, Typography, Unstable_Grid2 as Grid, IconButton, CardActionArea, Box, Stack } from '@mui/material';
import { Translate, NavigateNext, Explore, DataObject, Info } from '@mui/icons-material';

import { ActionItem, WMOIcon } from '@/components';

import { BaseMenuPage } from './BaseMenuPage';
import { MenuPageRoutes } from '../routes';
import { Link, useNavigate } from 'react-router-dom';
import { useForecastPreview, useLocations } from '@/hooks';
import { Location } from '@/vite-env';
import { Temperature } from '@/components/Temperature';
import { safeJoin } from '@/utils';

type SettingItemProps = Readonly<{
  icon: React.ReactElement;
  name: string;
  to: string;
  unavailable?: boolean;
}>;

const SettingsItem: FC<SettingItemProps> = ({ name, icon, to, unavailable }) => (
  <ActionItem type="link" to={to} start={icon} end={<NavigateNext />}>
    <Typography sx={{ fontSize: '1.125rem' }}>
      {name}
      {unavailable ? (
        <Typography component="p" variant="caption" sx={{ fontStyle: 'italic' }}>
          (coming soon)
        </Typography>
      ) : null}
    </Typography>
  </ActionItem>
);

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { primary, locations, addLocation } = useLocations();
  const secondary = locations.find((x) => x.id !== primary?.id);

  const hasAnyPlaces = !!primary || !!secondary;

  const handlePlaceSelect = async (place: Location) => {
    await addLocation(place);
    navigate('/');
  };

  return (
    <BaseMenuPage backTo="/" header={<Typography sx={{ fontSize: '1.125rem', width: '100%' }}>Settings</Typography>}>
      <Grid container gap={3} direction="column">
        {hasAnyPlaces ? (
          <Grid>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: primary && secondary ? '1fr 1fr auto' : '1fr auto',
                gap: 2,
                alignItems: 'center',
              }}
            >
              {primary ? <PlacePreview value={primary} onClick={() => handlePlaceSelect(primary)} /> : null}
              {secondary ? <PlacePreview value={secondary} onClick={() => handlePlaceSelect(secondary)} /> : null}
              <IconButton component={Link} to={MenuPageRoutes.PLACES}>
                <NavigateNext fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        ) : null}
        <Grid>
          {!hasAnyPlaces ? <SettingsItem to={MenuPageRoutes.PLACES} icon={<Explore />} name="Places" /> : null}
          <SettingsItem to="/" icon={<Translate />} name="Languages" unavailable />
          <SettingsItem to="/" icon={<DataObject />} name="Advanced" unavailable />
          <SettingsItem to="/" icon={<Info />} name="About" unavailable />
        </Grid>
      </Grid>
    </BaseMenuPage>
  );
};

// TODO: consider reusing location item
const PlacePreview: FC<{ value: Location; onClick: () => void }> = ({ value, onClick }) => {
  const { data: preview } = useForecastPreview(value.id);

  return (
    <Card>
      <CardActionArea sx={{ p: 2 }} onClick={onClick}>
        <Grid container spacing={1}>
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
