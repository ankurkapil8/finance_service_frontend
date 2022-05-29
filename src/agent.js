import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = '/api';

const encode = encodeURIComponent;
const responseBody = res => res;
const errorBody = err =>{
  return err.response
} ;
let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('Token', token);
  }
}

const requests = {
  // del: url =>
  //   superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody,errorBody),
  // put: (url, body) =>
  //   superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody,errorBody)
};

const Auth = {
  login: (email, password) =>
    requests.post('/user/login',  { email, password } ),
  register: (userDetails) =>
    requests.post('/user/registration',  userDetails ),
};

const Order = {
  getProductsByCat:(catname)=>
  requests.get(`/products?category=${catname}`),
  getCatgoryInitialData:()=>{
    return [superagent.get(`${API_ROOT}/category`),superagent.get(`${API_ROOT}/products`)]
  },
  placeOrder:(data)=>{
    //requests.post("/orders/place-order",data)
    return superagent.post(`${API_ROOT}/orders/place-order`, data).use(tokenPlugin)
  },
  getCategoryAdmin(){
    return superagent.get(`${API_ROOT}/category`).use(tokenPlugin)
  },
  getOrdersHistoryAdmin(page){
    return superagent.get(`${API_ROOT}/orders/admin-order-list?page=${page}`).use(tokenPlugin)
  },
  getOrderHistoryByUserEmail(){
    return superagent.get(`${API_ROOT}/orders/get-order`).use(tokenPlugin)
  },
  addCategory(data){
    return superagent.post(`${API_ROOT}/category`,data).use(tokenPlugin)
  },
  deleteCategory(data){
    return superagent.del(`${API_ROOT}/category?name=${data}`,data).use(tokenPlugin)
  },
  editCategory(data){
    return superagent.put(`${API_ROOT}/category`,data).use(tokenPlugin)
  },
  getProducts(){
    return superagent.get(`${API_ROOT}/products`).use(tokenPlugin)
  },
  deleteProduct(data){
    return superagent.del(`${API_ROOT}/products?title=${data}`,data).use(tokenPlugin)
  },
  addProducts(data){
    return superagent.post(`${API_ROOT}/products`,data).use(tokenPlugin)
  },
  editProducts(data){
    return superagent.put(`${API_ROOT}/products`,data).use(tokenPlugin)
  }
};
const Payment = {
  getRazorpayOrderId(data){
    return superagent.post(`${API_ROOT}/payment/food-create-order-no`,data).use(tokenPlugin)
  },
  updatePaymentStatus(data){
    return superagent.post(`${API_ROOT}/payment/updatePaymentStatus`,data).use(tokenPlugin)
  }
};
const Finance = {
  fillItr(data){
    return superagent.post(`${API_ROOT}/finance/fill-itr`,data).use(tokenPlugin)
  },
  getAdminItr(){
    return superagent.get(`${API_ROOT}/finance/fill-itr`).use(tokenPlugin)
  },
  uploadForm16(data){
    return superagent.post(`${API_ROOT}/finance/form16Upload`,data).use(tokenPlugin)
  },
  getAdminForm16(){
    return superagent.get(`${API_ROOT}/finance/form16Upload`).use(tokenPlugin)
  },
  downloadForm16(data){
    return superagent.get(`${API_ROOT}/download?fileName=${data.fileName}`).use(tokenPlugin)
  }
 
}
const Inquery = {
  submitInquery(data){
    return superagent.post(`${API_ROOT}/user/submitInquery`,data).use(tokenPlugin)
  }
}
export default {
  Auth,
  Order,
  Payment,
  Finance,
  Inquery,
  getToken:()=>{return token},
  setToken: _token => { token = _token; }
};