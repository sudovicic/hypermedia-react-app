import React from 'react';
import type { Resource } from '../../../../utils/api';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export interface WatchlistResourceListActionProps {
  resource: Resource;
}

// TODO: add functionality to buttons (open confirmation modal and set resource state)
export default function WatchlistResourceListActions({ resource: r }: WatchlistResourceListActionProps) {
  const { t } = useTranslation();
  const buttonClasses = 'btn btn-xs';

  return (
    <div className="btn-group">
      <button className={classNames(buttonClasses, 'btn-success hover:bg-success/80')}>
        {t('mark_as_watched_cta')}
      </button>
      <button className={classNames(buttonClasses, 'btn-error hover:bg-error/80')}>{t('remove_from_list_cta')}</button>
      <Link to={`/details/${r['#IMDB_ID']}`} className={classNames(buttonClasses, 'btn-accent')}>
        {t('details')}
      </Link>
    </div>
  );
}
