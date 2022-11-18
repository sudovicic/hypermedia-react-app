import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import type { Resource } from '../../../../utils/api';
import { resourcesFilterState } from '../../../../state/ResourcesState';
import GenericResourceListItem from './GenericResourceListItem';
import UsersRatingStars from '../../UsersRatingStars';
import ShelfResourceListActions from '../ResourceListActions/ShelfResourceListActions';
import useComments from '../../../../hooks/resources/useComments/useComments';

export interface ShelfResourceListItemProps {
  resource: Resource;
}

export default function ShelfResourceListItem({ resource: r }: ShelfResourceListItemProps) {
  const { t } = useTranslation();
  const comments = useComments(r);
  const resourcesFilter = useRecoilValue(resourcesFilterState);

  return (
    <GenericResourceListItem resource={r} actions={<ShelfResourceListActions resource={r} />}>
      <>
        {resourcesFilter === 'commented' && (
          <td>
            {/* TODO show modal */}
            <button className="btn btn-ghost btn-xs">
              {t('show_comments')}&nbsp;({comments.length})
            </button>
          </td>
        )}
        {resourcesFilter === 'rated' && (
          <td>
            <UsersRatingStars resource={r} />
          </td>
        )}
      </>
    </GenericResourceListItem>
  );
}
