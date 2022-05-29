import React,{useState,useEffect} from 'react'
import { ListGroup, Container, Row, Col, Card, Button, CardColumns,Toast,Alert } from 'react-bootstrap';
 import CategoryManagement from '../Admin/CategoryManagement';
import Loader from '../layout/Loader';
import OrderHistory from '../Admin/orders/OrderHistory';
import AddCategory from '../Admin/AddCategory';
import ProductManagement from '../Admin/products/ProductManagement'
import AddProduct from '../Admin/products/AddProduct'
import EditProduct from '../Admin/products/EditProduct'
import FinanceRequests from '../Admin/finance/FinanceRequests';
import Form16Requests from '../Admin/finance/Form16Requests';

function Home(props) {
    const [isShowLoader, setisShowLoader] = useState(false)
    const [selectedTab, setselectedTab] = useState("categories")
    const showLoader =(value)=>{
        setisShowLoader(value);
    }
    const changeTab=(tab="")=>{
        setselectedTab(tab);
    }

    return (
        <>
        <Container fluid>
            <Row>
                <Col md={3} className="p-4">
                    <ListGroup >
                        <ListGroup.Item key={"categories"} active={selectedTab=="categories"?true:false} action  onClick={()=>changeTab("categories")}>Category Management</ListGroup.Item>
                        <ListGroup.Item key={"products"} active={selectedTab=="products"?true:false} action onClick={()=>changeTab("products")}>Product Management</ListGroup.Item>
                        <ListGroup.Item key={"orders"} active={selectedTab=="orders"?true:false} action onClick={()=>changeTab("orders")}>Order History</ListGroup.Item>
                        <ListGroup.Item key={"finance"}  active={selectedTab=="finance"?true:false} action onClick={()=>changeTab("finance")}>ITR Requests</ListGroup.Item>
                        <ListGroup.Item key={"form16"}  active={selectedTab=="form16"?true:false} action onClick={()=>changeTab("form16")}>Form16 Requests</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={9} className="p-4 production-col" >
                    <Loader show={isShowLoader}/>
                    
                    <CategoryManagement changeTab={changeTab} selectedTab={selectedTab} showLoader={showLoader}/>
                    <ProductManagement changeTab={changeTab} selectedTab={selectedTab} showLoader={showLoader}/>
                    <OrderHistory  selectedTab={selectedTab} showLoader={showLoader}/>
                    <AddCategory changeTab={changeTab} selectedTab={selectedTab} showLoader={showLoader}/>
                    <AddProduct changeTab={changeTab} selectedTab={selectedTab} showLoader={showLoader}/>
                    <EditProduct changeTab={changeTab} selectedTab={selectedTab} showLoader={showLoader}/>
                    <FinanceRequests changeTab={changeTab} selectedTab={selectedTab} showLoader={showLoader}/>
                    <Form16Requests changeTab={changeTab} selectedTab={selectedTab} showLoader={showLoader}/>

                </Col>
            </Row>
        </Container>
    </>
)
}

export default Home
