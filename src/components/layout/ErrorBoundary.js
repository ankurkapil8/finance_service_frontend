import React, { Component } from 'react';
import ListErrors from './ListErrors';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
        console.log(error,errorInfo);
        window._LTracker.push(error,errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <ListErrors errors="Something went wrong. Please discuss with developer!" statusCode="401"/>
            
        }

        return this.props.children;
    }
}

export default ErrorBoundary;