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

  try {
    db.User.findOne({ phoneNum })
      .then(async (contact) => {
        console.log("contact to add", contact);
        const user = await db.User.findOne({ _id: user_id });

        console.log("user", user);
        // db.User.findOneAndUpdate(
        //   { _id: user_id },
        //   { contacts: { $push: contact } }
        // );
        response.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        response.sendStatus(404);
      });
  } catch (err) {
    console.error(
      `ERROR userController.js ::: Error adding contact ::: ${err}`
    );
    response.sendStatus(400);
  }
});

module.exports = router;
