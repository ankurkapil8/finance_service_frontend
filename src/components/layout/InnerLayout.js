import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import InnerHeader from './InnerHeader';
import Footer from './Footer';
import Leftbar from './Leftbar';
import TopNav from './TopNav';
import { useHistory } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
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
         jwt = localStorage.getItem("jwt");
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
          {/* <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
            <div className="container-fluid">
              <div className="navbar-wrapper">
                <div className="navbar-toggle">
                  <button type="button" className="navbar-toggler">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                </div>
                <a className="navbar-brand" href="javascript:;">Paper Dashboard 2</a>
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
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
                    <a className="nav-link btn-magnify" href="javascript:;">
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
                        <span className="d-lg-none d-md-block">Some Actions</span>
                      </p>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link btn-rotate" href="javascript:;">
                      <i className="nc-icon nc-settings-gear-65"></i>
                      <p>
                        <span className="d-lg-none d-md-block">Account</span>
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav> */}
          <Component {...props} />
          {/* <div className="content">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5 col-md-4">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-globe text-warning"></i>
                        </div>
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="numbers">
                          <p className="card-category">Capacity</p>
                          <p className="card-title">150GB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <hr/>
                    <div className="stats">
                      <i className="fa fa-refresh"></i>
                      Update Now
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5 col-md-4">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-money-coins text-success"></i>
                        </div>
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="numbers">
                          <p className="card-category">Revenue</p>
                          <p className="card-title">$ 1,345</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <hr/>
                    <div className="stats">
                      <i className="fa fa-calendar-o"></i>
                      Last day
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5 col-md-4">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-vector text-danger"></i>
                        </div>
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="numbers">
                          <p className="card-category">Errors</p>
                          <p className="card-title">23</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <hr/>
                    <div className="stats">
                      <i className="fa fa-clock-o"></i>
                      In the last hour
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5 col-md-4">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-favourite-28 text-primary"></i>
                        </div>
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="numbers">
                          <p className="card-category">Followers</p>
                          <p className="card-title">+45K</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <hr/>
                    <div className="stats">
                      <i className="fa fa-refresh"></i>
                      Update now
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card ">
                  <div className="card-header ">
                    <h5 className="card-title">Users Behavior</h5>
                    <p className="card-category">24 Hours performance</p>
                  </div>
                  <div className="card-body ">
                    <canvas id="chartHours" width="400" height="100"></canvas>
                  </div>
                  <div className="card-footer ">
                    <hr/>
                    <div className="stats">
                      <i className="fa fa-history"></i> Updated 3 minutes ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card ">
                  <div className="card-header ">
                    <h5 className="card-title">Email Statistics</h5>
                    <p className="card-category">Last Campaign Performance</p>
                  </div>
                  <div className="card-body ">
                    <canvas id="chartEmail"></canvas>
                  </div>
                  <div className="card-footer ">
                    <div className="legend">
                      <i className="fa fa-circle text-primary"></i> Opened
                      <i className="fa fa-circle text-warning"></i> Read
                      <i className="fa fa-circle text-danger"></i> Deleted
                      <i className="fa fa-circle text-gray"></i> Unopened
                    </div>
                    <hr/>
                    <div className="stats">
                      <i className="fa fa-calendar"></i> Number of emails sent
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card card-chart">
                  <div className="card-header">
                    <h5 className="card-title">NASDAQ: AAPL</h5>
                    <p className="card-category">Line Chart with Points</p>
                  </div>
                  <div className="card-body">
                    <canvas id="speedChart" width="400" height="100"></canvas>
                  </div>
                  <div className="card-footer">
                    <div className="chart-legend">
                      <i className="fa fa-circle text-info"></i> Tesla Model S
                      <i className="fa fa-circle text-warning"></i> BMW 5 Series
                    </div>
                    <hr />
                    <div className="card-stats">
                      <i className="fa fa-check"></i> Data information certified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
            
            {/* <Container fluid className="pl-0 pr-0">
            <Row>
                <Col>
                <TopNav toggleSidebar={toggleSidebar} />
                </Col>
            
            </Row>
                
                <Row>
                    
                        {showSidebar ?<Col md={2} sm={2} id="sidebar-col" className="bg-info"><Leftbar/></Col> : ""}
                        
                   
                    <Col sm={showSidebar ? 10 : 12} >
                        <div id="content">

                            <Component {...props} />
                        </div>
                    </Col>
                </Row>

                
                </Container> */}
            </>
        )} />)
}

export default InnerLayout
