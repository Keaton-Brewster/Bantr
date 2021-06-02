const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  conversation_id: { type: String, ref: "Conversation" },
  // to: { type: Schema.Types.ObjectId, ref: "Conversation" },
  sender_id: { type: String, ref: "User" },
  // from: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
