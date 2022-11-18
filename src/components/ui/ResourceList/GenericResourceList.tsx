import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

export interface ResourceListProps {
  headings: ReactNode;
}

export default function GenericResourceList({ headings, children }: PropsWithChildren<ResourceListProps>) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>{headings}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
