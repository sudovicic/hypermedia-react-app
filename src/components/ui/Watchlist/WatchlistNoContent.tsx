import React from 'react';
import NoContent from '../NoContent';
import AlertCircleOutline from '../../icons/AlertCircleOutline';

export default function WatchlistNoContent() {
  const filter = 'saved';

  return (
    <NoContent translationKey={`no_${filter}`} icon={<AlertCircleOutline className="fill-current w-full h-full" />} />
  );
}
