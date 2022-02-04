const router = require("express").Router();

const users = require("./userController");
const conversation = require("./conversationController");

router.use("/api/users", users);
router.use("/api/conversations", conversation);

module.exports = router;
