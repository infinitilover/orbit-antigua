
'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// FIX: Extended React.Component to make this a valid class component.
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-red-600">Something went wrong.</h1>
                <p className="text-gray-600 mt-2">We've been notified about the issue and are looking into it.</p>
                <div className="mt-6">
                    <Button onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </Button>
                </div>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;