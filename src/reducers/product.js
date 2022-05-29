import {
    STORE_EDIT_PRODUCT,
    GET_EDIT_PRODUCT,
    UPDATE_PRODUCT_FIELD
  } from '../constants/actionTypes';
  const defaultState = {
    product: {},
  };
  
  export default (state = defaultState, action) => {
      switch (action.type) {
        case STORE_EDIT_PRODUCT:
            return {...state,
                product:action.data 
            };
        case GET_EDIT_PRODUCT:
            return {...state};
        case UPDATE_PRODUCT_FIELD:
            let prod = state.product;
            prod[action.data.key]=action.data.value;
           return {...state,product:prod}
        default:
          return state;
      }
      return state;
    };