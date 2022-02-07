const router = require('express').Router()
const db = require('../models')
const { ObjectID } = require("mongodb")
const conversations = db.Conversation;

router.get("/:user_id", (request, response) => {
    const { user_id } = request.params;

    console.log(`User id (conversationsController.js) ${ObjectID(user_id)}`)

    try {
        // This does not work yet
        conversations.find({ members: { $in: ObjectID(user_id) } })
            .then(doc => {
                console.log(doc)
                response.send(doc).status(200);
            })
            .catch(err => {
                console.log(err)
                response.send(err).status(404)
            });

    }
    catch (err) {
        console.log(err)
        response.sendStatus(500)
    }
})

module.exports = router