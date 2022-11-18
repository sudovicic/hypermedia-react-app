import type { Resource } from '../../../../utils/api';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React from 'react';

export interface ShelfResourceListActionsProps {
  resource: Resource;
}

export default function ShelfResourceListActions({ resource: r }: ShelfResourceListActionsProps) {
  const { t } = useTranslation();

  return (
    <Link to={`/details/${r['#IMDB_ID']}`} className="btn btn-ghost btn-xs">
      {t('details')}
    </Link>
  );
}
