import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Modal, InputGroup, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import DatePicker from "react-datepicker";
import moment from "moment"
import { useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../constants/actionTypes'
function DueEmis(props) {
    const dispatch = useDispatch();
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [isShowLoader, setisShowLoader] = useState(false)
    const [dueEmis, setDueEmis] = useState([]);
    const [paidID, setPaidID] = useState(0)
    const [enrollmentDate, setEnrollmentDate] = useState(new Date());
    useEffect(() => {
        getDueEmisRecord();
        dispatch({ type: CHANGE_PAGE, page: "EMI Dues" });
    }, [])

    const getDueEmisRecord = (today = moment().format("yyyy-MM-DD")) => {
        setisShowLoader(true);
        groupLoan.EmiModel.getDueEmis(today).then(res => {
            setisShowLoader(false);
            if (res.statusCode == 200) {
                let emiData = [];
                emiData = res.body.message.map(emi=>{ 
                   // return emi
                   emi["loan_table_id"]=emi.loan_account_no.substring(11)
                   return emi;
                });
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

                        <Table className=" shadow-lg p-3 mb-5 bg-white rounded small" striped bordered hover responsive>
                            <thead className="bg-primary">
                                <tr>
                                    <th>Account No.</th>
                                    <th>Group</th>
                                    <th>Member ID</th>
                                    <th>Name</th>
                                    <th>No. of Emi</th>
                                    <th>EMI Amount</th>
                                    <th>Outstanding</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dueEmis.length!=0?dueEmis.map((emi, id) => (<tr key={emi.id}>
                                    <td><Link to={{
                                        pathname: '/loanApprovalDetails',
                                        state: emi.loan_table_id
                                        }}>{emi.loan_account_no}</Link></td>
                                    <td><Link to="/memberGroup">{emi.group_loan?.member?.member_group_id}</Link></td>
                                    <td><Link to={{
                                        pathname: '/viewMemberDetail',
                                        state: emi.group_loan?.member?.member_id
                                        }}>{emi.group_loan?.member?.member_id}</Link></td>
                                    <td><Link to={{
                                        pathname: '/viewMemberDetail',
                                        state: emi.group_loan?.member?.member_id
                                        }}>{emi.group_loan?.member?.member_name}</Link></td>
                                    <td>{emi.remain_EMI}</td>
                                    <td>{emi.EMI_amount}</td>
                                    <td>{emi.outstanding}</td>
                                    <td><Button size={"sm"} variant="success" onClick={() => paidHandle(emi.id) }>Pay</Button></td>
                                </tr>)):<tr><td colSpan={"8"} className="text-center">No Dues for selected date!</td></tr>}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default DueEmis;