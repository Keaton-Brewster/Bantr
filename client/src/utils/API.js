import axios from "axios";

const API = {
  async signup(userInfoObject, cb, err) {
    try {
      const data = await axios
        .post("http://localhost:5001/api/users/signup", userInfoObject)
        .catch((error) => err(error));
      cb(data);
    } catch (error) {
      console.error(error);
    }
  },
  login(userInfoObject) {
    return axios.post("http://localhost:5001/api/users/login", userInfoObject);
  },
};
export default API;
