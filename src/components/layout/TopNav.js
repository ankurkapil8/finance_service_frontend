import React,{useState} from 'react'
import {  Navbar, Nav } from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {LOGOUT} from '../../constants/actionTypes';
import { useLocation } from 'react-router-dom'

export default function TopNav(props) {
  const listRouteName = {
                          "/":"Dashboard",
                          "/memberGroup":"Member Group",
                          "/addMemberGroup":"Member Group",
                          "/member":"Member",
                          "/addMember":"Member",
                          "/emiCalculator":"Calculate EMI"
                        }
  const location = useLocation();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let history = useHistory();
const [navClick,setNevClick] = useState(false);
    return (
        <nav className={navClick?"navbar navbar-expand-lg navbar-absolute fixed-top bg-white":"navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent"} >
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a className="navbar-brand" href="#">{listRouteName[location.pathname]}</a>
          </div>
          <button onClick={()=>setNevClick(!navClick)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navigation">
            <form>
              <div className="input-group no-border">
                <input type="text" value="" className="form-control" placeholder="Search..."/>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="nc-icon nc-zoom-split"></i>
                  </div>
                </div>
              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link btn-magnify" href="#">
                  <i className="nc-icon nc-layout-11"></i>
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </a>
              </li>
              <li className="nav-item btn-rotate dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="nc-icon nc-bell-55"></i>
                  <p>
                    <span className="d-lg-none d-md-block"></span>
                  </p>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="dropdown-item" to={"/login"} >Logout</Link>
                  {/* <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a> */}
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link btn-rotate" href="#">
                  <i className="nc-icon nc-settings-gear-65"></i>
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        // <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
               
        //         <h4 id="logo-web" className="mr-4">AA2 MutualHelp</h4>
        //     <button type="button" onClick={props.toggleSidebar} class="btn btn-dark">
        //         <i class="fas fa-align-left"></i>
        //     </button>
        //     <h4 id="logo-mobile" className="">AA2 MutualHelp</h4>
        //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //     <Navbar.Collapse id="responsive-navbar-nav">
        //         <Nav className="ml-auto">
        //             <Nav.Link href="#">{auth.username}</Nav.Link>
        //             <Nav.Link eventKey={2} onClick={logout}>
        //                 Logout
        //             </Nav.Link>
        //         </Nav>
        //     </Navbar.Collapse>
        // </Navbar>
    )
}
