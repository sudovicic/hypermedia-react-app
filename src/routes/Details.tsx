import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { fetchedResourcesState } from '../state/FetchedResourcesState';
import ResourceDetailsCard from '../components/ResourceDetailsCard';
import ResourceGrid from '../components/ResourceGrid';
import GenericError from '../components/GenericError';

export default function Details() {
  const navigate = useNavigate();
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
          <button onClick={() => navigate(-1)} className="btn btn-ghost">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
            {t('back_link')}
          </button>
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
