import { useState } from 'react';
import type { MutatedMovie } from '../api/api-routes';

export interface Tag {
  type: 'new' | 'trending';
}

function daysSincePublished(movie: MutatedMovie): number {
  const oneDay = 24 * 60 * 60 * 1000;
  // if no date record then use current date
  const firstDate = Date.parse(movie['#YEAR'] ? movie['#YEAR'].toString() : Date.now().toString());
  const secondDate = Date.now();

  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

const NEW_THRESHOLD = 180; // max days since published for 'new' tag
const TRENDING_RATING_VALUE_THRESHOLD = 7.5; // min avg rating for 'trending' tag
const TRENDING_RATING_COUNT_THRESHOLD = 1000; // min number of ratings for 'trending' tag

export function useTags(movie: MutatedMovie): Tag[] {
  const tags: Tag[] = [];

  if (daysSincePublished(movie) <= NEW_THRESHOLD) {
    tags.push({ type: 'new' });

    if (
      movie['#RATING']?.['#NUMUSERRATINGS'] &&
      movie['#RATING']['#NUMUSERRATINGS'] >= TRENDING_RATING_VALUE_THRESHOLD &&
      movie['#RATING']['#NUMUSERRATINGS'] >= TRENDING_RATING_COUNT_THRESHOLD
    ) {
      tags.push({ type: 'trending' });
    }
  }

  return tags;
}

export interface RatingResult {
  currentRating?: number;
  // eslint-disable-next-line no-unused-vars
  updateRating(rating: number): void;
  userRated: boolean;
}

export function useRating(movie: MutatedMovie): RatingResult {
  const [userRated, setUserRated] = useState(false);

  return {
    currentRating: movie['#RATING']?.['#ONLYRATING'],
    updateRating: (rating: number) => {
      setUserRated((prevUserRated) => !prevUserRated);
      alert(`Setting rating of ${rating} for ${movie['#TITLE']} not implemented yet.`);
    },
    userRated: userRated,
  };
}
