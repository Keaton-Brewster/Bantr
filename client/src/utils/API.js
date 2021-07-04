import axios from "axios";

const API = {
  signup(userInfoObject) {
    return axios.post("/api/users/signup", userInfoObject);
  },
  login(userInfoObject) {
    return axios.post("/api/users/login", userInfoObject);
  },
};
export default API;
