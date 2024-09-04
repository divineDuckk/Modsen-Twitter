import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: JSX.Element;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
