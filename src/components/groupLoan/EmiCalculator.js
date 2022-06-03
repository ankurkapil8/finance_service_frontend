import React,{useState,useRef,useEffect } from 'react';
import { Table,Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import Loader from '../layout/Loader';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import groupLoan from "../../models/groupLoan";
import { useReactToPrint } from 'react-to-print';
function EmiCalculator(props) {
    const [enrollmentDate, setEnrollmentDate] = useState(new Date());
    const [isShowLoader, setisShowLoader] = useState(false)
    const [calculatedData,setCalculatedData] = useState([]);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle:"EMI-details",
    });
    const validate = values => {
        const errors = {};
        if (!values.interest_rate) {
          errors.interest_rate = 'Interest rate is Required';
        }
        if (!values.loan_amount) {
            errors.loan_amount = 'Loan amount is Required';
          }
          if (!values.tenure) {
            errors.tenure = 'Tenure is Required';
          }
          if (!values.EMI_payout) {
            errors.EMI_payout = 'EMI payout is Required';
          }
          return errors;
      };
      const formik = useFormik({
        initialValues: {
        loanStartDate: '',
        interest_rate: '',
        tenure: '',
        EMI_payout:'',
        loan_amount:'',
        EMI_type:"flat"
        },
        validate,
        onSubmit: async (values) => {
          setisShowLoader(true);
          try {
             values.loanStartDate = enrollmentDate;
             console.log(values);
            let response = await groupLoan.EmiModel.calculateEMI(values);
            setisShowLoader(false);
            if (response.statusCode == 200) {
              //formik.resetForm();
              setCalculatedData(response.body.message);
            } else {
              //setShowToast({ isShow: true,type:"bg-danger", message: response.body.message })
            }
    
          } catch (error) {
            setisShowLoader(false);
            //setShowToast({ isShow: true,type:"bg-danger", message: error.response.body.message })
          }
        },
      });
    
    return (
        <>
        <Loader show={isShowLoader}/>
        <div className="content">
        <div className="row">
        <div className="col-md-4">
            <Container className="bg-white mt-2 shadow-lg p-3 mb-5 bg-white rounded">
            <Form onSubmit={formik.handleSubmit}>
            <Form.Group as={Col} className="form-group required pl-0 pr-0" controlId="formGridEnroll">
                            <Form.Label >Application Date</Form.Label>
                            <DatePicker className="form-control"
                                selected={enrollmentDate}
                                onChange={(date) => setEnrollmentDate(date)}
                                name="loanStartDate"
                                dateFormat="dd/MM/yyyy"
                            />
                {formik.touched.loanStartDate && formik.errors.loanStartDate ? (
                  <div className="text-danger">{formik.errors.loanStartDate}</div>
                ) : null}

            </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Loan amount</Form.Label>
                <Form.Control
                  type="number"
                  name="loan_amount"
                  placeholder="Enter loan amount"
                  onChange={formik.handleChange}
                  value={formik.values.loan_amount}
                />
                {formik.touched.loan_amount && formik.errors.loan_amount ? (
                  <div className="text-danger">{formik.errors.loan_amount}</div>
                ) : null}

              </Form.Group>
              <Form.Group className="mb-3 form-group required" controlId="formBasicEmail">
                <Form.Label>Interest rate</Form.Label>
                <Form.Control
                  type="number"
                  name="interest_rate"
                  placeholder="Enter interest rate"
                  onChange={formik.handleChange}
                  value={formik.values.interest_rate}

                />
                {formik.touched.interest_rate && formik.errors.interest_rate ? (
                  <div className="text-danger">{formik.errors.interest_rate}</div>
                ) : null}

              </Form.Group>
              <Form.Group className="mb-3 form-group required" controlId="formBasicEmail">
                <Form.Label>Tenure</Form.Label>
                <Form.Control
                  type="number"
                  name="tenure"
                  onChange={formik.handleChange}
                  value={formik.values.tenure}

                />
                {formik.touched.tenure && formik.errors.tenure ? (
                  <div className="text-danger">{formik.errors.tenure}</div>
                ) : null}

              </Form.Group>
              <Form.Group as={Col} className="mb-3 pl-0 pr-0" controlId="formGridAddress1">
                <Form.Label>EMI payout</Form.Label>
                <select
                    className="form-control"
                    name="EMI_payout"
                    onChange={formik.handleChange}
                    value={formik.values.EMI_payout}
                >
                    <option key="" value="">Select payout</option>

                    {/* <option key="daily" value="daily">Daily</option> */}
                    {/* <option key="weekly" value="weekly">Weekly</option>
                    <option key="monthly" value="fortnight">Fortnight</option> */}
                    <option key="monthly" value="monthly">Monthly</option>
                </select>
                {formik.touched.EMI_payout && formik.errors.EMI_payout ? (
                  <div className="text-danger">{formik.errors.EMI_payout}</div>
                ) : null}

            </Form.Group>

              <Button variant="primary" type="submit">
                Calculate
              </Button>

            </Form>
            </Container>
            </div>
            <div className="col-md-8">
            <Card border="primary" header
                        key={0}
                        text={'dark'}
                        // style={{ width: '18rem' }}
                        className="m-2"
                        ref={componentRef}
                    >
                      {/* {isclickPrint?<h2 className="text-center mb-3">AA2 MicroFinance Foundation</h2>:""} */}
                        <Card.Header className="bg-primary text-center"><b>Micro Finance EMI Details</b><svg onClick={handlePrint} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-printer float-right cursar" viewBox="0 0 16 16">
  <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
  <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
</svg></Card.Header>
                        <Card.Body >
                            <Table  size={"sm"} className="bg-white rounded" striped bordered hover responsive>
                            <thead>
                              <tr>
                                  <th>EMI date</th>
                                  <th>EMI Amount</th>
                                  <th>Principal</th>
                                  <th>Interest</th>
                                  <th>Outstanding</th>
                              </tr>
                          </thead>
                                <tbody>
                                {calculatedData.map((value,id)=>(<tr key={id}>
                                    <td>{value.date}</td>
                                    <td>{value.EMI}</td>
                                    <td>{value.principal}</td>
                                    <td>{value.int_amount}</td>
                                    <td>{value.outstanding }</td>
                                </tr>))}
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
            </div>

    </div>
    </div>            
        </>
    );
}

export default EmiCalculator;