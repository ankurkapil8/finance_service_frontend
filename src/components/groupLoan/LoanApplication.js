import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Container, Row, Col, Toast, Card, useAccordionButton, AccordionContext, Accordion } from 'react-bootstrap';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../constants/actionTypes'
import {API_ROOT} from "../../models/BaseUrl"
function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Button variant="info" onClick={decoratedOnClick}>
            {/* <i className="nc-icon nc-simple-add mr-2"></i> */}
            {children}
        </Button>

    );
}
function LoanApplication(props) {
    const auth = useSelector(state => state.auth);
    const [enrollmentDate, setEnrollmentDate] = useState(new Date());
    const [isShowLoader, setisShowLoader] = useState(false)
    const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
    const [memberRecords, setMemberRecords] = useState([]);
    const [schemeRecords, setSchemeRecords] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState({});
    const [image,setImage] = useState("");
    let baseURL = API_ROOT.replace('/api','/')
    const tanure = { "weekly": "Weeks", "monthly": "Months", "daily": "Days", "fortnight": "Fortnight" };
    let history = useHistory();
    const dispatch = useDispatch();
    //const selectedSm = {"interest_rate":0,"EMI_type":"","max_amount":0};
    useEffect(() => {
        getSchemesAndMembers();
        dispatch({ type: CHANGE_PAGE, page: "Loan Application" });
    }, [])
    const getSchemesAndMembers = async () => {
        try {
            setisShowLoader(true);
            const response = await Promise.all(groupLoan.SchemeModel.getLoanAppInitialData())
            setisShowLoader(false);
            setSchemeRecords(response[0].body.message);
            setMemberRecords(response[1].body.message);
            console.log(response);
        } catch (error) {
            setisShowLoader(false);
            setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
        }
    }
    const validate = values => {
        const errors = {};
        if (!values.scheme_id) {
            errors.scheme_id = 'Scheme code is Required!';
        }
        if (!values.member_id) {
            errors.member_id = 'Member name is Required!';
        }
        if (!values.interest_rate) {
            errors.interest_rate = 'Interest rate is Required!';
        }
        if (selectedScheme?.interest_rate > 0 && values.interest_rate > selectedScheme?.interest_rate) {
            errors.interest_rate = `As per the Selected Scheme. Interest rate should not greater than ${selectedScheme.interest_rate}.`;
        }
        if (!values.loan_amount) {
            errors.loan_amount = 'Loan amount is Required!';
        }
        if (selectedScheme?.max_amount > 0 && values.loan_amount > selectedScheme.max_amount) {
            errors.loan_amount = `As per the Selected Scheme. Loan amount should not greater than ${selectedScheme.max_amount}.`;
        }
        if (!values.EMI_payout) {
            errors.EMI_payout = 'EMI payout is Required!';
        }
        if (!values.tenure) {
            errors.tenure = 'Tenure is Required!';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            scheme_id: '',
            application_date: '',
            member_id: '',
            address: '',
            interest_rate: "",
            loan_amount: '',
            // EMI_amount: '',
            EMI_payout: "",
            EMI_type: "",
            tenure: "",
            user_id: auth.id,
            co_borrower_name: "",
            co_borrower_aadhar_card: "",
            co_borrower_pan_card: "",
            co_borrower_ele_bill: "",
            co_borrower_relationship:"",
            purpose:""
        },
        validate,
        onSubmit: async (values) => {
            console.log(values);
            setisShowLoader(true);
            try {
                //delete values.EMI_type;
                values.application_date = enrollmentDate;
                let response = await groupLoan.GroupLoanModel.applyForloan(values);
                setisShowLoader(false);
                if (response.statusCode == 200) {
                    formik.resetForm();
                    setShowToast({ isShow: true, type: "bg-success", message: "Record created successfully. Loan goes for approval." })
                } else {
                    setShowToast({ isShow: true, type: "bg-danger", message: "Something went wrong!" })
                }

            } catch (error) {
                setisShowLoader(false);
                setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
            }
        }
    });
    const handleScheme = (e) => {
        console.log(e.target.value);
        let selectedScheme = schemeRecords.filter(scheme => scheme.scheme_code == e.target.value);
        setSelectedScheme(selectedScheme[0]);
        formik.values.EMI_type = selectedScheme[0].EMI_type;
        formik.values.interest_rate = selectedScheme[0].interest_rate;
        formik.handleChange(e);
    }
    const handleMemberSelection = (e)=>{
        if(e.target.value!=""){
            let selectMember = memberRecords.filter(val=>val.member_id.toString()==e.target.value);
            setImage(selectMember[0].image);
        }
        formik.handleChange(e);
    }
    return (

        <>

            <div className="content">
                <Toast key={1} autohide delay={3000} show={showToast.isShow} onClose={() => setShowToast({ isShow: false, type: "", message: "" })} className={"loader " + (showToast.type)} >
                    <Toast.Header>
                        <strong className="me-auto">{showToast.type == "bg-danger" ? "Error" : "Success"} Message</strong>
                    </Toast.Header>
                    <Toast.Body className="Dark">
                        {showToast.message}
                    </Toast.Body>
                </Toast>
                <Loader show={isShowLoader} />
                <div className="row">
                    <div className="col-md-8">
                        <Form onSubmit={formik.handleSubmit}>
                            <Accordion defaultActiveKey="0" >
                                <Card className="card card-user">
                                    <Card.Header>
                                        <ContextAwareToggle eventKey="0">Borrower Details</ContextAwareToggle>
                                    </Card.Header>

                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body className="card-body">

                                            <Row className="mb-3" >
                                                <Form.Group as={Col} className="form-group required" controlId="formGridEnroll">
                                                    <Form.Label >Application Date</Form.Label>
                                                    <DatePicker className="form-control"
                                                        selected={enrollmentDate}
                                                        onChange={(date) => setEnrollmentDate(date)}
                                                        name="application_date"
                                                        dateFormat="dd/MM/yyyy"
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Member name</Form.Label>
                                                    <select
                                                        className="form-control"
                                                        name="member_id"
                                                        onChange={(e)=>handleMemberSelection(e)}
                                                        value={formik.values.member_id}
                                                    >
                                                        <option key="" value="">Select Member</option>
                                                        {memberRecords.map((member, id) => (
                                                            <option key={member.member_id} value={member.member_id}>{`name= ${member.member_name} - member_id= ${member.member_id} `}</option>
                                                        ))}

                                                    </select>
                                                    {formik.touched.member_id && formik.errors.member_id ? (
                                                        <div className="text-danger">{formik.errors.member_id}</div>
                                                    ) : null}
                                                </Form.Group>

                                            </Row>
                                            <Row className="mb-3" >
                                                <Form.Group as={Col} controlId="formGriddob">
                                                    <Form.Label>Member Address</Form.Label>
                                                    <Form.Control
                                                        name="address"
                                                        as="textarea"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.address}

                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Scheme</Form.Label>
                                                    <select
                                                        className="form-control"
                                                        name="scheme_id"
                                                        onChange={handleScheme}
                                                        value={formik.values.scheme_id}
                                                    >
                                                        <option key="" value="">Select Scheme</option>
                                                        {schemeRecords.map((schems, id) => (
                                                            <option key={schems.id} value={schems.id}>{schems.scheme_code}</option>
                                                        ))}

                                                    </select>
                                                    {formik.touched.scheme_id && formik.errors.scheme_id ? (
                                                        <div className="text-danger">{formik.errors.scheme_id}</div>
                                                    ) : null}

                                                </Form.Group>

                                            </Row>
                                            <Row className="mb-3" >
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Interest Rate (in %)</Form.Label>
                                                    <Form.Control
                                                        name="interest_rate"
                                                        type="number"
                                                        min="0"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.interest_rate}
                                                    />
                                                    <Form.Text className="text-muted">
                                                        It will change as per scheme.
                                                    </Form.Text>
                                                    {formik.touched.interest_rate && formik.errors.interest_rate ? (
                                                        <div className="text-danger">{formik.errors.interest_rate}</div>
                                                    ) : null}

                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Loan Amount</Form.Label>
                                                    <Form.Control
                                                        name="loan_amount"
                                                        type="number"
                                                        min="0"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.loan_amount}
                                                    />
                                                    <Form.Text className="text-muted">
                                                        Default will be Max amount of selected scheme.
                                                    </Form.Text>

                                                    {formik.touched.loan_amount && formik.errors.loan_amount ? (
                                                        <div className="text-danger">{formik.errors.loan_amount}</div>
                                                    ) : null}

                                                </Form.Group>

                                            </Row>
                                            <Row className="mb-3" >
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>EMI Payout</Form.Label>
                                                    <select
                                                        className="form-control"
                                                        name="EMI_payout"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.EMI_payout}
                                                    >
                                                        <option key="" value="">Select Payout</option>
                                                        {/* <option key="weekly" value="weekly">Weekly</option>
                                                <option key="monthly" value="fortnight">Fortnight</option> */}
                                                        <option key="monthly" value="monthly">Monthly</option>
                                                    </select>
                                                    {formik.touched.EMI_payout && formik.errors.EMI_payout ? (
                                                        <div className="text-danger">{formik.errors.EMI_payout}</div>
                                                    ) : null}

                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Tenure(in {formik.values.EMI_payout != "" ? tanure[formik.values.EMI_payout] : "Months"})</Form.Label>
                                                    <Form.Control
                                                        name="tenure"
                                                        type="number"
                                                        min="1"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.tenure}
                                                    />
                                                    {formik.touched.tenure && formik.errors.tenure ? (
                                                        <div className="text-danger">{formik.errors.tenure}</div>
                                                    ) : null}

                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3">
                                            <Form.Group as={Col} md={6} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Purpose of Loan</Form.Label>
                                                    <Form.Control
                                                        name="purpose"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.purpose}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} md={6} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>EMI Type</Form.Label>
                                                    <Form.Control
                                                        name="EMI_type"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.EMI_type}
                                                        disabled="disabled"
                                                    />
                                                    <Form.Text className="text-muted">
                                                        It will change as per selected scheme.
                                                    </Form.Text>
                                                </Form.Group>
                                            </Row>
                                            {/* <Button variant="primary" type="button" onClick={()=>setActiveCard("1")}>
                                                Save
                                            </Button> */}
                                            <ContextAwareToggle eventKey="1">Next</ContextAwareToggle>
                                            <Button variant="danger" onClick={() => { history.push("/") }} type="button" className="ml-2">
                                                Cancel
                                            </Button>
                                            {/* </Form> */}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card className="card card-user">
                                    <Card.Header>
                                        <ContextAwareToggle eventKey="1">Co-Borrower Details</ContextAwareToggle>
                                    </Card.Header>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body className="card-body">
                                            {/* <Form onSubmit={formik.handleSubmit}> */}
                                            <Row className="mb-3" >
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Co-Borrower name</Form.Label>
                                                    <Form.Control
                                                        name="co_borrower_name"
                                                        type="input"
                                                        min="0"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.co_borrower_name}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Relation ship</Form.Label>
                                                    <select
                                                        className="form-control"
                                                        name="co_borrower_relationship"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.co_borrower_relationship}
                                                    >
                                                        <option key="" value="">Select</option>
                                                        <option key="husband" value="husband">Husband</option>
                                                        <option key="father" value="father">Father</option>
                                                        <option key="other" value="other">Other</option>
                                                    </select>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3" >
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Aadhar Card</Form.Label>
                                                    <Form.Control
                                                        name="co_borrower_aadhar_card"
                                                        type="number"
                                                        min="0"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.co_borrower_aadhar_card}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>PAN Card</Form.Label>
                                                    <Form.Control
                                                        name="co_borrower_pan_card"
                                                        type="input"
                                                        min="0"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.co_borrower_pan_card}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} md={6} controlId="formGriddob" className="form-group required">
                                                    <Form.Label>Ele Bill no</Form.Label>
                                                    <Form.Control
                                                        name="co_borrower_ele_bill"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.co_borrower_ele_bill}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Button variant="primary" type="submit">
                                                Save
                                            </Button>
                                            <Button variant="danger" onClick={() => { history.push("/") }} type="button" className="ml-2">
                                                Cancel
                                            </Button>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-user">
                            <div className="card-body">
                                <div className="image">
                                    <img src="../assets/img/damir-bosnjak.jpg" alt="..." />
                                </div>

                                <div className="author">
                                    <a href="#">

                                        <img className="avatar border-gray" src={image==""?"../assets/img/blank_image.jpg":baseURL+image} alt="..." />
                                        {/* <input type="file" name="profile_image"/> */}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoanApplication;