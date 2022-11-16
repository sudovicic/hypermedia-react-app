import { atom } from 'recoil';
import type { Resource } from '../api/api-routes';

export const fetchedResourcesState = atom<Resource[]>({
  key: 'fetchedResources',
  default: [],
});
