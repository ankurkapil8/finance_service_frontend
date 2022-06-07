import React, { useEffect, useState }from 'react'
import { useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../constants/actionTypes'
import { Table, Button, Container, Row, Col, Modal, InputGroup, FormLabel } from 'react-bootstrap';
import profit from '../../models/profit';
import Loader from '../layout/Loader';
import moment from "moment"
import DatePicker from "react-datepicker";
function Profit() {
  const dispatch = useDispatch();
  const [enrollmentDate, setEnrollmentDate] = useState(new Date());
  const [isShowLoader, setisShowLoader] = useState(false);
  const [dueEmis, setDueEmis] = useState([]);
  const [totalInterestEarned, setTotalInterestEarned] = useState(0);
  const [totalPrincipalEarned, setTotalPrincipalEarned] = useState(0);

  useEffect(() => {
      getProfitData();
      dispatch({ type: CHANGE_PAGE, page: "Profit" });
  }, [])

  const changeEmiDate = (selectedDate)=>{
    setEnrollmentDate(selectedDate)
    getProfitData(moment(selectedDate).format("MM yyyy"));
  }
  
  const getProfitData = (today = moment().format("MM yyyy")) => {
    
    setisShowLoader(true);
    profit.profitDetails.getData(today).then(res => {
      // console.log(res.body);
        setisShowLoader(false);
        if (res.statusCode == 200) {
          setTotalInterestEarned(res.body.total_interest_earned);
          setTotalPrincipalEarned(res.body.total_principal_earned);
            setDueEmis(res.body.records);
        } else {
            setDueEmis([]);
        }
    })
  }
  return (
    
    <div className="content">
       <Loader show={isShowLoader} />
       <Col>
                    <InputGroup className="mb-3">
                    <FormLabel className="mr-3">Date:</FormLabel>
                            <DatePicker className="form-control"
                               selected={enrollmentDate}
                               onChange={(date) => changeEmiDate(date)}
                               name="enrollment_date"
                               dateFormat="MMMM yyyy"
                               showMonthYearPicker
                            />

                    </InputGroup>
                   <div><label><strong>Earned Interest </strong>: {totalInterestEarned} </label></div> 
                   <div><label><strong>Earned Principal </strong>: {totalPrincipalEarned} </label></div> 
                    <Table className=" shadow-lg p-3 mb-5 bg-white rounded small" striped bordered hover responsive>
                            <thead className="bg-primary">
                                <tr>
                                    <th>Loan Account Number</th>
                                    <th>Interest Amount</th>
                                    <th>Disburse Date</th>
                                    <th>Loan Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dueEmis.length!=0?dueEmis.map((val,id) => (<tr key={val.id}><td>{val.group_loan.loan_account_no}</td>
                            <td>{val.int_amount}</td>
                            <td>{val.group_loan.disburse_date}</td>
                            <td>{val.group_loan.loan_amount}</td>
                            </tr>)) : <tr><td colSpan={"8"} className="text-center">No data for Selected Month</td></tr>}
                            </tbody>
                        </Table>    
        </Col>
    </div>
  )
}

export default Profit;