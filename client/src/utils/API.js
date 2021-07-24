import axios from "axios";

const API = {
  signup(userInfoObject) {
    return axios.post("http://localhost:5001/api/users/signup", userInfoObject);
  },
  login(userInfoObject) {
    return axios.post("http://localhost:5001/api/users/login", userInfoObject);
  },
};
export default API;
