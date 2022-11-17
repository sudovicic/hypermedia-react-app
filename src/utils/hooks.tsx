import type { Resource } from './api';
import { useRecoilState } from 'recoil';
import { themeState } from '../state/ThemeState';
import { resourcesState } from '../state/ResourcesState';

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

/**
 * @function useCast
 *
 * Returns an array of actors of a given resource.
 *
 * @param r The resource to use
 * @param count
 */
export function useCast(r: Resource, count: number): string[] | undefined {
  return r['#ACTORS'] ? r['#ACTORS'].split(',').slice(0, count) : undefined;
}

export interface RatingResult {
  overallRating: {
    ratingValue?: number;
    ratingCount?: number;
  };
  userRating: {
    ratingValue?: number;
  };
  updateRating(rating: number): void;
}

export function useRating(resource: Resource): RatingResult {
  return {
    overallRating: {
      ratingValue: resource['#RATING']?.['#ONLYRATING'],
      ratingCount: resource['#RATING']?.['#NUMUSERRATINGS'],
    },
    userRating: {
      ratingValue: 3, // TODO: return real data
    },
    updateRating: (rating: number) => {
      alert(`Setting rating of ${rating} for ${resource['#TITLE']} not implemented yet.`);
    },
  };
}

export interface Comment {
  dateCreated: number;
  content: string;
}

// TODO: return real data
// eslint-disable-next-line
export function useComments(resource: Resource): Comment[] {
  return [
    { dateCreated: Date.now(), content: 'test comment' },
    { dateCreated: Date.now() - 100000, content: 'best movie ever' },
  ];
}

export interface WatchList {
  isSaved: boolean;
  toggleSaved: (resourceId: string) => void;
  isMarkedAsWatched: boolean;
  toggleWatched: (resourceId: string) => void;
}

// eslint-disable-next-line
export function useWatchList(resource: Resource): WatchList {
  const [resources, setResources] = useRecoilState(resourcesState);

  const isSaved = resources?.some((r) => r['#IMDB_ID'] === resource['#IMDB_ID'] && r.saved) ?? false;

  const toggleSaved = () => {
    if (!resources) {
      setResources([{ ...resource, saved: true }]);
    } else {
      const idx = resources.findIndex((r) => r['#IMDB_ID'] === resource['#IMDB_ID']);
      if (idx < 0) {
        setResources([...resources, { ...resource, saved: true }]);
      } else {
        const newResources = [...resources];
        newResources[idx].saved = !resource.saved;
        setResources(newResources);
      }
    }
  };

  const isMarkedAsWatched = resources?.some((r) => r['#IMDB_ID'] === resource['#IMDB_ID'] && r.watched) ?? false;

  const toggleWatched = () => {
    if (!resources) {
      setResources([{ ...resource, watched: true }]);
    } else {
      const idx = resources.findIndex((r) => r['#IMDB_ID'] === resource['#IMDB_ID']);
      if (idx < 0) {
        setResources([...resources, { ...resource, watched: true }]);
      } else {
        const newResources = resources;
        newResources[idx].watched = !resource.watched;
        setResources(newResources);
      }
    }
  };

  return {
    isSaved,
    toggleSaved,
    isMarkedAsWatched,
    toggleWatched,
  };
}

export function useTheme() {
  const [themeMode, setThemeMode] = useRecoilState(themeState);

  return {
    currentTheme: themeMode,
    toggleTheme: () => setThemeMode(themeMode === 'dark' ? 'light' : 'dark'),
  };
}
