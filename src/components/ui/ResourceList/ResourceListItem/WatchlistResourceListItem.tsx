import type { Resource } from '../../../../utils/api';
import GenericResourceListItem from './GenericResourceListItem';
import React from 'react';
import WatchlistResourceListActions from '../ResourceListActions/WatchlistResourceListActions';

export interface WatchlistResourceListItemProps {
  resource: Resource;
}

export default function WatchlistResourceListItem({ resource: r }: WatchlistResourceListItemProps) {
  return <GenericResourceListItem resource={r} actions={<WatchlistResourceListActions resource={r} />} />;
}
