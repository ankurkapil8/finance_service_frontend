import {API_ROOT } from "./BaseUrl"
import axios from "./interceptor-middleware";

const Auth = {
    login: (username, password) =>
    axios.post(`${API_ROOT}/user/login`,  { username, password } ),
  };
  
  export default {Auth};
