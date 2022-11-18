import type { Resource } from '../../../utils/api';

/**
 * @function useCast
 *
 * Returns an array of actors of a given resource.
 *
 * @param r The resource to use
 * @param count
 */
export default function useCast(r: Resource, count: number): string[] | undefined {
  return r['#ACTORS'] ? r['#ACTORS'].split(',').slice(0, count) : undefined;
}
