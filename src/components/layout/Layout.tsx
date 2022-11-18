import type { PropsWithChildren } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from '../ui/BackButton';

export interface LayoutProps {
  titleKey: string;
}

export default function Layout({ titleKey, children }: PropsWithChildren<LayoutProps>) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <div className="mb-2">
          <div className="flex">
            <div className="basis-1/3">
              <BackButton />
            </div>
            <div className="basis-1/3 flex justify-center items-center">
              <h1 className="text-xl font-bold">{t(titleKey)}</h1>
            </div>
            <div className="basis-1/3" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
