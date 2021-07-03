import axios from "axios";
import CometChat, { authKey } from "../CometChat";

// ! This may be able to be done within the CometChat dir so that it makes more sense, organizationally
//! But I think by using CometChat, we can circumvent a lot of trouble, as well as MongoDB entirely?
const API = {
  signup(userInfoObject) {
    // return axios.post("/api/users/signup", userInfoObject);
    console.log(userInfoObject);
  },
  login(userInfoObject) {
    // return axios.post("/api/users/login", userInfoObject);
  },
};
export default API;
