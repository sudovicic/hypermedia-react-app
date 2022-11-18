import React from 'react';
import ResourceCard from './ResourceCard';
import type { Resource } from '../../utils/api';

export interface ResourceGridProps {
  resources: Resource[];
}

export default function ResourceGrid({ resources }: ResourceGridProps) {
  return (
    <div className="grid grid-cols-resource-cards-vertical lg:grid-cols-resource-cards-horizontal gap-4">
      {resources.map((r) => (
        <ResourceCard key={r['#IMDB_ID']} resource={r} />
      ))}
    </div>
  );
}
