import React from 'react';
import type { IconWrapperProps } from './Icon';
import Icon from './Icon';

/**
 * @see https://materialdesignicons.com/icon/google-downasaur
 */
export default function Downasaur({ className }: IconWrapperProps) {
  return (
    <Icon
      d="M13 2V3H12V9H11V10H9V11H8V12H7V13H5V12H4V11H3V9H2V15H3V16H4V17H5V18H6V22H8V21H7V20H8V19H9V18H10V19H11V22H13V21H12V17H13V16H14V15H15V12H16V13H17V11H15V9H20V8H17V7H22V3H21V2M14 3H15V4H14Z"
      title="the downasaur"
      className={className}
    />
  );
}
