import { Fragment } from 'react';

import { Card, CardContent, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

import { MenuPageRoutes } from '../routes';

import { BaseMenuPage } from './BaseMenuPage';
import { useTranslation } from 'react-i18next';

export const LanguagesPage = () => {
  const results = [] as Array<string>;
  const { i18n } = useTranslation();

  return (
    <BaseMenuPage
      backTo={MenuPageRoutes.SETTINGS}
      header={<Typography sx={{ fontSize: '1.125rem', width: '100%' }}>Languages</Typography>}
    >
      <Card>
        <CardContent>
          <List disablePadding>
            {['en', 'uk'].map((lang, idx) => (
              <Fragment key={idx}>
                <ListItem disableGutters onClick={() => i18n.changeLanguage(lang)}>
                  <ListItemText
                    primary={lang}
                    primaryTypographyProps={{ fontSize: '1.125rem' }}
                    secondaryTypographyProps={{ color: '#ce93d8' }}
                  />
                </ListItem>
                {idx !== results.length - 1 && <Divider />}
              </Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </BaseMenuPage>
  );
};
