import type { Resource } from '../../../utils/api';

/**
 * Returns the amount of years since the resource was published.
 *
 * @param resource
 */
export default function useResourceAge(resource: Resource): number | undefined {
  if (!resource['#YEAR']) return undefined;

  const firstDate = new Date(Date.parse(resource['#YEAR'].toString()));
  const secondDate = new Date(Date.now());
  return secondDate.getFullYear() - firstDate.getFullYear();
}
