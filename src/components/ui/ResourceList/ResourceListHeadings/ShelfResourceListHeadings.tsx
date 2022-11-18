import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { resourcesFilterState } from '../../../../state/ResourcesState';
import React from 'react';

export default function ShelfResourceListHeadings() {
  const { t } = useTranslation();
  const resourcesFilter = useRecoilValue(resourcesFilterState);
  const additionalHeadingKey =
    resourcesFilter === 'rated' ? 'resource_rating' : resourcesFilter === 'commented' ? 'resource_comments' : null;

  return (
    <>
      <th>{t('resource_name')}</th>
      <th>{t('resource_cast')}</th>
      {additionalHeadingKey && <th>{t(additionalHeadingKey)}</th>}
      <th>{t('actions')}</th>
    </>
  );
}
