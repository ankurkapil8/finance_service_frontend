import axios from 'axios';
//import { useHistory } from 'react-router-dom';

axios.interceptors.request.use(
    function(successfulReq) {
      let jwt = "";
      jwt = localStorage.getItem("jwt");
      successfulReq.headers = {'x-access-token' : jwt};
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
      //const history = useHistory();
      // console.log(history);
      console.log(error.toString());
      if(error.toString()=="Error: Request failed with status code 401"){
        window.location.href = "/login";
      }
      // history.push("/login");
      //window.location.href = "/login";
        return Promise.reject(error);
    }
  );

export default axios;