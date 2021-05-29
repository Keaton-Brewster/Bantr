const router = require("express").Router();
const bcrypt = require("bcryptjs");
const axios = require("axios");

const mongoose = require("mongoose");
const passport = require("../config/passport");

const ObjectId = require("mongodb").ObjectId;

router.post("/signup", (request, response) => {
  console.log(request.body);
});

module.exports = router;
