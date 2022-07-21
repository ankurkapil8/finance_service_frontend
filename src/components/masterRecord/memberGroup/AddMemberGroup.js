import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import masterRecord from '../../../models/masterRecord';
import villageRecord from '../../../models/villageRecord';
import Loader from '../../layout/Loader';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../../constants/actionTypes'
import { useHistory } from 'react-router-dom';
function AddMemberGroup(props) {
  let history = useHistory();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [isShowLoader, setisShowLoader] = useState(false)
  const [villageList, setVillageList] = useState([])
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
  useEffect(() => {
    dispatch({ type: CHANGE_PAGE, page: "Add Member Group" });
    getVillageList()

  }, [])
  const getGroupDetails = async (id) => {
    try {
      setisShowLoader(true);
      let response = await masterRecord.MemberGroupModel.getMemberGroups(props.location.state);
      console.log(response);
      formik.values.group_code = response.body.message[0].group_code
      formik.values.group_name = response.body.message[0].group_name
      formik.values.remark = response.body.message[0].remark
      formik.values.village_id = response.body.message[0].village_id
      // formik.values.amount = response.body.message[0].amount
      // setEnrollmentDate(new Date(response.body.message[0].date_of_expense));

      setisShowLoader(false);
    } catch (error) {
      setisShowLoader(false);
      setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
    }
  }

  const handleAlertShow = (obj) => {
    setShowToast(obj);
    setTimeout(() => {
      setShowToast({ isShow: false, type: "", message: "" })
    }, 2000);
  }
  const getVillageList = async () => {
    try {
      setisShowLoader(true);
      villageRecord.VillageModel.getVillage('all').then(res => {
        setisShowLoader(false);
        if (res.statusCode == 200) {
          setVillageList(res.body.message);
        } else {
          setVillageList([]);
        }
        if (props.location.state)
          getGroupDetails(props.location.state);
  
      })
    } catch (error) {
      setisShowLoader(false);
      setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
    }
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
      user_id: auth.id,
      village_id:null
    },
    validate,
    onSubmit: async (values) => {
      setisShowLoader(true);
      try {
        let response = [];
        if (props.location.state) {
          response = await masterRecord.MemberGroupModel.editMemberGroup(values, props.location.state);
        } else {
          response = await masterRecord.MemberGroupModel.saveMemberGroups(values);
        }
        setisShowLoader(false);
        if (response.statusCode == 200) {
          formik.resetForm();
          if(props.location.state)
          history.push("/memberGroup")              
          setShowToast({ isShow: true,type:"bg-success", message: "Data added Successfully!" })
        } else {
          setShowToast({ isShow: true,type:"bg-danger", message: response.body.message.toString() })
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
      <div className="content">
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
        <div className="row">
          <div className="col-md-8">
            <div className="card card-user">
              {/* <div className="card-header">
                <h5 className="card-title">Add Member Group</h5>
              </div> */}
              <div className="card-body">
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group controlId="formGriddob" className="form-group required">
                    <Form.Label>Village</Form.Label>
                    <select
                      className="form-control"
                      name="village_id"
                      onChange={formik.handleChange}
                      value={formik.values.village_id}
                    >
                      <option key="" value="">Select Village</option>
                      {villageList.map((schems, id) => (
                        <option key={schems.id} value={schems.id}>{schems.village_name}</option>
                      ))}

                    </select>
                    {formik.touched.village_id && formik.errors.village_id ? (
                      <div className="text-danger">{formik.errors.village_id}</div>
                    ) : null}

                  </Form.Group>

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
                      <div className="text-danger">{formik.errors.group_code}</div>
                    ) : null}

                  </Form.Group>

                  <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="group_name"
                      placeholder="Enter group name"
                      onChange={formik.handleChange}
                      value={formik.values.group_name}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 form-group" controlId="formBasicPassword">
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