import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE } from '../../constants/actionTypes'
import DashboardModel from '../../models/dashboard';
import Loader from '../layout/Loader';
import { Table, Button, Container, Row, Col, Modal, InputGroup, FormLabel } from 'react-bootstrap';
import moment from 'moment';
import processingFee from '../../models/processingFee';
function RecievedDetailView() {
    const dispatch = useDispatch();
    const [isShowLoader, setisShowLoader] = useState(false)
    const [ledger, setLedger] = useState([]);

    useEffect(() => {

        dispatch({ type: CHANGE_PAGE, page: "Main Ladger" });
        getReport();
    }, [])
    const getReport = async () => {
        let record = [];
        try {
            setisShowLoader(true);
            let data = await Promise.allSettled([
                DashboardModel.paidAmount(),
                DashboardModel.receivedAmount(),
                processingFee.ProcessingFeeModel.getProcessingFee('all')]);
            setisShowLoader(false);
            record = record.concat(formatPaidAmount(data[0].value?.body?.message?.loan));
            record = record.concat(formatReceivedAmount(data[1].value?.body?.message?.emis));
            record = record.concat(formatProcessingAmount(data[2].value?.body?.message));
            record.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
            record = calculateBalance(record);
            setLedger(record);

        } catch (error) {
            setisShowLoader(false);
            console.log(error);
        }
    }
    const formatPaidAmount = (data) => {
        let payload = [];
        for (let obj of data) {
            payload.push({
                date: moment(obj.disburse_date).format('DD-MM-yyyy'),
                text: `Loan disburse to ${obj.loan_account_no}`,
                amount: obj.loan_amount,
                credit: false,
                debit: true
            })
        }
        return payload;
    }
    const formatReceivedAmount = (data) => {
        let payload = [];
        for (let obj of data) {
            payload.push({
                date: moment(obj.EMI_date).format('DD-MM-yyyy'),
                text: `EMI received ${obj.loan_account_no}`,
                amount: obj.EMI_amount,
                credit: true,
                debit: false
            })
        }
        return payload;
    }
    const formatProcessingAmount = (data) => {
        let payload = [];
        for (let obj of data) {
            payload.push({
                date: moment(obj.created_at).format('DD-MM-yyyy'),
                text: `Received - ${obj.particular}`,
                amount: obj.amount,
                credit: true,
                debit: false
            })
        }
        return payload;
    }
    const calculateBalance = (record) => {
        let outstanding = 0;
        let result=[];
        for (var i=record.length-1;i>=0;i--) {
            var obj = record[i];
            outstanding =obj.credit?outstanding+obj.amount:outstanding-obj.amount;
            obj["balance"] = outstanding;
            result[i] = obj;
        }
        return result;
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
                                    <th>Debit</th>
                                    <th>Credit</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ledger.length != 0 ? ledger.map((emi, id) => (<tr key={emi.id}>
                                    <td>{id + 1}</td>
                                    <td>{emi.date}</td>
                                    <td>{emi.text}</td>
                                    <td>{emi.debit ? emi.amount : ""}</td>
                                    <td>{emi.credit ? emi.amount : ""}</td>
                                    <td>{emi.balance}</td>
                                </tr>
                                ))
                                    : <tr><td colSpan={"8"} className="text-center">No Record Found</td></tr>}
                            </tbody>
                            {/* <tfoot>
            {loanData.length!=0?
                <tr style={{fontWeight:'bold'}}>
                <td colSpan={"3"}>Total</td>
                <td>{totalAmount}</td>
                </tr>:''}
            </tfoot> */}
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default RecievedDetailView;
