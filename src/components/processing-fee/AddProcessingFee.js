import React, { useState,useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import { useFormik } from 'formik';
import processingFee from  '../../models/processingFee';
import Loader from '../layout/Loader';
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';
import { CHANGE_PAGE } from '../../constants/actionTypes';
function AddProcessingFee(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [enrollmentDate, setEnrollmentDate] = useState(new Date());

    const [values, setValues] = useState({});
    const [isShowLoader, setisShowLoader] = useState(false)
    const [showToast, setShowToast] = useState({ isShow: false, type: "", message: "" })
    useEffect(() => {
      console.log(props);
      dispatch({ type: CHANGE_PAGE, page: "Add/Edit Fund" });
      if(props.location.state)
          getExpenseDetails(props.location.state);
  }, [])    
    const getExpenseDetails = async(id)=>{
      try {
        setisShowLoader(true);
        let response = await processingFee.ProcessingFeeModel.getProcessingFee(props.location.state);
        formik.values.particular = response.body.message[0].particular  
        formik.values.amount = response.body.message[0].amount 
        setEnrollmentDate(new Date(response.body.message[0].date_of_processing));

        setisShowLoader(false);
    } catch (error) {
        setisShowLoader(false);
        setShowToast({ isShow: true, type: "bg-danger", message: error.response.body.message })
    }
    }
    const validate = values => {
      const errors = {};
      if (!values.particular) {
        errors.particular = 'Particular type is Required!';
      }
      if (!values.amount) {
        errors.amount = 'Amount is Required!';
      }
      return errors;
    };
    const formik = useFormik({
      initialValues: {
        particular: '',
        amount: '',
        date_of_processing: '',
        user_id:auth.id
      },
      validate,
      onSubmit: async (values) => {
        setisShowLoader(true);
          try {
            values.date_of_processing = enrollmentDate;
            let response = [];
            if(props.location.state){
              response = await processingFee.ProcessingFeeModel.editProcessingFee(values,props.location.state);

         }else{

             response = await processingFee.ProcessingFeeModel.saveProcessingFee(values);
         }
            setisShowLoader(false);
            if (response.statusCode == 200) {
              formik.resetForm();
              if(props.location.state)
              history.push("/processingFee")              
              setShowToast({ isShow: true,type:"bg-success", message: "Data added Successfully!" })
            } else {
              setShowToast({ isShow: true,type:"bg-danger", message: response.body.message.toString() })
            }
  
          } catch (error) {
            setisShowLoader(false);
            setShowToast({ isShow: true,type:"bg-danger", message: error.response.body.message })
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
        <Toast key={1} autohide delay={3000} show={showToast.isShow} onClose={() => setShowToast({ isShow: false,type:"", message: "" })} className={"loader "+ (showToast.type) } >
          <Toast.Header>
            <strong className="me-auto">{showToast.type=="bg-danger"?"Error":"Success"} Message</strong>
          </Toast.Header>
          <Toast.Body className="Dark">
          {showToast.message}
          </Toast.Body>
        </Toast>
        <Loader show={isShowLoader} />
        {/* <h2 className="text-info text-center">{props.location.state?"Edit":"Add"} Processing Fee</h2> */}
        <div className="row">
          <div className="col-md-8">
            <div className="card card-user">
              <div className="card-body">
          {/* <Container fluid className="bg-white mt-5 shadow-lg p-3 mb-5 bg-white rounded"> */}
          <Form onSubmit={formik.handleSubmit}>
            {/* <Row className="mb-3" md={6}> */}
              <Form.Group  controlId="formGriddob" className="form-group required">
                <Form.Label>Particular:</Form.Label>
                <Form.Control
                  name="particular"
                  onChange={formik.handleChange}
                  value={formik.values.particular}
                />
                  {formik.touched.particular && formik.errors.particular ? (
                    <div class="text-danger">{formik.errors.particular}</div>
                  ) : null}              
              </Form.Group>
              {/* </Row> */}
              {/* <Row className="mb-3" md={6}> */}

              <Form.Group  controlId="formGriddob" className="form-group required">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                />
                  {formik.touched.amount && formik.errors.amount ? (
                    <div class="text-danger">{formik.errors.amount}</div>
                  ) : null}              
  
              </Form.Group>
  
            {/* </Row> */}
            {/* <Row className="mb-3" md={6}> */}
            <Form.Group  className="form-group required" controlId="formGridEnroll">
                            <Form.Label >Date of Fund</Form.Label>
                            <DatePicker className="form-control"
                                selected={enrollmentDate}
                                onChange={(date) => setEnrollmentDate(date)}
                                name="date_of_processing"
                            />
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

export default AddProcessingFee;