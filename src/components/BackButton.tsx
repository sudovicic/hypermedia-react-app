import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button onClick={() => navigate(-1)} className="btn btn-ghost">
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
      </svg>
      {t('back_link')}
    </button>
  );
}
