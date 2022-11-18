import React from 'react';
import type { Resource } from '../../../../utils/api';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import useModal from '../../../../hooks/useModal';

export interface WatchlistResourceListActionProps {
  resource: Resource;
}

// TODO: add functionality to buttons (open confirmation modal and set resource state)
export default function WatchlistResourceListActions({ resource: r }: WatchlistResourceListActionProps) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  const buttonClasses = 'btn btn-xs';

  const remove = () => alert('remove');

  const markAsWatched = () => {
    // TODO implement mark as watched
  };

  const openConfirmationModal = () => {
    return openModal({
      content: <p>{t('modal_content_confirm_remove_from_list', { title: r['#TITLE'] })}</p>,
      vitals: {
        title: { key: 'modal_title_confirm_remove_from_list' },
        actions: [
          {
            type: 'confirm',
            title: {
              key: 'action_confirm',
            },
            onClick: remove,
          },
          {
            type: 'deny',
            title: {
              key: 'action_deny',
            },
            onClick: closeModal,
          },
        ],
      },
    });
  };

  return (
    <div className="btn-group">
      <button onClick={markAsWatched} className={classNames(buttonClasses, 'btn-success hover:bg-success/80')}>
        {t('mark_as_watched_cta')}
      </button>
      <button onClick={openConfirmationModal} className={classNames(buttonClasses, 'btn-error hover:bg-error/80')}>
        {t('remove_from_list_cta')}
      </button>
      <Link to={`/details/${r['#IMDB_ID']}`} className={classNames(buttonClasses, 'btn-accent')}>
        {t('details')}
      </Link>
    </div>
  );
}
