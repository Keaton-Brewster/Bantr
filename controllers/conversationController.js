const router = require('express').Router()
const db = require('../models')
const conversations = db.Conversation;

router.get((request, response) => {
    const user_id = request;
    response.send(user_id);
    try {
        // I am just now redoing this controller, and ran out of time to test. Will get back to this.
        conversations.findOne({_id: user_id})
        .then(doc => {
            response.send(doc);
        })
        .catch(err => {
            response.send(err)
        });

    }
    catch (err) {
        console.log(err)
        response.send(err)
    }
})

module.exports = router