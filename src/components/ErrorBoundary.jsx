// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    fetch(
      'https://asia-south1-logger-462111.cloudfunctions.net/logAll',
      {
        method: 'POST',
        // mode: 'cors',                    // ← optional, helps with CORS
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          severity: 'ERROR',            // CF will lowercase for you
          textPayload: `${error}\n${errorInfo.componentStack}`,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }
    ).catch(err => console.error('Failed to log error:', err));
  }

  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong. Check logs.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
