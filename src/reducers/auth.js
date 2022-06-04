import {
    LOGIN,
    REGISTER,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    ASYNC_START,
    UPDATE_FIELD_AUTH,
    LOGOUT
  } from '../constants/actionTypes';
  
  export default (state = {}, action) => {
  //console.log(action);
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          inProgress: false,
          errors: action.payload.message,
          role:action.payload.record?.role,
          id:action.payload.record?.id,
          statusCode:action.payload.jwtToken != ""?"200":"",
          isLoginSuccess:action.payload.jwtToken != ""? true:false
        }
      case REGISTER:
        return {
          ...state,
          inProgress: false,
          errors: action.payload,
          statusCode:action.payload.statusCode
        };
      case LOGIN_PAGE_UNLOADED:
      return{
        ...state,
        //errors: action.payload,
        //userDetails:
      }
      case REGISTER_PAGE_UNLOADED:
        return {};
      case ASYNC_START:
        if (action.subtype === LOGIN || action.subtype === REGISTER) {
          return { ...state, inProgress: true };
        }
        break;
      case UPDATE_FIELD_AUTH:
        return { ...state, [action.key]: action.value };
      default:
        return state;
    }
    return state;
  };