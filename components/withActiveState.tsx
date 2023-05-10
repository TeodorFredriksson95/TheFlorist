import React from 'react';

export function withActiveState(WrappedComponent: any) {
  return ({ isActive, ...props }: any) => (
    <WrappedComponent isActive={isActive} {...props} />
  );
}