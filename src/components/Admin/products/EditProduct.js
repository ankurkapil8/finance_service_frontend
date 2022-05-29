import React, { useState, useEffect } from 'react'
import { Button, Form, Col } from 'react-bootstrap';
import agent from '../../../agent';
import { useSelector,useDispatch } from "react-redux";
import {
    UPDATE_PRODUCT_FIELD
} from '../../../constants/actionTypes';

function EditProduct(props) {
    const storeProduct = useSelector(state => state.product);

    const [category, setcategory] = useState([])
    const [state, setState] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.selectedTab == "editProduct") {
            getCategories()
        }
    }, [props.selectedTab])

    const getCategories = () => {
        props.showLoader(true);
        agent.Order.getCategoryAdmin().then((res => {
            props.showLoader(false);

            if (res.statusCode == 200) {
                setcategory(res.body.record)
            } else {
                setcategory([])
            }
        }));
    }

    const handleChange = (e) => {
        let data = {key:e.target.name,value:e.target.value}
        dispatch({type:UPDATE_PRODUCT_FIELD,data});
    }

    const handleSubmit = (ev) => {
        console.log(storeProduct);
        props.showLoader(false);
        agent.Order.editProducts(storeProduct.product).then((res => {
            props.showLoader(false);
            if (res.statusCode == 200) {
                props.changeTab("products");
            } else {
            }
        }));
        ev.preventDefault();
    }

    if (props.selectedTab == "editProduct") {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Control as="select" value={storeProduct.product?.category} name="category" onChange={handleChange} required>
                            <option key={""}>Select Category</option>
                            {category.map(item => <option key={item.name}>{item.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={storeProduct.product?.title} name="title" onChange={handleChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={storeProduct.product?.description} rows={3} name="description" onChange={handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={storeProduct.product?.price} name="price" onChange={handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="exampleForm.ControlInput5">
                        <Form.Label>ImageURL</Form.Label>
                        <Form.Control type="text" value={storeProduct.product?.imageUrl} name="imageUrl" onChange={handleChange} />
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Save
            </Button>
            </Form>
        )

    } else {
        return ""
    }
}

export default EditProduct
