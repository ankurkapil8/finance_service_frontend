import React from 'react';
import { Table, Card } from 'react-bootstrap';
import moment from 'moment';
import {
    CIN,
    licenceNo,
    companyName
  } from "../../constants/constants"

class BorrowerPrint extends React.PureComponent {
    render() {
        const {loanDetails} = this.props;
        return (
            <>
                <div style={{margin:"20px"}}>
                    <div>
                        <p style={{textAlign:"left",float: "left",fontSize:"14px"}}>CIN : {CIN}</p>
                        <p style={{textAlign:"right",float: "right",fontSize:"14px"}}>License No. : {licenceNo}</p>
                    </div>
                    <h2 style={{textAlign:"center",marginBottom:"10px"}}>{companyName}</h2>
                    <div style={{marginBottom:"10px"}}>
                        <div style={{textAlign:'center'}}><h4>Application Form</h4></div>
                        <div style={{textAlign:'center'}}><h4>Borrower Details</h4></div>
                        <div style={{borderBlockColor:"black",width:"150px",height:"150px", border:"1px solid black",textAlign:'center'}}>Photo</div>
                    </div>
                    <Table className="bg-white rounded" striped bordered hover style={{ border:"1px solid black"}} >
                        <tbody>
                        <tr><th width="30%">Member Name</th><td>{loanDetails.member_name}</td> </tr>
                        <tr><th width="30%">Member Group ID</th>  <td>{loanDetails.member_group_id}</td></tr>
                        <tr> <th width="30%">Member Address</th>  <td>{loanDetails.address}</td></tr>
                        <tr><th width="30%">DOB</th>   <td>{loanDetails.date_of_birth?moment(loanDetails.date_of_birth).format("DD-MM-YYYY"):""}</td></tr>
                        <tr><th width="30%">Phone</th> <td>{loanDetails.mobile_number}</td></tr>
                        <tr><th width="30%">Gender</th>  <td>{loanDetails.gender}</td></tr>
                        <tr><th width="30%">Aadhar No.</th> <td>{loanDetails.aadhar_number}</td></tr>
                        <tr><th width="30%">PAN</th> <td>{loanDetails.pan_card_number}</td></tr>
                        <tr><th width="30%">Driving License</th> <td>{loanDetails.driving_license_number}</td></tr>
                        <tr><th width="30%">Ration Card No.</th> <td>{loanDetails.ration_card_number}</td></tr>
                        <tr><th width="30%">Voter ID No.</th> <td>{loanDetails.voter_id_number}</td></tr>
                        <tr><th width="30%">Bank Account No.</th> <td>{loanDetails.bank_account}</td></tr>
                        <tr><th width="30%">Bank IFSC code</th> <td>{loanDetails.bank_ifsc_code}</td></tr>
                        <tr><th width="30%">Bank Account Holder</th> <td>{loanDetails.bank_account_holder}</td></tr>
                        </tbody>
                    </Table>
                    <div style={{marginBottom:"5px"}}>
                        <div style={{textAlign:'center',paddingBottom:"10px"}}><h4>Co-Borrower Details</h4></div>
                    </div>
                    <Table className="bg-white rounded" striped bordered hover >
                        <tbody>
                        <tr><th width="30%">Name</th><td>{loanDetails.co_borrower_name}</td> </tr>
                        <tr><th width="30%">Relationship</th>  <td>{loanDetails.co_borrower_relationship}</td></tr>
                        <tr><th width="30%">Aadhar Card</th>  <td>{loanDetails.co_borrower_aadhar_card}</td></tr>
                        <tr><th width="30%">PAN Card</th>   <td>{loanDetails.co_borrower_pan_card}</td></tr>
                        <tr><th width="30%">Ele Card</th> <td>{loanDetails.co_borrower_ele_bill}</td></tr>
                        </tbody>
                    </Table>
                    <div style={{marginTop:"30px"}}>
                        <p>“I ____________________ , declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.” Please note that there should be no change in this text.</p>
                    </div>
                    <div style={{bottom:0,textAlign:'right',marginTop:"50px"}}>
                        <span>
                            <div><label>Borrower Signature:_____________________</label></div>
                            <div><label>Co-Borrower Signature:_____________________</label></div>
                        </span>
                    </div>
                </div>
            </>
        );
    }
}
export default BorrowerPrint;