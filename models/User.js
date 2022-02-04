const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  name: String,
  phone: {
    type: String,
    unique: true,
  },
  picture: {
    type: String,
    default:
      "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
  },
  contacts: [
    {
      contact_id: { type: Schema.Types.ObjectId, ref: "User" },
      email: String,
      name: String,
      phone: String,
      picture: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
