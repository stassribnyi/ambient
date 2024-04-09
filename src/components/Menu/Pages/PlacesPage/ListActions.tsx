import { FC } from 'react';

import { CheckOutlined as Mark, DeleteOutline as Delete } from '@mui/icons-material';
import { Stack, Button } from '@mui/material';

export const ListActions: FC<
  Readonly<{
    showSetFavorite?: boolean;
    onDelete: () => void;
    onSetFavorite: () => void;
  }>
> = ({ showSetFavorite, onDelete, onSetFavorite }) => (
  <Stack direction="row" justifyContent="space-around" gap={1} alignItems="center" sx={{ p: 0.5 }}>
    {showSetFavorite && (
      <Button
        sx={{ flexDirection: 'column', fontSize: '0.7rem', width: '100%', gap: 0.5, color: 'secondary.light' }}
        aria-label="set favorite"
        onClick={onSetFavorite}
      >
        <Mark />
        Set Favorite
      </Button>
    )}
    <Button
      sx={{ flexDirection: 'column', fontSize: '0.7rem', width: '100%', gap: 0.5, color: 'secondary.light' }}
      aria-label="delete"
      onClick={onDelete}
    >
      <Delete />
      Delete
    </Button>
  </Stack>
);
