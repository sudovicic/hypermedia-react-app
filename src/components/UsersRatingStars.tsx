import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useId, useState } from 'react';
import { LocalStorageService, Services } from '../services/LocalStorageService';
import { Resource } from '../api/api-routes';
import { UserRating } from '../dao/interfaces/UserRating';

export interface UsersRatingStarsProps {
  resource: Resource;
}

const DAO = LocalStorageService.getDAO(Services.userRating)!;

// TODO: add toolip to clear rating
export default function UsersRatingStars({ resource }: UsersRatingStarsProps) {
  const starsAmount = 5;
  const id = useId();

  const resourceID: string = resource['#IMDB_ID'];

  /**
   * Fetch the users rating from local storage via DAO service
   * If no rating is available return -1
   * @returns rating value or -1 if no rating is found
   */
  const getUsersMovieRating = (): number => {
    const entry: UserRating = DAO.getEntryById(resourceID)!;

    return entry ? entry.rating : -1;
  };

  const [userRating, setUserRating] = useState<number>(getUsersMovieRating());

  /**
   * Set the user rating from user input
   * @param idx id of input field
   */
  const onChangeHandler = (idx: number): void => {
    setUserRating(idx);
  };

  /**
   * Add a rating by first checking if a rating already exists
   * If so then update the existing rating
   * else add a new entry
   */
  const addRating = (): void => {
    if (DAO.getEntryById(resourceID) === null) {
      DAO.addEntry({ movieId: resourceID, rating: userRating });
    } else {
      DAO.updateEntryById({ movieId: resourceID, rating: userRating });
    }
  };

  /**
   * Add rating when user updates rating
   */
  useEffect(() => {
    addRating();
  }, [userRating]);

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
              'bg-accent': userRating >= idx,
              'bg-[#f9f7fd33]': userRating === -1,
            })}
            onChange={() => onChangeHandler(idx)}
          />
        ))}
      </div>
      <p className="text-lg">My rating</p>
    </div>
  );
}
