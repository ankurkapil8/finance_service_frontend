import {
    LOGOUT,
    REDIRECT,
    CHANGE_PAGE
  } from '../constants/actionTypes';
  const defaultState = {
    appName: 'Conduit',
    token: null,
    viewChangeCounter: 0
  };
  
  export default (state = {page:""}, action) => {
    //console.log(action);
      switch (action.type) {
        case REDIRECT:
            return { ...state, redirectTo: null };
        case CHANGE_PAGE:
            return {  ...state, page: action.page };
        default:
          return state;
      }
      return state;
    };