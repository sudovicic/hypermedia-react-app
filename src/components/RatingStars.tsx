import React from 'react';
import classNames from 'classnames';
import { useCallback, useId } from 'react';
import type { Resource } from '../utils/api';
import type { RatingResult } from '../utils/hooks';
import { useRating } from '../utils/hooks';

export interface RatingStarsProps {
  resource: Resource;
  orientation: 'horizontal' | 'vertical';
}

// TODO: add toolip to clear rating
export default function RatingStars({ resource, orientation }: RatingStarsProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { overallRating }: RatingResult = useRating(resource);
  const halfStarsAmount = 10;
  const isChecked = useCallback(
    (idx: number) => {
      return overallRating.ratingValue ? idx <= overallRating.ratingValue : false;
    },
    [overallRating]
  );
  const id = useId();

  return (
    <div
      className={classNames('flex', {
        'flex-col': orientation === 'vertical',
        'flex-wrap gap-2': orientation === 'horizontal',
      })}
    >
      <div className="inline-flex rating rating-half">
        <input style={{ width: 0 }} type="radio" name={`rating-hidden-${id}`} className="rating-hidden" />
        {Array.from({ length: halfStarsAmount }).map((elem, idx) => (
          <input
            key={`radio-${id}-${idx}`}
            id={`radio-${id}-${idx}`}
            type="radio"
            name={`rating-${id}`}
            className={classNames('pointer-events-none mask mask-star-2', {
              'mask-half-1': idx % 2 === 0,
              'mask-half-2': idx % 2 !== 0,
            })}
            disabled
            checked={isChecked(idx)}
          />
        ))}
      </div>
      {overallRating.ratingValue && overallRating.ratingCount && (
        <p className="text-lg">
          <span className="font-bold">{overallRating.ratingValue / 2}</span>&nbsp;
          <small>({overallRating.ratingCount})</small>
        </p>
      )}
    </div>
  );
}
