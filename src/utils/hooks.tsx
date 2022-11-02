import type { MovieResult } from '../api/api-routes';
import { useState } from 'react';

export interface Tag {
  type: 'new' | 'trending';
}

function daysSincePublished(movie: MovieResult): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = Date.parse(movie.jsonnob.datePublished);
  const secondDate = Date.now();

  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

const NEW_THRESHOLD = 180; // max days since published for 'new' tag
const TRENDING_RATING_VALUE_THRESHOLD = 7.5; // min avg rating for 'trending' tag
const TRENDING_RATING_COUNT_THRESHOLD = 1000; // min number of ratings for 'trending tag'

export function useTags(movie: MovieResult): Tag[] {
  const tags: Tag[] = [];

  if (daysSincePublished(movie) <= NEW_THRESHOLD) {
    tags.push({ type: 'new' });

    if (
      movie.jsonnob.aggregateRating.ratingValue >= TRENDING_RATING_VALUE_THRESHOLD &&
      movie.jsonnob.aggregateRating.ratingCount >= TRENDING_RATING_COUNT_THRESHOLD
    ) {
      tags.push({ type: 'trending' });
    }
  }

  return tags;
}

export function useRating(movie: MovieResult) {
  const [userRated, setUserRated] = useState(false);

  return {
    // TODO: fetch user's rating for movie, if exists
    currentRating: movie.jsonnob.aggregateRating.ratingValue,
    updateRating: (rating: number) => {
      setUserRated((prevUserRated) => !prevUserRated);
      alert(`Setting rating of ${rating} for ${movie.jsonnob.name} not implemented yet.`);
    },
    userRated: userRated,
  };
}
