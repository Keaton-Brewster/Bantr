const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  name: String,
  // participants: [{ type: String, ref: "User" }],
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      // to: { type: Schema.Types.ObjectId, ref: "Conversation" },
      // sender_id: { type: String, ref: "User" },
      sender_id: { type: Schema.Types.ObjectId, ref: "User" },
      content: String,
      sent_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
