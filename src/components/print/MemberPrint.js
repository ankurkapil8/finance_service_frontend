import React from 'react';
import { Table, Card } from 'react-bootstrap';
import moment from 'moment';
import './EmiCardPrint.css'
import {
    CIN,
    licenceNo,
    companyName
} from "../../constants/constants"
import { HOST } from '../../models/BaseUrl'
function MemberPrint(props) {
    const loanDetails = props.loanDetails;
    return (<><p><br />
        <span className='sub-title'>Borrower Details</span></p>
        <Table className='print' >
            <tbody>
                <tr><th width="25%">Member Name</th><td width="50%">{loanDetails?.member?.member_name}</td>
                    <td rowspan="6" className='image-td'>
                        {console.log(`${HOST}${loanDetails?.member?.image}`)}
                        <img src={`${HOST}${loanDetails?.member?.image}`} className='image' /></td></tr>
                <tr><th width="25%">Member Group ID</th>  <td width="50%">{loanDetails?.member?.member_group_id}</td></tr>
                <tr> <th width="25%">Member Address</th>  <td width="50%">{loanDetails?.address}</td></tr>
                <tr><th width="25%">DOB</th>   <td width="50%">{loanDetails?.member?.date_of_birth ? moment(loanDetails.member?.date_of_birth).format("DD-MM-YYYY") : ""}</td></tr>
                <tr><th width="25%">Phone</th> <td width="50%">{loanDetails?.member?.mobile_number}</td></tr>
                <tr><th width="25%">Gender</th>  <td width="50%">{loanDetails?.member?.gender}</td></tr>
            </tbody>
        </Table></>)
}
export default MemberPrint