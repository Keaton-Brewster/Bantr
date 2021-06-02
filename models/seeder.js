const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost:27017/msging", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const userSeed = [
  {
    id: "User1",
    email: "keaton.brewster@gmail.com",
    name: "Keaton",
    phone: "7859698002",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    id: "User2",
    email: "timmeree@mail.com",
    name: "Timmeree",
    phone: "9136369994",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    id: "User3",
    email: "brandyquinlan@gmail.com",
    name: "Brandy",
    phone: "7856961110",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    id: "User4",
    email: "brenna.mcleod@gmail.com",
    name: "Brenna",
    phone: "3931110444",
    password: "$2a$10$/YLBRz8HtKmosuFpSXPhPeOHraXN8R6xN9H7NB/H4h/vnPh3GxFwa",
    __v: 0,
  },
  {
    id: "User5",
    email: "kolton.c.decker@gmail.com",
    name: "Kolton",
    phone: "4841110499",
    password: "$2a$10$wwufUMA88PNQlCyvA4lj2eJPTfRrBVDAAnTwtJWThTStFkq6phGCm",
    __v: 0,
  },
  {
    id: "User6",
    email: "steve.babb@outlook.com",
    name: "Steve",
    phone: "9132201212",
    password: "$2a$10$YFATTMrJQuOUgo/4qTsjEuQADymcbMXqM1xpqNnE2t/97p027lZVO",
    __v: 0,
  },
];

const conversationSeed = [
  {
    id: "Convo1",
    participants: ["User1", "User2"],
  },
  {
    id: "Convo2",
    participants: ["User1", "User3"],
  },
];

const messageSeed = [
  {
    conversation_id: "Convo1",
    sender_id: "User2",
    content: "Hey! I see that you are making good progess!",
  },
  {
    conversation_id: "Convo1",
    sender_id: "User1",
    content: "sure if that's what you want to call it..",
  },
  {
    conversation_id: "Convo1",
    sender_id: "User1",
    content: "I'm trying at least!",
  },
  {
    conversation_id: "Convo1",
    sender_id: "User2",
    content: "Don't be like that to your self, you're doing great",
  },
  {
    conversation_id: "Convo2",
    sender_id: "User1",
    content: "I am glad that you think so",
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

db.Message.deleteMany({})
  .then(() => db.Message.collection.insertMany(messageSeed))
  .then((data) => {
    console.log(data);
    console.log(`${data.result.n}  'message records inserted!'`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
