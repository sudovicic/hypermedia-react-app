import { useTranslation } from 'react-i18next';
import React from 'react';

export default function GenericError() {
  const { t } = useTranslation();

  return <div>{t('generic_error')}</div>;
}
