import axios from "axios";

const API = {
  async signup(userInfoObject, callback, error) {
    const res = await axios
      .post("http://localhost:3001/api/users/signup", userInfoObject)
      .catch((err) => error(err));
    if (res.status === 200) return callback(res.data);
    else return error(res);
  },

  async login(loginObject, callback, error) {
    const res = await axios
      .post("http://localhost:3001/api/users/login", {
        email: loginObject.email,
        id: loginObject.googleId,
      })
      .catch((err) => error(err));
    if (res.status === 200 && res.data) return callback(res.data);
    else return error(res);
  },

  async getContacts(id_array, callback, error) {
    const response = await axios
      .put(`http://localhost:3001/api/users/getContacts`, {
        id_array,
      })
      .catch((err) => error(err));
    if (response.status === 200) return callback(response.data);
    else return error(response);
  },

  async getConversations(user_id, proceed, error) {
    const response = await axios.get(
      `http://localhost:3001/api/conversations/${user_id}`
    );
    if (response.status === 200) proceed(response.data);
    else error(response);
  },

  async addContact(user_id, phoneNum, callback, error) {
    const response = await axios
      .post(`http://localhost:3001/api/users/addContact`, {
        phoneNum,
        user_id,
      })
      .catch((err) => error(err));
    if (response.status === 200) return callback(response.data);
    else if (response.status === 304) return error(304);
    else return error(response);
  },

  async sendMessage(message_info, conversation_id, proceed, error) {
    const response = await axios
      .put("/api/conversations/newMessage", {
        message_info,
        conversation_id,
      })
      .catch((err) => error(err));
    if (response.status === 200) proceed(response.data);
    else error(response);
  },

  async startOrGoTOConversation(
    newConversation,
    created,
    alreadyExists,
    error
  ) {
    const response = await axios
      .post(
        "http://localhost:3001/api/conversations/newConversation",
        newConversation
      )
      .catch((err) => error(err));
    if (response.status === 200) return created(response.data);
    else if (response.status === 202) return alreadyExists(response.data);
    else return error(response);
  },

  //* This method was not suitable for the purpose I originally meant it
  //* I may come back later and repurpose it, so for now I am only
  //* going to comment it out

  // async getContact(_id, callback, error) {
  //   const response = await axios
  //     .get(`http://localhost:3001/api/users/${_id}`)
  //     .catch((err) => error(err));
  //   if (response.status === 200) return callback(response.data);
  //   else return error(response);
  // },
};
export default API;
