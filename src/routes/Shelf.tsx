import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredResourcesState } from '../state/ResourcesState';
import ShelfResourceList from '../components/ui/ResourceList/ShelfResourceList';
import ShelfTabs from '../components/ui/Shelf/ShelfTabs';
import ShelfNoContent from '../components/ui/Shelf/ShelfNoContent';
import Layout from '../components/layout/Layout';

export default function Shelf() {
  const filteredResources = useRecoilValue(filteredResourcesState);

  return (
    <Layout titleKey="shelf">
      <div className="flex flex-col items-center">
        <ShelfTabs />
        <div className="mt-4 w-full">
          {filteredResources ? <ShelfResourceList filteredResources={filteredResources} /> : <ShelfNoContent />}
        </div>
      </div>
    </Layout>
  );
}
