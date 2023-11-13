import { FC, useState } from 'react';

import { MoreVert, RadioButtonUnchecked, CheckCircle, Close, Add } from '@mui/icons-material';
import { IconButton, Stack, Typography, Menu, MenuItem, Checkbox } from '@mui/material';

export const EditHeader: FC<
  Readonly<{
    selected: boolean;
    onCancel: () => void;
    onToggle: () => void;
  }>
> = ({ selected, onCancel, onToggle }) => (
  <>
    <Stack direction="row" alignItems="center" sx={{ pl: 1.5 }}>
      <Checkbox
        sx={{ width: 48, height: 48 }}
        edge="start"
        checked={selected}
        color="secondary"
        icon={<RadioButtonUnchecked />}
        checkedIcon={<CheckCircle />}
        onClick={onToggle}
      />
      <Typography>Select all</Typography>
    </Stack>
    <IconButton sx={{ fontSize: '1.85rem' }} edge="end" color="inherit" onClick={onCancel}>
      <Close fontSize="inherit" />
    </IconButton>
  </>
);

export const Header: FC<
  Readonly<{
    onAdd: () => void;
    onEdit: () => void;
  }>
> = ({ onEdit, onAdd }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
      <Typography sx={{ fontSize: '1.125rem' }}>Manage your location</Typography>
      <Stack direction="row" alignItems="center">
        <IconButton sx={{ fontSize: '1.85rem' }} edge="end" color="inherit" onClick={onAdd}>
          <Add fontSize="inherit" />
        </IconButton>
        <IconButton
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{ fontSize: '1.85rem' }}
          edge="end"
          color="inherit"
          onClick={handleClick}
        >
          <MoreVert fontSize="inherit" />
        </IconButton>
        {/* FIXME: search for less hacky solutions */}
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          sx={{ '& .MuiList-root': { padding: 0 }, '& .MuiPaper-root': { borderRadius: 2 } }}
        >
          <MenuItem sx={{ minHeight: 'auto', padding: '0.5rem 1.5rem', minWidth: '7ch' }} onClick={onEdit}>
            Edit
          </MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};
