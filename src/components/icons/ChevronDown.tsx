import React from 'react';
import type { IconWrapperProps } from './Icon';
import Icon from './Icon';

/**
 * @see https://materialdesignicons.com/icon/chevron-down
 */
export default function ChevronDown({ className }: IconWrapperProps) {
  return (
    <Icon
      d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
      title="a chevron pointing down"
      className={className}
    />
  );
}
