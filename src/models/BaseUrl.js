import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import axios from "./interceptor-middleware";
export const superagent = superagentPromise(_superagent, global.Promise);
export const API_ROOT = window.location.hostname=="localhost"?"http://localhost:3001/api": '/api';


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
      axios.delete(`${API_ROOT}${url}`).then(responseBody,errorBody),
    get: url =>
      axios.get(`${API_ROOT}${url}`).then(responseBody,errorBody),
    // put: (url, body) =>
    //   superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
      axios.post(`${API_ROOT}${url}`, body).then(responseBody,errorBody)
  };