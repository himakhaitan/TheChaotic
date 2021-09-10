const express = require("express");
const router = express.Router();

const emailValidator = require("../validation/emailValidator");
const Newsletter = require("../models/Newsletter");
const Contact = require("../models/Contact");
/*
Method  : POST
Route   : /connect/newsletter/join
Access  : Public
*/
router.post("/newsletter/join", async (req, res) => {
  const { errors, isValid } = await emailValidator(req.body);
  if (!isValid) {
    return res.json({
      success: false,
      message: errors.email,
    });
  }
  //   Checking if Email Data Exists
  Newsletter.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }

    if (user) {
      return res.json({
        success: false,
        message: "E-mail Already Registered!",
      });
    }
    const newsletter = await new Newsletter({
      name: req.body.name,
      email: req.body.email,
      preference: req.body.preference,
    });

    const savedNewsletter = await newsletter.save();
    if (!savedNewsletter) {
      return res.json({
        success: false,
        message: "Internal Server Error!",
      });
    }

    res.json({
      success: true,
      message: "E-mail Registration Successfull!",
    });
  });
});

/*
Method  : POST
Route   : /connect/form/submit
Access  : Public
*/
router.post("/form/submit", async (req, res) => {
  const { errors, isValid } = await emailValidator(req.body);
  if (!isValid) {
    return res.json({
      success: false,
      message: errors.email,
    });
  }

  // Checking Array Length
  
});

module.exports = router;
