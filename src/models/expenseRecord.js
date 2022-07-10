import {superagent, API_ROOT} from "./BaseUrl"

//const url = '/memberGroups/';

const ExpenseModel = {
    getExpense(filter){
        return superagent.get(`${API_ROOT}/expense/entry/${filter}`)
    },
    saveExpense(data){
        return superagent.post(`${API_ROOT}/expense/entry`,data)
    },
    deleteExpense(id){
        return superagent.del(`${API_ROOT}/expense/entry/${id}`)
    },
    editExpense(data,id){
        return superagent.put(`${API_ROOT}/expense/entry/${id}`,data)

    }
    
  }
    export default {ExpenseModel};