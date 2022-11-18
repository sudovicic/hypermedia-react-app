import React from 'react';
import type { ResourceFilter } from '../../../state/ResourcesState';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { resourcesFilterState } from '../../../state/ResourcesState';
import { useTranslation } from 'react-i18next';

const allResourceFilters = ['watched', 'commented', 'rated'];

export default function ShelfTabs() {
  const { t } = useTranslation();
  const [resourcesFilter, setResourceFilter] = useRecoilState(resourcesFilterState);
  const isActive = (key: ResourceFilter) => resourcesFilter === key;

  return (
    <div className="inline-flex">
      <div className="tabs tabs-boxed">
        {allResourceFilters.map((key) => (
          <button
            key={key}
            onClick={() => setResourceFilter(key as ResourceFilter)}
            className={classNames('tab', {
              'tab-active': isActive(key as ResourceFilter),
            })}
          >
            {t(`tab_${key}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
