import {requests, superagent, API_ROOT} from "./BaseUrl"
import axios from "./interceptor-middleware";

//const url = '/memberGroups/';

const ExpenseModel = {
    getExpense(filter){
        return axios.get(`${API_ROOT}/expense/entry/${filter}`)
    },
    saveExpense(data){
        return axios.post(`${API_ROOT}/expense/entry`,data)
    },
    deleteExpense(id){
        return axios.delete(`${API_ROOT}/expense/entry/${id}`)
    },
    editExpense(data,id){
        return axios.put(`${API_ROOT}/expense/entry/${id}`,data)

    }
    
  }
    export default {ExpenseModel};