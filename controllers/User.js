const router = require("express").Router();
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const passport = require("../config/passport");

const ObjectId = require("mongodb").ObjectId;
const db = require("../models");

router.post("/signup", (request, response) => {
  // try {
  //   db.User.create()
  // }
  response.send(request.body);
});

module.exports = router;
