import { useTranslation } from 'react-i18next';
import React from 'react';

export default function WatchlistResourceListHeadings() {
  const { t } = useTranslation();

  return (
    <>
      <th>{t('resource_name')}</th>
      <th>{t('resource_cast')}</th>
      <th>{t('actions')}</th>
    </>
  );
}
