import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Card, ListGroup,Modal,Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import { useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import EmiCard from './EmiCard';
import EmiCardPrint from './EmiCardPrint';
function LoanApprovalDetails(props) {
    const memberDetailsRef = useRef();
    const handlePrintMemberDetail = useReactToPrint({
        content: () => memberDetailsRef.current,
        documentTitle:"AA2-Member",
      });

      const applicationRef = useRef();
      const handlePrintApplication = useReactToPrint({
          content: () => applicationRef.current,
          documentTitle:"AA2-application",
        });

        const emiRef = useRef();
        const handlePrintEMI = useReactToPrint({
            content: () => emiRef.current,
            documentTitle:"AA2-EMI-details",
          });
      
    const auth = useSelector(state => state.auth);
    const [paidEmiRecord, setPaidEmiRecord] = useState([])
    const [isShowLoader, setisShowLoader] = useState(false)
    const [isShowEMILoader, setisShowEMILoader] = useState(false)
    const [emiData, setEmiData] = useState([])
    const [loanDetails, setLoanDetails] = useState({});
    const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
    const [showApprovalButton,setShowApprovalButton]= useState(false);
    const [showDisburseButton,setShowDisburseButton]= useState(false);
    
    //const [disburseActionButton,setDisburseActionButton]
    useEffect(() => {
        console.log(props);
        getLoanDetails();
    }, [])

    const getLoanDetails = async () => {
        try {
            setisShowLoader(true);
            setisShowEMILoader(true);

            let response = await groupLoan.GroupLoanModel.getLoanDetailbyId(props.location.state);
            let calculateEmi ={
                "loanStartDate":response.body.message[0].application_date,
                "interest_rate":response.body.message[0].interest_rate,
                "tenure":response.body.message[0].Tenure,
                "EMI_payout":response.body.message[0].EMI_payout,
                "loan_amount":response.body.message[0].loan_amount,
                "EMI_type":response.body.message[0].EMI_type
            }
            setisShowEMILoader(true);
            let EmiData = await groupLoan.EmiModel.calculateEMI(calculateEmi);
            let paidData = [];
            let result = {};
             paidData = await groupLoan.EmiModel.getPaidEmis(response.body.message[0].loan_account_no);
            for(let i=0;i<paidData.body.message.length;i++){
                let emiDate = moment(paidData.body.message[i].EMI_date).format("DD-MM-yyyy");
                result[emiDate]=true;
            }
            setPaidEmiRecord(result);
            setEmiData(EmiData.body.message);
            setisShowEMILoader(false);
            console.log(response);

            setisShowLoader(false);
            if (response.statusCode == 200) {
                setShowApprovalButton(response.body.message[0].is_approved!=0?false:true);
                setShowDisburseButton(response.body.message[0].is_approved ==1 && response.body.message[0].is_disbursed==0?true:false);
                setLoanDetails(response.body.message[0]);
            }

        } catch (error) {
            setisShowLoader(false);
            console.log(error);
        }
    }
    const actionOnLoan = async(actionType)=>{
        try {
            setisShowLoader(true);
            const data = {"id":props.location.state,"actionType":actionType}
            let response = await groupLoan.GroupLoanModel.approveRejectLoan(data);
            console.log(response);
            setisShowLoader(false);
            if (response.statusCode == 200) {
                setShowApprovalButton(false);
                //setShowDisburseButton(false);
                setShowToast({ isShow: true,type:"bg-success", message: response.body.message })
            }
        } catch (error) {
            setisShowLoader(false);
            setShowToast({ isShow: true,type:"bg-danger", message: error.response.body.message })
            console.log(error);
        }
    }
    const actionDisburseLoan = async(actionType)=>{
        try {
            setisShowLoader(true);
            const data = {"id":props.location.state,"actionType":actionType}
            let response = await groupLoan.GroupLoanModel.disburseRejectLoan(data);
            setisShowLoader(false);
            if (response.statusCode == 200) {
                setShowDisburseButton(false);
                setShowToast({ isShow: true,type:"bg-success", message: response.body.message })
            }
        } catch (error) {
            setisShowLoader(false);
            setShowToast({ isShow: true,type:"bg-danger", message: error.response.body.message })
            console.log(error);
        }

    }
    return (
        <>
        <Toast key={1} autohide delay={3000} show={showToast.isShow} onClose={() => setShowToast({ isShow: false,type:"", message: "" })} className={"loader "+ (showToast.type) } >
            <Toast.Header>
            <strong className="me-auto">{showToast.type=="bg-danger"?"Error":"Success"} Message</strong>
            </Toast.Header>
            <Toast.Body className="Dark">
            {showToast.message}
            </Toast.Body>
        </Toast>
            <Loader show={isShowLoader} />
            {showApprovalButton && (auth.role=="checker"||auth.role=="admin")?<Row className="m-5">
                <Col className="text-center">
                <Button variant="primary" type="button" onClick={()=>actionOnLoan(1)}>
                        Approve
                    </Button>{'  '}
                    <Button variant="danger" type="button" onClick={()=>actionOnLoan(-1)}>
                        Reject
                    </Button>
                </Col>
            </Row>:""}

            {showDisburseButton&& (auth.role=="checker"||auth.role=="admin")?<Row className="m-5">
                <Col className="text-center">
                <Button variant="primary" type="button" onClick={()=>actionDisburseLoan(1)}>
                        Disburse
                    </Button>{'  '}
                    <Button variant="danger" type="button" onClick={()=>actionDisburseLoan(-1)}>
                        Reject
                    </Button>
                </Col>
            </Row>:""}

            <Row xs={1} md={2} className="g-1">
                <Col>
                    <Card border="success" header
                        key={0}
                        text={'dark'}
                        className="m-2"
                        ref={memberDetailsRef}
                    >
                        <Card.Header className="bg-success text-center"><b>Member Details</b><svg onClick={handlePrintMemberDetail} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-printer float-right cursar" viewBox="0 0 16 16">
  <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
  <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
</svg></Card.Header>
                        <Card.Body>
                            <Table size="sm" className="bg-white rounded" striped bordered hover responsive>
                                <tbody>
                                    <tr><th>Member Name</th><td>{loanDetails.member_name}</td> </tr>
                                    <tr><th>Member Group ID</th>  <td>{loanDetails.member_group_id}</td></tr>
                                    <tr> <th>Member Address</th>  <td>{loanDetails.address}</td></tr>
                                    <tr><th>DOB</th>   <td>{moment(loanDetails.date_of_birth).format("DD-MM-YYYY") }</td></tr>
                                    <tr><th>Phone</th> <td>{loanDetails.mobile_number}</td></tr>
                                    <tr><th>Gender</th>  <td>{loanDetails.gender}</td></tr>
                                    <tr><th>Aadhar No.</th> <td>{loanDetails.aadhar_number}</td></tr>
                                    <tr><th>PAN</th> <td>{loanDetails.pan_card_number}</td></tr>
                                    <tr><th>Driving License</th> <td>{loanDetails.driving_license_number}</td></tr>
                                    <tr><th>Ration Card No.</th> <td>{loanDetails.ration_card_number}</td></tr>
                                    <tr><th>Voter ID No.</th> <td>{loanDetails.voter_id_number}</td></tr>
                                    <tr><th>Bank Account No.</th> <td>{loanDetails.bank_account}</td></tr>
                                    <tr><th>Bank IFSC code</th> <td>{loanDetails.bank_ifsc_code}</td></tr>
                                    <tr><th>Bank Account Holder</th> <td>{loanDetails.bank_account_holder}</td></tr>

                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="info" header
                        key={0}
                        text={'dark'}
                        // style={{ width: '18rem' }}
                        className="m-2"
                        ref={applicationRef}
                    >
                        <Card.Header className="bg-info text-center"><b>Application Details</b><svg onClick={handlePrintApplication} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-printer float-right cursar" viewBox="0 0 16 16">
  <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
  <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
</svg></Card.Header>
                        <Card.Body>
                            
                            <Table size="sm" className="bg-white rounded" striped bordered hover responsive>
                                <tbody>
                                    <tr><th>Account No</th>  <td>{loanDetails.loan_account_no}</td></tr>
                                    <tr><th>Application Date</th><td>{moment(loanDetails.application_date).format("DD-MM-YYYY HH:SS") }</td> </tr>
                                    <tr><th>Scheme Id</th>  <td>{loanDetails.scheme_id}</td></tr>
                                    <tr> <th>Member Address</th>  <td>{loanDetails.address}</td></tr>
                                    <tr><th>Loan Amount</th>   <td>{loanDetails.loan_amount}</td></tr>
                                    <tr><th>Interest rate</th> <td>{loanDetails.interest_rate}</td></tr>
                                    <tr><th>EMI payout</th>  <td>{loanDetails.EMI_payout}</td></tr>
                                    <tr><th>EMI type</th>  <td>{loanDetails.EMI_type}</td></tr>
                                    {/* <tr><th>EMI amount</th> <td>{loanDetails.EMI_amount}</td></tr> */}
                                    <tr><th>Tenure</th> <td>{loanDetails.Tenure}</td></tr>
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
                </Col>
                <Col >
                    <Loader show={isShowEMILoader} relative={true}/>
                    <EmiCard showDisburseButton={loanDetails.is_approved ==1 && loanDetails.is_disbursed==1}  emiData={emiData} paidEmiRecord={paidEmiRecord} handlePrintEMI={handlePrintEMI}/>
                    <div style={{display:"none"}}><EmiCardPrint ref={emiRef} emiData={emiData}/></div> 
                </Col>

            </Row>

        </>
    );
}

export default LoanApprovalDetails;