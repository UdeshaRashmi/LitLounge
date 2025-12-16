import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console for now; replace with telemetry if needed
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
          <p className="text-sm text-gray-600 mb-4">An unexpected error occurred. Try refreshing the page.</p>
          {this.state.error && (
            <pre className="text-xs text-red-600 bg-white/80 p-3 rounded">{String(this.state.error.message || this.state.error)}</pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
