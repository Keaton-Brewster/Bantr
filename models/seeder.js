const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost:27017/msging", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

var ObjectId = require("mongodb").ObjectID;
const userSeed = [
  {
    _id: ObjectId("60a298987ec6b108b107ddb7"),
    email: "brandyquinlan@gmail.com",
    name: "Brandy",
    phone: "7856961110",
    password: "$2a$10$QSxpvRPve2WG7xL2/LoM4eGiFWo345Fi7ckwgjIECLihO2NJJpTVq",
    __v: 0,
  },
  {
    _id: ObjectId("60a532c9266a4f2cc69925f6"),
    email: "brenna.mcleod@gmail.com",
    name: "Brenna",
    phone: "3931110444",
    password: "$2a$10$/YLBRz8HtKmosuFpSXPhPeOHraXN8R6xN9H7NB/H4h/vnPh3GxFwa",
    __v: 0,
  },
  {
    _id: ObjectId("60a533d0266a4f2cc69925fa"),
    email: "kolton.c.decker@gmail.com",
    name: "Kolton",
    phone: "4841110499",
    password: "$2a$10$wwufUMA88PNQlCyvA4lj2eJPTfRrBVDAAnTwtJWThTStFkq6phGCm",
    __v: 0,
  },
  {
    _id: ObjectId("60a5344d266a4f2cc69925fc"),
    email: "steve.babb@outlook.com",
    name: "Steve",
    phone: "9132201212",
    password: "$2a$10$YFATTMrJQuOUgo/4qTsjEuQADymcbMXqM1xpqNnE2t/97p027lZVO",
    __v: 0,
  },
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data);
    console.log(`${data.result.n}  'user records inserted!'`);
    // process.exit(0)
  })
  .catch((err) => {
    console.error(err);
    // process.exit(1)
  });

// db.Profile.deleteMany({})
//   .then(() => db.Profile.collection.insertMany(profileSeed))
//   .then((data) => {
//     console.log(data);
//     console.log(`${data.result.n}  'profile records inserted!'`);
//     process.exit(0)
//   })
//   .catch((err) => {
//     console.error(err);
//     // process.exit(1)
//   });

// db.Post.deleteMany({})
//   .then(() => db.Post.collection.insertMany(postSeed))
//   .then((data) => {
//     console.log(data);
//     console.log(`${data.result.n}  'profile records inserted!'`);
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });
