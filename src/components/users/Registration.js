import React from 'react'
import { Button, Form, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import agent from '../../agent'
import ListErrors from '../layout/ListErrors';


class Registration extends React.Component {    
    constructor(props){
        super(props)
        this.state = {
            userDetails: {},
            errors:"",
            statusCode:"",
            isLoading:false
        }
    }
    handleChange = (e) => {
        const state = this.state.userDetails
        state[e.target.name] = e.target.value;
        this.setState({ userDetails: state });
        
    }
    submitForm=() => ev =>{
        ev.preventDefault();
        this.setState({ isLoading: true });
        agent.Auth.register(this.state.userDetails).then((res=>{
            this.setState({ errors: res, statusCode:res.statusCode, isLoading:false});
            if(res.statusCode == 200){
                ev.target.reset();
                //this.props.history.push('/login')
            }
        }));
    }
    render() {

    return (
        <div className="login-div">
            <ListErrors errors={this.state.errors} statusCode={this.state.statusCode} />
            <Form className="login-form" onSubmit={this.submitForm()}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email"  onChange={this.handleChange} required/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="phone" name="phone"  onChange={this.handleChange} required/>
                        <Form.Text className="text-muted">
                            We'll never share your phone no with anyone else.
                    </Form.Text>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}  controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password"  onChange={this.handleChange} required/>
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                    <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                        
                        {this.state.isLoading ? 'Loading…' : "Register"}
                    </Button>
                </Form.Row>

            </Form>
        </div>

    )}
}

export default Registration
