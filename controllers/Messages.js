const router = require("express").Router();
const db = require("../models");

//todo I WILL NEED TO COME IN AT SOMEPOINT AND MAKE SURE THAT ALL MESSAGES ARE BEING SENT BACK IN REVERSE CHRONILOGICAL ORDER

router.get("/:convo_id", (req, res) => {
  const convo_id = req.params.convo_id;
  try {
    db.Message.find({ conversation_id: convo_id })
      .then((messages) => {
        res.send(messages);
      })
      .catch((e) => {
        console.error(e);
        res.sendStatus(400);
      });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.put("/newMessage", (req, res) => {
  try {
    db.Message.create(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((e) => {
        console.error(e);
        res.sendStatus(400);
      });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
