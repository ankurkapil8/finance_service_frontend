import React from 'react'
import { Alert, Button} from 'react-bootstrap';
import {useDispatch } from "react-redux";
import orderR from '../../reducers/order';
import {Link} from 'react-router-dom';

function OrderFailed() {
    // const [show, setShow] = useState(true);
    return (
      <>
        <Alert show={true} className="login-div">
          <Alert.Heading>Filed!</Alert.Heading>
          <p>
Something went wrong to place order. Please try again.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
              <Link to="/placeOrder">
              <Button variant="danger">
              Ok
            </Button>

              </Link>
          </div>
        </Alert>
      </>
    );
}

export default OrderFailed
