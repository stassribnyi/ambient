import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { Typography, Stack, Link as MuiLink } from '@mui/material';
import { GitHub } from '@mui/icons-material';

import { Branding } from '@/components';
import { BaseMenuPage } from './BaseMenuPage';

import { MenuPageRoutes } from '../routes';

const PACKAGE_REPOSITORY_URL = import.meta.env.PACKAGE_REPOSITORY_URL;
const PACKAGE_VERSION = import.meta.env.PACKAGE_VERSION;
const PACKAGE_BUILD_DATE = import.meta.env.PACKAGE_BUILD_DATE;

const ApplicationInfo: FC<Readonly<PropsWithChildren<{ label: string }>>> = ({ label, children }) => (
  <Typography sx={{ fontWeight: 700 }}>
    {label}:{' '}
    <Typography component="span" sx={{ fontWeight: 400 }}>
      {children}
    </Typography>
  </Typography>
);

export const AboutPage = () => (
  <BaseMenuPage backTo={MenuPageRoutes.SETTINGS}>
    <Stack alignItems="center" justifyContent="space-between" sx={{ flex: 1, pb: 4 }}>
      <Branding variant="compact" />
      <Stack justifyContent="center">
        <ApplicationInfo label="Application version">{PACKAGE_VERSION}</ApplicationInfo>
        <ApplicationInfo label="Last updated at">{PACKAGE_BUILD_DATE}</ApplicationInfo>
      </Stack>
      <MuiLink color="secondary.light" component={Link} to={PACKAGE_REPOSITORY_URL} sx={{ display: 'flex', gap: 1 }}>
        <GitHub />
        Source code.
      </MuiLink>
      <Typography>©{format(new Date(), 'yyyy')} Stas Sribnyi. All rights reserved.</Typography>
    </Stack>
  </BaseMenuPage>
);
