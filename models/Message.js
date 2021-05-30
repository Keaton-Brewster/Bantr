const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  to: { type: Schema.Types.ObjectId, ref: "Conversation" },
  from: { type: Schema.Types.ObjectId, ref: "User" },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
