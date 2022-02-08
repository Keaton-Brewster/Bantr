const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types

const ConversationSchema = new Schema({
  name: String,
  members: [ObjectId],
  messages: [
    {
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
