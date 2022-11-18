import type { Resource } from '../../../utils/api';
import useResourceAge from '../useResourceAge/useResourceAge';

export interface Tag {
  type: 'new' | 'trending' | 'upcoming';
}

const TRENDING_RATING_VALUE_THRESHOLD = 7.5; // min avg rating for 'trending' tag
const TRENDING_RATING_COUNT_THRESHOLD = 1000; // min number of ratings for 'trending' tag

export default function useTags(resource: Resource): Tag[] {
  const tags: Tag[] = [];

  const age = useResourceAge(resource);
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
