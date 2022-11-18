import { atom } from 'recoil';
import type { MouseEvent, ReactElement } from 'react';

export interface ModalAction {
  type: 'confirm' | 'deny';
  title: ModalTitle;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface ModalTitle {
  key: string;
  // eslint-disable-next-line
  translationOptions?: any; // react-i18next has weird type definitions, not worth it to type correctly (for now)
}

export interface ModalVitals {
  title?: ModalTitle;
  actions?: ModalAction[];
}

export interface ModalState {
  content?: ReactElement;
  vitals?: ModalVitals;
}

export const modalState = atom<ModalState | null>({
  key: 'modal',
  default: null,
});
