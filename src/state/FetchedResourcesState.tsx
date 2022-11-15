import { atom } from 'recoil';
import type { Resource } from '../utils/api';

export const fetchedResourcesState = atom<Resource[]>({
  key: 'fetchedResources',
  default: [],
});
