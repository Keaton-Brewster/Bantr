import axios from "axios";
import User from "./Types/User";
import ProfileObject from "./Types/ProfileObject";

type UserCallback = (user: User) => User;
type ErrorCallback = (error: Error) => Error;

const API = {
  async signup(
    userInfoObject: ProfileObject,
    callback: UserCallback,
    error: ErrorCallback
  ) {
    const res: any = await axios
      .post("http://localhost:5001/api/users/signup", userInfoObject)
      .catch((err) => error(err));
    if (res.status === 200) return callback(res.data);
    else return error(res);
  },
  async login(
    loginObject: ProfileObject,
    callback: UserCallback,
    error: ErrorCallback
  ) {
    const res: any = await axios
      .put("http://localhost:5001/api/users/login", loginObject)
      .catch((err) => error(err));
    if (res.status === 200) return callback(res.data);
    else return error(res);
  },
};
export default API;
