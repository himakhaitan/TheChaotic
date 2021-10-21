const express = require("express");
const router = express.Router();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");

/*
Method  : POST
Route   : /authentication/login
Func    : LOGIN
Access  : Public
*/

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!validator.isEmail(email) || !password || password.length === 0) {
    return res.json({
      success: false,
      message: "Invalid Data Sent!",
    });
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_ID) {
    let payload = {
      id: process.env.ADMIN_ID,
      email: email,
    };
    jwt.sign(
      payload,
      process.env.jwtKEY,
      { expiresIn: 86400 },
      (err, token) => {
        if (err) {
          return res.json({
            success: false,
            message: "Internal Server Error!",
          });
        } else {
          return res.json({
            success: true,
            message: "Logged In!",
            token: `Bearer ${token}`,
          });
        }
      }
    );
  } else {
    return res.json({
      success: false,
      message: "Invalid Credentials!",
    });
  }
});

module.exports = router;
