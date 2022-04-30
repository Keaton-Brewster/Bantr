const mongoose = require("mongoose");
const db = require(".");
const ObjectId = require("mongodb").ObjectID;

mongoose.connect("mongodb://localhost:27017/messaging", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

function generateSeed() {
  let randomSet = []; // Array for a bunch of random, possible characters, that will then go on to be randomly chosen from for the final password
  let ensureSet = []; // Array for ensuring that at least one of each selected char-set will be included in the final password
  let seed = []; // Array for the final, randomly generated password.

  const range =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  randomSelector(range);
  charsetEnsure(range);

  function randomSelector(x) {
    for (let i = 0; i < 100; i++) {
      xChar = x.charAt(Math.floor(Math.random() * x.length));
      randomSet.push(xChar);
    }
  }

  function charsetEnsure(x) {
    xChar = x.charAt(Math.floor(Math.random() * x.length));
    ensureSet.push(xChar);
  }

  seed.push(ensureSet.join(""));

  for (let i = 0; i < 100 - ensureSet.length; i++) {
    var charPicked = randomSet[Math.floor(Math.random() * randomSet.length)];
    seed.push(charPicked);
  }

  return seed.join("").toString() + ".svg";
}

class User {
  constructor(
    _id,
    givenName,
    familyName,
    email,
    phoneNum,
    GID,
    contacts,
    conversations
  ) {
    this._id = _id;
    this.givenName = givenName || "First name";
    this.familyName = familyName || "Last name";
    this.email = email || "Email address";
    this.phoneNum = phoneNum;
    this.uid = GID || null;
    this.photoURL = `https://avatars.dicebear.com/api/identicon/${generateSeed()}`;
    this.contacts = contacts || [];
    this.conversations = conversations || [];
  }
}

class Conversation {
  constructor(_id, members, messages, name) {
    this._id = _id;
    this.members = members;
    this.messages = messages;
    this.name = name;
    this.created_at = Date.now;
  }
}

class Message {
  constructor(sender_id, content) {
    this.sender_id = sender_id;
    this.content = content;
    this.sent_at = Date.now;
  }
}

const userSeed = [
  new User(
    ObjectId("60dd2b58eeda4429a8f4ca91"),
    "Keaton",
    "Brewster",
    "keaton.brewster@gmail.com",
    "+17859698002",
    "108306498626918685024",
    [
      ObjectId("60a532c9266a4f2cc69925f6"),
      ObjectId("60a5344d266a4f2cc69925fc"),
      ObjectId("60dd2b58eeda4429a8f4c123"),
    ],
    [ObjectId("626218633e20668a886565c7"), ObjectId("626218633e20668a886565c8")]
  ),
  new User(
    ObjectId("60dd2b58eeda4429a8f4c123"),
    "Sven",
    "Riteboch",
    "sven@mail.com",
    "+13854441958"
  ),
  new User(
    ObjectId("60a532c9266a4f2cc69925f6"),
    "Timmeree",
    "Estes",
    "timmeree@mail.com",
    "+19136369994"
  ),
  new User(
    ObjectId("60a5336e266a4f2cc69925f8"),
    "Brandy",
    "Miles",
    "brandy@mail.com",
    "+19560002938"
  ),
  new User(
    ObjectId("60a533d0266a4f2cc69925fa"),
    "Brendon",
    "Cupertino",
    "brendon@mail.com",
    "+17638724466"
  ),
  new User(
    ObjectId("60a5344d266a4f2cc69925fc"),
    "Maggie",
    "Ichikko",
    "maggie@mail.com",
    "+17859698082"
  ),
];

const conversationSeed = [
  new Conversation(
    ObjectId("626218633e20668a886565c7"),
    [
      ObjectId("60dd2b58eeda4429a8f4ca91"),
      ObjectId("60a532c9266a4f2cc69925f6"),
    ],
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
    ],
    "Timmeree Estes"
  ),
  new Conversation(
    ObjectId("626218633e20668a886565c8"),
    [
      ObjectId("60dd2b58eeda4429a8f4ca91"),
      ObjectId("60a533d0266a4f2cc69925fa"),
    ],
    [
      new Message(ObjectId("60dd2b58eeda4429a8f4ca91"), "What's up?"),
      new Message(ObjectId("60a533d0266a4f2cc69925fa"), "Not much!"),
    ],
    "Brendon Cupertino"
  ),
];

const seedUsers = () => {
  db.User.remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then((data) => {
      console.log(data);
      console.log(`${data.result.n}  'user records inserted!'`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

const seedConversations = () => {
  db.Conversation.remove({})
    .then(() => db.Conversation.collection.insertMany(conversationSeed))
    .then((data) => {
      console.log(data);
      console.log(`${data.result.n}  'conversation records inserted!'`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

const Main = (func1, func2) => {
  mongoose.connection.dropDatabase();
  func1();
  func2();
};

Main(seedUsers, seedConversations);
