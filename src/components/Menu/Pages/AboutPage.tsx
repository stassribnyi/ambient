import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

import { Typography, Stack, Link as MuiLink } from '@mui/material';
import { GitHub } from '@mui/icons-material';

import { Branding } from '@/components';
import { BaseMenuPage } from './BaseMenuPage';

import { MenuPageRoutes } from '../routes';

const PACKAGE_REPOSITORY_URL = import.meta.env.PACKAGE_REPOSITORY_URL;
const PACKAGE_VERSION = import.meta.env.PACKAGE_VERSION;
const PACKAGE_BUILD_DATE = import.meta.env.PACKAGE_BUILD_DATE;

export const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <BaseMenuPage backTo={MenuPageRoutes.SETTINGS}>
      <Stack alignItems="center" justifyContent="space-between" sx={{ flex: 1, pb: 4 }}>
        <Branding variant="compact" />
        <Stack alignItems="center">
          <Trans
            i18nKey="screen.about.app_version"
            values={{ version: PACKAGE_VERSION }}
            components={{
              label: <Typography sx={{ fontWeight: 700 }} />,
              value: <Typography component="span" sx={{ fontWeight: 400 }} />,
            }}
          />
          <Trans
            i18nKey="screen.about.last_updated_at"
            values={{ date: new Date(PACKAGE_BUILD_DATE) }}
            components={{
              label: <Typography sx={{ fontWeight: 700 }} />,
              value: <Typography component="span" sx={{ fontWeight: 400 }} />,
            }}
          />
        </Stack>
        <MuiLink color="secondary.light" component={Link} to={PACKAGE_REPOSITORY_URL} sx={{ display: 'flex', gap: 1 }}>
          <GitHub />
          {t('screen.about.source_code')}
        </MuiLink>
        <Typography>{t('screen.about.copyright', { date: new Date(), owner: 'Stas Sribnyi' })}</Typography>
      </Stack>
    </BaseMenuPage>
  );
};
