import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { fetchedResourcesState } from '../state/FetchedResourcesState';
import ResourceDetailsCard from '../components/ResourceDetailsCard';
import ResourceGrid from '../components/ResourceGrid';
import GenericError from '../components/GenericError';
import BackButton from '../components/BackButton';

export default function Details() {
  const { resourceId } = useParams();
  const { t } = useTranslation();
  const resources = useRecoilValue(fetchedResourcesState);

  const { selectedResource, otherResources } = useMemo(() => {
    const selectedIdx = resources.findIndex((r) => r['#IMDB_ID'] === resourceId);
    return {
      selectedResource: selectedIdx !== -1 ? resources[selectedIdx] : undefined,
      otherResources: selectedIdx !== -1 ? resources.filter((val, idx) => idx !== selectedIdx) : undefined,
    };
  }, [resourceId, resources]);

  // scroll to top when other resource's details are rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resourceId]);

  return selectedResource || otherResources ? (
    <div className="flex justify-center">
      <div className="w-10/12">
        <div className="mb-2">
          <BackButton />
        </div>
        {selectedResource && (
          <div className="mb-16">
            <ResourceDetailsCard resource={selectedResource} />
          </div>
        )}
        {otherResources && (
          <>
            <p className="text-lg font-bold mb-8">{t('recommendations')}</p>
            <ResourceGrid resources={otherResources} />
          </>
        )}
      </div>
    </div>
  ) : (
    <GenericError />
  );
}
