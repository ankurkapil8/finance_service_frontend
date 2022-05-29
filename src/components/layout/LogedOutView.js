import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom';

import {
    LOGOUT
  } from '../../constants/actionTypes';
function LogedOutView(props) {
    const dispatch = useDispatch();
    let history = useHistory();

    const logout = ()=>{
         dispatch({ type: LOGOUT })
           console.log("hollo");
           history.push("/");
       }
         if (props.currentUser.errors && props.currentUser.errors.statusCode == 200) {
        let name = props.currentUser.email.split("@");

        return (<>
            
            {props.currentUser.errors.body.record.isAdmin?<li className="nav-item">
            <li className="nav-item">
            <NavLink aactiveClassName="active" to="/adminHome" className="nav-link">Admin</NavLink>
            </li>
                
            </li>:""}            
            <li className="nav-item">
                <NavLink aactiveClassName="active" to="/userAction" className="nav-link">
                    {name[0]}

                    {props.currentUser.errors.body.record.isPrimeMember?<label className="clr-cyan">(Prime member)</label>:""}  

                    
                    </NavLink>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={logout} >Logout</a>
                {/* <NavLink className="nav-link">{props.email}</NavLink> */}
            </li>
        </>
        )
    }
    return null;
}

export default LogedOutView
