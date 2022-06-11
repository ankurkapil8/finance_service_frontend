import React,  { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE } from '../../constants/actionTypes'
import DashboardModel from '../../models/dashboard';
import Loader from '../layout/Loader';
import { Table, Button, Container, Row, Col, Modal, InputGroup, FormLabel } from 'react-bootstrap';
import moment from 'moment';
function PaidDetailView() {
    const dispatch = useDispatch();
    const [isShowLoader, setisShowLoader] = useState(false)
    const [loanData, setLoanData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        getDetailData();
        dispatch({ type: CHANGE_PAGE, page: "Paid Ladger" });
    }, [])
    const getDetailData = () => {
        setisShowLoader(true);
        DashboardModel.paidAmount().then(res => {
            setisShowLoader(false);
            if(res.status == 200){
                console.log(res.body.message);
                setLoanData(res.body.message.loan.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0)));
                setTotalAmount(res.body.message.total);
            }
            // console.log({loanData});
        });
        
    }
  return (
    <>
         <Loader show={isShowLoader} />
         <div className="content">
         <Row>
            <Col>
         <Table className=" shadow-lg p-3 mb-5 bg-white rounded small" striped bordered hover responsive>
            <thead className="bg-primary">
                <tr>
                    <th>Sr No.</th>
                    <th>Date</th>
                    <th>Particular</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {loanData.length!=0?loanData.map((emi, id) => (<tr key={emi.id}>
                    <td>{id+1}</td>
                    <td>{moment(emi.disburse_date).format("DD-MM-yyyy")}</td>
                    <td>Loan disbursed to {emi.member.member_name} - Loan account {emi.loan_account_no}</td>
                    <td>{emi.loan_amount}</td>
                    {/* <td><Button size={"sm"} variant="success" onClick={() => paidHandle(emi.id) }>Pay</Button></td> */}
                </tr>
                ))
                :<tr><td colSpan={"8"} className="text-center">No Record Found</td></tr>}
            </tbody>
            <tfoot>
            {loanData.length!=0?
                <tr style={{fontWeight:'bold'}}>
                <td colSpan={"3"}>Total</td>
                <td>{totalAmount}</td>
                </tr>:''}
            </tfoot>
        </Table>
        </Col>
        </Row>
        </div>
    </>
  )
}

export default PaidDetailView;
