import React, { useEffect, useState, useRef, useCallback, useMemo} from 'react';
import { Table, Button, Container, Row, Col, Modal, InputGroup, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import DatePicker from "react-datepicker";
import moment from "moment"
import { useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../constants/actionTypes'
import EmiCardPrint from '../print/EmiCardPrint'
import {useReactToPrint} from 'react-to-print';

function DueEmis(props) {
    const dispatch = useDispatch();
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [isShowLoader, setisShowLoader] = useState(false)
    const [dueEmis, setDueEmis] = useState([]);
    const [paidID, setPaidID] = useState(0);
    const [totalEmi, setTotalEmi] = useState(0);
    const [enrollmentDate, setEnrollmentDate] = useState(new Date());
    useEffect(() => {
        getDueEmisRecord();
        dispatch({ type: CHANGE_PAGE, page: "EMI Dues" });
    }, [])
    let total = 0;
    const emiRef = useRef();
    const handlePrintEMI = useReactToPrint({
        content: () => emiRef.current,
        documentTitle: "AA2-EMI-details",
    });
    const emiRecords = useCallback(() => {
        return (
        <>{
            dueEmis.map((value, id) => (
            <tr>
                <td>{value.loan_account_no}</td>
                <td>{value?.group_loan?.member?.member_group?.group_name}</td>
                <td>{value?.group_loan?.member?.member_id}</td>
                <td>{value.group_loan?.member?.member_name}</td>
                <td>{value.group_loan?.member?.mobile_number}</td>
                <td>{value.remain_EMI}</td>
                <td>{value.EMI_amount.toFixed(2)}</td>
                <td>{value.outstanding}</td>
                <td></td>
            </tr>
        ))
        }
        <tr>
            <td>Total</td>
            <td colSpan={6} style={{textAlign:'right'}}>{totalEmi}</td></tr></>)
    }, [dueEmis]);
    const emiCol = useMemo(() => {
        return ["Account No.", "Group Name", "Member ID", "Name", "Phone", "No. of EMI", "EMI Amount", "Outstanding", "Signature"];
    }, [])

    const getDueEmisRecord = (today = moment().format("yyyy-MM-DD")) => {
        setisShowLoader(true);
        groupLoan.EmiModel.getDueEmis(today).then(res => {
            setisShowLoader(false);
            if (res.statusCode == 200) {
                let emiData = [];
                let count = 0;
                emiData = res.body.message.map(emi=>{ 
                   // return emi
                   emi["loan_table_id"]=emi.loan_account_no.substring(11)
                   count = count+parseFloat(emi.EMI_amount.toFixed(2))
                   return emi;
                });
                setTotalEmi(count);
                setDueEmis(emiData);
            } else {
                setDueEmis([]);
            }
        })
    }
    const paidEMI = async()=>{
        setShowDeleteModel(false);
        try{
            setisShowLoader(true);
            let response = await groupLoan.EmiModel.paidEmi(paidID);
            setisShowLoader(false);
            if(response.statusCode == 200){
                let UpdatedList = dueEmis.filter((emidata,idx)=>emidata.id!=paidID);
                setDueEmis(UpdatedList);
            }
        }catch (error) {
            console.log(error.response.body.message);
            setisShowLoader(false);
        }
    }
    const paidHandle=(id)=>{
        setPaidID(id);        
        setShowDeleteModel(true);
    }
    const changeEmiDate = (selectedDate)=>{
        setEnrollmentDate(selectedDate)
        getDueEmisRecord(moment(selectedDate).format("yyyy-MM-DD"));
    }
    return (
        <>
      <Modal show={showDeleteModel} onHide={()=>setShowDeleteModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Paid EMI </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowDeleteModel(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>paidEMI()}>
            Paid
          </Button>
        </Modal.Footer>
      </Modal>        

            <Loader show={isShowLoader} />
            <div className="content">
                {/* <h2 className="text-info text-center">Due EMIs</h2> */}
                <Row>
              <Col>
                    <InputGroup className="mb-3">
                    <FormLabel className="mr-3">EMI Date:</FormLabel>
                    <DatePicker className="form-control"
                                selected={enrollmentDate}
                                onChange={(date) => changeEmiDate(date)}
                                name="enrollment_date"
                                dateFormat="dd/MM/yyyy"
                            />

                    </InputGroup>
                    <svg onClick={handlePrintEMI} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-printer float-right cursar" viewBox="0 0 16 16">
                                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                                </svg>
                        <Table className=" shadow-lg p-3 mb-5 bg-white rounded small" striped bordered hover responsive>
                            <thead className="bg-primary">
                                <tr>
                                    <th>Maker/Checker</th>
                                    <th>Account No.</th>
                                    <th>Group Name</th>
                                    <th>Member ID</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>No. of Emi</th>
                                    <th>EMI Amount</th>
                                    <th>Outstanding</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {dueEmis.length!=0?<>{dueEmis.map((emi, id) => (<tr key={emi.id}>
                                    <td>{emi?.user?.id}- {emi?.user?.name}</td>
                                    <td><Link to={{
                                        pathname: '/loanApprovalDetails?actionType=view',
                                        state: emi.loan_table_id
                                        }}>{emi.loan_account_no}</Link></td>
                                    <td><Link to="/memberGroup">{emi.group_loan?.member?.member_group?.group_name}</Link></td>
                                    <td><Link to={{
                                        pathname: '/viewMemberDetail',
                                        state: emi.group_loan?.member?.member_id
                                        }}>{emi.group_loan?.member?.member_id}</Link></td>
                                    <td><Link to={{
                                        pathname: '/viewMemberDetail',
                                        state: emi.group_loan?.member?.member_id
                                        }}>{emi.group_loan?.member?.member_name}</Link></td>
                                        <td>{emi.group_loan?.member?.mobile_number}</td>
                                    <td>{emi.remain_EMI}</td>
                                    <td>{emi.EMI_amount.toFixed(2)}</td>
                                    <td>{emi.outstanding.toFixed(2)}</td>
                                    <td><Button size={"sm"} variant="success" onClick={() => paidHandle(emi.id) }>Pay</Button></td>
                                </tr>))}<tr>
            <th>Total</th>
            <td colSpan={7} style={{textAlign:'right'}}>{totalEmi}</td></tr></>:<tr><td colSpan={"9"} className="text-center">No Dues for selected date!</td></tr>}
                            </tbody>
                        </Table>
                        <div style={{ display: "none" }}><EmiCardPrint ref={emiRef} emiData={emiRecords} column={emiCol} heading="Today Collection" isDeclaration={false} isSign={false}/></div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default DueEmis;