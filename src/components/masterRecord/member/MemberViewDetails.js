import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import memberRecord from '../../../models/memberDetails';
import Loader from '../../layout/Loader';
import moment from 'moment';

function Members(props) {
    const [isShowLoader, setisShowLoader] = useState(false)
    const [memberRecords, setMemberRecords] = useState([]);
    useEffect(() => {
        console.log(props);
        getMemberGroup();
    }, [])

    const getMemberGroup = () => {
        setisShowLoader(true);
        memberRecord.MemberDetailModel.getMemberDetailsData(props.location.state).then(res => {
            setisShowLoader(false);
            if (res.statusCode == 200) {
                setMemberRecords(res.body.message[0]);
            } else {
                setMemberRecords([]);
            }
        })
    }

    return (
        <>
            <div class="content">
                <Loader show={isShowLoader} />
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-user">
                            {/* <div class="card-header">
                            <h5 class="card-title">Member Detail - {memberRecords.member_name}</h5> */}
                        <div class="image">
                            <img src="../assets/img/damir-bosnjak.jpg" alt="..."/>
                        </div>
                            <div class="card-body">
                                <div class="author">
                                    
                                        <img class="avatar border-gray" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="..." />
                                        <h5 class="title">{memberRecords.member_name}</h5>
                                    
                                    <p class="description">
                                        @{memberRecords.member_name}
                                    </p>
                                </div>
                                <Table className="table" >
                                    <tbody>
                                        <tr><th>Enrollment Date</th><td>{moment(memberRecords.enrollment_date).format("DD-MM-YYYY hh:ss A")}</td> </tr>
                                        {/* <tr><th>Member Name</th>  <td>{memberRecords.member_name}</td></tr> */}
                                        <tr><th>Member Id</th>  <td>{memberRecords.member_id}</td></tr>
                                        <tr> <th>Gender</th>  <td>{memberRecords.gender}</td></tr>
                                        <tr><th>DOB</th>   <td>{moment(memberRecords.date_of_birth).format("DD-MM-YYYY")} </td></tr>
                                        <tr><th>Age</th> <td>{memberRecords.age}</td></tr>
                                        <tr><th>Marital Status</th>  <td>{memberRecords.marital_status}</td></tr>
                                        <tr><th>Mobile Number</th> <td>{memberRecords.mobile_number}</td></tr>
                                        <tr><th>Email Id</th> <td>{memberRecords.email_id}</td></tr>
                                        <tr> <th>Member Group Id</th>  <td>{memberRecords.member_group_id}</td></tr>
                                        <tr> <th>Aadhar Number</th> <td>{memberRecords.aadhar_number}</td></tr>
                                        <tr> <th>Driving License Number</th>  <td>{memberRecords.driving_license_number}</td></tr>
                                        <tr> <th>Voter Id Number </th>  <td>{memberRecords.voter_id_number}</td></tr>
                                        <tr>  <th>Ration Card Number</th> <td>{memberRecords.ration_card_number}</td></tr>
                                        <tr> <th>PAN Number</th> <td>{memberRecords.pan_card_number}</td></tr>
                                        <tr> <th>Bank Account no.</th> <td>{memberRecords.bank_account}</td></tr>
                                        <tr> <th>IFSC Code</th> <td>{memberRecords.bank_ifsc_code}</td></tr>
                                        <tr> <th>Bank Account Holder</th> <td>{memberRecords.bank_account_holder}</td></tr>

                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export default Members;