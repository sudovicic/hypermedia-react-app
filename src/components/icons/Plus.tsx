import React from 'react';
import type { IconWrapperProps } from './Icon';
import Icon from './Icon';

export default function Plus({ className }: IconWrapperProps) {
  return <Icon d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" title="a plus" className={className} />;
}
