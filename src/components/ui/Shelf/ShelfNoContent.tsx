import React from 'react';
import { useRecoilValue } from 'recoil';
import { resourcesFilterState } from '../../../state/ResourcesState';
import NoContent from '../NoContent';
import AlertCircleOutline from '../../icons/AlertCircleOutline';

export default function ShelfNoContent() {
  const resourcesFilter = useRecoilValue(resourcesFilterState);

  return (
    <NoContent
      translationKey={`no_${resourcesFilter}`}
      icon={<AlertCircleOutline className="fill-current w-full h-full" />}
    />
  );
}
