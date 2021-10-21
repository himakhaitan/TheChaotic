const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const newsletterValidator = require("../validation/newsletterValidator");
const contactValidator = require("../validation/contactValidator");
const Newsletter = require("../models/Newsletter");
const Contact = require("../models/Contact");
const passport = require("passport");

/*
Method  : POST
Route   : /connect/newsletter/join
Func    : Newsletter Signup
Access  : Public
*/
router.post("/newsletter/join", async (req, res) => {
  const { errors, isValid } = await newsletterValidator(req.body);
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
Method  : GET
Route   : /connect/newsletter/all
Func    : Fetch Newsletter Data
Access  : Private
*/

router.get(
  "/newsletter/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const newsletter = await Newsletter.find();
    if (!newsletter) {
      return res.json({
        success: false,
        message: "Internal Server Error!",
      });
    }
    return res.json({
      success: true,
      newsletter,
      message: "Emails Found!",
    });
  }
);

/*
Method  : GET
Route   : /connect/newsletter/:id
Func    : Fetch Newsletter Data by Id
Access  : Private
*/

router.get(
  "/newsletter/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: "Invalid ID!",
      });
    }

    const newsletter = await Newsletter.findByIdAndDelete(id);

    if (!newsletter) {
      return res.json({
        success: false,
        message: "No Newsletter Found!",
      });
    }
    return res.json({
      success: true,
      message: "Newsletter Deleted",
    });
  }
);

/*
Method  : POST
Route   : /connect/form/submit
Func    : Contact For Submit
Access  : Public
*/
router.post("/form/submit", async (req, res) => {
  const { errors, isValid } = await contactValidator(req.body);

  if (!isValid) {
    return res.json({
      success: false,
      message: "Invalid Data",
      errors,
    });
  }

  // Checking Array Length

  const data = await Contact.find({ email: req.body.email });
  if (data) {
    if (data.length > 2) {
      return res.json({
        success: false,
        message: "You already have 3 contact requests pending!",
      });
    } else {
      const newContact = await new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });

      const savedContact = newContact.save();

      if (!savedContact) {
        return res.json({
          success: false,
          message: "Internal Server Error!",
        });
      }

      return res.json({
        success: true,
        message:
          "Contact Request Registered! Site Admin will reach you within 48 business hours!",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});

/*
Method  : GET
Route   : /connect/form/all
Func    : Fetch Contact Response Data
Access  : Private
*/

router.get(
  "/form/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const contact = await Contact.find();
    if (!contact) {
      return res.json({
        success: false,
        message: "Internal Server Error!",
      });
    }
    return res.json({
      success: true,
      contact,
      message: "Responses Found!",
    });
  }
);

/*
Method  : GET
Route   : /connect/form/:id
Func    : Fetch Contact Repsonse by ID
Access  : Private
*/

router.get(
  "/form/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: "Invalid ID!",
      });
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.json({
        success: false,
        message: "No Contact Response Found!",
      });
    }
    return res.json({
      success: true,
      message: "Contact Deleted",
    });
  }
);

module.exports = router;
