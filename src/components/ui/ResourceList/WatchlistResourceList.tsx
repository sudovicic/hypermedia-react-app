import React from 'react';
import GenericResourceList from './GenericResourceList';
import type { Resource } from '../../../utils/api';
import WatchlistResourceListItem from './ResourceListItem/WatchlistResourceListItem';
import WatchlistResourceListHeadings from './ResourceListHeadings/WatchlistResourceListHeadings';

export interface WatchlistResourceListProps {
  savedResources: Resource[];
}

export default function WatchlistResourceList({ savedResources }: WatchlistResourceListProps) {
  return (
    <GenericResourceList headings={<WatchlistResourceListHeadings />}>
      {savedResources.map((r) => (
        <WatchlistResourceListItem resource={r} key={`list-${r['#IMDB_ID']}`} />
      ))}
    </GenericResourceList>
  );
}
