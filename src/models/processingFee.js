import {superagent, API_ROOT} from "./BaseUrl"

//const url = '/memberGroups/';

const ProcessingFeeModel = {
    getProcessingFee(filter){
        return superagent.get(`${API_ROOT}/processingFee/entry/${filter}`)
    },
    saveProcessingFee(data){
        return superagent.post(`${API_ROOT}/processingFee/entry`,data)
    },
    deleteProcessingFee(id){
        return superagent.del(`${API_ROOT}/processingFee/entry/${id}`)
    },
    editProcessingFee(data,id){
        return superagent.put(`${API_ROOT}/processingFee/entry/${id}`,data)

    }
    
  }
    export default {ProcessingFeeModel};