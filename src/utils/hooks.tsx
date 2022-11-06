import { useState } from 'react';
import type { Resource } from '../api/api-routes';

export interface Tag {
  type: 'new' | 'trending' | 'upcoming';
}

function yearsSincePublished(resource: Resource): number | undefined {
  if (!resource['#YEAR']) return undefined;

  const firstDate = new Date(Date.parse(resource['#YEAR'].toString()));
  const secondDate = new Date(Date.now());
  return secondDate.getFullYear() - firstDate.getFullYear();
}

const TRENDING_RATING_VALUE_THRESHOLD = 7.5; // min avg rating for 'trending' tag
const TRENDING_RATING_COUNT_THRESHOLD = 1000; // min number of ratings for 'trending' tag

export function useTags(resource: Resource): Tag[] {
  const tags: Tag[] = [];

  const age = yearsSincePublished(resource);
  if (age !== undefined) {
    if (age < 0) {
      tags.push({ type: 'upcoming' });
    } else if (age === 0) {
      tags.push({ type: 'new' });

      if (
        resource['#RATING']?.['#NUMUSERRATINGS'] &&
        resource['#RATING']['#NUMUSERRATINGS'] >= TRENDING_RATING_VALUE_THRESHOLD &&
        resource['#RATING']['#NUMUSERRATINGS'] >= TRENDING_RATING_COUNT_THRESHOLD
      ) {
        tags.push({ type: 'trending' });
      }
    }
  }

  return tags;
}

export function useGenres(resource: Resource): string[] {
  return resource['#GENRE'] && resource['#GENRE'].length > 0 ? resource['#GENRE'] : [];
}

export function useActors(resource: Resource): string[] | undefined {
  return resource['#ACTORS'] ? resource['#ACTORS'].split(',') : undefined;
}

export interface RatingResult {
  currentRating: {
    ratingValue?: number;
    ratingCount?: number;
  };
  // eslint-disable-next-line no-unused-vars
  updateRating(rating: number): void;
  userRated: boolean;
}

export function useRating(resource: Resource): RatingResult {
  const [userRated, setUserRated] = useState(false);

  return {
    currentRating: {
      ratingValue: resource['#RATING']?.['#ONLYRATING'],
      ratingCount: resource['#RATING']?.['#NUMUSERRATINGS'],
    },
    updateRating: (rating: number) => {
      setUserRated((prevUserRated) => !prevUserRated);
      alert(`Setting rating of ${rating} for ${resource['#TITLE']} not implemented yet.`);
    },
    userRated: userRated,
  };
}

export interface Comment {
  dateCreated: number;
  content: string;
}

// TODO: use IndexedDB
// eslint-disable-next-line
export function useComments(resource: Resource): Comment[] {
  return [
    { dateCreated: Date.now(), content: 'test comment' },
    { dateCreated: Date.now() - 100000, content: 'best movie ever' },
  ];
}

export interface WatchList {
  isSaved: boolean;
  save: (resourceId: string) => void;
}

// TODO: use IndexedDB
// eslint-disable-next-line
export function useWatchList(resource: Resource): WatchList {
  return {
    isSaved: Math.random() > 0.5,
    save: (resourceId) => alert(`Saving of resource with id ${resourceId} is not implemented yet.`),
  };
}
