const router = require("express").Router();
const db = require("../models");
const ObjectId = require("mongodb").ObjectID;

//todo I WILL NEED TO COME IN AT SOMEPOINT AND MAKE SURE THAT ALL CONVERSATIONS ARE BEING SENT BACK IN REVERSE CHRONILOGICAL ORDER

router.get("/", (req, res) => {
  const userId = process.env.NODE_ENV === "production" ? req.user.id : "User1";
  // More breaks just to try and get things to work
  // const userId = process.env.NODE_ENV === "production" ? req.user._id : "User1";
  try {
    db.Conversation.find({ participants: { $in: userId } })
      .then((convos) => {
        res.send(convos);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  } catch (error) {
    console.error(error);
    res.send(500);
  }
});

module.exports = router;
