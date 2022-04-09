const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("../Passport");
const db = require("../models");
const { ObjectId } = mongoose.Types;

router.get("/:_id", (request, response) => {
  const { _id } = request.params;
  //! set up return for contact information
});

// Route for returning all contact information for all users that are in a
// Persons contact list. using put because of complex data
router.put("/getContacts", (request, response) => {
  const { id_array } = request.body;

  try {
    db.User.find({ _id: {$in: id_array } })
      .then((result) => {
        response.send(result).status(200);
      })
      .catch((err) => {
        response.sendStatus(400);
        console.error(
          "Error in gathering contact information ::: ROUTE: 'api/users/getContacts' ::: userController.js"
        );
      });
  } catch (err) {
    response.sendStatus(400);
    console.error(
      "Error in gathering contact information ::: ROUTE: 'api/users/getContacts' ::: userController.js"
    );
  }
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

        if (contactExists) {
          response.send(null).status(200);
        } else {
          db.User.findOneAndUpdate(
            { _id: user_id },
            { $push: { contacts: ObjectId(_id) } },
            { new: true }
          ).then((result) => {
            response.send(result).status(202);
          });
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
