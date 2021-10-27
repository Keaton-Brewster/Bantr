import axios from "axios";

const API = {
  async signup(userInfoObject, callback, error) {
    const res = await axios
      .post("http://localhost:5001/api/users/signup", userInfoObject)
      .catch((err) => error(err));
    if (res.status === 200) return callback(res.data);
    else return error(res);
  },

  async login(loginObject, callback, error) {
    const config = {
      method: "GET",
      url: "http://localhost:5001/api/users/login",
      headers: {
        authorization: btoa(loginObject.googleId),
      },
    };
    const res = await axios.request(config).catch((err) => error(err));
    if (res.status === 200) return callback(res.data);
    else return error(res);
  },

  async getContact(phoneNum, callback, error) {
    const res = await axios
      .get(`http://localhost:5001/api/users/${phoneNum}`)
      .catch((err) => error(err));
    if (res.status === 200) return callback(res.data);
    else return error(res);
  },
};
export default API;
