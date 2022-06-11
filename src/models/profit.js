import moment from "moment"
import { API_ROOT } from "./BaseUrl"
import axios from "./interceptor-middleware";
//const url = '/memberGroups/';

const profitDetails = {
  // calculateEMI(data){
  //   return axios.post(`${API_ROOT}/emis/calculateEMI`, data);
  // },
  getData(today) {
    const myDate = today.split(" ");

    // if (myDate[0].charAt(0) === '0')
    //   myDate[0] = myDate[0].replace("0", "");
    return axios.get(`${API_ROOT}/emis/paidEmi/${parseInt(myDate[0])}/${myDate[1]}`);
  },
  // paidEmi(id){
  //   return axios.put(`${API_ROOT}/emis/entry`,{"id":id});
  // },
  // getPaidEmis(loanAccountNo){
  //   return axios.get(`${API_ROOT}/emis/entry/${loanAccountNo}`);
  // }
}
export default { profitDetails };