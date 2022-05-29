import {
    LOGOUT,
    REDIRECT
  } from '../constants/actionTypes';
  const defaultState = {
    appName: 'Conduit',
    token: null,
    viewChangeCounter: 0
  };
  
  export default (state = {}, action) => {
    //console.log(action);
      switch (action.type) {
        case REDIRECT:
            return { ...state, redirectTo: null };
        // case LOGOUT:
        //     return { redirectTo: '/login', token: null, currentUser: null };
        default:
          return state;
      }
      return state;
    };