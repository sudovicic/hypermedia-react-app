import React from 'react';
import { useTranslation } from 'react-i18next';
import { WatchList } from '../components/WatchList';

export default function List() {
  const { t } = useTranslation();

  return (
    <div className="pl-6">
      <h1 className="font-medium leading-tight text-2xl mt-0 mb-2">{t('list')}</h1>
      <WatchList />
    </div>
  );
}
