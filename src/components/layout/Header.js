import React, { Component } from 'react'
import { Route,NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import LoggedInView from './LogedInView';
import LoggedOutView from './LogedOutView';
import ItrPopup from '../finance-Itr/ItrPopup'

class Header extends Component {
    isopen = false;
    constructor(props){
      super(props);
      this.state = {
        isopen:false
      }
    }
    handleITRPopup = () =>{
        this.setState({
          isopen:this.state.isopen?false:true
        })
      }
  
    render(){

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
                <div className="container">
                    <NavLink className="navbar-brand" to="/"> <h2>AA2 Mutualhelp</h2></NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7"
                        aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-7">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            {/* <NavLink aactiveClassName="active" className="nav-link" to="/">Home</NavLink> */}

                            </li>
                            {/* <li className="nav-item" onClick={this.handleITRPopup}>
                                <a className="nav-link" onClick={this.handleITRPopup}>File ITR</a>
                            </li> */}
                            {/* <li className="nav-item">
                                <NavLink activeClassName="active" to="/CategoryList" className="nav-link">Order Food</NavLink>
                                
                            </li> */}
                            <LoggedOutView currentUser={this.props}/>
                            <LoggedInView currentUser={this.props}/>

                        </ul>

                    </div>
                </div>
            </nav>
            <div className="view">
                <div className="mask rgba-gradient d-flex justify-content-center align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 white-text text-center mx-auto  mb-5 wow fadeInLeft" data-wow-delay="0.3s">
                                <h1 className="my-3 text-center mx-auto font-weight-bold wow fadeInLeft">Services, on demand.</h1>

                                <div className="ml-auto mr-auto main-search ">

                                    <form action="" className="search-service">
                                        <input className="search-form form-control form-control-lg" type="text" placeholder="Search Services" />
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ItrPopup isopen={this.state.isopen} hide={this.handleITRPopup}/>
        </header>
    )}
}

const mapStateToProps = state => ({ ...state.auth});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)
