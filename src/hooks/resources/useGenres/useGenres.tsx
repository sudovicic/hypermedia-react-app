import type { Resource } from '../../../utils/api';

export default function useGenres(resource: Resource): string[] {
  return resource['#GENRE'] && resource['#GENRE'].length > 0 ? resource['#GENRE'] : [];
}
