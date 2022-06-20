import moment from "moment"
import { requests, superagent, API_ROOT } from "./BaseUrl"
import axios from "./interceptor-middleware";
//const url = '/memberGroups/';

const SchemeModel = {
  getScheme() {
    return axios.get(`${API_ROOT}/scheme/entry`)
  },
  saveScheme(data) {
    return axios.post(`${API_ROOT}/scheme/entry`, data)
  },
  deleteScheme(id){
    return axios.delete(`${API_ROOT}/scheme/entry/${id}`)
  },  
  getLoanAppInitialData(){
      return [axios.get(`${API_ROOT}/scheme/entry`),axios.get(`${API_ROOT}/member/entry/all`)]
  }

}
const GroupLoanModel = {
  applyForloan(data){
    return axios.post(`${API_ROOT}/groupLoan/applyGroupLoan`, data)
  },
  getApprovalList(){
    return axios.get(`${API_ROOT}/groupLoan/entry/pendingApproval`);
  },
  getDisburseList(){
    return axios.get(`${API_ROOT}/groupLoan/entry/pendingDisburse`);
  },
  getLoanDetailbyId(id){
    return axios.get(`${API_ROOT}/groupLoan/entry/${id}`);
  },
  approveRejectLoan(data){
    return axios.post(`${API_ROOT}/groupLoan/approveLoan`, data)
  },
  getAllLoanApplications(){
    return axios.get(`${API_ROOT}/groupLoan/entry/all`);
  },
  disburseRejectLoan(data){
    return axios.post(`${API_ROOT}/groupLoan/disburseLoan`, data)
  },
  getSattlementAmount(loan_account_no){
    return axios.get(`${API_ROOT}/closeAccount/calculateSattleAmount/${loan_account_no}`)
  },
  closeAccount(data){
    return axios.post(`${API_ROOT}/closeAccount/closeLoanAccout`, data)
  }
}
const EmiModel = {
  calculateEMI(data){
    return axios.post(`${API_ROOT}/emis/calculateEMI`, data);
  },
  getDueEmis(today = moment().format("yyyy-MM-DD")){
    return axios.get(`${API_ROOT}/emis/dueEMIs/${today}`);
  },
  paidEmi(id){
    return axios.put(`${API_ROOT}/emis/entry`,{"id":id});
  },
  getPaidEmis(loanAccountNo){
    return axios.get(`${API_ROOT}/emis/entry/${loanAccountNo}`);
  }
}
export default { SchemeModel,GroupLoanModel,EmiModel };