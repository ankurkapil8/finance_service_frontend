import React from 'react';
import { Table, Card } from 'react-bootstrap';
import moment from 'moment';

function MemberKYCPrint(props) {
    const loanDetails = props.loanDetails;
    return (<>                    
    <Table className="print" >
        <tbody>
        <tr><th width="25%">Qualification</th>  <td width="25%">{loanDetails?.member?.qualification}</td><th width="25%">Spouse Name</th>  <td width="25%">{loanDetails?.member?.spouse}</td></tr>
            <tr><th width="25%">Aadhar No.</th> <td width="25%">{loanDetails.member?.aadhar_card}</td><th width="25%">PAN</th> <td width="25%">{loanDetails.member?.pan_card_number}</td></tr>
            <tr><th width="25%">Driving License</th> <td width="25%">{loanDetails.member?.driving_license_number}</td><th width="25%">Ration Card No.</th> <td width="25%">{loanDetails.member?.ration_card_number}</td></tr>
            <tr><th width="25%">Voter ID No.</th> <td width="25%">{loanDetails.member?.voter_id_number}</td><th width="25%">Bank Account No.</th> <td width="25%">{loanDetails.member?.bank_account}</td></tr>
            <tr><th width="25%">Bank IFSC code</th> <td width="25%">{loanDetails.member?.bank_ifsc_code}</td><th width="25%">Bank Account Holder</th> <td width="25%">{loanDetails.member?.bank_account_holder}</td></tr>
            <tr></tr>
        </tbody>
    </Table>
    </>)
}
export default MemberKYCPrint;