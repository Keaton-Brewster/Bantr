const router = require("express").Router();

const users = require("./Users");
const conversations = require("./Conversations");
const messages = require("./Messages");

router.use("/api/users", users);
router.use("/api/conversations", conversations);
router.use("/api/messages", messages);

module.exports = router;
