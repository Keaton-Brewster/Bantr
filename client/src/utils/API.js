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

  // I think the fact that this is a  post is messing things up.
  // This should be written as a get, so I need to figure out how
  // How to make that happen
  async login(key, cb = () => {}, err = () => {}) {
    try {
      const res = await axios
        .put("http://localhost:5001/api/users/login", key)
        .catch((error) => err(error));
      if (res.status === 200) return cb(res.data);
      else return err(res);
    } catch (error) {
      console.error(error);
      return err(error);
    }
  },
};
export default API;
