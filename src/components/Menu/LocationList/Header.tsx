import { FC, useState } from 'react';

import { Add, CheckCircle, Close, MoreVert, RadioButtonUnchecked } from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  PopoverOrigin,
  Stack,
  styled,
  Typography,
  Menu as MUIMenu,
  MenuItem as MUIMenuItem,
} from '@mui/material';

const Menu = styled(MUIMenu)`
  & .MuiList-root {
    padding: 0;
  }

  & .MuiPaper-root {
    border-radius: 2rem;
  }
`;

const MenuItem = styled(MUIMenuItem)`
  padding: 0.5rem 1.5rem;
  min-height: 'auto';
  min-width: 7ch;
`;

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

const EDIT_MENU_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

const EDIT_MENU_NAME = 'context-menu';

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
          id={`${EDIT_MENU_NAME}-button`}
          aria-controls={open ? `${EDIT_MENU_NAME}-menu` : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          color="inherit"
          edge="end"
          onClick={handleClick}
          sx={{ fontSize: '1.85rem' }}
        >
          <MoreVert fontSize="inherit" />
        </IconButton>
        <Menu
          id={`${EDIT_MENU_NAME}-menu`}
          anchorEl={anchorEl}
          anchorOrigin={EDIT_MENU_ORIGIN}
          aria-labelledby={`${EDIT_MENU_NAME}-button`}
          open={open}
          transformOrigin={EDIT_MENU_ORIGIN}
          onClose={handleClose}
        >
          <MenuItem onClick={onEdit}>Edit</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};
