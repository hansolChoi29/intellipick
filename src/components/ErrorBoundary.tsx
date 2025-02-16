import React, { ReactNode } from "react";
import * as Sentry from "@sentry/react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error) {
    Sentry.captureException(error);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
