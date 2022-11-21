import React from 'react';
import { useId } from 'react';
import type { Resource } from '../../utils/api';
import RatingStars from './RatingStars';
import { useTranslation } from 'react-i18next';
import UsersRatingStars from './UsersRatingStars';
import useTags from '../../hooks/resources/useTags/useTags';
import useGenres from '../../hooks/resources/useGenres/useGenres';
import useCast from '../../hooks/resources/useCast/useCast';
import useComments from '../../hooks/resources/useComments/useComments';
import useWatchlist from '../../hooks/resources/useWatchlist/useWatchlist';
import Check from '../icons/Check';
import Plus from '../icons/Plus';
import Comment from '../icons/Comment';
import ModalResolver from './Modal/ModalResolver';

interface ResourceDetailsCardProps {
  resource: Resource;
}

export default function ResourceDetailsCard({ resource }: ResourceDetailsCardProps) {
  const tags = useTags(resource);
  const genres = useGenres(resource);
  const actors = useCast(resource, 2);
  const comments = useComments(resource);
  const { isSaved, toggleSaved } = useWatchlist(resource);
  const id = useId();
  const { t } = useTranslation();

  const parse = (text: string) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent;
  };
  const desc = resource['#IMDb_SHORT_DESC'] && parse(resource['#IMDb_SHORT_DESC']);

  const iconClasses = 'fill-current w-6 h-6 mr-2';

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
              {actors.map((actor) => (
                <p key={actor} className="uppercase mb-1">
                  {actor}
                </p>
              ))}
            </div>
          )}
          <RatingStars resource={resource} orientation="vertical" />
          <UsersRatingStars resource={resource}>
            <p className="text-lg">{t('resource_rating')}</p>
          </UsersRatingStars>
        </div>
        {tags.length > 0 && (
          <div className="inline-flex mb-4">
            {tags.map((tag) => (
              <div key={`${id}-${tag.type}`} className="badge badge-secondary mr-1 select-none">
                {t(`tag_${tag.type}`).toUpperCase()}
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
          <button className="btn btn-wide mr-4" onClick={toggleSaved}>
            {isSaved ? <Check className={iconClasses} /> : <Plus className={iconClasses} />}
            {t(isSaved ? 'added_to_list' : 'add_to_list_cta')}
          </button>
          {/* The button to open modal */}
          <label htmlFor="my-modal-4" className="btn ml-4">
            <Comment className="fill-current w-6 h-6 mr-4" />
            {t('show_comments')}&nbsp;({comments.length})
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <div className="flex items-center justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl card-title uppercase">{t('comments')}</h3>
                <label htmlFor="my-modal-4" className="btn btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </label>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="w-fit block">
                  <textarea className="textarea bg-base-300" placeholder="Add comment here..."></textarea>
                  <button className="btn btn-md" type="submit">
                    {t('submit')}
                  </button>
                </div>
                <div className="w-fit">
                  <p className="">Test</p>
                </div>
              </div>
            </label>
          </label>
          <ModalResolver />
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
