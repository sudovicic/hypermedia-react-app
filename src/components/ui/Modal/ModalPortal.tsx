import type { PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ModalPortalProps {
  elementId?: string;
}

export default function ModalPortal({ children, elementId = 'modalRoot' }: PropsWithChildren<ModalPortalProps>) {
  const element = document.createElement('div');

  useLayoutEffect(() => {
    const modalRoot = document.getElementById(elementId);
    modalRoot?.appendChild(element);

    return () => {
      modalRoot?.removeChild(element);
    };
  }, [element, elementId]);

  return createPortal(children, element);
}
