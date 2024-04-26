import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Typography, Unstable_Grid2 as Grid, IconButton, Box } from '@mui/material';
import { Translate, NavigateNext, Explore, DataObject, Info } from '@mui/icons-material';

import { useLocations } from '@/hooks';
import { Location } from '@/vite-env';

import { MenuPageRoutes } from '../../routes';

import { BaseMenuPage } from '../BaseMenuPage';
import { SettingsItem } from './SettingsItem';
import { PlacePreview } from './PlacePreview';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { primary, locations, addLocation } = useLocations();
  const secondary = locations.find((x) => x.id !== primary?.id);

  const hasAnyPlaces = !!primary || !!secondary;

  const handlePlaceSelect = async (place: Location) => {
    await addLocation(place);
    navigate('/');
  };

  return (
    <BaseMenuPage
      backTo="/"
      header={<Typography sx={{ fontSize: '1.125rem', width: '100%' }}>{t('screen.settings.title')}</Typography>}
    >
      <Grid container gap={3} direction="column">
        {hasAnyPlaces ? (
          <Grid>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: [primary && '1fr', secondary && '1fr', 'auto'].filter(Boolean).join(' '),
                gap: 2,
                alignItems: 'center',
              }}
            >
              {primary ? <PlacePreview value={primary} onClick={() => handlePlaceSelect(primary)} /> : null}
              {secondary ? <PlacePreview value={secondary} onClick={() => handlePlaceSelect(secondary)} /> : null}
              <IconButton aria-label={t('screen.settings.links.places')} component={Link} to={MenuPageRoutes.PLACES}>
                <NavigateNext fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        ) : null}
        <Grid>
          {!hasAnyPlaces ? (
            <SettingsItem to={MenuPageRoutes.PLACES} icon={<Explore />} name={t('screen.settings.links.places')} />
          ) : null}
          <SettingsItem
            to={MenuPageRoutes.LANGUAGES}
            icon={<Translate />}
            name={t('screen.settings.links.languages')}
          />
          <SettingsItem
            to={MenuPageRoutes.SETTINGS}
            icon={<DataObject />}
            name={t('screen.settings.links.advanced')}
            unavailable
          />
          <SettingsItem to={MenuPageRoutes.ABOUT} icon={<Info />} name={t('screen.settings.links.about')} />
        </Grid>
      </Grid>
    </BaseMenuPage>
  );
};
