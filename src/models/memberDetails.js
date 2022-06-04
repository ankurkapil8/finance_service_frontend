import {requests, superagent, API_ROOT} from "./BaseUrl"
import axios from "./interceptor-middleware";
//const url = '/memberGroups/';

const MemberDetailModel = {
  getMemberDetailsData(member_id="all"){
    return axios.get(`${API_ROOT}/member/entry/${member_id}`)
  },
  saveMemberDetails(data){
    return axios.post(`${API_ROOT}/member/entry`,data)

  },
  deleteMember(id){
    return axios.delete(`${API_ROOT}/member/entry/${id}`)
  },  
  editMember(data,id){
    return axios.put(`${API_ROOT}/member/entry/${id}`,data)
  }  
    
  }
    export default {MemberDetailModel};