const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.json({
      success: true,
      token: "jdnkjdbkdc bldfnmjdofnje f",
      user: req.user,
    });
  }
);

module.exports = router;
