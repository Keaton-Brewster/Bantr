const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost:27017/msging", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const ObjectId = require("mongodb").ObjectID;
const userSeed = [
  {
    _id: "User1",
    email: "keaton.brewster@gmail.com",
    name: "Keaton",
    phone: "7859698002",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    _id: "User2",
    email: "timmeree@mail.com",
    name: "Timmeree",
    phone: "9136369994",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    _id: "User3",
    email: "brandyquinlan@gmail.com",
    name: "Brandy",
    phone: "7856961110",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    _id: "User4",
    email: "brenna.mcleod@gmail.com",
    name: "Brenna",
    phone: "3931110444",
    password: "$2a$10$/YLBRz8HtKmosuFpSXPhPeOHraXN8R6xN9H7NB/H4h/vnPh3GxFwa",
    __v: 0,
  },
  {
    _id: "User5",
    email: "kolton.c.decker@gmail.com",
    name: "Kolton",
    phone: "4841110499",
    password: "$2a$10$wwufUMA88PNQlCyvA4lj2eJPTfRrBVDAAnTwtJWThTStFkq6phGCm",
    __v: 0,
  },
  {
    _id: "User6",
    email: "steve.babb@outlook.com",
    name: "Steve",
    phone: "9132201212",
    password: "$2a$10$YFATTMrJQuOUgo/4qTsjEuQADymcbMXqM1xpqNnE2t/97p027lZVO",
    __v: 0,
  },
];

const conversationSeed = [
  {
    _id: "Convo1",
    participants: ["User1", "User2"],
    messsages: [],
  },
  {
    _id: "Convo2",
    participants: ["User1", "User3"],
    messsages: [],
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
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
