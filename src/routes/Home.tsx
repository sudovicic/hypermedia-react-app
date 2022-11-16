import React from 'react';
import { useRecoilValue } from 'recoil';
import { fetchedResourcesState } from '../state/FetchedResourcesState';
import type { Resource } from '../api/api-routes';
import ResourceGrid from '../components/ResourceGrid';

export default function Home() {
  const fetchedResourcesFromState = useRecoilValue<Resource[] | null>(fetchedResourcesState);

  return fetchedResourcesFromState ? (
    <div className="flex justify-center">
      <div className="w-11/12">
        <ResourceGrid resources={fetchedResourcesFromState} />
      </div>
    </div>
  ) : (
    <div>no content</div>
  );
}
