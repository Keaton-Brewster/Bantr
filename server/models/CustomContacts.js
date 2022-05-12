const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomContactSchema = new Schema({
  givenName: String,
  familyName: String,
  email: String,
  phoneNum: String,
  photoURL: String,
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CustomContact = mongoose.model("CustomContact", CustomContactSchema);

module.exports = CustomContact;
