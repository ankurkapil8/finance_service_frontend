import React from 'react';
import { Table, Card } from 'react-bootstrap';
import moment from 'moment';

class BorrowerPrint extends React.PureComponent {
    render() {
        const {loanDetails} = this.props;
        return (
            <>
                <div style={{margin:"10px"}}>
                    <h2 style={{textAlign:"center",marginBottom:"50px"}}>Micro Finance Company</h2>
                    <div style={{marginBottom:"20px"}}>
                        <div style={{textAlign:'center',paddingBottom:"10px"}}><h4>Application Form</h4></div>
                        <div style={{borderBlockColor:"black",width:"200px",height:"200px", border:"1px solid black",textAlign:'center'}}>Photo</div>
                    </div>
                    <Table className="bg-white rounded" striped bordered hover >
                        <tbody>
                        <tr><th>Member Name</th><td>{loanDetails.member_name}</td> </tr>
                        <tr><th>Member Group ID</th>  <td>{loanDetails.member_group_id}</td></tr>
                        <tr> <th>Member Address</th>  <td>{loanDetails.address}</td></tr>
                        <tr><th>DOB</th>   <td>{loanDetails.date_of_birth?moment(loanDetails.date_of_birth).format("DD-MM-YYYY"):""}</td></tr>
                        <tr><th>Phone</th> <td>{loanDetails.mobile_number}</td></tr>
                        <tr><th>Gender</th>  <td>{loanDetails.gender}</td></tr>
                        <tr><th>Aadhar No.</th> <td>{loanDetails.aadhar_number}</td></tr>
                        <tr><th>PAN</th> <td>{loanDetails.pan_card_number}</td></tr>
                        <tr><th>Driving License</th> <td>{loanDetails.driving_license_number}</td></tr>
                        <tr><th>Ration Card No.</th> <td>{loanDetails.ration_card_number}</td></tr>
                        <tr><th>Voter ID No.</th> <td>{loanDetails.voter_id_number}</td></tr>
                        <tr><th>Bank Account No.</th> <td>{loanDetails.bank_account}</td></tr>
                        <tr><th>Bank IFSC code</th> <td>{loanDetails.bank_ifsc_code}</td></tr>
                        <tr><th>Bank Account Holder</th> <td>{loanDetails.bank_account_holder}</td></tr>
                        </tbody>
                    </Table>
                    <div style={{marginTop:"50px"}}>
                        <p>“I ____________________ , declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.” Please note that there should be no change in this text.</p>
                    </div>
                    <div style={{bottom:0,textAlign:'right',marginTop:"100px"}}>
                        <span>
                            <label>Signature:_____________________</label>
                        </span>
                    </div>
                </div>
            </>
        );
    }
}
export default BorrowerPrint;