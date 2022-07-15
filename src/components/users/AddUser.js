import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import { useFormik } from 'formik';
import user from '../../models/user';
import Loader from '../layout/Loader';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function AddUser(props) {
  let history = useHistory();
  const auth = useSelector(state => state.auth);

  const [values, setValues] = useState({});
  const [isShowLoader, setisShowLoader] = useState(false)
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
  useEffect(() => {
    console.log(props);
    if (props.location.state)
      getExpenseDetails(props.location.state);
  }, [])
  const getExpenseDetails = async (id) => {
    try {
      setisShowLoader(true);
      let response = await user.Auth.getUserById(props.location.state);
      formik.values.name = response.body.message[0].name;
      formik.values.username = response.body.message[0].username;
      formik.values.password = response.body.message[0].password;
      formik.values.role = response.body.message[0].role;
      formik.values.phone = response.body.message[0].phone;
      console.log(formik.values);
      //formik.values.amount = response.body.message[0].amount
      setisShowLoader(false);
    } catch (error) {
      setisShowLoader(false);
      setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
    }
  }
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is Required!';
    }
    if (!values.username) {
        errors.username = 'Username is Required!';
      }
      if (!values.password) {
        errors.password = 'Password is Required!';
      }
      if (!values.role) {
        errors.role = 'Role is Required!';
      }
      if (!values.phone) {
        errors.phone = 'Phone is Required!';
      }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      role: "checker",
      phone:""
    },
    validate,
    onSubmit: async (values) => {
      setisShowLoader(true);
      try {
        let response = [];
        if (props.location.state) {
            values["id"]=props.location.state;
          response = await user.Auth.editUser(values);
          history.push("/listUser") 
        } else {

          response = await user.Auth.createUser(values);
        }
        setisShowLoader(false);
        if (response.statusCode == 200) {
          formik.resetForm();
          if(props.location.state)
          history.push("/listUser")              
          setShowToast({ isShow: true,type:"bg-success", message: "Data added Successfully!" })
        } else {
          setShowToast({ isShow: true,type:"bg-danger", message: response.body.message.toString() })
        }


      } catch (error) {
        setisShowLoader(false);
        setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message.toString() })
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
        {/* <h2 className="text-info text-center">Add Expense</h2> */}
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
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div class="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </Form.Group>
                  {/* </Row> */}
                  {/* <Row className="mb-3" md={6}> */}

                  <Form.Group controlId="formGriddob" className="form-group required">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div class="text-danger">{formik.errors.username}</div>
                    ) : null}

                  </Form.Group>
                  <Form.Group controlId="formGriddob" className="form-group required">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div class="text-danger">{formik.errors.password}</div>
                    ) : null}

                  </Form.Group>
                  <Form.Group controlId="formGriddob" className="form-group required">
                    <Form.Label>Role</Form.Label>
                    <select
                        className="form-control"
                        name="role"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                    >
                        <option key="" value="">Select Role</option>
                        <option key="checker" value="checker">Checker</option>
                        <option key="maker" value="maker">Maker</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                      <div class="text-danger">{formik.errors.role}</div>
                    ) : null}

                </Form.Group>

                  <Form.Group controlId="formGriddob" className="form-group required">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name="phone"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div class="text-danger">{formik.errors.phone}</div>
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

export default AddUser;