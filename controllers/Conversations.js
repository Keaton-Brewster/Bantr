const router = require("express").Router();
const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

//todo I WILL NEED TO COME IN AT SOMEPOINT AND MAKE SURE THAT ALL CONVERSATIONS ARE BEING SENT BACK IN REVERSE CHRONILOGICAL ORDER

router.get("/:id", (req, res) => {
  const userId = req.params.id;
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

router.get("/getInfo/:conversationInformation", async (req, res) => {
  try {
    const conversationInformation = JSON.parse(
      req.params.conversationInformation
    );
    const reformattedIds = conversationInformation.participants.map((id) =>
      ObjectId(id)
    );
    const participantsInformation = await db.User.find({
      _id: { $in: reformattedIds },
    })
      .then((users) => {
        return users.map((user) => {
          return {
            _id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
          };
        });
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });

    conversationInformation.participants = participantsInformation;
    res.send(conversationInformation);
  } catch (error) {
    console.error(
      "Error getting conversation information :: controllers/Conversations line50",
      error
    );
    res.sendStatus(500);
  }
});

module.exports = router;
