import React from 'react';
import { useRecoilValue } from 'recoil';
import ResourceGrid from '../components/ui/ResourceGrid';
import type { Resource } from '../utils/api';
import { fetchedResourcesState } from '../state/ResourcesState';
import NoResults from '../components/NoResults';

export default function Home() {
  const fetchedResources = useRecoilValue<Resource[] | null>(fetchedResourcesState);

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        {fetchedResources ? (
          <ResourceGrid resources={fetchedResources} />
        ) : (
          <div className="h-full mt-28">
            <NoResults />
          </div>
        )}
      </div>
    </div>
  );
}
