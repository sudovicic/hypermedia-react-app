import type { Resource } from '../../../utils/api';
import { useRecoilState } from 'recoil';
import { resourcesState } from '../../../state/ResourcesState';

export interface WatchList {
  isSaved: boolean;
  toggleSaved: (resourceId: string) => void;
  isMarkedAsWatched: boolean;
  toggleWatched: (resourceId: string) => void;
}

// eslint-disable-next-line
export default function useWatchlist(resource: Resource): WatchList {
  const [resources, setResources] = useRecoilState(resourcesState);

  const isSaved = resources?.some((r) => r['#IMDB_ID'] === resource['#IMDB_ID'] && r.saved) ?? false;

  const toggleSaved = () => {
    const clonedResource = JSON.parse(JSON.stringify(resource)) as Resource;
    if (!resources) {
      setResources([{ ...clonedResource, saved: true }]);
    } else {
      const idx = resources.findIndex((r) => r['#IMDB_ID'] === resource['#IMDB_ID']);
      if (idx < 0) {
        setResources([...resources, { ...clonedResource, saved: true }]);
      } else {
        const clonedResources = JSON.parse(JSON.stringify(resources)) as Resource[];
        clonedResources[idx].saved = !resource.saved;
        setResources(clonedResources);
      }
    }
  };

  const isMarkedAsWatched = resources?.some((r) => r['#IMDB_ID'] === resource['#IMDB_ID'] && r.watched) ?? false;

  const toggleWatched = () => {
    const clonedResource = JSON.parse(JSON.stringify(resource)) as Resource;
    if (!resources) {
      setResources([{ ...clonedResource, watched: true }]);
    } else {
      const idx = resources.findIndex((r) => r['#IMDB_ID'] === resource['#IMDB_ID']);
      if (idx < 0) {
        setResources([...resources, { ...clonedResource, watched: true }]);
      } else {
        const clonedResources = JSON.parse(JSON.stringify(resources)) as Resource[];
        clonedResources[idx].watched = !resource.watched;
        setResources(clonedResources);
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
