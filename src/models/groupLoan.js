import moment from "moment"
import { requests, superagent, API_ROOT } from "./BaseUrl"
//const url = '/memberGroups/';

const SchemeModel = {
  getScheme() {
    return superagent.get(`${API_ROOT}/scheme/entry`)
  },
  saveScheme(data) {
    return superagent.post(`${API_ROOT}/scheme/entry`, data)
  },
  deleteScheme(id){
    return superagent.del(`${API_ROOT}/scheme/entry/${id}`)
  },  
  getLoanAppInitialData(){
      return [superagent.get(`${API_ROOT}/scheme/entry`),superagent.get(`${API_ROOT}/member/entry/all`)]
  }

}
const GroupLoanModel = {
  applyForloan(data){
    return superagent.post(`${API_ROOT}/groupLoan/applyGroupLoan`, data)
  },
  getApprovalList(){
    return superagent.get(`${API_ROOT}/groupLoan/entry/pendingApproval`);
  },
  getDisburseList(){
    return superagent.get(`${API_ROOT}/groupLoan/entry/pendingDisburse`);
  },
  getLoanDetailbyId(id){
    return superagent.get(`${API_ROOT}/groupLoan/entry/${id}`);
  },
  approveRejectLoan(data){
    return superagent.post(`${API_ROOT}/groupLoan/approveLoan`, data)
  },
  getAllLoanApplications(){
    return superagent.get(`${API_ROOT}/groupLoan/entry/all`);
  },
  disburseRejectLoan(data){
    return superagent.post(`${API_ROOT}/groupLoan/disburseLoan`, data)
  },

}
const EmiModel = {
  calculateEMI(data){
    return superagent.post(`${API_ROOT}/emis/calculateEMI`, data);
  },
  getDueEmis(today = moment().format("yyyy-MM-DD")){
    return superagent.get(`${API_ROOT}/emis/dueEMIs/${today}`);
  },
  paidEmi(id){
    return superagent.put(`${API_ROOT}/emis/entry`,{"id":id});
  },
  getPaidEmis(loanAccountNo){
    return superagent.get(`${API_ROOT}/emis/entry/${loanAccountNo}`);
  }
}
export default { SchemeModel,GroupLoanModel,EmiModel };