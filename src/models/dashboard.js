import {API_ROOT} from "./BaseUrl"
import axios from "./interceptor-middleware";
//const url = '/memberGroups/';

const DashboardModel = {
  receivedAmount(){
    return axios.get(`${API_ROOT}/dashboard/totalReceivedAmount`)
  },
  paidAmount(){
    return axios.get(`${API_ROOT}/dashboard/totalPaidAmount`)
  },
  countActiveInactive(){
    return axios.get(`${API_ROOT}/dashboard/countActiveInactive`)
  }
}
    export default DashboardModel;