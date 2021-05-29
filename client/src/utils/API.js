import axios from "axios";

const API = {
  signup(userInfoObject) {
    return axios.post("/api/users/signup", userInfoObject);
  },
};
export default API;
