import {requests, superagent, API_ROOT} from "./BaseUrl"
import axios from "./interceptor-middleware";

//const url = '/memberGroups/';

const ProcessingFeeModel = {
    getProcessingFee(filter){
        return axios.get(`${API_ROOT}/processingFee/entry/${filter}`)
    },
    saveProcessingFee(data){
        return axios.post(`${API_ROOT}/processingFee/entry`,data)
    },
    deleteProcessingFee(id){
        return axios.delete(`${API_ROOT}/processingFee/entry/${id}`)
    },
    editProcessingFee(data,id){
        return axios.put(`${API_ROOT}/processingFee/entry/${id}`,data)

    }
    
  }
    export default {ProcessingFeeModel};