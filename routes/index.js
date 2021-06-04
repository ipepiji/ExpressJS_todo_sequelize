
const express = require("express");
const userApi = require("./user.route");

const router = express.Router();

router.use("/user", userApi);

module.exports = router;