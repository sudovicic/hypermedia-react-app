import React from 'react';
import type { LoaderFunction } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Root() {
  const { t } = useTranslation();

  return (
    <div className="hero flex flex-col flex-1 justify-center">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{t('hero_title')}</h1>
          <p className="py-6">{t('hero_text')}</p>
          <Link to="/home" className="btn btn-primary">
            {t('hero_cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const rootLoader: LoaderFunction = async () => Promise.resolve({});
