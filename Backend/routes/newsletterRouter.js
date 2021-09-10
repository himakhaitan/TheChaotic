const express = require("express");
const router = express.Router();

const validateNewsletter = require("../validation/newsletterValidator");
const Newsletter = require("../models/Newsletter");

/*
Method  : POST
Route   : /newsletter/join
Access  : Public
*/
router.post("/join", async (req, res) => {
  const { errors, isValid } = await validateNewsletter(req.body);
  if (!isValid) {
    return res.status(406).json({
      success: false,
      message: "Sent data was InValid",
      errors,
    });
  }
  //   Checking if Email Data Exists
  Newsletter.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }

    if (user) {
      return res.status(400).json({
        success: false,
        message: "E-mail Already Exists",
      });
    }
  });

  const newsletter = await new Newsletter({
    name: req.body.name,
    email: req.body.email,
    preference: req.body.preference,
  });

  const savedNewsletter = await newsletter.save();
  if (!savedNewsletter) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }

  res.json({
    status: true,
    message: "E-mail Registration Successfull",
  });
});

module.exports = router;
