import React from 'react'
import { Route,NavLink } from 'react-router-dom'

function LogedInView(props) {
    if(!props.currentUser.errors || props.currentUser.errors.statusCode ==500){
        return (

        <li className="nav-item">
        <NavLink aactiveClassName="active" className="nav-link" to="/login">Login</NavLink>
        </li>
        )
    }
    return null;

}

export default LogedInView
