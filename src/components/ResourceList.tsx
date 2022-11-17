import React from 'react';
import type { Resource } from '../utils/api';
import { useTranslation } from 'react-i18next';
import ResourceListItem from './ResourceListItem';
import { useRecoilValue } from 'recoil';
import { resourcesFilterState } from '../state/ResourcesState';

export interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  const { t } = useTranslation();
  const resourcesFilter = useRecoilValue(resourcesFilterState);
  const currentHeadingKey =
    resourcesFilter === 'rated' ? 'resource_rating' : resourcesFilter === 'commented' ? 'resource_comments' : null;

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>{t('resource_name')}</th>
            <th>{t('resource_cast')}</th>
            {currentHeadingKey && <th>{t(currentHeadingKey)}</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <ResourceListItem resource={r} key={r['#IMDB_ID']} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
