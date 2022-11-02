import React from 'react';

export default function FullscreenSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
