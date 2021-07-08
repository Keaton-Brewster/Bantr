const mongoose = require("mongoose");
const db = require(".");

mongoose.connect("mongodb://localhost:27017/msging", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const ObjectId = require("mongodb").ObjectID;

const userSeed = [
  {
    _id: ObjectId("60dd2b58eeda4429a8f4ca91"),
    email: "keaton.brewster@gmail.com",
    name: "Keaton Brewster",
    phone: "7859698002",
    // Password is passw0rd
    password: "$2a$10$UINwiFDx8K4.BLcmswPZzOxdm/qzxUoyjBPcCxnFrqKeHWNLxuc/6",
    __v: 0,
  },
  {
    _id: ObjectId("60a532c9266a4f2cc69925f6"),
    email: "timmeree@mail.com",
    name: "Timmeree",
    phone: "9136369994",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    _id: ObjectId("60a5336e266a4f2cc69925f8"),
    email: "brandyquinlan@gmail.com",
    name: "Brandy",
    phone: "7856961110",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    _id: ObjectId("60a533d0266a4f2cc69925fa"),
    email: "brenna.mcleod@gmail.com",
    name: "Brenna",
    phone: "3931110444",
    password: "$2a$10$/YLBRz8HtKmosuFpSXPhPeOHraXN8R6xN9H7NB/H4h/vnPh3GxFwa",
    __v: 0,
  },
  {
    _id: ObjectId("60a5344d266a4f2cc69925fc"),
    email: "kolton.c.decker@gmail.com",
    name: "Kolton",
    phone: "4841110499",
    password: "$2a$10$wwufUMA88PNQlCyvA4lj2eJPTfRrBVDAAnTwtJWThTStFkq6phGCm",
    __v: 0,
  },
];

const conversationSeed = [
  {
    id: "Convo1",
    members: [
      ObjectId("60dd2b58eeda4429a8f4ca91"),
      ObjectId("60a532c9266a4f2cc69925f6"),
    ],
    messages: [
      {
        sender_id: ObjectId("60a532c9266a4f2cc69925f6"),
        content: "Hey! I see that you are making good progess!",
        senderName: "Timmeree",
      },
      {
        sender_id: ObjectId("60dd2b58eeda4429a8f4ca91"),
        content: "sure if that's what you want to call it..",
        senderName: "Keaton",
      },
      {
        sender_id: ObjectId("60dd2b58eeda4429a8f4ca91"),
        content: "I'm trying at least!",
        senderName: "Keaton",
      },
      {
        sender_id: ObjectId("60a532c9266a4f2cc69925f6"),
        content: "Don't be like that to your self, you're doing great",
        senderName: "Timmeree",
      },
    ],
  },
  {
    id: "Convo2",
    members: [
      ObjectId("60dd2b58eeda4429a8f4ca91"),
      ObjectId("60a533d0266a4f2cc69925fa"),
    ],
    messages: [
      {
        sender_id: ObjectId("60dd2b58eeda4429a8f4ca91"),
        content: "What's up",
        senderName: "Keaton",
      },
      {
        sender_id: ObjectId("60a533d0266a4f2cc69925fa"),
        content: "Not much",
        senderName: "Fred",
      },
    ],
  },
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
