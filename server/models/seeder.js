const mongoose = require("mongoose");
const db = require(".");
const ObjectId = require("mongodb").ObjectID;

mongoose.connect("mongodb://localhost:27017/msging", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

class User {
  constructor(_id, givenName, familyName, email, key) {
    this._id = _id;
    this.givenName = givenName || "First name";
    this.familyName = familyName || "Last name";
    this.email = email || "Email address";
    this.key = key || null;
    this.imageUrl =
      "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg";
  }
}

class Conversation {
  constructor(members, messages) {
    this.members = members;
    this.messages = messages;
  }
}

class Message {
  constructor(sender_id, content) {
    this.sender_id = sender_id;
    this.content = content;
  }
}

const userSeed = [
  new User(
    ObjectId("60dd2b58eeda4429a8f4ca91"),
    "Keaton",
    "Brewster",
    "keaton.brewster@gmail.com",
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkZjBhODMx"
  ),
  new User(
    ObjectId("60a532c9266a4f2cc69925f6"),
    "Timmeree",
    "Estes",
    "timmeree@mail.com"
  ),
  new User(
    ObjectId("60a5336e266a4f2cc69925f8"),
    "Brandy",
    "Miles",
    "brandy@mail.com"
  ),
  new User(
    ObjectId("60a533d0266a4f2cc69925fa"),
    "Brenna",
    "Cupertino",
    "brenna@mail.com"
  ),
  new User(
    ObjectId("60a5344d266a4f2cc69925fc"),
    "Maggie",
    "Rogers",
    "maggie@mail.com"
  ),
];

const conversationSeed = [
  new Conversation(
    ["60dd2b58eeda4429a8f4ca91", "60a532c9266a4f2cc69925f6"],
    [
      new Message(
        ObjectId("60a532c9266a4f2cc69925f6"),
        "Hey! I see that you are making good progess!"
      ),
      new Message(
        ObjectId("60dd2b58eeda4429a8f4ca91"),
        "sure if that's what you want to call it.."
      ),
      new Message(ObjectId("60dd2b58eeda4429a8f4ca91"), "I'm trying at least!"),
    ]
  ),
  new Conversation(
    ["60dd2b58eeda4429a8f4ca91", "60a533d0266a4f2cc69925fa"],
    [
      new Message(ObjectId("60dd2b58eeda4429a8f4ca91"), "What's up?"),
      new Message(ObjectId("60a533d0266a4f2cc69925fa"), "Not much!"),
    ]
  ),
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data);
    console.log(`${data.result.n}  'user records inserted!'`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

db.Conversation.deleteMany({})
  .then(() => db.Conversation.collection.insertMany(conversationSeed))
  .then((data) => {
    console.log(data);
    console.log(`${data.result.n}  'conversation records inserted!'`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
