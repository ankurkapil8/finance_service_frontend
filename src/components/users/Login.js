import React, { Component}  from 'react'
import { Button, Form, Col, Alert } from 'react-bootstrap';
import { Route, NavLink, Link,useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import agent from '../../agent'
import ListErrors from '../layout/ListErrors';
import user from "../../models/user";
import Loader from '../layout/Loader';
import {
    UPDATE_FIELD_AUTH,
    LOGIN,
    LOGIN_PAGE_UNLOADED,
    LOGOUT
} from '../../constants/actionTypes';
import "./login.css";
class Login extends Component {
   // let history = useHistory();

    constructor(props) {
        super(props);
        this.state ={isShowLoader:false};
        this.changeEmail = ev => {this.props.onChangeEmail(ev.target.value)};
        this.changePassword = ev => {this.props.onChangePassword(ev.target.value)};
    }
    componentDidMount(){
        var body = document.body;
        body.classList.add("login-body");

        // var dd = document.html;
        // dd.classList.add("login-body");
        this.props.onlogout()
        this.props.onChangeEmail("")
        this.props.onChangePassword("")
    }
    submitForm=ev=> {
        ev.preventDefault();
        this.setState({isShowLoader:true});
        user.Auth.login(this.props.username, this.props.password).then(res=>{
            this.setState({isShowLoader:false});
            console.log(res);
            this.props.onSubmit(res.body);
        }).catch(err=>{
            console.log(err);
        })
    };

    componentDidUpdate(){
        if(this.props.isLoginSuccess){
            this.props.history.push('/')
        }
        
    }
    
    componentWillUnmount() {
        var body = document.body;
        body.classList.remove("login-body");

        this.props.onUnload();
      }
    render() {
        const username = this.props.username;
        const password = this.props.password;
        return (
            <div id="login">
           
            <Loader show={this.state.isShowLoader} />
        {/* <Alert key={this.state.errormsg} variant="danger">{this.state.errormsg}</Alert> */}
            <ListErrors errors={this.props.errors} statusCode={this.props.statusCode}/>
            <div className="container">
        <div className="card card-container">
             {/* <img className="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> */}
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" className="profile-name-card"></p>
            <Form  className="form-signin" onSubmit={this.submitForm}>
                <span id="reauth-email" className="reauth-email"></span>
                <input type="text" autoFocus id="inputEmail" value={username} onChange={this.changeEmail} className="form-control" placeholder="Username" required/>
                <input type="password" id="inputPassword" value={password}  onChange={this.changePassword} className="form-control" placeholder="Password" required/>
                <div id="remember" className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <Button variant="primary btn-signin" disabled={this.state.isShowLoader} type="submit">{this.state.isShowLoader ? 'Loading…' : "Sign in"}</Button>
            </Form>
            <a href="#" className="forgot-password">
                Forgot the password?
            </a>
        </div>
    </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onSubmit: (data) =>
        dispatch({ type: LOGIN, payload: data }),
    onUnload: () =>
        dispatch({ type: LOGIN_PAGE_UNLOADED }),
    onlogout:()=>
        dispatch({ type: LOGOUT })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
