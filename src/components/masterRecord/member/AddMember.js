import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import memberDetails from "../../../models/memberDetails"
import masterRecord from '../../../models/masterRecord';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../../constants/actionTypes'
import Loader from '../../layout/Loader';
import {API_ROOT} from "../../../models/BaseUrl"
//import "react-datepicker/dist/react-datepicker.css";
function AddMember(props) {
    const auth = useSelector(state => state.auth);
    let history = useHistory();
    const dispatch = useDispatch();
    const [enrollmentDate, setEnrollmentDate] = useState(new Date());
    const [dob, setDob] = useState();
    const [values, setValues] = useState({});
    const [isShowLoader, setisShowLoader] = useState(false)
    const [groups, setGroups] = useState([])
    const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
    const [image, setImage] = useState("")
    let baseURL = API_ROOT.replace('/api','/')
    useEffect(() => {
        console.log(props);
        dispatch({ type: CHANGE_PAGE, page: "Add Member" });
        if (props.location.state)
            getMemberDetails(props.location.state);
        getMemberGroups();
    }, [])
    const getMemberGroups = async () => {
        try {
            setisShowLoader(true);
            let response = await masterRecord.MemberGroupModel.getMemberGroups();
            setisShowLoader(false);
            setGroups(response.body.message)
        } catch (error) {
            setisShowLoader(false);
            setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
        }
    }
    const getMemberDetails = async (member_id) => {
        try {
            setisShowLoader(true);
            let response = await memberDetails.MemberDetailModel.getMemberDetailsData(member_id);
            console.log(response);
            formik.values.aadhar_card = response.body.message[0].aadhar_card
            formik.values.member_name = response.body.message[0].member_name
            formik.values.gender = response.body.message[0].gender
            formik.values.age = response.body.message[0].age
            formik.values.marital_status = response.body.message[0].marital_status
            formik.values.mobile_number = response.body.message[0].mobile_number
            formik.values.email_id = response.body.message[0].email_id
            formik.values.member_group_id = response.body.message[0].member_group_id
            formik.values.pan_card_number = response.body.message[0].pan_card_number
            formik.values.driving_license_number = response.body.message[0].driving_license_number
            formik.values.voter_id_number = response.body.message[0].voter_id_number
            formik.values.ration_card_number = response.body.message[0].ration_card_number
            formik.values.bank_account = response.body.message[0].bank_account
            formik.values.bank_ifsc_code = response.body.message[0].bank_ifsc_code
            formik.values.bank_account_holder = response.body.message[0].bank_account_holder
            formik.values.enrollment_date = response.body.message[0].enrollment_date
            setEnrollmentDate(new Date(response.body.message[0].enrollment_date));
            formik.values.date_of_birth = response.body.message[0].date_of_birth
            if(response.body.message[0].image){
                setImage(response.body.message[0].image);
            }
            setDob(new Date(response.body.message[0].date_of_birth));

            setisShowLoader(false);
            //setGroups(response.body.message)
        } catch (error) {
            setisShowLoader(false);
            setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
        }

    }
    const validate = values => {
        window.scrollTo(0, 0);
        const errors = {};
        if (!values.member_name) {
            errors.member_name = 'Please provide member name';
        }
        return errors;
    };
    const getImage= async(e)=>{
        try {
            if(e.target.files.length==0)
                return false;
            setisShowLoader(true);
            setShowToast({ isShow: false, type: "", message: "" })
            const file = e.target.files[0];
            let fileExtArr = file.name.split(".");
            let fileExt = fileExtArr[1];
            if(fileExt!="png" && fileExt!="jpg"){
                setisShowLoader(false);
                setShowToast({ isShow: true, type: "bg-danger", message: "Please upload Image type PNG or JPG" })
            }
            let formData = new FormData();
            formData.append('image', file);
            let response = await masterRecord.MemberGroupModel.saveImage(formData);
            if(response.status==200){
                setImage(response.body.message.image.path)
            }
            console.log(response);
            setisShowLoader(false);
        } catch (error) {
            setisShowLoader(false);
            setShowToast({ isShow: true, type: "bg-danger", message: error.toString() })

        }
    }
    const formik = useFormik({
        initialValues: {
            enrollment_date: enrollmentDate,
            date_of_birth: dob,
            member_name: '',
            gender: "",
            age: "",
            marital_status: "",
            mobile_number: "",
            email_id: "",
            member_group_id: "",
            aadhar_card: "",
            pan_card_number: "",
            driving_license_number: "",
            voter_id_number: "",
            ration_card_number: "",
            bank_account: "",
            bank_ifsc_code: "",
            bank_account_holder: "",
            user_id: auth.id
        },
        validate,
        onSubmit: async (values) => {
            setisShowLoader(true);
            window.scrollTo(0, 0);
            try {
                values.enrollment_date = enrollmentDate;
                values.date_of_birth = dob;
                values.image = image;
                let response = [];
                if (props.location.state) {
                    response = await memberDetails.MemberDetailModel.editMember(values, props.location.state);
                } else {
                    response = await memberDetails.MemberDetailModel.saveMemberDetails(values);
                }
                setisShowLoader(false);
                if (response.statusCode == 200) {
                    formik.resetForm();
                    if (props.location.state)
                        history.push("/member")
                    setShowToast({ isShow: true, type: "bg-success", message: "Member Created Successfully!" })
                } else {
                    setShowToast({ isShow: true, type: "bg-danger", message: "Something went wrong!" })
                }

            } catch (error) {
                console.log(error.response.body.message);
                setisShowLoader(false);
                setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
            }
        }
    });
    return (
        <>

            <div class="content">
                <Alert dismissible delay={3000} show={showToast.isShow} onClose={() => setShowToast({ isShow: false, type: "", message: "" })} key={showToast.type == "bg-danger" ? "danger" : "success"} variant={showToast.type == "bg-danger" ? "danger" : "success"}>
                    {showToast.message}
                </Alert>

                <Loader show={isShowLoader} />
                <div class="row">
                    <div class="col-md-8">
                        <div class="card card-user">
                            {/* <div class="card-header">
                                <h5 class="card-title">Add Member</h5>
                            </div> */}
                            <div class="card-body">

                                <Form onSubmit={formik.handleSubmit}>
                                    <Row className="mb-3" >
                                        <Form.Group as={Col} className="form-group required" controlId="formGridEnroll">
                                            <Form.Label >Enrollment Date</Form.Label>
                                            <DatePicker className="form-control"
                                                selected={enrollmentDate}
                                                onChange={(date) => setEnrollmentDate(date)}
                                                name="enrollment_date"
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} className="form-group required" controlId="formGridName">
                                            <Form.Label >Member Name</Form.Label>
                                            <Form.Control type="text"
                                                placeholder="member name"
                                                name="member_name"
                                                onChange={formik.handleChange}
                                                value={formik.values.member_name}

                                            />
                                            {formik.touched.member_name && formik.errors.member_name ? (
                                                <div class="text-danger">{formik.errors.member_name}</div>
                                            ) : null}
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3" >
                                        <Form.Group as={Col} controlId="formGriddob">
                                            <Form.Label>Date of Birth</Form.Label>
                                            <DatePicker
                                                className="form-control"
                                                selected={dob}
                                                onChange={(date) => setDob(date)}
                                                name="date_of_birth"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Gender</Form.Label>
                                            <select
                                                className="form-control"
                                                name="gender"
                                                onChange={formik.handleChange}
                                                value={formik.values.gender}
                                            >
                                                <option key="" value="">Select Gender</option>

                                                <option key="male" value="male">Male</option>
                                                <option key="female" value="female">Female</option>

                                            </select>
                                        </Form.Group>

                                    </Row>
                                    <Row className="mb-3" >
                                        <Form.Group as={Col} controlId="formGridAge">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control
                                                name="age"
                                                onChange={formik.handleChange}
                                                value={formik.values.age}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Marital Status</Form.Label>
                                            <Form.Control
                                                name="marital_status"
                                                onChange={formik.handleChange}
                                                value={formik.values.marital_status}
                                            />
                                        </Form.Group>

                                    </Row>

                                    <Row className="mb-3" >
                                        <Form.Group as={Col} controlId="formGridAge">
                                            <Form.Label>Phone number</Form.Label>
                                            <Form.Control
                                                name="mobile_number"
                                                type="number"
                                                onChange={formik.handleChange}
                                                value={formik.values.mobile_number}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                name="email_id"
                                                onChange={formik.handleChange}
                                                value={formik.values.email_id}
                                                type="text"
                                            />
                                        </Form.Group>

                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md={6} className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Member Group</Form.Label>
                                            <select className="form-control" name="member_group_id" onChange={formik.handleChange}
                                                value={formik.values.member_group_id}
                                            >
                                                <option key="" value="">Select Member Group</option>
                                                {groups.map((group, id) => (
                                                    <option key={group.group_code} value={group.group_code}>{group.group_code}</option>
                                                ))}
                                            </select>
                                        </Form.Group>

                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <h3 className="text-info">KYC Information</h3>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3" >
                                        <Form.Group as={Col} controlId="formGridAge">
                                            <Form.Label>Aadhar no.</Form.Label>
                                            <Form.Control
                                                name="aadhar_card"
                                                type="number"
                                                onChange={formik.handleChange}
                                                value={formik.values.aadhar_card}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>PAN</Form.Label>
                                            <Form.Control
                                                name="pan_card_number"
                                                onChange={formik.handleChange}
                                                value={formik.values.pan_card_number}
                                            />
                                        </Form.Group>

                                    </Row>
                                    <Row className="mb-3" >
                                        <Form.Group as={Col} controlId="formGridAge">
                                            <Form.Label>Driving Licence No.</Form.Label>
                                            <Form.Control
                                                name="driving_license_number"
                                                onChange={formik.handleChange}
                                                value={formik.values.driving_license_number}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Voter Id No.</Form.Label>
                                            <Form.Control
                                                name="voter_id_number"
                                                onChange={formik.handleChange}
                                                value={formik.values.voter_id_number}
                                            />
                                        </Form.Group>

                                    </Row>
                                    <Row className="mb-3" >
                                        <Form.Group as={Col} md={6} controlId="formGridAge">
                                            <Form.Label>Ration Card No.</Form.Label>
                                            <Form.Control
                                                name="ration_card_number"
                                                onChange={formik.handleChange}
                                                value={formik.values.ration_card_number}
                                            />
                                        </Form.Group>

                                    </Row>

                                    <Row className="mb-3">
                                        <Col>
                                            <h3 className="text-info">Bank Details</h3>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3" >
                                        <Form.Group as={Col} controlId="formGridAge">
                                            <Form.Label>Bank Account No.</Form.Label>
                                            <Form.Control
                                                name="bank_account"
                                                type="number"
                                                onChange={formik.handleChange}
                                                value={formik.values.bank_account}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>IFSC code</Form.Label>
                                            <Form.Control
                                                name="bank_ifsc_code"
                                                onChange={formik.handleChange}
                                                value={formik.values.bank_ifsc_code}
                                            />
                                        </Form.Group>

                                    </Row>
                                    <Row className="mb-3" >
                                        <Form.Group as={Col} md={6} controlId="formGridAge">
                                            <Form.Label>Account holder name</Form.Label>
                                            <Form.Control
                                                name="bank_account_holder"
                                                onChange={formik.handleChange}
                                                value={formik.values.bank_account_holder}
                                            />
                                        </Form.Group>


                                    </Row>

                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-user">
                            <div class="card-body">
                                <div class="image">
                                    <img src="../assets/img/damir-bosnjak.jpg" alt="..." />
                                </div>

                                <div class="author">
                                    <a href="#">                                      
                                        <img class="avatar border-gray" src={image==""?"../assets/img/blank_image.jpg":baseURL+image} alt="..." />
                                        <input type="file" name="profile_image" onChange={(e)=>getImage(e)}/>
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

export default AddMember;