import React, { useState } from 'react'
import { Button, Form, Col, Row, Container, Modal,Alert } from 'react-bootstrap';
import agent from '../../agent'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InqueryForm(props) {
    const [state, setState] = useState(
        {fullName:"",
            email:"",
            business:"",
            dob:new Date(),
            gender:"",
            service:"",
            Phone:""
        });
    const [dobstate, setdobstate] = useState(new Date());
    const [message, setmessage] = useState({type:"",message:""})
    const [loading, setloading] = useState(false)

    const handleChange = (e)=>{
        state[e.target.name] = e.target.value;
        setState(state);
        console.log(state);
    }
    const handleSubmit = (ev)=>{
        ev.preventDefault();

        state["dob"] = dobstate;
        state["service"] = props.serviceType;
        setState(state);
        console.log(state);
        setloading(true);
        agent.Inquery.submitInquery(state).then((res=>{
            if(res.statusCode == 200){
                ev.target.reset();
                message.type = "success";
                message.message = "Your Details has been submited. Our agent will contact you soon."
            }else{
                message.type = "error";
                message.message = "Something went wrong. Please try again."
            }
            setmessage(message);
            setloading(false);

        }))
    }
    return (
        <>

        <Modal show={props.isopen} onHide={props.hide} >

            <Modal.Header closeButton>
                <Modal.Title>Enquiry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {  message.type != ""? 
                message.type =="success"?
                <Alert key={message.type} variant={"success"} onClose={() => setmessage({type:"",message:""})} dismissible>
                    {message.message}
                </Alert>:<Alert key={message.type} variant={"danger"} onClose={() => setmessage({type:"",message:""})} dismissible>
                    {message.message}
                </Alert>:""        
                }

                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name="fullName"/>
                        </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={handleChange} name="email" placeholder="Enter email" />
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>Business</Form.Label>
                        <Form.Control type="text" onChange={handleChange}  name="business"/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>Date of Birth</Form.Label>
                        <DatePicker
                         selected={dobstate} 
                         onChange={date=>setdobstate(date)}
                         dateFormat="dd/MM/yyyy"
                         showYearDropdown
                         dateFormatCalendar="MMMM"
                         yearDropdownItemNumber={50}
                         scrollableYearDropdown
                         maxDate={new Date()}
                         />
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control name="gender" as="select" onChange={handleChange} defaultValue="Choose...">
                        <option>Choose...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Control>
                    </Form.Group>                        
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Service</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="service" value={props.serviceType} readOnly/>
                    </Form.Group>                        
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" onChange={handleChange}  name="phone"/>
                    </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Loading…' : "Submit"}

                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default InqueryForm
