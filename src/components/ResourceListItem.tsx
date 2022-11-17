import React from 'react';
import { Link } from 'react-router-dom';
import type { Resource } from '../utils/api';
import { useTranslation } from 'react-i18next';
import { useCast, useComments, useRating } from '../utils/hooks';
import UsersRatingStars from './UsersRatingStars';
import { useRecoilValue } from 'recoil';
import { resourcesFilterState } from '../state/ResourcesState';

export interface ResourceListItemProps {
  resource: Resource;
}

export default function ResourceListItem({ resource: r }: ResourceListItemProps) {
  const { t } = useTranslation();
  const cast = useCast(r, 2);
  const { overallRating } = useRating(r);
  const comments = useComments(r);
  const resourcesFilter = useRecoilValue(resourcesFilterState);

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-square w-12 h-12">
              <img src={r['#IMG_POSTER']} alt="Thumbnail" />
            </div>
          </div>
          <div>
            <Link to={`/details/${r['#IMDB_ID']}`}>
              {/* TODO truncate text if it's too long */}
              <span className="font-bold pr-1 py-1">{r['#TITLE']}</span>
            </Link>
            <div className="text-sm opacity-60">
              {r['#YEAR']}
              {overallRating.ratingValue && (
                <>
                  <span className="inline-flex items-center">
                    &nbsp;&middot;&nbsp;
                    {(overallRating.ratingValue / 2).toFixed(1)}
                    &nbsp;
                    <div className="inline-flex w-4 h-4 bg-current mask mask-star" />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </td>
      {cast && (
        <td>
          <p className="flex flex-wrap">
            {cast.map((actor, index, actorList) => (
              <>{index < actorList.length - 1 ? <span>{actor},&nbsp;</span> : <span>{actor}</span>}</>
            ))}
          </p>
        </td>
      )}
      {resourcesFilter === 'commented' && (
        <td>
          {/* TODO show modal */}
          <button className="btn btn-ghost btn-xs">
            {t('show_comments')}&nbsp;({comments.length})
          </button>
        </td>
      )}
      {resourcesFilter === 'rated' && (
        <td>
          <UsersRatingStars resource={r} />
        </td>
      )}
      <td>
        <Link to={`/details/${r['#IMDB_ID']}`} className="btn btn-ghost btn-xs">
          {t('details')}
        </Link>
      </td>
    </tr>
  );
}
