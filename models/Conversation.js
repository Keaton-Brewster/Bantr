const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messsages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
