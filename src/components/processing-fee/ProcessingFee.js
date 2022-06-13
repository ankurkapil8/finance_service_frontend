import React, { useEffect, useState } from 'react';
import { Table,Button, Container, Row, Col,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import processingFee from '../../models/processingFee';
import Loader from '../layout/Loader';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../constants/actionTypes';
function ProcessingFee(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [isShowLoader, setisShowLoader] = useState(false)
    const [processingFees,setProcessingFees]=useState([]);
    const [deleteID, setDeleteID] = useState(0);

    useEffect(() => {
        dispatch({ type: CHANGE_PAGE, page: "Raised Fund" });
        getProcessingFees();
    },[])

    const getProcessingFees = () =>{
        setisShowLoader(true);
        processingFee.ProcessingFeeModel.getProcessingFee('all').then(res=>{
            setisShowLoader(false);
            if(res.statusCode == 200){
                setProcessingFees(res.body.message);
            }else{
                setProcessingFees([]);
            }
        })
    }
    const  deleteHandle=(id)=>{
        setDeleteID(id); 
        setShowDeleteModel(true);
    }

    const deleteProcessingFee=async()=>{
        setShowDeleteModel(false);
        try{
            setisShowLoader(true);
            let response = await processingFee.ProcessingFeeModel.deleteProcessingFee(deleteID);
            setisShowLoader(false);
            if(response.statusCode == 200){
                let UpdatedList = processingFees.filter((scheme,idx)=>scheme.id!=deleteID);
                setProcessingFees(UpdatedList);
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
          <Modal.Title>Delete Processing Fee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowDeleteModel(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>deleteProcessingFee()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>        
        
        <Loader show={isShowLoader}/>
        {/* <Container fluid> */}
        {/* <h2 className="text-info text-center">Processing Fee</h2> */}
            <Row className="mb-5 mt-3">
                <Col>
                <Link to="/addProcessingFee">
                <Button variant="info"  active>
                    Add Fund
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
                    <th>Particular</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {processingFees.map((data,id)=>(<tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.particular}</td>
                    <td>{data.amount}</td>
                    <td>{data.date_of_processing?moment(data.date_of_processing).format("DD-MM-yyyy"):""}</td>
                    <td>{moment(data.created_at).format("DD-MM-yyyy hh:ss A") }</td>
                    <td>
                        
                    <Button variant="success" size={"sm"} onClick={()=>{history.push("/addProcessingFee",data.id)}} >Edit</Button>
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

export default ProcessingFee;