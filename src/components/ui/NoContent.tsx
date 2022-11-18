import type { ReactElement } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface NoContentProps {
  translationKey: string;
  icon: ReactElement;
}

export default function NoContent({ translationKey, icon }: NoContentProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-transparent/10 text-base-content/30 rounded-full w-24 h-24 p-4">{icon}</div>
      <p>{t(translationKey)}</p>
    </div>
  );
}
