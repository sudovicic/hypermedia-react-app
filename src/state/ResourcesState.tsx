import { atom, selector } from 'recoil';
import type { Resource } from '../utils/api';
import { localStorageEffect } from './utils';

export const LS_KEY_RESOURCES = 'resources';

// TODO: add proper validation
// eslint-disable-next-line
const validateResources = (item: Resource[] | null) => true;

export const resourcesState = atom<Resource[] | null>({
  key: 'resources',
  default: null,
  effects: [localStorageEffect<Resource[] | null>(LS_KEY_RESOURCES, validateResources)],
});

export type ResourceFilter = 'watched' | 'rated' | 'commented';

export const resourcesFilterState = atom<ResourceFilter>({
  key: 'resourcesFilter',
  default: 'watched',
});

const filterFn = (resources: Resource[] | null, callback: (r: Resource) => boolean) => {
  if (!resources) return null;
  const result = resources.filter(callback);
  return result.length > 0 ? result : null;
};

export const filteredResourcesState = selector({
  key: 'filteredResources',
  get: ({ get }) => {
    const filter = get(resourcesFilterState);
    const resources = get(resourcesState);

    switch (filter) {
      case 'commented':
        return filterFn(resources, (r) => r.comments != null && r.comments.length > 0);
      case 'rated':
        return filterFn(resources, (r) => r.userRating != null);
      case 'watched':
        return filterFn(resources, (r) => r.watched != null);
      default:
        return null;
    }
  },
});

export const savedResourcesState = selector({
  key: 'savedResources',
  get: ({ get }) => {
    const resources = get(resourcesState);

    return filterFn(resources, (r) => r.saved != null);
  },
});
