import axios from "axios";

export const signup = async (userInfoObject, callback, error) => {
  const res = await axios
    .post("http://localhost:3001/api/users/signup", userInfoObject)
    .catch((err) => error(err));
  if (res.data.error) return error(res);
  else return callback(res.data);
};

export const login = async (loginObject, callback, error) => {
  const res = await axios
    .post("http://localhost:3001/api/users/login", {
      email: loginObject.email,
      id: loginObject.googleId,
    })
    .catch((err) => error(err));
  if (res?.status === 200 && res.data) return callback(res.data);
  else return error(res);
};

export const getContacts = async (id_array, callback, error) => {
  const res = await axios
    .put(`http://localhost:3001/api/users/getContacts`, {
      id_array,
    })
    .catch((err) => error(err));
  if (res?.status === 200) return callback(res.data);
  else return error(res);
};

export const getConversations = async (user_id, proceed, error) => {
  const res = await axios.get(
    `http://localhost:3001/api/conversations/${user_id}`
  );
  if (res?.status === 200) return proceed(res.data);
  else return error(res);
};

export const addContact = async (user_id, phoneNum, callback, error) => {
  const res = await axios
    .post(`http://localhost:3001/api/users/addContact`, {
      phoneNum,
      user_id,
    })
    .catch((err) => error(err));
  if (res.status === 200) return callback(res.data);
  else if (res.status === 304) return error(304);
  else return error(res);
};

export const postMessage = async (
  message_info,
  conversation,
  proceed,
  error
) => {
  const res = await axios
    .put("/api/conversations/newMessage", {
      message_info,
      conversation,
    })
    .catch((err) => error(err));
  if (res.status === 200) return proceed(res.data);
  else return error(res);
};

export const searchForOrStartConversation = async (
  conversation,
  created,
  alreadyExists,
  error
) => {
  const res = await axios
    .post(
      "http://localhost:3001/api/conversations/newConversation",
      conversation
    )
    .catch((err) => error(err));
  if (res.status === 200) return created(res.data);
  else if (res.status === 202) return alreadyExists(res.data);
  else return error(res);
};

export const hideConversation = async (
  conversation_id,
  user_id,
  callback,
  error
) => {
  //! For now I am going to have to pause on this.
  //! I am probably going to have to totally rethink the way that I
  //! am creating and storing messages and conversations.
  //! I should have done all of this work as a part of planning, but here we are!
  // const res = await axios
  //   .put("http://localhost:3001/api/conversations/hideConversation", {
  //     user_id,
  //     conversation_id,
  //   })
  //   .catch((e) => error(e));
  // if (res.status === 200) return callback(res.data);
  // else return error(res);
};
//* This method was not suitable for the purpose I originally meant it
//* I may come back later and repurpose it, so for now I am only
//* going to comment it out

// async getContact(_id, callback, error) {
//   const res = await axios
//     .get(`http://localhost:3001/api/users/${_id}`)
//     .catch((err) => error(err));
//   if (res.status === 200) return callback(res.data);
//   else return error(res);
// },
