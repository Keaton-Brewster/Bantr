const router = require("express").Router();
const passport = require("../Passport");
const db = require("../models");

router.get("/:phoneNumber", (request, response) => {
  const { phoneNumber } = request.params;
  console.log(phoneNumber);
});

router.post("/login", passport.authenticate("local"), (request, response) => {
  const { user } = request;
  response.send(user).status(200);
});

router.post("/addContact", (request, response) => {
  const { phoneNum, user_id } = request.body;
  console.log(request.user);

  try {
    db.User.findOne({ _id: user_id })
      .then((doc) => {
        console.log(doc);
        response.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        response.sendStatus(404);
      });
  } catch (err) {
    console.error(err);
    response.sendStatus(400);
  }
});

module.exports = router;
