const router = require('express').Router()
const db = require('../models')
const conversations = db.Conversation;

router.get((request, response) => {
    const user_id = request.params;
    try {

        // I am just now redoing this controller, and ran out of time to test. Will get back to this.
        conversations.findById(user_id => response.send(user_id));

    }
    catch {

    }
})

module.exports = router