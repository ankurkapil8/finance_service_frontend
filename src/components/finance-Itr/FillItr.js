import React,{useState} from 'react'
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import './Finance.css';
import agent from '../../agent'
// import {KEY_ID,KEY_SECRET} from '../../constants/paymantConstants'

function FillItr(props) {
    const [state, setstate] = useState({});
    const [loading, setloading] = useState(false);
    const [isphoneinvalid,setisphoneinvalid] = useState(false);
    const [isemailinvalid,setiisemailinvalid] = useState(false);
    const [isaadharinvalid,setiisaadharinvalid] = useState(false);
    const [form16, setform16] = useState([]);
    console.log(props);
    const handleChange = (e) => {
        state[e.target.name] = e.target.value;
        setstate(state);
    }

    const handlePay=()=>{
        setloading(true);
        if(checkValidate()){
            console.log("Valid Form");
            let orderForService = "Form16";
            if(props.location.query?.type == "fill"){
                orderForService = "ITR"
            }
            onlinePayment(orderForService);
        }else{
            console.log("invalid from")
            setloading(false);

        }
    } 

    const checkValidate=()=>{
        let returnType = true;
        setisphoneinvalid(false);
        setiisemailinvalid(false);            
        setiisaadharinvalid(false);

        if(state["phone"] ==undefined || state["phone"] ==""){
            setisphoneinvalid(true);
            returnType = false
        }
        if((state["email"] ==undefined || state["email"] =="") && props.location.query?.type == "fill" ){
            setiisemailinvalid(true);            
            returnType = false
        } 
        if((state["aadhar"] ==undefined || state["aadhar"] =="") && props.location.query?.type == "fill"){
            setiisaadharinvalid(true);
            returnType = false
        } 
        return returnType;
    } 

    const onlinePayment = (orderForService = "ITR")=>{
        let amount = 300;
        agent.Payment.getRazorpayOrderId({amount:amount,orderForService:orderForService}).then((res=>{
            if(res.statusCode == 200){
                console.log(res);
                var options = {
                    "key": "1234", // Enter the Key ID generated from the Dashboard
                    "amount": amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Guest",
                    "description": "ITR Fill Transaction",
                    "image": "https://example.com/your_logo",
                    "order_id": res.body.record.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": function (response){
                        updatePaymentState("success",response);
                    },                
                    "theme": {
                        "color": "#3399cc"
                    }
                };   
                // console.log(options); 
                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response){
                    updatePaymentState("failed",response);
    
                });            
                rzp1.open();
    
            }else{
                setloading(false);

                alert(res.body)

            }
        }));
    
    }
    const updatePaymentState=(status,obj)=>{
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
                if(res.statusCode ==200 && status == "success"){
                    if(props.location.query?.type == "fill"){
                        handleSubmit(paymentObj.razorpay_order_id);
                    }else{
                        onFileUpload(paymentObj.razorpay_order_id);
                    }
                }
                if(res.statusCode ==200 && status == "failed"){
                    setloading(false);
                    props.history.push('/orderFailed')
    
                }
    
            }),(err)=>{
                console.log(err.response.body.message);
            });
        }catch(err){
            alert(err);
        }
    }
    const handleSubmit = ( razorpay_order_id, paymentMode="online") =>{
        state["razorpay_order_id"] = razorpay_order_id;
        state["paymentMode"] = paymentMode;
        setstate(state);
        agent.Finance.fillItr(state).then((res=>{
            setloading(false);
            if(res.statusCode ==200){
                props.history.push('/orderSuccess');
            }
        }),(err)=>{
            console.log(err.response.body.message);
        });
    } 
    const handleFileUpload = (e)=>{
        setform16(e.target.files[0]);   
    }
    const onFileUpload=(razorpay_order_id)=>{
        const formData = new FormData(); 
        formData.append( 
          "myFile", 
          form16, 
          form16.name
        ); 
        formData.append("razorpay_order_id",razorpay_order_id);        
        formData.append("phone",state["phone"]);        
        agent.Finance.uploadForm16(formData).then((res=>{
            setloading(false);
            if(res.statusCode ==200){
                props.history.push('/orderSuccess');
            }
        }),(err)=>{
            console.log(err.response.body.message);
        });   

    }
    if(props.location.query?.type == "fill"){
        return (
            <>
            <h4 className="py-5 text-center"><b>Fill ITR</b></h4>
            <Form className="m-5">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label variant="primary">First name</Form.Label>
                        <Form.Control name="firstName" onChange={handleChange}  type="text"  />
                    </Form.Group>
    
                    <Form.Group as={Col} controlId="formGridlastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control name="lastName" onChange={handleChange} type="text"  />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label variant="primary">Phone*</Form.Label>
                        <Form.Control name="phone" onChange={handleChange}  type="text"  isInvalid={isphoneinvalid}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a phone number.
                        </Form.Control.Feedback>                    
                    </Form.Group>
                </Form.Row>
    
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridBusiness">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control name="business" onChange={handleChange} type="text" placeholder="ABC limited" />
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group  as={Col} controlId="formGridEmail">
                        <Form.Label>Email*</Form.Label>
                        <Form.Control name="email" onChange={handleChange} type="email" placeholder="you@example.com" isInvalid={isemailinvalid}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a Email.
                        </Form.Control.Feedback>                    
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridAadhar">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" onChange={handleChange} as="textarea" rows={3} />
                    </Form.Group>
                    </Form.Row><Form.Row>
                    <Form.Group as={Col} controlId="formGridAadhar">
                        <Form.Label>Aadhar Number*</Form.Label>
                        <Form.Control name="aadhar" onChange={handleChange} type="text" isInvalid={isaadharinvalid}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide aadhar number.
                        </Form.Control.Feedback>                    
    
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Service</Form.Label>
                        <Form.Control name="service" onChange={handleChange} as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Balance Sheet</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAddress">
                        <Form.Label>PAN Number</Form.Label>
                        <Form.Control name="pan" onChange={handleChange} type="text" />
                    </Form.Group>
    
    
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" onChange={handleChange} name="zip"/>
                    </Form.Group>
                </Form.Row>
                <Button variant="danger" className="center" type="button" onClick={handlePay} disabled={loading}>
                    {loading ? 'Loading…' : "Pay Now"}
                </Button>
            </Form>
            </>
            )
    
    }else{
        return (  <div className="login-div">
                <Form className="login-form">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label variant="primary">Phone*</Form.Label>
                        <Form.Control name="phone" onChange={handleChange}  type="text"  isInvalid={isphoneinvalid}/>
                        <Form.Text className="text-muted">
                            We will contact you at this phone number.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Please provide a phone number.
                        </Form.Control.Feedback>                    
                    </Form.Group>
                </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.File id="formcheck-api-regular">
                        <Form.Label variant="primary">Form16*</Form.Label>
                            <Form.File.Input accept=".pdf" onChange={handleFileUpload}/>
                        </Form.File>
                        <Form.Text className="text-muted">
                            Only PDF file.
                        </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button variant="danger"  type="button" onClick={handlePay} disabled={loading}>{loading ? 'Loading…' : "Pay Now"}
                    </Button>
                    </Form.Row>
                </Form>
                </div>
    )
    }       
}

export default FillItr
