import axios from "axios";

const API = {
  signup(userInfoObject) {
    return axios.post("/api/users/signup", userInfoObject);
  },
  login(userInfoObject) {
    return axios.post("/api/users/login", userInfoObject);
  },
  async init() {
    const convoData = await axios.get("/api/conversations/");
    const convos = convoData.data;
    console.log(convos[0]);
    const msgData = await axios.get(`/api/messages/${convos[0].id}`);
    // Once again having to adjust things for testing
    // const msgData = await axios.get(`/api/messages/${convos[0]._id}`);
    const topMessages = msgData.data;
    console.log(msgData);
    return [convos, topMessages];
  },
};
export default API;
