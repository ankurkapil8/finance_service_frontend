import React from 'react'
import { Alert, Button} from 'react-bootstrap';
import {useDispatch } from "react-redux";
import orderR from '../../reducers/order';
import {Link} from 'react-router-dom';

import {
    RESET_ORDER
} from '../../constants/actionTypes';

function OrderSuccess() {
    // const [show, setShow] = useState(true);
    const dispatch = useDispatch();
    dispatch({type:RESET_ORDER})
    return (
      <>
        <Alert show={true} className="login-div">
          <Alert.Heading>Success!</Alert.Heading>
          <p>
         Our representative will call you for order confirmation within 2 minutes. If you not get a call please dial <b>9990708074</b>.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
              <Link to="/">
              <Button variant="danger">
              Ok
            </Button>

              </Link>
          </div>
        </Alert>
      </>
    );
}

export default OrderSuccess
