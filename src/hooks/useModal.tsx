import { useRecoilState, useResetRecoilState } from 'recoil';
import type { ModalState } from '../state/ModalState';
import { modalState } from '../state/ModalState';

export default function useModal() {
  const [state, setState] = useRecoilState(modalState);
  const resetState = useResetRecoilState(modalState);

  const openModal = (newState: ModalState) => {
    if (state) resetState();
    setState(newState);
  };
  const closeModal = () => resetState();

  return {
    openModal,
    closeModal,
  };
}
