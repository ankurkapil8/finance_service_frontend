import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import { useFormik } from 'formik';
import villageRecord from '../../models/villageRecord';
import Loader from '../layout/Loader';
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';

function AddVillage(props) {
  let history = useHistory();
  const auth = useSelector(state => state.auth);

  const [values, setValues] = useState({});
  const [isShowLoader, setisShowLoader] = useState(false)
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
  useEffect(() => {
    console.log(props);
    if (props.location.state)
      getVillageDetails(props.location.state);
  }, [])
  const getVillageDetails = async (id) => {
    try {
      setisShowLoader(true);
      let response = await villageRecord.VillageModel.getVillage(props.location.state);
      formik.values.village_code = response.body.message[0].village_code
      formik.values.village_name = response.body.message[0].village_name
      formik.values.village_address = response.body.message[0].village_address
      // formik.values.amount = response.body.message[0].amount
      // setEnrollmentDate(new Date(response.body.message[0].date_of_expense));

      setisShowLoader(false);
    } catch (error) {
      setisShowLoader(false);
      setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
    }
  }
  const validate = values => {
    const errors = {};
    if (!values.village_code) {
      errors.village_code = 'Village code is Required!';
    }
    if (!values.village_name) {
      errors.village_name = 'Village name is Required!';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      village_name: '',
      village_code: '',
      village_address: '',
      user_id: auth.id
    },
    validate,
    onSubmit: async (values) => {
      setisShowLoader(true);
      try {
        let response = [];
        if (props.location.state) {
          response = await villageRecord.VillageModel.editVillage(values, props.location.state);

        } else {

          response = await villageRecord.VillageModel.saveVillage(values);
        }
        setisShowLoader(false);
        if (response.statusCode == 200) {
          formik.resetForm();
          if(props.location.state)
          history.push("/village")              
          setShowToast({ isShow: true,type:"bg-success", message: "Data added Successfully!" })
        } else {
          setShowToast({ isShow: true,type:"bg-danger", message: response.body.message.toString() })
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
        {/* <h2 className="text-info text-center">Add village</h2> */}
        {/* <Row>
        <Col md={6}> */}
        <div className="row">
          <div className="col-md-8">
            <div className="card card-user">
              <div className="card-body">
                {/* <Container fluid className="bg-white mt-5 shadow-lg p-3 mb-5 bg-white rounded"> */}
                <Form onSubmit={formik.handleSubmit}>
                  {/* <Row className="mb-3" md={6}> */}
                  <Form.Group controlId="formGriddob" className="form-group required">
                    <Form.Label>village code:</Form.Label>
                    <Form.Control
                      name="village_code"
                      onChange={formik.handleChange}
                      value={formik.values.village_code}
                    />
                    {formik.touched.village_code && formik.errors.village_code ? (
                      <div className="text-danger">{formik.errors.village_code}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="formGriddob" className="form-group required">
                    <Form.Label>Village Name</Form.Label>
                    <Form.Control
                      name="village_name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.village_name}
                    />
                    {formik.touched.village_name && formik.errors.village_name ? (
                      <div className="text-danger">{formik.errors.village_name}</div>
                    ) : null}

                  </Form.Group>
                  <Form.Group controlId="formGriddob" className="form-group required">
                    <Form.Label>Village Address</Form.Label>
                    <Form.Control
                      name="village_address"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.village_address}
                    />
                    {formik.touched.village_address && formik.errors.village_address ? (
                      <div className="text-danger">{formik.errors.village_address}</div>
                    ) : null}

                  </Form.Group>


                  {/* </Row> */}
                  <Button variant="primary" type="submit">
                    Save
                  </Button>

                </Form>
                {/* </Container> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddVillage;