import type { PropsWithChildren } from 'react';
import React, { useId } from 'react';
import classNames from 'classnames';
import type { Resource, UserRating } from '../../utils/api';
import type { RatingResult } from '../../hooks/resources/useRating/useRating';
import useRating from '../../hooks/resources/useRating/useRating';
import Tooltip from './Tooltip/Tooltip';
import { useTranslation } from 'react-i18next';

export interface UsersRatingStarsProps {
  resource: Resource;
}

/**
 * todo figure out why the button doesn't work the first time it's pressed
 */
export default function UsersRatingStars({ resource, children }: PropsWithChildren<UsersRatingStarsProps>) {
  const { userRating, resetRating } = useRating(resource);
  const { t } = useTranslation();

  return (
    <div className={classNames('flex', { 'flex-col': 'horizontal' })}>
      <div className="inline-flex rating rating-half">
        <Tooltip
          content={
            <button className="btn btn-error btn-sm bg-error/80 hover:bg-error" onClick={() => resetRating()}>
              {t('clear_rating')}
            </button>
          }
          canOpen={!!userRating}
        >
          <Stars resource={resource} />
        </Tooltip>
      </div>
      {children}
    </div>
  );
}

function Stars({ resource }: { resource: Resource }) {
  const { userRating, setRating }: RatingResult = useRating(resource);
  const starsAmount = 5;
  const id = useId();

  const onChangeHandler = (rating: UserRating): void => {
    setRating(rating);
  };

  return (
    <>
      <input
        style={{ width: 0 }}
        type="radio"
        name={`rating-hidden-${id}`}
        className="rating-hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      {Array.from({ length: starsAmount }).map((elem, idx) => (
        <input
          key={`radio-${id}-${idx}`}
          id={`radio-${id}-${idx}`}
          type="radio"
          name={`rating-${id}`}
          className={classNames('mask mask-star-2 btn-sm', {
            'bg-accent': userRating !== undefined && userRating >= idx + 1,
            'bg-transparent/20': !userRating || userRating < idx + 1,
          })}
          onChange={() => onChangeHandler((idx + 1) as UserRating)}
        />
      ))}
    </>
  );
}
