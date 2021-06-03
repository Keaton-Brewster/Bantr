import axios from "axios";

const API = {
  signup(userInfoObject) {
    return axios.post("/api/users/signup", userInfoObject);
  },
  login(userInfoObject) {
    return axios.post("/api/users/login", userInfoObject);
  },
  // Decided to write this as a cb function so that it looks cleaner in home/index
  async init(cb) {
    const convoData = await axios.get("/api/conversations/");
    const convos = convoData.data;
    const msgData = await axios.get(`/api/messages/${convos[0].id}`);
    // Once again having to adjust things for testing
    // const msgData = await axios.get(`/api/messages/${convos[0]._id}`);
    const topMessages = msgData.data;
    cb([convos, topMessages]);
  },
  async selectConversation(convo_id) {
    const { data } = await axios.get(`/api/messages/${convo_id}`);
    return data;
  },
};
export default API;
