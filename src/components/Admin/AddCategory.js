import React,{useState} from 'react'
import { Button,Form, Col} from 'react-bootstrap';
import agent from '../../agent'

function AddCategory(props) {
    const [state, setstate] = useState("")
    const handleSubmit=(ev) =>{
        props.showLoader(false);
        agent.Order.addCategory({name:state}).then((res=>{
            props.showLoader(false);

            if(res.statusCode == 200){
                console.log(props);
                props.changeTab("categories");
            }else{
                //setstate([]);
            }
        }));
        ev.preventDefault();
    }
    const handleChange = (e) => {
        setstate(e.target.value);
    }    
    if (props.selectedTab == "addCategory") {

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                <Form.Group as={Col} md="4" controlId="formBasicEmail">
                    <Form.Label>Category Name:</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={handleChange}/>
                </Form.Group>

                </Form.Row>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
            )

    } else {
        return "";
    }
}

export default AddCategory
