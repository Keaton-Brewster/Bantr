const router = require("express").Router();
const db = require("../models");
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types

//todo I WILL NEED TO COME IN AT SOMEPOINT AND MAKE SURE THAT ALL CONVERSATIONS ARE BEING SENT BACK IN REVERSE CHRONILOGICAL ORDER

router.get("/:id", (req, res) => {
    const userId = req.params.id;
    try {
        db.Conversation.find({ "members": { $in: [ObjectId(userId)] } })
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
    console.log(req.params)
    try {
        const { convo_id } = req.params;

        const conversationInformation = await db.Conversation.findOne({ _id: convo_id })
        const memberIds = conversationInformation.members.map(id => ObjectId(id))

        const membersInformation = await db.User.find({
            _id: { $in: memberIds },
        })
            .then((users) => {
                return users.map((user) => {
                    return {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        picture: user.picture,
                    };
                });
            })
            .catch((error) => {
                console.error(error);
                res.sendStatus(404);
            });

        conversationInformation.members = membersInformation;
        res.send(conversationInformation);
    } catch (error) {
        console.error(
            "Error getting conversation information :: controllers/Conversations line50",
            error
        );
        res.sendStatus(500);
    }
});

router.put("/newMessage", (request, response) => {
    const { message, conversation_id } = request.body
    console.log(message, conversation_id);

    db.Conversation.findOneAndUpdate(
        { _id: conversation_id },
        { messages: { $push: message } },
        { new: true }
    )
        .then(result => { console.log("result:", result) })
        .catch(err => { console.error(err) });
})

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
            "Error updating conversation name :: controllers/Conversations line 71",
            error
        );
        res.sendStatus(500);
    }
});

module.exports = router;