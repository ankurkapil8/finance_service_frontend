import React, { useEffect, useState } from 'react';
import { Table,Button, Container, Row, Col,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import user from '../../models/user';
import Loader from '../layout/Loader';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE } from '../../constants/actionTypes';

function ListUser(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [isShowLoader, setisShowLoader] = useState(false)
    const [users,setUsers]=useState([]);
    const [deleteID, setDeleteID] = useState(0);

    useEffect(() => {
        dispatch({ type: CHANGE_PAGE, page: "Application Users" });
        getUsers();
    },[])

    const getUsers = () =>{
        setisShowLoader(true);
        user.Auth.listUser().then(res=>{
            setisShowLoader(false);
            if(res.statusCode == 200){
                setUsers(res.body.message);
            }else{
                setUsers([]);
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
            let response = await user.Auth.deleteUser(deleteID);
            setisShowLoader(false);
            if(response.statusCode == 200){
                let UpdatedList = users.filter((scheme,idx)=>scheme.id!=deleteID);
                setUsers(UpdatedList);
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
                <Link to="/addUser">
                <Button variant="info" active>
                    Add New User
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
                    <th>Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {users.map((data,id)=>(<tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.username}</td>
                    <td>{data.password}</td>
                    <td>{data.role}</td>
                    <td>{data.phone}</td>
                    <td>
                        
                     <Button variant="success" size={"sm"} onClick={()=>{history.push("/addUser",data.id)}} >Edit</Button>
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

export default ListUser;