const router = require("express").Router();
const db = require("../models");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

//todo I WILL NEED TO COME IN AT SOMEPOINT AND MAKE SURE THAT ALL CONVERSATIONS ARE BEING SENT BACK IN REVERSE CHRONILOGICAL ORDER

router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;

  try {
    db.User.findOne({ _id: user_id }).then((user) => {
      db.Conversation.find({ _id: { $in: user.conversations } })
        .sort("-updated_at")
        .then((convos) => {
          res.send(convos);
        })
        .catch((error) => {
          console.error(error);
          res.sendStatus(404);
        });
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
            photoURL: user.photoURL,
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
  const { message_info, conversation } = request.body;

  try {
    const message = {
      content: message_info.content,
      sender_id: ObjectId(message_info.sender_id),
    };
    /* Because I am using a seperate array of the conversation_ids 
    Stored on each user, Every time a message is sent, I need to check
    if the user has 'deleted that conversation' because if so, it needs to 
    reappear for them so that they see the new messages
    */
    db.User.find({ _id: { $in: conversation.members } })
      .then((users) => {
        users.forEach((user) => {
          if (!user.conversations.includes(conversation._id)) {
            user.conversations.push(conversation._id);
            user.save();
          }
        });
      })
      .then(() => {
        db.Conversation.findOne({ _id: conversation._id })
          .then((convo) => {
            if (convo) {
              convo.messages.push(message);
              convo.updated_at = Date.now();
              convo.save().then((convo) => response.send(convo).status(200));
            } else {
              response.sendStatus(404);
            }
          })
          .catch((err) => {
            console.error(err);
            response.send(err).status(400);
          });
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
      {
        members: {
          $size: newConversation.members.length,
          $all: newConversation.members,
        },
      },
      (err, exists) => {
        if (exists) {
          db.User.find({ _id: { $in: newConversation.members } }).then(
            (users) => {
              users.forEach((user) => {
                if (!user.conversations.includes(newConversation._id)) {
                  user.conversations.push(newConversation._id);
                  user.save();
                }
              });
              db.Conversation.findOne({
                members: {
                  $size: newConversation.members.length,
                  $all: newConversation.members,
                },
              })
                .then((doc) => {
                  res.status(202).send(doc);
                })
                .catch((err) => res.send(err).status(500));
            }
          );
        } else if (!exists) {
          db.Conversation.create(newConversation)
            .then((response) => {
              db.User.find({ _id: { $in: newConversation.members } }).then(
                (users) => {
                  users.forEach((user) => {
                    user.conversations.push(response._id);
                    user.save();
                  });
                  res.status(200).send(response);
                }
              );
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

router.put("/hideConversation", (req, res) => {
  try {
    // console.log(req.body);
    db.Conversation.findOneAndUpdate({});
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
