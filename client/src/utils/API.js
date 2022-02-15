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

  async getContact(phoneNum, callback, error) {
    const response = await axios
      .get(`http://localhost:3001/api/users/${phoneNum}`)
      .catch((err) => error(err));
    if (response.status === 200) return callback(response.data);
    else return error(response);
  },
  async addContact(currentUser, phoneNum, callback, error) {
    const response = await axios
      .post(
        `http://localhost:3001/api/user/addContact/${currentUser}/${phoneNum}`
      )
      .catch((err) => error(err));
    if (response.status === 200) return callback(response.data);
    else return error(response);
  },
};
export default API;
