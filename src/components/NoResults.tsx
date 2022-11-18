import { useTranslation } from 'react-i18next';
import Downasaur from './icons/Downasaur';
import React from 'react';

export default function NoResults() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-transparent/10 text-base-content/30 rounded-full w-24 h-24 p-4">
        <Downasaur className="fill-current w-full h-full" />
      </div>
      <p>{t('no_results')}</p>
    </div>
  );
}
