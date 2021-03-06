import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../constants/actionTypes'

function DisburseLoan(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [isShowLoader, setisShowLoader] = useState(false)
    const [loanlist, setLoanlist] = useState([]);
    useEffect(() => {
        getLoanList();
        dispatch({ type: CHANGE_PAGE, page: "Applications for Disburse" });
    }, [])

    const getLoanList = async () => {
        try {
            setisShowLoader(true);
            let response = await groupLoan.GroupLoanModel.getDisburseList();
            setisShowLoader(false);
            if (response.statusCode == 200) {
                setLoanlist(response.body.message);
            }

        } catch (error) {
            setisShowLoader(false);
            console.log(error);
        }
    }
    const redirectDisburse = (loan_id) => {
        history.push("/loanApprovalDetails", loan_id);
    }

    return (
        <>
            <div className="content">
                <Loader show={isShowLoader} />
                {/* <Container fluid> */}
                {/* <h2 className="text-info text-center">Applications For Disburse</h2> */}
                <Row >
                    <Col>
                        <Table className=" shadow-lg p-3 mb-5 bg-white rounded" striped bordered hover responsive>
                            <thead className="bg-primary">
                                <tr>
                                    <th>Application Date</th>
                                    <th>Member name</th>
                                    <th>Scheme ID</th>
                                    <th>Loan Amount</th>
                                    <th>Interest rate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loanlist.map((loan, id) => (<tr>
                                    <td>{moment(loan.application_date).format("DD-MM-YYYY hh:ss A")}</td>
                                    <td>{loan.member_name}</td>
                                    <td>{loan.scheme_id}</td>
                                    <td>{loan.loan_amount}</td>
                                    <td>{loan.interest_rate}</td>
                                    <td><Button variant="success" size={"sm"} onClick={() => redirectDisburse(loan.id)}>Disburse</Button></td>
                                </tr>))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {/* </Container>             */}
            </div>
        </>
    );
}

export default DisburseLoan;