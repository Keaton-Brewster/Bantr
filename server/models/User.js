const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  g_id: {
    type: String,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  givenName: String,
  familyName: String,
  phonNum: {
    type: String,
    unique: true,
  },
  imageUrl: {
    type: String,
    default:
      "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
  },
  contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
