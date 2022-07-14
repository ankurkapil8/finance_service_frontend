import {API_ROOT } from "./BaseUrl"
import axios from "./interceptor-middleware";

const Auth = {
    login(username, password){
      return axios.post(`${API_ROOT}/user/login`,  { username, password } )
    },
    createUser(payload){
      return axios.post(`${API_ROOT}/user/registration`, payload )
    },
    listUser(){
      return axios.get(`${API_ROOT}/user/userList/all`)
    },
    editUser(payload){
      return axios.put(`${API_ROOT}/user/updateUser`, payload )
    },
    getUserById(id){
      return axios.get(`${API_ROOT}/user/userList/`+id)
    },
    deleteUser(id){
      return axios.delete(`${API_ROOT}/user/deleteUser/`+id)
    }
  };
  
  export default {Auth};
