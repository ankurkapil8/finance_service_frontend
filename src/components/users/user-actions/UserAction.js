import React,{useState} from 'react'
import { ListGroup, Container, Row, Col, Card, Button, CardColumns,Toast,Alert } from 'react-bootstrap';
// import CategoryManagement from '../Admin/CategoryManagement';
import Loader from '../../layout/Loader';
import UserOrderHistory from '../UserOrderHistory';
function UserAction(props) {

const [isShowLoader, setisShowLoader] = useState(false)
const showLoader =(value)=>{
    setisShowLoader(value);
}
return (
    <>
    <Container fluid>
        <Row>
            <Col md={3} className="p-4">
                <ListGroup>
                    {/* <ListGroup.Item  active action>Category Management</ListGroup.Item>
                    <ListGroup.Item  action>Product Management</ListGroup.Item> */}
                    <ListGroup.Item  action active>Order History</ListGroup.Item>
                    {/* <ListGroup.Item  action>Finance</ListGroup.Item> */}
                </ListGroup>
            </Col>
            <Col md={9} className="p-4 production-col" >
                <Loader show={isShowLoader}/>
                {/* <CategoryManagement showLoader={showLoader}/> */}
                <UserOrderHistory showLoader={showLoader}/>
            </Col>
        </Row>
    </Container>
</>
)

}
export default UserAction
