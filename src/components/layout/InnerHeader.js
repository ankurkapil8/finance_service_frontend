import React, { Component } from 'react'
import { Route,NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import LoggedInView from './LogedInView';
import LoggedOutView from './LogedOutView';
import ItrPopup from '../finance-Itr/ItrPopup'

class InnerHeader extends Component {
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
            <nav className="navbar navbar-expand-lg navbar-dark top-nav-collapse">
                <div className="container">
                <NavLink className="navbar-brand" to="/"> <h2>AA2 Mutualhelp</h2></NavLink>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7"
                        aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-7">
                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item">
                            <NavLink aactiveClassName="active" className="nav-link" to="/">Home</NavLink> */}

                                {/* <a className="nav-link" href="#">Home
                    <span className="sr-only">(current)</span>
                                </a> */}
                            {/* </li> */}
                            {/* <li className="nav-item" onClick={this.handleITRPopup}>
                                <a className="nav-link" onClick={this.handleITRPopup}>File ITR</a>
                            </li> */}
                            {/* <li className="nav-item"> */}
                                {/* <a className="nav-link" href="#">Order Food</a> */}
                                {/* <NavLink aactiveClassName="active" to="/CategoryList" className="nav-link">Order Food</NavLink>
                            </li> */}
                            {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>

                            </li> */}
                            <LoggedOutView currentUser={this.props}/>
                            <LoggedInView currentUser={this.props}/>

                        </ul>

                    </div>
                </div>
            </nav>
            <ItrPopup isopen={this.state.isopen} hide={this.handleITRPopup}/>
        </header>
    )}

}
const mapStateToProps = state => ({ ...state.auth});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(InnerHeader)
