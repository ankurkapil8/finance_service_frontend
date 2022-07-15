import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE } from '../../constants/actionTypes'
import DashboardModel from '../../models/dashboard';
import Loader from '../layout/Loader';
import { Table, Button, Container, Row, Col, Modal, InputGroup, FormLabel } from 'react-bootstrap';
import moment from 'moment';
import processingFee from '../../models/processingFee';
import expenseRecord from '../../models/expenseRecord';
import ReactDatePicker from 'react-datepicker';
import EmiCardPrint from '../print/EmiCardPrint';
import { useReactToPrint } from 'react-to-print';

function RecievedDetailView() {
    const dispatch = useDispatch();
    const [isShowLoader, setisShowLoader] = useState(false)
    const [ledger, setLedger] = useState([]);
    const [enrollmentDate, setEnrollmentDate] = useState("");

    useEffect(() => {

        dispatch({ type: CHANGE_PAGE, page: "Main Ladger" });
        getReport();
    }, [enrollmentDate])
    const emiRef = useRef();
    const handlePrintEMI = useReactToPrint({
        content: () => emiRef.current,
        documentTitle: "AA2-MAIN-LEDGER",
    });
    const getReport = async () => {
        let record = [];
        try {
            setisShowLoader(true);
            let data = await Promise.allSettled([
                DashboardModel.paidAmount(),
                DashboardModel.receivedAmount(),
                processingFee.ProcessingFeeModel.getProcessingFee('all'),
                expenseRecord.ExpenseModel.getExpense('all')]);
            setisShowLoader(false);
            record = record.concat(formatPaidAmount(data[0].value?.body?.message?.loan));
            record = record.concat(formatReceivedAmount(data[1].value?.body?.message?.emis));
            record = record.concat(formatProcessingAmount(data[2].value?.body?.message));
            record = record.concat(formatExpenseAmount(data[3].value?.body?.message));
            record.sort((a, b) => (
                moment(a.date,"DD-MM-yyyy").isBefore(moment(b.date,"DD-MM-yyyy"))
                ) ? 1 : (
                    (moment(b.date,"DD-MM-yyyy").isBefore(moment(a.date,"DD-MM-yyyy"))) ? -1 : 0)
                    )
            record = calculateBalance(record);
            if(enrollmentDate){
                setLedger(record.filter(val=>moment(val.date,'DD-MM-yyyy').isSame(enrollmentDate)))
            }else{
                setLedger(record);
            }
            

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
    const formatExpenseAmount = (data) => {
        let payload = [];
        for (let obj of data) {
            payload.push({
                date: moment(obj.created_at).format('DD-MM-yyyy'),
                text: `Expense - ${obj.expense_type}`,
                amount: obj.amount,
                credit: false,
                debit: true
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
    const emiCol = useMemo(() => {
        return ["SR No.", "Date", "Particular", "Debit", "Credit","Balance"];
    }, [])
    const emiRecords = useCallback(() => {
        return (ledger.map((emi, id) => (
            <tr>
                <td>{id + 1}</td>
                <td>{emi.date}</td>
                <td>{emi.text}</td>
                <td>{emi.debit ? emi.amount?.toFixed(2) : ""}</td>
                <td>{emi.credit ? emi.amount?.toFixed(2) : ""}</td>
                <td>{emi?.balance?.toFixed(2)}</td>
            </tr>
        )))
    }, [ledger]);

    return (
        <>
            <Loader show={isShowLoader} />
            <div className="content">
                <Row>
                    <Col>
                Filter By Date:<ReactDatePicker selected={enrollmentDate} onChange={(date) => setEnrollmentDate(date)} name="application_date" dateFormat="dd/MM/yyyy"/>
                        <Button variant="danger" size={'sm'} onClick={()=>setEnrollmentDate("")}>Clear Filter</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <svg onClick={handlePrintEMI} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-printer float-right cursar" viewBox="0 0 16 16">
                                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                                </svg>

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
                                    <td>{emi.debit ? emi.amount?.toFixed(2) : ""}</td>
                                    <td>{emi.credit ? emi.amount?.toFixed(2) : ""}</td>
                                    <td>{emi?.balance?.toFixed(2)}</td>
                                </tr>
                                ))
                                    : <tr><td colSpan={"8"} className="text-center">No Record Found</td></tr>}
                            </tbody>
                           
                        </Table>
                        <div style={{ display: "none" }}><EmiCardPrint ref={emiRef} emiData={emiRecords} column={emiCol} heading="Main Ledger" isDeclaration={false} isSign={false} isMemberRequired={false} /></div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default RecievedDetailView;
