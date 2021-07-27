import axios from "axios";

const API = {
  async signup(userInfoObject = {}, cb = () => {}, err = () => {}) {
    try {
      const { data } = await axios
        .post("http://localhost:5001/api/users/signup", userInfoObject)
        .catch((error) => err(error));
      cb(data);
    } catch (error) {
      return err(error);
    }
  },
  async login(key = {}, cb = () => {}, err = () => {}) {
    try {
      const { data } = await axios
        .post(`http://localhost:5001/api/users/login`, key)
        .catch((error) => err(error));
      cb(data);
    } catch (error) {
      console.error(error);
      return err(error);
    }
  },
};
export default API;
