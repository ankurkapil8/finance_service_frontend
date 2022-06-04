import React, { useState,useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import { useFormik } from 'formik';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import { useSelector,useDispatch } from "react-redux";
import {CHANGE_PAGE} from '../../constants/actionTypes'
function AddScheme(props) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [isShowLoader, setisShowLoader] = useState(false)
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
  useEffect(()=>{
    dispatch({type:CHANGE_PAGE,page:"Add Scheme"});
  },[]);
  const validate = values => {
    const errors = {};
    if (!values.scheme_code) {
      errors.scheme_code = 'Scheme code is Required!';
    }
    if (!values.scheme_name) {
      errors.scheme_name = 'Scheme name is Required!';
    }
    if (!values.max_amount) {
      errors.max_amount = 'Max amount is Required!';
    }
    if (!values.interest_rate) {
      errors.interest_rate = 'Interest rate is Required!';
    }
    if (!values.EMI_type) {
      errors.EMI_type = 'EMI type is Required!';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      scheme_code: '',
      scheme_name: '',
      max_amount: '',
      interest_rate: '',
      EMI_type: '',
      user_id: auth.id
    },
    validate,
    onSubmit: async (values) => {
      setisShowLoader(true);
      try {
        let response = await groupLoan.SchemeModel.saveScheme(values);
        setisShowLoader(false);
        if (response.statusCode == 200) {
          formik.resetForm();
          setShowToast({ isShow: true, type: "bg-success", message: "Scheme Created Successfully!" })
        } else {
          setShowToast({ isShow: true, type: "bg-danger", message: "Something Went Wrong!" })
        }

      } catch (error) {
        setisShowLoader(false);
        setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
      }
    },
    handleChange: () => {
      setValues(prevValues => ({
        ...prevValues,
        // we use the name to tell Formik which key of `values` to update
        [values.target.name]: values.target.value
      }))
    },
  });
  return (
    <>
      <Toast key={1} autohide delay={3000} show={showToast.isShow} onClose={() => setShowToast({ isShow: false, type: "", message: "" })} className={"loader " + (showToast.type)} >
        <Toast.Header>
          <strong className="me-auto">{showToast.type == "bg-danger" ? "Error" : "Success"} Message</strong>
        </Toast.Header>
        <Toast.Body className="Dark">
          {showToast.message}
        </Toast.Body>
      </Toast>
      <div className="content">
        <Loader show={isShowLoader} />
        {/* <h2 className="text-info text-center">Add Scheme</h2> */}
        {/* <Container fluid className="bg-white mt-5 shadow-lg p-3 mb-5 bg-white rounded"> */}
        <div className="row">
          <div className="col-md-8">
            <div className="card card-user">
              <div className="card-header">
                <h5 className="card-title">Add Scheme</h5>
              </div>
              <div className="card-body">

                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3" >
                    <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                      <Form.Label>Scheme Code</Form.Label>
                      <Form.Control
                        name="scheme_code"
                        onChange={formik.handleChange}
                        value={formik.values.scheme_code}
                      />
                      {formik.touched.scheme_code && formik.errors.scheme_code ? (
                        <div class="text-danger">{formik.errors.scheme_code}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGriddob" className="form-group">
                      <Form.Label>Scheme Name</Form.Label>
                      <Form.Control
                        name="scheme_name"
                        onChange={formik.handleChange}
                        value={formik.values.scheme_name}
                      />
                      {formik.touched.scheme_name && formik.errors.scheme_name ? (
                        <div class="text-danger">{formik.errors.scheme_name}</div>
                      ) : null}

                    </Form.Group>

                  </Row>
                  <Row className="mb-3" >
                    <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                      <Form.Label>Max amount</Form.Label>
                      <Form.Control
                        name="max_amount"
                        type="number"
                        min="1"
                        onChange={formik.handleChange}
                        value={formik.values.max_amount}
                      />
                      {formik.touched.max_amount && formik.errors.max_amount ? (
                        <div class="text-danger">{formik.errors.max_amount}</div>
                      ) : null}

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGriddob" className="form-group required">
                      <Form.Label>Interest Rate (in %)</Form.Label>
                      <Form.Control
                        name="interest_rate"
                        type="number"
                        min="0"
                        onChange={formik.handleChange}
                        value={formik.values.interest_rate}
                      />
                      {formik.touched.interest_rate && formik.errors.interest_rate ? (
                        <div class="text-danger">{formik.errors.interest_rate}</div>
                      ) : null}

                    </Form.Group>

                  </Row>
                  <Row className="mb-3" md={6}>
                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                      <Form.Label>EMI type</Form.Label>
                      <select
                        className="form-control"
                        name="EMI_type"
                        onChange={formik.handleChange}
                        value={formik.values.EMI_type}
                      >
                        <option key="" value="">Select EMI type</option>
                        <option key="flat" value="flat">Flat rate</option>
                        {/* <option key="reduceing" value="reduceing">Reduceing rate</option> */}
                      </select>
                      {formik.touched.EMI_type && formik.errors.EMI_type ? (
                        <div class="text-danger">{formik.errors.EMI_type}</div>
                      ) : null}

                    </Form.Group>

                  </Row>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>

                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Container> */}
    </>
  );
}

export default AddScheme;