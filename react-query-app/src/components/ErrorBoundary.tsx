import React from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../types';

/**
 * Error Boundary component to catch and handle React errors
 * @class ErrorBoundary
 * @extends React.Component
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(_error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReload = (): void => {
    // Reset the error state and reload
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
    
    // If there's a custom retry function, call it
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              The typing tutor encountered an unexpected error. Don't worry, your progress is safe!
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mb-6 p-4 bg-gray-100 rounded-lg">
                <summary className="cursor-pointer font-semibold text-red-600 mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="text-sm text-gray-700 font-mono">
                  <p className="mb-2"><strong>Error:</strong> {this.state.error.toString()}</p>
                  <p><strong>Stack:</strong></p>
                  <pre className="whitespace-pre-wrap text-xs">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}
            
            <div className="space-x-3">
              <button
                onClick={this.handleReload}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                         text-white font-bold py-2 px-6 rounded-lg shadow-lg 
                         transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 
                         text-white font-bold py-2 px-6 rounded-lg shadow-lg 
                         transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 