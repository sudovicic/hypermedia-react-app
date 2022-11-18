import type { PropsWithoutRef, SVGProps } from 'react';
import React from 'react';
import classNames from 'classnames';

export interface IconProps {
  /**
   * The `d` attribute of the SVG element.
   */
  d: string;
  className?: string;
  title?: string;
  svgProps?: PropsWithoutRef<SVGProps<SVGElement>>;
}

export type IconWrapperProps = Pick<IconProps, 'className' | 'svgProps'>;

export default function Icon({ d, title, className, svgProps }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={classNames(className, { 'fill-current w-6 h-6': !className })}
      {...svgProps}
    >
      {title && <title>{title}</title>}
      <path d={d} />
    </svg>
  );
}
