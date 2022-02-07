const router = require('express').Router()
const db = require('../models')

router.get("/login", (request, response) => {
    try {
        const { authorization } = request.headers
        const buff = new Buffer(authorization, 'base64')
        const auth = buff.toString('ascii')
        
        db.User.findOne({g_id: auth}).then(user => {console.log(user)})
    }
    catch (e) {
        console.log(`Error in userController --- METHOD: GET --- TYPE: LOGIN --- ERROR: ${e}`)
        response.sendStatus(500)
    }
})

module.exports = router