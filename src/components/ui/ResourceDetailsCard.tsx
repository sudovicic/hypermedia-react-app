import React, { useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);

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
          <button className="btn btn-wide ml-4" onClick={() => setShowModal(true)}>
            <Comment className="fill-current w-6 h-6 mr-4" />
            {t('show_comments')}&nbsp;({comments.length})
          </button>
          {showModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/2 m-6 max-w-full">
                  <div className="border-0 rounded-lg relative flex flex-col w-full bg-base-300 shadow-xl outline-none focus:outline-none">
                    <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl card-title uppercase">{t('comments')}</h3>
                      <button className="btn" onClick={() => setShowModal(false)}>
                        <svg className="w-6 h-6" viewBox="2286 2286 4572 4572">
                          <path
                            fill="currentColor"
                            d="M3568 3692c-35,-34 -35,-90 0,-124 34,-35 90,-35 124,0l880 879 880 -879c34,-35 90,-35 124,0 35,34 35,90 0,124l-879 880 879 880c35,34 35,90 0,124 -34,35 -90,35 -124,0l-880 -879 -880 879c-34,35 -90,35 -124,0 -35,-34 -35,-90 0,-124l879 -880 -879 -880zm3033 880c0,-560 -227,-1067 -594,-1435 -368,-367 -875,-594 -1435,-594 -560,0 -1067,227 -1435,594 -367,368 -594,875 -594,1435 0,560 227,1067 594,1435 368,367 875,594 1435,594 560,0 1067,-227 1435,-594 367,-368 594,-875 594,-1435zm-470 -1559c399,399 646,950 646,1559 0,609 -247,1160 -646,1559 -399,399 -950,646 -1559,646 -609,0 -1160,-247 -1559,-646 -399,-399 -646,-950 -646,-1559 0,-609 247,-1160 646,-1559 399,-399 950,-646 1559,-646 609,0 1160,247 1559,646z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <p>Test</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
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
