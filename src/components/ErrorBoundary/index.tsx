import { Component, ErrorInfo } from 'react';

import { ErrorInfo as ErrorInfoComponent } from '@/components/ErrorInfo';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { fallback = <ErrorInfoComponent />, children } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}
