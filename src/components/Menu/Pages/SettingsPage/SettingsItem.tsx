import { FC } from 'react';

import { NavigateNext } from '@mui/icons-material';
import { Typography } from '@mui/material';

import { ActionItem } from '@/components';

type SettingItemProps = Readonly<{
  icon: React.ReactElement;
  name: string;
  to: string;
  unavailable?: boolean;
}>;

export const SettingsItem: FC<SettingItemProps> = ({ name, icon, to, unavailable }) => (
  <ActionItem type="link" to={to} start={icon} end={<NavigateNext />}>
    <Typography sx={{ fontSize: '1.125rem' }}>
      {name}
      {unavailable ? (
        <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', position: 'absolute' }}>
          (coming soon)
        </Typography>
      ) : null}
    </Typography>
  </ActionItem>
);
