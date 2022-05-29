import React, { Component } from 'react'
import { ListGroup, Container, Row, Col, Card, Button, CardColumns,Toast,Alert } from 'react-bootstrap';
import agent from '../../agent'
import AddCartButton from './AddCartButton';
import Loader from '../layout/Loader';
export class CategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryList:[],
            itemList:[],
            showloader:false,
            selectedTab:""
        }
    }
    componentDidMount(){
     // this.getCategories();
     //this.getInitialData();
    }
    selectItem(ev){
        console.log(ev);
    }
     getInitialData=async ()=>{
        this.setState({
            showloader:true
        })

        const [categories, products] =await Promise.all(agent.Order.getCatgoryInitialData())
        if(categories.statusCode == 200){
            this.setState({
                categoryList:categories.body.record
            })
        }
        if(products.statusCode == 200){
            this.setState({
                itemList:products.body.record
            })
        }
        this.setState({
            showloader:false
        })


    }
    changeCategory= (catName="") => ev =>{
        this.setState({
            showloader:true
        })
        this.setState({
            selectedTab:catName
        })
        agent.Order.getProductsByCat(catName).then(products=>{
            this.setState({
                showloader:false
            })
    
            if(products.statusCode == 200){
                this.setState({
                    itemList:products.body.record
                })
            }
    
        })
    }
    render() {
        return (
            <>

                <Container fluid>
                    <Row>
                        <Col  md={3} className="p-4" >
                            <ListGroup defaultActiveKey="all">
                            <ListGroup.Item className="mobile-list" key={"all"} active={this.state.selectedTab==""?true:false}  onClick={this.changeCategory()}>All category</ListGroup.Item>
                                {this.state.categoryList.map(
                                    (item,index)=><ListGroup.Item className="mobile-list" key={index} active={this.state.selectedTab==item.name?true:false}  action onClick={this.changeCategory(item.name)}>{item.name}</ListGroup.Item>
                                    )}
                            </ListGroup>
                        </Col>
                        <Col md={9} className="p-4 production-col" >
                        <Loader show={this.state.showloader}/>
                            <CardColumns>
                            {this.state.itemList.map(
                                (item,index)=> 
                                <Card border="danger" key={index}>
                                    <Card.Img variant="top" src={item.imageUrl} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"><span>&#8377;</span>{item.price}</Card.Subtitle>
                                        <Card.Text>
                                        {item.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <AddCartButton  item={item}/>
                                    </Card.Footer>
                                </Card>
                                    )}

                            </CardColumns>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default CategoryList
