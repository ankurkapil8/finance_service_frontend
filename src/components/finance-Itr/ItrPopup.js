import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

//import "bootstrap/dist/css/bootstrap.css";

function ItrPopup(props) {
    return (
    <Modal show={props.isopen} onHide={props.hide} centered className="text-center">
            <Modal.Header closeButton>
                <Modal.Title>Tax Return</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Link to={{ pathname: `/fillItr`, query:{type: 'fill'}}}  className="btn btn-danger btn-sm">Start Your Tax Return</Link>
                <Link to={{ pathname: `/fillItr`, query:{type: 'uploadForm16'}}} className="btn btn-danger btn-sm">Upload Form-16 Now</Link>
            </Modal.Body>
        </Modal>
        )
}

export default ItrPopup
