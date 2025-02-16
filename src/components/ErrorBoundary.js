import React from "react";
import * as Sentry from "@sentry/react";
class ErrorBoundary extends React.Component {
    componentDidCatch(error) {
        Sentry.captureException(error);
    }
    render() {
        return this.props.children;
    }
}
export default ErrorBoundary;
