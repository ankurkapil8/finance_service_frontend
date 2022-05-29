import axios from 'axios';

axios.interceptors.request.use(
    function(successfulReq) {
        return successfulReq;
    }, 
    function(error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use( 
    function(successRes) {
        let formatedResponse = successRes;
        formatedResponse["statusCode"] = successRes["status"];
        formatedResponse["body"] = successRes["data"];
        delete formatedResponse["data"];
        return formatedResponse;
    }, 
    function(error) {
        return Promise.reject(error);
    }
  );

export default axios;