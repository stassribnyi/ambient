import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CheckOutlined as Mark, DeleteOutline as Delete } from '@mui/icons-material';
import { Stack, Button } from '@mui/material';

export const ListActions: FC<
  Readonly<{
    showSetFavorite?: boolean;
    onDelete: () => void;
    onSetFavorite: () => void;
  }>
> = ({ showSetFavorite, onDelete, onSetFavorite }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="space-around" gap={1} alignItems="center" sx={{ p: 0.5 }}>
      {showSetFavorite && (
        <Button
          sx={{ flexDirection: 'column', fontSize: '0.7rem', width: '100%', gap: 0.5, color: 'secondary.light' }}
          aria-label={t('screen.places.actions.set_favorite')}
          onClick={onSetFavorite}
        >
          <Mark />
          {t('screen.places.actions.set_favorite')}
        </Button>
      )}
      <Button
        sx={{ flexDirection: 'column', fontSize: '0.7rem', width: '100%', gap: 0.5, color: 'secondary.light' }}
        aria-label={t('screen.places.actions.delete')}
        onClick={onDelete}
      >
        <Delete />
        {t('screen.places.actions.delete')}
      </Button>
    </Stack>
  );
};
