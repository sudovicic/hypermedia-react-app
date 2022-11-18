import React from 'react';
import ModalPortal from './ModalPortal';
import { useRecoilValue } from 'recoil';
import { modalState } from '../../../state/ModalState';
import Modal from './Modal';

export default function ModalResolver() {
  const state = useRecoilValue(modalState);

  return state?.vitals && state.content ? (
    <ModalPortal>
      <Modal vitals={state.vitals}>{state.content}</Modal>
    </ModalPortal>
  ) : null;
}
