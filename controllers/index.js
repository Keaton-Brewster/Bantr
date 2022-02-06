const router = require("express").Router();

const users = require("./userController");
const conversations = require("./conversationController");

router.get("/hello", (req, res) => {
    try {
        console.log("succesful try")
        res.send("hello").status(200)
    } catch (e) {
        console.log("hit catch")
        res.send(e).status(400)
    }
});

router.use("/api/users", users);
router.use("/api/conversations", conversations);

module.exports = router;
