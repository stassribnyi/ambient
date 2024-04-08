import { FC, PropsWithChildren, useState } from 'react';

import { Typography } from '@mui/material';

import { BaseMenuPage } from '../BaseMenuPage';
import { LocationItem } from './LocationItem';
import { ListActions } from './ListActions';
import { EditHeader, Header } from './Header';

import { useLocations } from '../../../../hooks';
import { Location } from '../../../../vite-env';
import { useNavigate } from 'react-router-dom';
import { MenuPageRoutes } from '../../routes';

const Title: FC<PropsWithChildren> = ({ children }) => (
  <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5, fontSize: '0.9rem' }}>
    {children}
  </Typography>
);

export const PlacesPage: FC = () => {
  const navigate = useNavigate();
  const { locations, primary: favorite, addLocation, deleteLocations } = useLocations();

  const otherLocations = locations.filter((l) => l.id !== favorite?.id);
  const [selected, setSelected] = useState<Array<Location>>([]);
  const [isEdit, setIsEdit] = useState(false);

  const isActionsVisible = isEdit && selected.length > 0;
  const isAllSelected = selected.length === locations.length;
  const isSetFavoriteVisible = selected.length === 1 && selected[0].id !== favorite?.id;

  const handleSelect = (value: Location) => {
    if (!isEdit) {
      addLocation(value);
      navigate('/');

      return;
    }

    setSelected((prev) => {
      const isSelected = prev.some((x) => x.id === value.id);

      return isSelected ? prev.filter((x) => x.id !== value.id) : [...prev, value];
    });
  };

  const handleEnterEditMode = () => setIsEdit(true);

  const handleExitEditMode = () => {
    setSelected([]);
    setIsEdit(false);
  };

  const handleDeleteSelected = async () => {
    await deleteLocations(selected.map(({ id }) => id));
    handleExitEditMode();
  };

  const handleSetFavorite = () => {
    addLocation(selected[0]);
    handleExitEditMode();
  };

  const handleToggleSelect = () => setSelected(isAllSelected ? [] : locations);

  return (
    <BaseMenuPage
      showBackButton={!isEdit}
      showActions={isActionsVisible}
      actions={
        <ListActions
          showSetFavorite={isSetFavoriteVisible}
          onDelete={handleDeleteSelected}
          onSetFavorite={handleSetFavorite}
        />
      }
      header={
        // TODO: maybe combine header?
        isEdit ? (
          <EditHeader selected={isAllSelected} onCancel={handleExitEditMode} onToggle={handleToggleSelect} />
        ) : (
          <Header onAdd={() => navigate(MenuPageRoutes.SEARCH)} onEdit={handleEnterEditMode} />
        )
      }
      handleBackButton={() => navigate('/')}
    >
      {favorite ? (
        <>
          <Title>Current location</Title>
          <LocationItem
            selected={selected.some((x) => x.id === favorite.id)}
            isEdit={isEdit}
            value={favorite}
            onSelect={handleSelect}
            onLongPress={handleEnterEditMode}
          />
        </>
      ) : null}
      {otherLocations.length ? (
        <>
          <Title>Other locations</Title>
          {otherLocations.map((location, idx) => (
            <LocationItem
              selected={selected.some((x) => x.id === location.id)}
              isEdit={isEdit}
              key={idx}
              value={location}
              onSelect={handleSelect}
              onLongPress={handleEnterEditMode}
            />
          ))}
        </>
      ) : null}
    </BaseMenuPage>
  );
};
