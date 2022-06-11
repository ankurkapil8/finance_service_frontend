import React,{useEffect} from 'react'
import { useSelector } from "react-redux";
import { Col, Nav} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom'
export default function Leftbar() {
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    
    return (
        <div className="sidebar" data-color="white" data-active-color="danger">
          <div className="logo">
            <a href="#" className="simple-text logo-mini">
              <div className="logo-image-small">
                <img src={process.env.PUBLIC_URL+"/assets/img/logo-small.png"} />
              </div>
            </a>
            <a href="#" className="simple-text logo-normal">
              {auth.username}
            </a>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              <li className={location.pathname == "/"?"active":""}>
                {/* <a href="./dashboard.html"> */}
                <LinkContainer to="/">
                <Nav.Link>
                  <i className="nc-icon nc-bank"></i>
                  <p>Dashboard</p>
                  </Nav.Link>
                  </LinkContainer>
                {/* </a> */}
              </li>
              <li className={location.pathname == "/memberGroup" || location.pathname == "/member" || location.pathname == "/member" || location.pathname == "/addMember"?"active":""}>
                <a data-toggle="collapse" aria-expanded="false" href="#homeSubmenu" className="dropdown-toggle">
                <i className="nc-icon nc-badge"></i>
                  Master Record
                </a>
                <ul className="list-unstyled collapse" id="homeSubmenu" >
                  <li className={location.pathname == "/memberGroup" || location.pathname == "/addMemberGroup"?"active":""}>
                  <LinkContainer to="/memberGroup">
                    <Nav.Link>
                    Member Group
                    </Nav.Link>
                  </LinkContainer>

                    
                  </li>
                  <li className={location.pathname == "/member" || location.pathname == "/addMember"?"active":""}>
                  <LinkContainer to="/member">
                    <Nav.Link>
                    Members
                    </Nav.Link>
                  </LinkContainer>

                  </li>
                </ul>
              </li>
              <li 
              className={location.pathname == "/emiCalculator" 
              || location.pathname == "/scheme" 
              || location.pathname == "/loanApplication" 
              || location.pathname == "/loanApproval"
              || location.pathname == "/addScheme"
              || location.pathname == "/allApplications"
              || location.pathname == "/disburseLoan"

              ?"active":""}>
                <a data-toggle="collapse" aria-expanded="false" href="#groupLoan" className="dropdown-toggle">
                <i className="nc-icon nc-umbrella-13"></i>
                  Group Loan
                </a>
                <ul className="list-unstyled collapse" id="groupLoan" >
                <li className={location.pathname == "/emiCalculator"?"active":""}>
                    <LinkContainer to="/emiCalculator">
                      <Nav.Link href="#">Calculator</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li className={location.pathname == "/scheme" || location.pathname == "/addScheme"?"active":""}>
                  <LinkContainer to="/scheme">
                    <Nav.Link eventKey="link-1">Scheme</Nav.Link>
                  </LinkContainer>
                  </li>
                  <li className={location.pathname == "/loanApplication"?"active":""}>
                    <LinkContainer to="/loanApplication">
                      <Nav.Link eventKey="link-2">Application</Nav.Link>
                    </LinkContainer>
                  </li>
                  {(auth.role=="checker"||auth.role=="admin")? <li className={location.pathname == "/loanApproval"?"active":""}>

                    <LinkContainer to="/loanApproval">
                      <Nav.Link eventKey="link-2">Approve Application</Nav.Link>
                    </LinkContainer>
                  </li>:""}
                  {(auth.role=="checker"||auth.role=="admin")?<li className={location.pathname == "/disburseLoan"?"active":""}>
                    <LinkContainer to="/disburseLoan">
                      <Nav.Link eventKey="link-2">Disbure Application</Nav.Link>
                      </LinkContainer>
                    </li>:""}
                    <li className={location.pathname == "/allApplications"?"active":""}>
                      <LinkContainer to="/allApplications">
                        <Nav.Link eventKey="link-2">Loan Applications</Nav.Link>
                        </LinkContainer>

                    </li>
                </ul>
              </li>              
              {/* <li className={location.pathname == "/processingFee"?"active":""}>
              <LinkContainer to="/">
                      <Nav.Link href="#"><i className="nc-icon nc-paper"></i>Processing Fee</Nav.Link>
                </LinkContainer>
              </li>              
              <li>
              <LinkContainer to="/">
                      <Nav.Link href="#"><i className="nc-icon nc-credit-card"></i>Expenses</Nav.Link>
                </LinkContainer>

              </li>     */}          
              <li className={location.pathname == "/dueEmis"?"active":""}>
              <LinkContainer to="/dueEmis">
                      <Nav.Link href="#"><i className="nc-icon nc-money-coins"></i> Payment to collect</Nav.Link>
                </LinkContainer>

              </li>   
              <li className={location.pathname == "/profit"?"active":""}>
              <LinkContainer to="/profit">
                      <Nav.Link href="#"><i className="nc-icon nc-money-coins"></i> Profit Report</Nav.Link>
                </LinkContainer>

              </li>            
            </ul>
          </div>
        </div>        
        // // <Col md={2} id="sidebar-col" className="pr-0">
        //     <nav id="sidebar">
        //         {/* <div className="sidebar-header">
        //             <h5>AA2 MutualHelp</h5>
        //         </div> */}
        //         <Nav className="list-unstyled components flex-column" as="ul" >
        //         <Nav.Item as="li" className="active">
        //         <LinkContainer to="/">
        //         <Nav.Link>
        //              Dashboard
        //     </Nav.Link>
        //     </LinkContainer>
        //         </Nav.Item>
        //             <Nav.Item as="li" >
                   
        //                 <Nav.Link href="#homeSubmenu" className="dropdown-toggle" data-toggle="collapse" aria-expanded="false">Master Record</Nav.Link>
                        
        //                 {/* <ul class="collapse list-unstyled" id="homeSubmenu"> */}
        //                 <Nav class="collapse list-unstyled" id="homeSubmenu" as="ul">
        //                     <Nav.Item as="li">
        //                     <LinkContainer to="/memberGroup">
        //                         <Nav.Link href="/home">Member Group</Nav.Link>
        //                         </LinkContainer>
        //                         {/* <NavLink to="/memberGroup">Member Group</NavLink> */}
        //                     </Nav.Item>
        //                     <Nav.Item as="li">
        //                     <LinkContainer to="/member">
        //                         <Nav.Link eventKey="link-1">Members</Nav.Link>
        //                     </LinkContainer>
        //                     </Nav.Item>
        //                 </Nav>
        //             </Nav.Item>
        //             <Nav.Item as="li" >
        //                 <Nav.Link href="#groupLoan" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Group Loan</Nav.Link>
        //                 {/* <ul class="collapse list-unstyled" id="homeSubmenu"> */}
        //                 <Nav class="collapse list-unstyled" id="groupLoan" as="ul">
        //                     <Nav.Item as="li">
        //                     <LinkContainer to="/emiCalculator">
        //                         <Nav.Link href="#">Calculator</Nav.Link>
        //                         </LinkContainer>
        //                     </Nav.Item>
        //                     <Nav.Item as="li">
        //                     <LinkContainer to="/scheme">
        //                         <Nav.Link eventKey="link-1">Scheme</Nav.Link>
        //                         </LinkContainer>
        //                     </Nav.Item>
        //                     <Nav.Item as="li">
        //                     <LinkContainer to="/loanApplication">
        //                         <Nav.Link eventKey="link-2">Application</Nav.Link>
        //                         </LinkContainer>
        //                     </Nav.Item>
        //                     {(auth.role=="checker"||auth.role=="admin")?<Nav.Item as="li">
        //                     <LinkContainer to="/loanApproval">
        //                         <Nav.Link eventKey="link-2">Approve Application</Nav.Link>
        //                         </LinkContainer>
        //                     </Nav.Item>:""}
        //                     {(auth.role=="checker"||auth.role=="admin")?<Nav.Item as="li">
        //                     <LinkContainer to="/disburseLoan">
        //                         <Nav.Link eventKey="link-2">Disbure Application</Nav.Link>
        //                         </LinkContainer>
        //                     </Nav.Item>:""}
        //                     <Nav.Item as="li">
        //                     <LinkContainer to="/allApplications">
        //                         <Nav.Link eventKey="link-2">Loan Applications</Nav.Link>
        //                         </LinkContainer>
        //                     </Nav.Item>

        //                 </Nav>
        //             </Nav.Item>

        //             <Nav.Item as="li" >
        //                 <Nav.Link href="#processingFee" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Processing Fee</Nav.Link>
        //                 {/* <ul class="collapse list-unstyled" id="homeSubmenu"> */}
        //                 <Nav class="collapse list-unstyled" id="processingFee" as="ul">
        //                     <Nav.Item as="li">
        //                         <Nav.Link href="#">List Processing Fee</Nav.Link>
        //                     </Nav.Item>

        //                 </Nav>
        //             </Nav.Item>

        //             <Nav.Item as="li" >
        //                 <Nav.Link href="#expense" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Expense</Nav.Link>
        //                 {/* <ul class="collapse list-unstyled" id="homeSubmenu"> */}
        //                 <Nav class="collapse list-unstyled" id="expense" as="ul">
        //                     <Nav.Item as="li">
        //                         <Nav.Link href="#">List Expense</Nav.Link>
        //                     </Nav.Item>

        //                 </Nav>
        //             </Nav.Item>

        //             <Nav.Item as="li" >
        //                 <Nav.Link href="#payments" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Payment to collect</Nav.Link>
        //                 {/* <ul class="collapse list-unstyled" id="homeSubmenu"> */}
        //                 <Nav class="collapse list-unstyled" id="payments" as="ul">
        //                     <Nav.Item as="li">
        //                         <LinkContainer to="/dueEmis">
        //                             <Nav.Link href="#">Payment to collect(Loan)</Nav.Link>
        //                         </LinkContainer>
        //                     </Nav.Item>

        //                 </Nav>
        //             </Nav.Item>
        //         </Nav>
        //     </nav>
        // </Col>
    )
}
