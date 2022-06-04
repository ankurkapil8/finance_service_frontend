import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import masterRecord from '../../../models/masterRecord';
import Loader from '../../layout/Loader';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../../constants/actionTypes'

function AddMemberGroup(props) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [isShowLoader, setisShowLoader] = useState(false)
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
  useEffect(() => {
    dispatch({ type: CHANGE_PAGE, page: "Add Member Group" });
  }, [])
  const handleAlertShow = (obj) => {
    setShowToast(obj);
    setTimeout(() => {
      setShowToast({ isShow: false, type: "", message: "" })
    }, 2000);
  }
  const validate = values => {
    const errors = {};
    if (!values.group_code) {
      errors.group_code = 'Group Code is Required';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      group_code: '',
      group_name: '',
      remark: '',
      user_id: auth.id
    },
    validate,
    onSubmit: async (values) => {
      setisShowLoader(true);
      try {
        let response = await masterRecord.MemberGroupModel.saveMemberGroups(values);
        setisShowLoader(false);
        if (response.statusCode == 200) {
          handleAlertShow({ isShow: true, type: "bg-success", message: response.body.message })
          formik.resetForm();
        } else {
          handleAlertShow({ isShow: true, type: "bg-danger", message: response.body.message })

        }

      } catch (error) {
        setisShowLoader(false);
        handleAlertShow({ isShow: true, type: "bg-danger", message: error.response.body.message })
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
      <div class="content">
        {/* <Toast key={1} autohide delay={3000} show={showToast.isShow} onClose={() => setShowToast({ isShow: false, type: "", message: "" })} className={"loader " + (showToast.type)} >
          <Toast.Header>
            <strong className="me-auto">{showToast.type == "bg-danger" ? "Error" : "Success"} Message</strong>
          </Toast.Header>
          <Toast.Body className="Dark">
            {showToast.message}
          </Toast.Body>
        </Toast> */}
        <Alert dismissible delay={3000} show={showToast.isShow} onClose={() => setShowToast({ isShow: false, type: "", message: "" })} key={showToast.type == "bg-danger" ? "danger" : "success"} variant={showToast.type == "bg-danger" ? "danger" : "success"}>
          {showToast.message}
        </Alert>
        <Loader show={isShowLoader} />
        <div class="row">
          <div class="col-md-8">
            <div class="card card-user">
              {/* <div class="card-header">
                <h5 class="card-title">Add Member Group</h5>
              </div> */}
              <div class="card-body">
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3 form-group required" controlId="formBasicEmail">
                    <Form.Label>Group Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="group_code"
                      placeholder="Enter group code"
                      onChange={formik.handleChange}
                      value={formik.values.group_code}

                    />
                    {formik.touched.group_code && formik.errors.group_code ? (
                      <div class="text-danger">{formik.errors.group_code}</div>
                    ) : null}

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="group_name"
                      placeholder="Enter group name"
                      onChange={formik.handleChange}
                      value={formik.values.group_name}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} name="remark"
                      onChange={formik.handleChange}
                      value={formik.values.remark} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>

                </Form>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
}

export default AddMemberGroup;