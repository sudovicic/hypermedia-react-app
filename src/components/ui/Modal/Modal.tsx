import type { PropsWithChildren } from 'react';
import React from 'react';
import type { ModalAction, ModalVitals } from '../../../state/ModalState';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export interface ModalProps {
  vitals: ModalVitals;
}

export default function Modal({ vitals, children }: PropsWithChildren<ModalProps>) {
  const { t } = useTranslation();
  const buttonClasses = 'btn';

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box flex flex-col gap-2">
        {vitals.title?.key && <h3 className="font-bold text-lg mb-4">{t(vitals.title.key)}</h3>}
        {children}
        {vitals.actions && (
          <div className="modal-action btn-group-horizontal">
            {vitals.actions.map((a: ModalAction) => (
              <button
                key={a.title.key}
                onClick={a.onClick}
                className={classNames(buttonClasses, {
                  'btn-success hover:bg-success/80': a.type === 'confirm',
                  'btn-outline': a.type === 'deny',
                })}
              >
                {t(a.title.key, undefined, a.title.translationOptions)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
