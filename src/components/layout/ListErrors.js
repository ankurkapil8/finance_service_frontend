import React, { Component } from 'react'
import { Button, Form, Col, Alert } from 'react-bootstrap';

export default class ListErrors extends Component {
    render() {
        const errors = this.props.errors;
        const statusCode = this.props.statusCode;
        if (errors) {
            return (
                <Alert  variant={statusCode==200?"success":"danger"}>
                    {errors}
              </Alert>
            );
        } else {
            return null;
        }
    }
}
