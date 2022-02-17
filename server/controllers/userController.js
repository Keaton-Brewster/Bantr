const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("../Passport");
const db = require("../models");
const { ObjectId } = mongoose.Types;

router.get("/:_id", (request, response) => {
  const { _id } = request.params;
  //! set up return for contact information
});

router.post("/login", passport.authenticate("local"), (request, response) => {
  const { user } = request;
  response.send(user).status(200);
});

router.post("/addContact", (request, response) => {
  const { phoneNum, user_id } = request.body;

  const checkForContact = (user, contact_id) => {
    let bool = false;
    if (!user.contacts) return false;
    else {
      user.contacts.forEach((contact) => {
        console.log("contact", contact);

        if (contact.toString() === contact_id.toString()) return (bool = true);
      });
    }
    return bool;
  };

  try {
    db.User.findOne({ phoneNum })
      .then(async (contact) => {
        const user = await db.User.findOne({ _id: user_id });
        const { _id } = contact;

        const contactExists = checkForContact(user, ObjectId(_id));

        if (!contactExists) {
          db.User.findOneAndUpdate(
            { _id: user_id },
            { $push: { contacts: ObjectId(_id) } },
            { new: true }
          ).then((result) => {
            response.send(result).status(202);
          });
        } else {
          response.send("You already have that contact, ya bozo").status(200);
        }
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
