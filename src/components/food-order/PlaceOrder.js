import React,{useState} from 'react'
import { Table, Container, Row, Col,Form, Button, Modal} from 'react-bootstrap';
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import agent from '../../agent'
// import {KEY_ID,KEY_SECRET} from '../../constants/paymantConstants'
//import Razorpay from 'razorpay';
function PlaceOrder(props) {
    const order = useSelector(state => state.order);
    const authState = useSelector(state => state.auth);
    const [shipingDetails, setShipingDetails] = useState([]);
    const [showPayementModel, setshowPayementModel] = useState(false);
    const [isphoneinvalid,setisphoneinvalid] = useState(false);
    const [isnameinvalid,setisnameinvalid] = useState(false);
    const [isaddressinvalid,setisaddressinvalid] = useState(false);

    let totalQuantity = 0;
    let totalPrice = 0;

    const products = order.addedItem.map(record=>                        
    <tr>
        <td>
        {record.quantity} x {record.item.title}
        </td>
        <td>
        <span>&#8377;</span> {record.quantity*parseInt(record. perItemPrice)}
        </td>
    </tr>
);
const handleSubmit=(paymentMode="COD", razorpay_order_id="")=>{
    let shippingObj = {
        name:shipingDetails["name"],
        address:shipingDetails["address"],
        phone:shipingDetails["phone"],
        city:"barh",
        street:shipingDetails["street"],
        landmark:shipingDetails["landmark"]
    } 
    let data = {
        items:order.addedItem, 
        shipping:shippingObj,
        paymentMode:paymentMode,
        razorpay_order_id:razorpay_order_id
    };
    agent.Order.placeOrder(data).then((res=>{
        if(res.statusCode == 200){
            props.history.push('/orderSuccess')
        }
    }),(err)=>{
        alert(err.response.body.message);
    });

}
const selectPaymentMode = ()=>{
    if(checkValidate()){
        setshowPayementModel(showPayementModel?false:true);
    }
}
const handleChange = (e) => {
    shipingDetails[e.target.name] = e.target.value;
    setShipingDetails(shipingDetails);
}

order.addedItem.forEach(element => {
    totalQuantity += element.quantity;
    totalPrice += parseInt(element.quantity)*element.perItemPrice;
});
if(authState?.errors?.body.record.isPrimeMember){
    totalPrice -= ((totalPrice*10)/100)
}
const onlinePayment = ()=>{
    agent.Payment.getRazorpayOrderId({amount:totalPrice,orderForService:"Food Order"}).then((res=>{
        if(res.statusCode == 200){
            console.log(res);
            var options = {
                "key": "123", // Enter the Key ID generated from the Dashboard
                "amount": res.body.record.amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Guest",
                "description": "Food Order Transaction",
                "image": "https://example.com/your_logo",
                "order_id": res.body.record.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    updatePaymentState("success",response);
                },                
                "theme": {
                    "color": "#3399cc"
                }
            };   
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response){
                updatePaymentState("failed",response);

            });            
            rzp1.open();

        }else{
            alert(res.body)
        }
    }));

}
const updatePaymentState=(status,obj)=>{
    console.log("status",status);
    console.log("returnobj",obj);
    let orderId = "";
    let paymentObj = {
        razorpay_order_id:"",
        paymentStatus:"",
        paymentResponse:""
    }
    if(status == "success"){
        paymentObj.razorpay_order_id = obj.razorpay_order_id;
        paymentObj.paymentStatus = status;
        paymentObj.paymentResponse = obj;
    }
    if(status == "failed"){
        paymentObj.razorpay_order_id = obj.error.metadata.order_id;
        paymentObj.paymentStatus = status;
        paymentObj.paymentResponse = obj;
    }
    try{
        agent.Payment.updatePaymentStatus(paymentObj).then((res=>{
            console.log(res.body.record)
            if(res.statusCode ==200 && status == "success"){
                handleSubmit("online",paymentObj.razorpay_order_id);
            }
            if(res.statusCode ==200 && status == "failed"){
                props.history.push('/orderFailed')

            }

        }),(err)=>{
            console.log(err.response.body.message);
        });
    }catch(err){
        alert(err);
    }
}
const checkValidate=()=>{
    let returnType = true;
    setisnameinvalid(false);
    setisaddressinvalid(false);
    setisphoneinvalid(false);

    if((shipingDetails["name"] ==undefined || shipingDetails["name"] =="")){
        setisnameinvalid(true);            
        returnType = false
    } 

    if(shipingDetails["phone"] ==undefined || shipingDetails["phone"] ==""){
        setisphoneinvalid(true);
        returnType = false
    }
    if((shipingDetails["address"] ==undefined || shipingDetails["address"] =="") ){
        setisaddressinvalid(true);            
        returnType = false
    } 
    return returnType;
} 

const token = agent.getToken();
    return (
        <>
        <Container fluid>
            <Row className="p-3 order-summary">
                <Col md={6} >
                    <h4>Shipping Details</h4>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name"  onChange={handleChange} isInvalid={isnameinvalid}/>
                            <Form.Control.Feedback type="invalid">
                            Please provide your name.
                            </Form.Control.Feedback>                    

                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="textarea" name="address" placeholder="Line 1" onChange={handleChange} isInvalid={isaddressinvalid}/>
                            <Form.Control.Feedback type="invalid">
                            Please provide your address.
                            </Form.Control.Feedback>                    
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Street/Mohalla</Form.Label>
                            <Form.Control type="textarea" name="street" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control type="textarea" name="landmark" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Mobile no.</Form.Label>
                            <Form.Control type="text" name="phone"  onChange={handleChange} isInvalid={isphoneinvalid}/>
                            <Form.Control.Feedback type="invalid">
                            Please provide your phone no..
                            </Form.Control.Feedback>                    
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text"  name="city" onChange={handleChange} value="barh" readOnly/>
                        </Form.Group>
                        <Form.Group>
                        <Button variant="danger" type="button"  onClick={(ev)=>selectPaymentMode()}>
                            Place Order
                        </Button>
                            {/* {token==null?<Form.Label>Please <Link to="/login" className="underline">login</Link> for place order </Form.Label>:""} */}
                            
                        </Form.Group>
                    </Form>               
                     </Col>
                <Col md={6} >
                    <p>Order Summary</p>
                    <h5>You have {totalQuantity} items in your food cart</h5>
                    <Table borderless>
                        <tbody className="order-summary-border">
                            {products}
                        </tbody>
                        <tfoot >
                            {authState?.errors?.body.record.isPrimeMember?                            <tr>
                                <td>
                                    <b>Prime member discount</b>
                                </td>
                                <td>
                                    10%
                                </td>
                            </tr>:""}
                            <tr>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td>
                                <span>&#8377;</span> {totalPrice}
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </Col>
            </Row>
        </Container>
        <Modal show={showPayementModel} onHide={selectPaymentMode} centered>
            <Modal.Header closeButton>
                <Modal.Title>Payment Mode</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Button variant="success" onClick={()=>handleSubmit()}>Cash on Delivery</Button>
            <Button variant="primary"onClick={onlinePayment}>Pay Now</Button>

            </Modal.Body>
        </Modal>

        </>
    )
}

export default PlaceOrder
