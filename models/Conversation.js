const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  name: String,
  participants: [{ type: String, ref: "User" }],
  // participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
