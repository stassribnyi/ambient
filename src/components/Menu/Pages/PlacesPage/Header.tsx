import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

import { MenuPageRoutes } from '../../routes';

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
> = ({ selected, onCancel, onToggle }) => {
  const { t } = useTranslation();

  return (
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
        <Typography>{t('screen.places.header.select_all')}</Typography>
      </Stack>
      <IconButton
        aria-label={t('screen.places.header.cancel_selection')}
        sx={{ fontSize: '1.85rem' }}
        edge="end"
        color="inherit"
        onClick={onCancel}
      >
        <Close fontSize="inherit" />
      </IconButton>
    </>
  );
};

const EDIT_MENU_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

const EDIT_MENU_NAME = 'context-menu';

export const Header: FC<
  Readonly<{
    onEdit: () => void;
  }>
> = ({ onEdit }) => {
  const { t } = useTranslation();

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
      <Typography>{t('screen.places.header.title')}</Typography>
      <Stack direction="row" alignItems="center">
        <IconButton
          aria-label={t('screen.places.header.search_place')}
          component={Link}
          to={MenuPageRoutes.SEARCH}
          sx={{ fontSize: '1.85rem' }}
          edge="end"
          color="inherit"
        >
          <Add fontSize="inherit" />
        </IconButton>
        <IconButton
          id={`${EDIT_MENU_NAME}-button`}
          aria-label={t('screen.places.header.more_options')}
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
          <MenuItem onClick={onEdit}>{t('screen.places.header.edit_button')}</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};
