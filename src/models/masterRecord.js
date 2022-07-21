import { API_ROOT } from "./BaseUrl"
import axios from "./interceptor-middleware";
//const url = '/memberGroups/';

const MemberGroupModel = {
  getMemberGroups(group_code) {
    return axios.get(`${API_ROOT}/memberGroups/entry/${group_code}`)
  },
  saveMemberGroups(data) {
    return axios.post(`${API_ROOT}/memberGroups/entry`, data)
  },
  saveImage(file) {
    return axios.post(`${API_ROOT}/member/image-upload`, file)
  },
  editMemberGroup(data, id) {
    return axios.put(`${API_ROOT}/memberGroups/entry/${id}`, data)

  }

}
export default { MemberGroupModel };