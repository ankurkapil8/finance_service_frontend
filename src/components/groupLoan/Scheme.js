import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import { useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../constants/actionTypes'
function Scheme(props) {
    const dispatch = useDispatch();
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [isShowLoader, setisShowLoader] = useState(false)
    const [schemes, setSchemes] = useState([]);
    const [deleteID, setDeleteID] = useState(0)
    useEffect(() => {
        getSchemes();
        dispatch({ type: CHANGE_PAGE, page: "All Schemes" });
    }, [])

    const getSchemes = () => {
        setisShowLoader(true);
        groupLoan.SchemeModel.getScheme().then(res => {
            setisShowLoader(false);
            if (res.statusCode == 200) {
                setSchemes(res.body.message);
            } else {
                setSchemes([]);
            }
        })
    }
    const deleteHandle = (id) => {
        setDeleteID(id);
        setShowDeleteModel(true);
    }

    const deleteScheme = async () => {
        setShowDeleteModel(false);
        try {
            setisShowLoader(true);
            let response = await groupLoan.SchemeModel.deleteScheme(deleteID);
            setisShowLoader(false);
            if (response.statusCode == 200) {
                let UpdatedList = schemes.filter((scheme, idx) => scheme.id != deleteID);
                setSchemes(UpdatedList);
            }
        } catch (error) {
            console.log(error.response.body.message);
            setisShowLoader(false);
        }
    }
    return (
        <>
            <div className="content">
                <Modal show={showDeleteModel} onHide={() => setShowDeleteModel(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Scheme</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModel(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => deleteScheme()}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Loader show={isShowLoader} />
                <Row className="mb-5 mt-3">
                    <Col>
                        <Link to="/addScheme">
                            <Button variant="info" size="md" active>
                                Add Scheme
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table className="shadow-lg p-3 mb-5 bg-white rounded" striped bordered hover responsive>
                            <thead className="bg-primary">
                                <tr>
                                    <th>Scheme code</th>
                                    <th>Scheme name</th>
                                    <th>Max amount</th>
                                    <th>Interest rate (%)</th>
                                    <th>EMI type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schemes.map((scheme, id) => (<tr key={scheme.id}>
                                    <td>{scheme.scheme_code}</td>
                                    <td>{scheme.scheme_name}</td>
                                    <td>{scheme.max_amount}</td>
                                    <td>{scheme.interest_rate}%</td>
                                    <td>{scheme.EMI_type}</td>
                                    <td>
                                        <Button variant="danger" size={"sm"} onClick={() => deleteHandle(scheme.id)} className="ml-2">Delete</Button>

                                    </td>
                                </tr>))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    );
}


export default Scheme;