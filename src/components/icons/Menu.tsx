import React from 'react';
import type { IconWrapperProps } from './Icon';
import Icon from './Icon';

/**
 * @see https://materialdesignicons.com/icon/menu
 */
export default function Menu({ className }: IconWrapperProps) {
  return (
    <Icon
      d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
      title="three stacked, horizontal lines indicating a dropdown menu"
      className={className}
    />
  );
}
