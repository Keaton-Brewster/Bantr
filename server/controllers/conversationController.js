const router = require("express").Router();
const db = require("../models");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

//todo I WILL NEED TO COME IN AT SOMEPOINT AND MAKE SURE THAT ALL CONVERSATIONS ARE BEING SENT BACK IN REVERSE CHRONILOGICAL ORDER

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  try {
    db.Conversation.find({ members: { $in: [ObjectId(userId)] } })
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

router.get("/getInfo/:convo_id", async (req, res) => {
  try {
    const { convo_id } = req.params;

    let conversationInformation = await db.Conversation.findOne({
      _id: convo_id,
    });
    const memberIds = conversationInformation.members.map((id) => ObjectId(id));

    const membersInformation = await db.User.find({
      _id: { $in: memberIds },
    })
      .then((users) => {
        return users.map((user) => {
          return {
            _id: user._id,
            email: user.email,
            givenName: user.givenName,
            familyName: user.familyName,
            phoneNum: user.phoneNum,
            imageUrl: user.imageUrl,
          };
        });
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });

    res.send(membersInformation);
  } catch (error) {
    console.error(
      "Error getting conversation information :: controllers/Conversations line50",
      error
    );
    res.sendStatus(500);
  }
});

router.put("/newMessage", (request, response) => {
  const { message_info, conversation_id } = request.body;

  try {
    const message = {
      content: message_info.content,
      sender_id: ObjectId(message_info.sender_id),
    };

    db.Conversation.findOne({ _id: conversation_id })
      .then((doc) => {
        if (doc) {
          doc.messages.push(message);
          doc.save().then((doc) => response.send(doc).status(200));
        } else {
          response.sendStatus(404);
        }
        // response.send(result).status(200);
      })
      .catch((err) => {
        console.error(err);
        response.send(err).status(400);
      });
  } catch (e) {
    console.error(e);
    response.sendStatus(400);
  }
});

router.put("/updateConvoName", (req, res) => {
  try {
    const { _id, newName } = req.body;
    db.Conversation.findOneAndUpdate(
      { _id: _id },
      { name: newName },
      { new: true }
    )
      .then((updatedConversation) => res.send(updatedConversation))
      .catch(() => res.sendStatus(404));
  } catch (error) {
    console.error(
      "Error updating conversation name :: controllers/Conversations :: route=/updateConvoName ::",
      error
    );
    res.sendStatus(500);
  }
});

router.post("/newConversation", (req, res) => {
  try {
    const newConversation = req.body;

    db.Conversation.exists(
      { members: { $all: newConversation.members } },
      (err, exists) => {
        if (exists) {
          console.log("exists");
          db.Conversation.findOne({
            members: { $all: newConversation.members },
          })
            .then((doc) => {
              res.status(202).send(doc);
            })
            .catch((err) => res.send(err).status(500));
        } else if (!exists) {
          console.log("does not exist");
          db.Conversation.create(newConversation)
            .then((response) => {
              res.status(200).send(response)
            })
            .catch((error) => {
              res.send(500);
              console.error(error);
            });
        } else res.send(err).status(500);
      }
    );
  } catch (error) {
    console.error(
      "Error creating conversation :: controllers/Conversation :: route=/newConversation ::",
      error
    );
    res.sendStatus(500);
  }
});

module.exports = router;
