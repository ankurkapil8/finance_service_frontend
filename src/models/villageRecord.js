import {requests, superagent, API_ROOT} from "./BaseUrl"
import axios from "./interceptor-middleware";

//const url = '/memberGroups/';

const VillageModel = {
    getVillage(filter){
        return axios.get(`${API_ROOT}/village/entry/${filter}`)
    },
    saveVillage(data){
        return axios.post(`${API_ROOT}/village/entry`,data)
    },
    deleteVillage(id){
        return axios.delete(`${API_ROOT}/village/entry/${id}`)
    },
    editVillage(data,id){
        return axios.put(`${API_ROOT}/village/entry/${id}`,data)

    }
    
  }
    export default {VillageModel};