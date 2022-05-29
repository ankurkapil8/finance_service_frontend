import {API_ROOT} from "./BaseUrl"
import axios from "./interceptor-middleware";
//const url = '/memberGroups/';

const MemberGroupModel = {
  getMemberGroups(){
    return axios.get(`${API_ROOT}/memberGroups/entry`)
  },
  saveMemberGroups(data){
    return axios.post(`${API_ROOT}/memberGroups/entry`,data)
  }
  }
    export default {MemberGroupModel};