import React from 'react';
import classNames from 'classnames';
import { useCallback, useId } from 'react';
import type { MutatedMovie } from '../api/api-routes';
import type { RatingResult } from '../utils/hooks';
import { useRating } from '../utils/hooks';

export interface RatingStarsProps {
  movie: MutatedMovie;
}

// TODO: add toolip to clear rating
export default function RatingStars({ movie }: RatingStarsProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { currentRating, updateRating, userRated }: RatingResult = useRating(movie);
  const halfStarsAmount = 10;
  const isChecked = useCallback(
    (idx: number) => {
      return currentRating ? idx + 1 === Math.floor(Math.floor(currentRating * 2) / 2.0) : false;
    },
    [currentRating]
  );
  const id = useId();

  return (
    <div className="inline-flex rating rating-half">
      <input style={{ width: 0 }} type="radio" name={`rating-hidden-${id}`} className="rating-hidden" />
      {Array.from({ length: halfStarsAmount }).map((elem, idx) => (
        <input
          key={`radio-${id}-${idx}`}
          id={`radio-${id}-${idx}`}
          type="radio"
          name={`rating-${id}`}
          className={classNames('mask mask-star-2', {
            'mask-half-1': idx % 2 === 0,
            'mask-half-2': idx % 2 !== 0,
            'bg-accent': userRated,
          })}
          checked={isChecked(idx)}
          onChange={() => updateRating((idx + 1) / 2)}
        />
      ))}
    </div>
  );
}
