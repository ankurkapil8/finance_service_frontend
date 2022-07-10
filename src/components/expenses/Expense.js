import React, { useEffect, useState } from 'react';
import { Table,Button, Container, Row, Col,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import expenseRecord from '../../models/expenseRecord';
import Loader from '../layout/Loader';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE } from '../../constants/actionTypes';

function Expense(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [isShowLoader, setisShowLoader] = useState(false)
    const [expense,setExpense]=useState([]);
    const [deleteID, setDeleteID] = useState(0);

    useEffect(() => {
        dispatch({ type: CHANGE_PAGE, page: "Expenses" });
        getExpenses();
    },[])

    const getExpenses = () =>{
        setisShowLoader(true);
        expenseRecord.ExpenseModel.getExpense('all').then(res=>{
            setisShowLoader(false);
            if(res.statusCode == 200){
                setExpense(res.body.message);
            }else{
                setExpense([]);
            }
        })
    }
    const  deleteHandle=(id)=>{
        setDeleteID(id); 
        setShowDeleteModel(true);
    }

    const deleteScheme=async()=>{
        setShowDeleteModel(false);
        try{
            setisShowLoader(true);
            let response = await expenseRecord.ExpenseModel.deleteExpense(deleteID);
            setisShowLoader(false);
            if(response.statusCode == 200){
                let UpdatedList = expense.filter((scheme,idx)=>scheme.id!=deleteID);
                setExpense(UpdatedList);
             }
        }catch (error) {
                console.log(error.response.body.message);
                setisShowLoader(false);
            }
    }    
    return (
        <>
        <div className="content">
      <Modal show={showDeleteModel} onHide={()=>setShowDeleteModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowDeleteModel(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>deleteScheme()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>        
        
        <Loader show={isShowLoader}/>
        {/* <Container fluid>
        <h2 className="text-info text-center">Expenses</h2> */}
            <Row className="mb-5 mt-3">
                <Col>
                <Link to="/addExpense">
                <Button variant="info" active>
                    Add Expense
                </Button>
                </Link>
                </Col>
            </Row>
            <Row>
            <Col>
            <Table className="shadow-lg p-3 mb-5 bg-white rounded" striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Expense Type</th>
                    <th>Amount</th>
                    <th>Date Expense</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {expense.map((data,id)=>(<tr>
                    <td>{data.id}</td>
                    <td>{data.expense_type}</td>
                    <td>{data.amount}</td>
                    <td>{data.date_of_expense?moment(data.date_of_expense).format("DD-MM-yyyy"):""}</td>
                    <td>{moment(data.created_at).format("DD-MM-yyyy hh:ss A") }</td>
                    <td>
                        
                    <Button variant="success" size={"sm"} onClick={()=>{history.push("/addExpense",data.id)}} >Edit</Button>
                    {' '}
                    <Button variant="danger" size={"sm"} onClick={()=>deleteHandle(data.id)} >Delete</Button>
                    </td>
                </tr>))}
            </tbody>
        </Table>
    </Col>
            </Row>
        {/* </Container> */}
        </div>
        </>
        );
}

export default Expense;