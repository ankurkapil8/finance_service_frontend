import React, {Component} from 'react'
import { Table } from 'react-bootstrap';
import {connect} from 'react-redux';
import AddCartButton from './AddCartButton'
class MyCart extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const priceTotal = this.props.addedItem.reduce(
            (prevValue, currentValue) => prevValue + (currentValue.quantity * parseInt(currentValue.perItemPrice)),
            0
          );
        
        return (
            <Table responsive striped bordered className="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.addedItem.map(record=>
                    <tr>
                        <td>{record.item.title}</td>
                        <td><AddCartButton  item={record.item}/></td>
                        <td><span>&#8377;</span>{parseInt(record.perItemPrice)*record.quantity}</td>
                    </tr>
                    
                    )}
                </tbody>
                <tfoot>
                    {/* <tr>
                        <td colSpan="2">
                            Prime member discount
                        </td>
                        <td>
                            10%
                        </td>
    
                    </tr> */}
                    <tr>
                        <td colSpan="2">
                            <h5>Total</h5>
                        </td>
                        <td>
                        <span>&#8377;</span> {priceTotal}
                        </td>
    
                    </tr>
                </tfoot>
            </Table>)
    
    }
}

const mapStateToProps = state => ({ ...state.order });
const mapDispatchToProps = dispatch => ({
    // addItemInitial: item =>
    //     dispatch({ type: ADD_ITEM_INITIAL, item }),
    // increaseQuantity: productId =>
    //     dispatch({ type: INCREASE_QUANTITY, productId }),
    // decreaseQuantity: productId =>
    //     dispatch({ type: DECREASE_QUANTITY, productId }),
});
export default connect(mapStateToProps,mapDispatchToProps)(MyCart)
