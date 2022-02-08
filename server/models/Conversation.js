const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  name: String,
  members: [Schema.Types.ObjectId],
  messages: [{
    sender_id: String,
    content: String,
    sent_at: {
      type: Date,
      default: Date.now
    }
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
