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

router.get("/getInfo/:conversationInformation", async (req, res) => {
    try {
        const conversationInformation = JSON.parse(
            req.params.conversationInformation
        );
        const reformattedIds = conversationInformation.members.map((id) =>
            ObjectId(id)
        );
        const membersInformation = await db.User.find({
            _id: { $in: reformattedIds },
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