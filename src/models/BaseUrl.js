import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

export const superagent = superagentPromise(_superagent, global.Promise);
export const API_ROOT = window.location.hostname=="localhost"?"https://dev-microfinance.herokuapp.com/api": '/api';


const encode = encodeURIComponent;
const responseBody = res => res;
const errorBody = err =>{
  return err.response
} ;
let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('Token', token);
  }
}
export const requests = {
    del: url =>
      superagent.del(`${API_ROOT}${url}`).then(responseBody,errorBody),
    get: url =>
      superagent.get(`${API_ROOT}${url}`).then(responseBody,errorBody),
    // put: (url, body) =>
    //   superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
      superagent.post(`${API_ROOT}${url}`, body).then(responseBody,errorBody)
  };