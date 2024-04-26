import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  List,
  ListItemText,
  Divider,
  Typography,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';

import { supportedLngs } from '@/i18n';

import { MenuPageRoutes } from '../routes';

import { BaseMenuPage } from './BaseMenuPage';

type SupportedLangs = (typeof supportedLngs)[number];

const COUNTRY_FLAGS: Record<SupportedLangs, string> = {
  en: '🇺🇸',
  uk: '🇺🇦',
};

const COUNTRY_NAMES: Record<SupportedLangs, string> = {
  en: 'English',
  uk: 'Українська',
};

export const LanguagesPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const results = supportedLngs;

  const handleLanguageSelect = async (lang: SupportedLangs): Promise<void> => {
    await i18n.changeLanguage(lang);

    navigate(MenuPageRoutes.SETTINGS);
  };

  return (
    <BaseMenuPage
      backTo={MenuPageRoutes.SETTINGS}
      header={<Typography sx={{ fontSize: '1.125rem', width: '100%' }}>{t('screen.languages.title')}</Typography>}
    >
      <Card>
        <CardContent sx={{ '&, &:last-child': { p: 0 } }}>
          <List disablePadding>
            {results.map((lang, idx) => (
              <Fragment key={idx}>
                <ListItemButton onClick={() => handleLanguageSelect(lang)}>
                  <ListItemIcon sx={{ mr: 0.75, minWidth: 32, justifyContent: 'center' }}>
                    {COUNTRY_FLAGS[lang]}
                  </ListItemIcon>
                  <ListItemText
                    primary={COUNTRY_NAMES[lang]}
                    primaryTypographyProps={{ fontSize: '1.125rem' }}
                    secondaryTypographyProps={{ color: '#ce93d8' }}
                  />
                </ListItemButton>
                {idx !== results.length - 1 && <Divider />}
              </Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </BaseMenuPage>
  );
};
