import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export interface TooltipProps {
  content: ReactElement;
  canOpen: boolean;
}

export default function Tooltip({ content, canOpen, children }: PropsWithChildren<TooltipProps>) {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger>{children}</TooltipPrimitive.Trigger>
        {canOpen && (
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content side="top" align="center">
              {content}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        )}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
