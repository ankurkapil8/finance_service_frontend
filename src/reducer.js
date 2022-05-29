import auth from './reducers/auth';
import common from './reducers/common';
import order from './reducers/order';
import product from './reducers/product';
import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';

const appReducer = combineReducers({
  auth,
  common,
  order,
  product
  /* your app’s top-level reducers */
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
export default rootReducer
// export default combineReducers({
//   auth,
//   common,
//   order,
//     //router: routerReducer
//   });