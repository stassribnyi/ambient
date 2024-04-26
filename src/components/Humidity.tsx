import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Humidity: FC<Readonly<{ value: number }>> = ({ value }) => {
  const { t } = useTranslation();

  return t('common.percent', { value: Math.round(value) / 100 });
};
