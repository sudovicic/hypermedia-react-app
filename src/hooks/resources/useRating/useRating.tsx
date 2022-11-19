import type { Resource, UserRating } from '../../../utils/api';
import { useRecoilState } from 'recoil';
import { resourcesState } from '../../../state/ResourcesState';

export interface RatingResult {
  overallRating: {
    ratingValue?: number;
    ratingCount?: number;
  };
  userRating?: UserRating;
  setRating: (rating: UserRating) => void;
  resetRating: () => void;
}

export default function useRating(resource: Resource): RatingResult {
  const [resources, setResources] = useRecoilState(resourcesState);

  return {
    overallRating: {
      ratingValue: resource['#RATING']?.['#ONLYRATING'],
      ratingCount: resource['#RATING']?.['#NUMUSERRATINGS'],
    },
    userRating: resources?.find((r) => resource['#IMDB_ID'] === r['#IMDB_ID'])?.userRating,
    setRating: (rating: UserRating) => {
      const clonedResource = JSON.parse(JSON.stringify(resource)) as Resource;
      if (!resources) {
        setResources([{ ...clonedResource, userRating: rating }]);
      } else {
        const idx = resources.findIndex((r) => r['#IMDB_ID'] === resource['#IMDB_ID']);
        if (idx < 0) {
          setResources([...resources, { ...clonedResource, userRating: rating }]);
        } else {
          const clonedResources = JSON.parse(JSON.stringify(resources)) as Resource[];
          clonedResources[idx].userRating = rating;
          setResources(clonedResources);
        }
      }
    },
    resetRating: () => {
      if (!resources) {
        return;
      } else {
        const clonedResource = JSON.parse(JSON.stringify(resource)) as Resource;
        const idx = resources.findIndex((r) => r['#IMDB_ID'] === resource['#IMDB_ID']);
        if (idx < 0) {
          setResources([...resources, { ...clonedResource, userRating: undefined }]);
        } else {
          const clonedResources = JSON.parse(JSON.stringify(resources)) as Resource[];
          clonedResources[idx].userRating = undefined;
          setResources(clonedResources);
        }
      }
    },
  };
}
