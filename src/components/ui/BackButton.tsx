import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowLeft from '../icons/ArrowLeft';

export default function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button onClick={() => navigate(-1)} className="btn btn-ghost">
      <ArrowLeft className="fill-current w-4 h-4 mr-2" />
      {t('back_link')}
    </button>
  );
}
