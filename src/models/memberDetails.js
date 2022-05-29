import {requests, superagent, API_ROOT} from "./BaseUrl"

//const url = '/memberGroups/';

const MemberDetailModel = {
  getMemberDetailsData(member_id="all"){
    return superagent.get(`${API_ROOT}/member/entry/${member_id}`)
  },
  saveMemberDetails(data){
    return superagent.post(`${API_ROOT}/member/entry`,data)

  },
  deleteMember(id){
    return superagent.del(`${API_ROOT}/member/entry/${id}`)
  },  
  editMember(data,id){
    return superagent.put(`${API_ROOT}/member/entry/${id}`,data)
  }  
    
  }
    export default {MemberDetailModel};