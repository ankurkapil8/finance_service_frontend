import React ,{Component}from 'react'
import { Badge } from 'react-bootstrap';
import {connect} from 'react-redux';
import {
    ADD_ITEM_INITIAL,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY
} from '../../constants/actionTypes';
 
class AddCartButton extends Component {
    constructor(props){
        super(props)
        console.log(props);
        this.initialAddItem = (item) => ev => {
            ev.preventDefault();
            this.props.addItemInitial(item);
        };
        this.increaseQuantity = (productId) =>ev =>{
            ev.preventDefault();
            this.props.increaseQuantity(productId);
        }
        this.decreaseQuantity = (productId) =>ev =>{
            ev.preventDefault();
            this.props.decreaseQuantity(productId);
        }
    }
    componentWillReceiveProps(nextprops){
    }
    render(){
    let arr = []
     arr= this.props.addedItem.filter(record=>record.productId==this.props.item._id);
    let length = arr.length;
    console.log(length);
    console.log(this.props.addedItem);
    if(!length){
        return (
            <Badge variant="danger" className="pointer" onClick={this.initialAddItem(this.props.item)}>ADD+</Badge> 
        )
    }else{
        return (
            <>
                <Badge className="pointer" variant="primary" onClick={this.decreaseQuantity(arr[0].productId)}>-</Badge> 
                <Badge variant="danger">{arr[0].quantity}</Badge> 
                <Badge className="pointer" variant="primary" onClick={this.increaseQuantity(arr[0].productId)}>+</Badge> 
            </>
        )}
    }
}

const mapStateToProps = state => ({ ...state.order });
const mapDispatchToProps = dispatch => ({
    addItemInitial: item =>
        dispatch({ type: ADD_ITEM_INITIAL, item }),
    increaseQuantity: productId =>
        dispatch({ type: INCREASE_QUANTITY, productId }),
    decreaseQuantity: productId =>
        dispatch({ type: DECREASE_QUANTITY, productId }),
});

export default connect(mapStateToProps,mapDispatchToProps)(AddCartButton)
