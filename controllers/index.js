const router = require("express").Router();

const users = require("./User");

router.use("/api/users", users);

module.exports = router;
