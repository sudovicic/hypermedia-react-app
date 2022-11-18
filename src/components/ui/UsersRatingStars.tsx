import type { PropsWithChildren } from 'react';
import React, { useId } from 'react';
import classNames from 'classnames';
import type { Resource, UserRating } from '../../utils/api';
import type { RatingResult } from '../../hooks/resources/useRating/useRating';
import useRating from '../../hooks/resources/useRating/useRating';

export interface UsersRatingStarsProps {
  resource: Resource;
}

// TODO: add toolip to clear rating
export default function UsersRatingStars({ resource, children }: PropsWithChildren<UsersRatingStarsProps>) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { userRating, setRating }: RatingResult = useRating(resource);
  const starsAmount = 5;
  const id = useId();

  const onChangeHandler = (rating: UserRating): void => {
    setRating(rating);
  };

  return (
    <div className={classNames('flex', { 'flex-col': 'horizontal' })}>
      <div className="inline-flex rating rating-half">
        <input style={{ width: 0 }} type="radio" name={`rating-hidden-${id}`} className="rating-hidden" />
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
      </div>
      {children}
    </div>
  );
}
