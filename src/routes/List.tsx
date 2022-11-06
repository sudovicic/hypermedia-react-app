import React from 'react';
import { useTranslation } from 'react-i18next';

export default function List() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('list')}</h1>
      <div></div>
    </>
  );
}
