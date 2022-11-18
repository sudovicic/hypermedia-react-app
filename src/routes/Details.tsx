import React, { useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import ResourceDetailsCard from '../components/ui/ResourceDetailsCard';
import ResourceGrid from '../components/ui/ResourceGrid';
import { fetchedResourcesState, resourcesState } from '../state/ResourcesState';
import Layout from '../components/layout/Layout';

export default function Details() {
  const { resourceId } = useParams();
  const { t } = useTranslation();
  const resources = useRecoilValue(resourcesState);
  const fetchedResources = useRecoilValue(fetchedResourcesState);

  // TODO: simplify
  const { selectedResource, otherResources } = useMemo(() => {
    if (!resources && !fetchedResources) {
      return { selectedResource: null, otherResources: null };
    }
    const resourceIdx = resources?.findIndex((r) => r['#IMDB_ID'] === resourceId) ?? -1;
    if (resourceIdx >= 0) {
      return {
        selectedResource: resourceIdx >= 0 ? resources?.[resourceIdx] : null,
        otherResources: resourceIdx >= 0 ? fetchedResources?.filter((val, idx) => idx !== resourceIdx) : null,
      };
    } else {
      const fetchedResourceIdx = fetchedResources?.findIndex((r) => r['#IMDB_ID'] === resourceId) ?? -1;
      if (fetchedResourceIdx >= 0) {
        return {
          selectedResource: fetchedResourceIdx >= 0 ? fetchedResources?.[fetchedResourceIdx] : null,
          otherResources:
            fetchedResourceIdx >= 0 ? fetchedResources?.filter((val, idx) => idx !== fetchedResourceIdx) : null,
        };
      }
    }
    return { selectedResource: null, otherResources: null };
  }, [resourceId, resources, fetchedResources]);

  // scroll to top when another resource's details are rendered
  useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0);
  }, [resourceId]);

  return selectedResource ? (
    <Layout titleKey="details">
      <div className="mb-16">
        <ResourceDetailsCard resource={selectedResource} />
      </div>
      {otherResources && (
        <>
          <p className="text-lg font-bold mb-8">{t('recommendations')}</p>
          <ResourceGrid resources={otherResources} />
        </>
      )}
    </Layout>
  ) : (
    <Navigate replace to="/home" />
  );
}
