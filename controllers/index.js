const router = require("express").Router();
const users = require("./userController");
const conversations = require("./conversationController");

router.use("/api/users", users);
router.use("/api/conversations", conversations);

module.exports = router;
