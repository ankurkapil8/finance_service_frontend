import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import { useSelector } from "react-redux";

function LoanApplication(props) {
    const auth = useSelector(state => state.auth);
    const [enrollmentDate, setEnrollmentDate] = useState(new Date());
    const [values, setValues] = useState({});
    const [isShowLoader, setisShowLoader] = useState(false)
    const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
    const [memberRecords, setMemberRecords] = useState([]);
    const [schemeRecords, setSchemeRecords] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState({});

    const tanure = {"weekly":"Weeks","monthly":"Months","daily":"Days","fortnight":"Fortnight"};
    let history = useHistory();
    //const selectedSm = {"interest_rate":0,"EMI_type":"","max_amount":0};
    useEffect(()=>{
        getSchemesAndMembers();
    },[])
    const getSchemesAndMembers=async()=>{
        try{
            setisShowLoader(true);
            const response =await Promise.all(groupLoan.SchemeModel.getLoanAppInitialData())
            setisShowLoader(false);
            setSchemeRecords(response[0].body.message);
            setMemberRecords(response[1].body.message);
            console.log(response);
        } catch (error) {
            setisShowLoader(false);
            setShowToast({ isShow: true,type:"bg-danger", message: error.response.body.message })
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
        if (selectedScheme?.interest_rate>0 && values.interest_rate>selectedScheme?.interest_rate) {
            errors.interest_rate = `As per the Selected Scheme. Interest rate should not greater than ${selectedScheme.interest_rate}.`;
        }
        if (!values.loan_amount) {
            errors.loan_amount = 'Loan amount is Required!';
        }
        if (selectedScheme?.max_amount>0 && values.loan_amount>selectedScheme.max_amount) {
            errors.loan_amount = `As per the Selected Scheme. Loan amount should not greater than ${selectedScheme.max_amount}.`;
        }
        // if (!values.EMI_amount) {
        //     errors.EMI_amount = 'EMI amount is Required!';
        // }
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
            address:'',
            interest_rate: "",
            loan_amount:'',
            // EMI_amount: '',
            EMI_payout:"",
            EMI_type:"",
            tenure:"",
            user_id:auth.id
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
                setShowToast({ isShow: true,type:"bg-success", message: response.body.message })
              } else {
                setShowToast({ isShow: true,type:"bg-danger", message: response.body.message })
              }

            } catch (error) {
              setisShowLoader(false);
              setShowToast({ isShow: true,type:"bg-danger", message: error.response.body.message })
            }
        }
    });
    const handleScheme=(e)=>{
        console.log(e.target.value);
        let selectedScheme = schemeRecords.filter(scheme=>scheme.scheme_code==e.target.value);
        setSelectedScheme(selectedScheme[0]);
         formik.values.EMI_type = selectedScheme[0].EMI_type;
         formik.values.interest_rate = selectedScheme[0].interest_rate;
        formik.handleChange(e);
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
            <h2 className="text-info text-center">Add Loan Application</h2>
            
            <Container fluid className="bg-white mt-5 shadow-lg p-3 mb-5 bg-white rounded">
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3" >
                    <Form.Group as={Col} className="form-group required" controlId="formGridEnroll">
                            <Form.Label >Application Date</Form.Label>
                            <DatePicker class="form-control"
                                selected={enrollmentDate}
                                onChange={(date) => setEnrollmentDate(date)}
                                name="application_date"
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                            <Form.Label>Member name</Form.Label>
                            <select
                                className="form-control"
                                name="member_id"
                                onChange={formik.handleChange}
                                value={formik.values.member_id}
                            >
                                <option key="" value="">Select Member</option>
                                {memberRecords.map((member,id)=>(
                                    <option key={member.member_id} value={member.member_id}>{`name= ${member.member_name} - member_id= ${member.member_id} `}</option>
                                ))}

                            </select>
                            {formik.touched.member_id && formik.errors.member_id ? (
                  <div class="text-danger">{formik.errors.member_id}</div>
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
                                {schemeRecords.map((schems,id)=>(
                                    <option key={schems.scheme_code} value={schems.scheme_code}>{schems.scheme_code}</option>
                                ))}

                            </select>
                            {formik.touched.scheme_id && formik.errors.scheme_id ? (
                                <div class="text-danger">{formik.errors.scheme_id}</div>
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
                                <div class="text-danger">{formik.errors.interest_rate}</div>
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
                                <div class="text-danger">{formik.errors.loan_amount}</div>
                            ) : null}

                        </Form.Group>

                    </Row>
                    <Row className="mb-3" >
                        {/* <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                            <Form.Label>EMI Amount</Form.Label>
                            <Form.Control
                                name="EMI_amount"
                                type="number"
                                min="0"
                                onChange={formik.handleChange}
                                value={formik.values.EMI_amount}
                            />
                            {formik.touched.EMI_amount && formik.errors.EMI_amount ? (
                                <div class="text-danger">{formik.errors.EMI_amount}</div>
                            ) : null}

                        </Form.Group> */}
                        <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                            <Form.Label>EMI Payout</Form.Label>
                            <select
                                className="form-control"
                                name="EMI_payout"
                                onChange={formik.handleChange}
                                value={formik.values.EMI_payout}
                            >
                                <option key="" value="">Select Payout</option>
                                {/* <option key="daily" value="daily">Daily</option> */}
                                <option key="weekly" value="weekly">Weekly</option>
                                <option key="monthly" value="fortnight">Fortnight</option>

                            </select>
                            {formik.touched.EMI_payout && formik.errors.EMI_payout ? (
                                <div class="text-danger">{formik.errors.EMI_payout}</div>
                            ) : null}

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                            <Form.Label>Tenure(in {formik.values.EMI_payout!=""?tanure[formik.values.EMI_payout]:"Months"})</Form.Label>
                            <Form.Control
                                name="tenure"
                                type="number"
                                min="1"
                                onChange={formik.handleChange}
                                value={formik.values.tenure}
                            />
                            {formik.touched.tenure && formik.errors.tenure ? (
                                <div class="text-danger">{formik.errors.tenure}</div>
                            ) : null}

                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
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
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="danger" onClick={()=>{history.push("/")}} type="button" className="ml-2">
                        Cancel
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default LoanApplication;