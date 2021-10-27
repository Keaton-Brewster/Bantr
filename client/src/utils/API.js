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
        // Need to set up authorization headers instead of trying to send
        // the info through a POST or PUT
        authorization: btoa(loginObject.googleId),
      },
    };
    // console.log(config);
    const res = await axios
      //   .put("http://localhost:5001/api/users/login", loginObject)
      .request(config)
      .catch((err) => error(err));
    if (res.status === 200) return callback(res.data);
    else return error(res);
  },
};
export default API;
