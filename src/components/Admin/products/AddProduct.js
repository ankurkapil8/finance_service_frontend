import React,{useState,useEffect} from 'react'
import {Button, Form, Col } from 'react-bootstrap';
import agent from '../../../agent';

function AddProduct(props) {
    const [category, setcategory] = useState([])
    const [state, setState] = useState({})

    useEffect(() => {
        if(props.selectedTab=="addProduct"){
            getCategories()
        }
    },[props.selectedTab])
    const getCategories =()=>{
        props.showLoader(true);
        agent.Order.getCategoryAdmin().then((res=>{
            props.showLoader(false);

            if(res.statusCode == 200){
                //setstate(res.body.record);
                setcategory(res.body.record)
            }else{
                //setstate([]);
                setcategory([])
            }
        }));
    }
    const handleChange = (e) => {

        //const state = this.state.userDetails
        state[e.target.name] = e.target.value;
        setState(state);
        console.log(state);
        
    }

    const handleSubmit=(ev) =>{
        props.showLoader(false);
        console.log(state);
        agent.Order.addProducts(state).then((res=>{
            props.showLoader(false);

            if(res.statusCode == 200){
                //console.log(props);
                props.changeTab("products");
            }else{
                //setstate([]);
            }
        }));
        ev.preventDefault();
    }

    if (props.selectedTab == "addProduct") {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Category</Form.Label>
                <Form.Control as="select" name="category" onChange={handleChange} required>
                <option key={""}>Select Category</option>
                    {category.map(item=><option key={item.name}>{item.name}</option>)}
                </Form.Control>
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text"  name="title" onChange={handleChange} required/>
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" onChange={handleChange}/>
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" onChange={handleChange}/>
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>ImageURL</Form.Label>
                <Form.Control type="text"  name="imageURL" onChange={handleChange}/>
            </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
                Save
            </Button>    
            </Form>   
         )
        
    }else{
        return "";
    }
}

export default AddProduct
