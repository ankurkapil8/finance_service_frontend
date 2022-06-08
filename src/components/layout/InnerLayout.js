import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import InnerHeader from './InnerHeader';
import Footer from './Footer';
import Leftbar from './Leftbar';
import TopNav from './TopNav';
import { useHistory } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import ErrorBoundary from './ErrorBoundary';
const InnerLayout = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.auth);
    const history = useHistory();
    const [showSidebar, setshowSidebar] = useState(true)
    useEffect(() => {
        setshowSidebar(window.innerWidth <= 768 ? false : true);
        checkLogin();
    }, [Component]);
    const toggleSidebar = () => {

        console.log(window);
        setshowSidebar(showSidebar ? false : true)
        // this.setState({
        //   isopen:this.state.isopen?false:true
        // })
    }
    const checkLogin = () =>{
        let jwt = "";
         jwt = sessionStorage.getItem("jwt");
         console.log(jwt);
         if(jwt=="" || !auth.hasOwnProperty("username")){
             history.push("/login");
         }
    }
    return (
        <Route {...rest} render={props => (
            <>
        <div className="wrapper ">
        <Leftbar/>
        <div className="main-panel">
            <TopNav toggleSidebar={toggleSidebar} />
            <ErrorBoundary>
          <Component {...props} />
          </ErrorBoundary>
        </div>
      </div>
            
            </>
        )} />)
}

export default InnerLayout
