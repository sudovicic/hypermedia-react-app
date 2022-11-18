import React from 'react';
import { useRecoilValue } from 'recoil';
import { savedResourcesState } from '../state/ResourcesState';
import WatchlistResourceList from '../components/ui/ResourceList/WatchlistResourceList';
import WatchlistNoContent from '../components/ui/Watchlist/WatchlistNoContent';
import Layout from '../components/layout/Layout';

export default function Watchlist() {
  const savedResources = useRecoilValue(savedResourcesState);

  return (
    <Layout titleKey="list">
      <div className="flex flex-col items-center">
        <div className="mt-14 w-full">
          {savedResources ? <WatchlistResourceList savedResources={savedResources} /> : <WatchlistNoContent />}
        </div>
      </div>
    </Layout>
  );
}
