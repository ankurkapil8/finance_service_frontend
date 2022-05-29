import {
    ADD_ITEM_INITIAL,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    RESET_ORDER
  } from '../constants/actionTypes';
  const defaultState = {
    addedItem: [],
  };
  
  export default (state = defaultState, action) => {
      switch (action.type) {
        case ADD_ITEM_INITIAL:
            const addedItem =[...state.addedItem,{
                productId:action.item._id,
                quantity:1,
                perItemPrice:action.item.price,
                item:action.item
            }]
            return {...state, addedItem};
        case INCREASE_QUANTITY:
             state.addedItem.map(record=>{
                if(record.productId == action.productId){
                    record.quantity +=1
                }
                return record;
            });
            return {...state,state}
        case DECREASE_QUANTITY:
            state.addedItem.map(record=>{
                if(record.productId == action.productId && record.quantity !=0){
                        record.quantity -=1
                }
                return record;
            });
            return {...state,state}
        case RESET_ORDER:
            state.addedItem = []
            return {...state}
        default:
          return state;
      }
      return state;
    };