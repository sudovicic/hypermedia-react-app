import React from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackButton';
import ResourceList from '../components/ResourceList';
import { useRecoilValue } from 'recoil';
import { savedResourcesState } from '../state/ResourcesState';

export default function List() {
  const { t } = useTranslation();
  const filter = 'saved';
  const savedResources = useRecoilValue(savedResourcesState);

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <div className="mb-2">
          <div className="flex">
            <div className="basis-1/3">
              <BackButton />
            </div>
            <div className="basis-1/3 flex justify-center items-center">
              <h1 className="text-xl font-bold">{t('list')}</h1>
            </div>
            <div className="basis-1/3" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="mt-8 w-full">
            {savedResources ? (
              <ResourceList resources={savedResources} />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-transparent/10 text-base-content/30 rounded-full w-24 h-24 p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current">
                    <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                  </svg>
                </div>
                <p>{t(`no_${filter}`)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
