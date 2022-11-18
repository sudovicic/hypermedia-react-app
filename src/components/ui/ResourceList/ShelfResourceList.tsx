import React from 'react';
import GenericResourceList from './GenericResourceList';
import type { Resource } from '../../../utils/api';
import ShelfResourceListItem from './ResourceListItem/ShelfResourceListItem';
import ShelfResourceListHeadings from './ResourceListHeadings/ShelfResourceListHeadings';

export interface ShelfResourceListProps {
  filteredResources: Resource[];
}

export default function ShelfResourceList({ filteredResources }: ShelfResourceListProps) {
  return (
    <GenericResourceList headings={<ShelfResourceListHeadings />}>
      {filteredResources.map((r) => (
        <ShelfResourceListItem resource={r} key={`shelf-${r['#IMDB_ID']}`} />
      ))}
    </GenericResourceList>
  );
}
