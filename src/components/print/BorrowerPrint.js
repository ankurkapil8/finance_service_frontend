import React from 'react';
import { Table, Card } from 'react-bootstrap';
import moment from 'moment';
import './EmiCardPrint.css'
import MemberPrint from './MemberPrint'
import {
    CIN,
    licenceNo,
    companyName
} from "../../constants/constants"
class BorrowerPrint extends React.PureComponent {
    render() {
        const { loanDetails } = this.props;
        return (
            <>
                <div style={{ margin: "20px" }}>
                    <table className='company-table'>
                        <tbody>
                            <tr class="logo-space">
                                <td style={{ width: '90px', height: '90px' }}><img class="img" src="" style={{ maxWidth: '180px', maxHeight: '120px' }} /></td>
                                <td className='text-center'><span className='company-name'>{companyName.toUpperCase()}</span><br />
                                    <span className='gov-line'>भारत सरकार द्वारा पंजीकृत उपक्रम</span><br />
                                    <span className='company-span'>SAHARANPUR</span><br />
                                    <span className='company-span'> CIN: {CIN} LICENCE No.:{licenceNo}</span>
                                </td>
                                <td style={{ width: '180px', height: '90px' }}>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>

                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td className='page-title'>Membership Form</td>
                            </tr>

                        </tbody>
                    </table>
                    <MemberPrint loanDetails={loanDetails}/>
                    <Table className="print" >
                        <tbody>
                            <tr><th width="25%">Aadhar No.</th> <td width="25%">{loanDetails.member?.aadhar_card}</td><th width="25%">PAN</th> <td width="25%">{loanDetails.member?.pan_card_number}</td></tr>
                            <tr><th width="25%">Driving License</th> <td width="25%">{loanDetails.member?.driving_license_number}</td><th width="25%">Ration Card No.</th> <td width="25%">{loanDetails.member?.ration_card_number}</td></tr>
                            <tr><th width="25%">Voter ID No.</th> <td width="25%">{loanDetails.member?.voter_id_number}</td><th width="25%">Bank Account No.</th> <td width="25%">{loanDetails.member?.bank_account}</td></tr>
                            <tr><th width="25%">Bank IFSC code</th> <td width="25%">{loanDetails.member?.bank_ifsc_code}</td><th width="25%">Bank Account Holder</th> <td width="25%">{loanDetails.member?.bank_account_holder}</td></tr>
                            <tr></tr>
                        </tbody>
                    </Table>
                    <p><br/>
                    <span className='sub-title'>Co-Borrower Details</span></p>
                    <Table className="print" >
                        <tbody>
                            <tr><th width="25%">Name</th><td width="75%" colSpan={4}>{loanDetails.co_borrower_name}</td> </tr>
                            <tr><th width="25%">Relationship</th>  <td width="25%">{loanDetails.co_borrower_relationship}</td><th width="25%">Aadhar Card</th>  <td width="25%">{loanDetails.co_borrower_aadhar_card}</td></tr>
                            <tr><th width="25%">PAN Card</th>   <td width="25%">{loanDetails.co_borrower_pan_card}</td><th width="25%">Ele Card</th> <td width="25%">{loanDetails.co_borrower_ele_bill}</td></tr>
                        </tbody>
                    </Table>
                    <div style={{ marginTop: "30px" }}>
                        <p>“I ____________________ , declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.” Please note that there should be no change in this text.</p>
                    </div>
                    <div style={{ bottom: 0, textAlign: 'right', marginTop: "50px" }}>
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