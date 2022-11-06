import React from 'react';
import type { Resource } from '../api/api-routes';
import RatingStars from './RatingStars';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { t } = useTranslation();

  const parse = (text: string) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent;
  };
  const desc = resource['#IMDb_SHORT_DESC'] && parse(resource['#IMDb_SHORT_DESC']);

  return (
    <div className="card lg:card-side lg:max-w-xl bg-base-100 shadow-xl">
      <figure>
        <img
          className="w-44"
          src={resource['#IMG_POSTER'] && resource['#IMG_POSTER']}
          alt={resource['#IMG_POSTER'] ? t('alt_thumbnail', { resource: resource['#TITLE'] }) : t('no_preview_image')}
        />
      </figure>
      <div className="card-body justify-between gap-3">
        <div>
          <h2 className="card-title pb-3">{resource['#TITLE'] ? resource['#TITLE'] : t('no_title')}</h2>
          <RatingStars resource={resource} orientation="horizontal" />
        </div>
        <p className="flex-grow-0 line-clamp-6">{desc ?? t('no_description')}</p>
        <div>
          <div className="card-actions justify-between">
            {resource['#YEAR'] && <span>{new Date(Date.parse(resource['#YEAR'].toString())).getFullYear()}</span>}
            {resource['#MARINTG'] && <div className="badge badge-outline">{resource['#MARINTG']}</div>}
          </div>
          <Link to={`/details/${resource['#IMDB_ID']}`}>
            <button className="btn btn-block mt-4">{t('card_cta')}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
