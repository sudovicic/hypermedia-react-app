import React from 'react';
import { useId } from 'react';
import type { Resource } from '../api/api-routes';
import { useActors, useComments, useGenres, useTags, useWatchList } from '../utils/hooks';
import RatingStars from './RatingStars';
import { useTranslation } from 'react-i18next';

interface ResourceDetailsCardProps {
  resource: Resource;
}

export default function ResourceDetailsCard({ resource }: ResourceDetailsCardProps) {
  const tags = useTags(resource);
  const genres = useGenres(resource);
  const actors = useActors(resource);
  const comments = useComments(resource);
  const { isSaved } = useWatchList(resource);
  const id = useId();
  const { t } = useTranslation();

  const parse = (text: string) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent;
  };
  const desc = resource['#IMDb_SHORT_DESC'] && parse(resource['#IMDb_SHORT_DESC']);

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <div className="card-body gap-3">
        <h1 className="text-3xl card-title uppercase mb-4">
          {resource['#TITLE'] ? resource['#TITLE'] : t('no_title')}
          <span className="mx-1">&middot;</span>
          {resource['#YEAR'] && <span>{new Date(Date.parse(resource['#YEAR'].toString())).getFullYear()}</span>}
        </h1>
        <div className="mb-4 flex justify-between">
          {actors && (
            <div>
              {actors.slice(0, 3).map((actor) => (
                <p key={actor} className="uppercase mb-1">
                  {actor}
                </p>
              ))}
            </div>
          )}
          {/* TODO: improve */}
          <RatingStars resource={resource} orientation="vertical" />
        </div>
        {tags.length > 0 && (
          <div className="inline-flex mb-4">
            {tags.map((tag) => (
              <div key={`${id}-${tag.type}`} className="badge badge-secondary mr-1 select-none">
                {tag.type.toUpperCase()}
              </div>
            ))}
          </div>
        )}
        {genres.length > 0 && (
          <div className="inline-flex mb-4">
            {genres.map((genre) => (
              <div key={genre} className="badge badge-lg badge-outline mr-1 select-none">
                {genre}
              </div>
            ))}
          </div>
        )}
        <div className="mb-8">
          <p className="flex-grow-0 line-clamp-6">{desc ?? t('no_description')}</p>
          {resource['#MARINTG'] && <div className="badge badge-outline mt-4">{resource['#MARINTG']}</div>}
        </div>
        <div className="card-actions">
          <button
            className="btn btn-wide mr-4"
            onClick={() => alert('save to/remove from watchlist is not yet implemented.')}
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
              {isSaved ? (
                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              ) : (
                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              )}
            </svg>
            {t(isSaved ? 'added_to_list' : 'add_to_list_cta')}
          </button>
          <button className="btn btn-wide ml-4" onClick={() => alert('show/add comments is not yet implemented.')}>
            <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9 11H18V13H9V11M18 7H6V9H18V7M22 4V22L18 18H4C2.9 18 2 17.11 2 16V4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.89 22 4M20 4H4V16H18.83L20 17.17V4Z"
              />
            </svg>
            {t('show_comments')}&nbsp;({comments.length})
          </button>
        </div>
      </div>
      <figure>
        <img
          className="w-44"
          src={resource['#IMG_POSTER'] && resource['#IMG_POSTER']}
          alt={resource['#IMG_POSTER'] ? t('alt_thumbnail', { resource: resource['#TITLE'] }) : t('no_preview_image')}
        />
      </figure>
    </div>
  );
}
