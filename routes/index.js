
const express = require("express");
const userApi = require("./user.route");

const passport = require("passport");
require("../middlewares/auth/passport")(passport);

const router = express.Router();

router.use("/user", passport.authenticate("jwt", { session: false }), userApi);

module.exports = router;