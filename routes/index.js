
const express = require("express");
const userApi = require("./user.route");

const passport = require("passport");
require("../middlewares/auth/passport")(passport);

const router = express.Router();

router.use("/user", userApi.unprotected);
router.use("/user", passport.authenticate("jwt", { session: false }), userApi.protected);

module.exports = router;