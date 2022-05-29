import React,{useState} from 'react'
import { Alert, Button, Row, Col, Container,Modal } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Route,NavLink, Redirect, Link } from 'react-router-dom'
import {
  RESET_ORDER
} from '../../constants/actionTypes';

function TotalAmount(props) {
  const counter = useSelector(state => state.order);
  const authState = useSelector(state => state.auth);
  const [show, setShow] = useState(false);

const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  var priceTotal = counter.addedItem.reduce(
    (prevValue, currentValue) => prevValue + (currentValue.quantity * parseInt(currentValue.perItemPrice)),
    0
  );
  const quantityTotal = counter.addedItem.reduce(
    (prevValue, currentValue) => prevValue + currentValue.quantity,
    0
  );
  if(authState?.errors?.body?.record?.isPrimeMember){
    priceTotal -= ((priceTotal*10)/100)
}
const handleClose = (action) => {
  if(action=="yes"){
    dispatch({type:RESET_ORDER})
  }
  setShow(false)
};

  if (quantityTotal > 0) {
    return (
      <>
      <div className="order-popup pb-1">
        <div className="text-right py-1">
          <svg onClick={handleShow} width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
        <Row>
          <Col sm={8} className="pl-5"><Link to="/myCart" className="underline"><h4>Your Order ({quantityTotal})</h4></Link></Col>
          <Col sm={4} className="d-flex justify-content-end"> 
          <NavLink to="/placeOrder">
            <Button variant="danger">
            Continue
            </Button>
          </NavLink>
          </Col>
        </Row>
        <Row>
          <Col className="pl-5">
            <h4><span>&#8377;</span>{priceTotal}</h4>
          </Col>
        </Row>
      </div>
      <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to remove the items from cart?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>handleClose("yes")}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={()=>handleClose("no")}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal> 

      </>
    )
  
}else {
  return null;
}

}
export default TotalAmount
