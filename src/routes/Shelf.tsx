import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import ResourceGrid from '../components/ResourceGrid';

type TabKey = 'watched' | 'rated' | 'commented';

// export const useResources = (tab: TabKey): Resource[] | null => {};

export default function Shelf() {
  const { t } = useTranslation();
  const tabs: TabKey[] = ['watched', 'rated', 'commented'];
  const [currentTab, setCurrentTab] = useState<TabKey>('watched');
  const isActive = (key: TabKey) => currentTab === key;
  // const resources = useResources(currentTab);
  const resources = null;

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <div className="flex flex-col items-center">
          <div className="inline-flex">
            <div className="tabs tabs-boxed">
              {tabs.map((key) => (
                <button
                  key={key}
                  onClick={() => setCurrentTab(key)}
                  className={classNames('tab', {
                    'tab-active': isActive(key),
                  })}
                >
                  {t(`tab_${key}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8">
            {resources ? (
              <ResourceGrid resources={resources} />
            ) : (
              <div className="flex flex-col gap-4">
                <svg></svg>
                <p>{t(`no_${currentTab}`)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
