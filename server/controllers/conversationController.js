const router = require('express').Router()
const db = require('../models')
const ObjectId = require('mongodb').ObjectId;

router.get("/:_id", (request, response) => {
    const { _id } = request.params;
    try {
        // This does not work yet
        db.Conversation.find({ members: { $in: _id } })
            .then((doc) => {

                response.send(doc).status(200);
            })
            .catch((err) => {
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