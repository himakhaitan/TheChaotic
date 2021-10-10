const express = require("express");
const fs = require("fs");
const router = express.Router();
const upload = require("../middlewares/upload");
const Author = require("../models/Author");
const Category = require("../models/Category");

// Validator
const authorValidation = require("../validation/authorValidator");
const categoryValidator = require("../validation/categoryValidator");
// Author Routes

/*
Method  : POST
Route   : /assist/author/create
Access  : Private
*/
router.post("/author/create", upload.single("profileImg"), async (req, res) => {
  const { errors, isValid } = authorValidation(req.body);
  if (!isValid) {
    fs.unlinkSync("uploads\\" + req.file.filename);
    return res.json({
      success: false,
      errors,
    });
  }

  const data = {
    name: req.body.name,
    desc: req.body.desc,
    profilePhoto: {
      contentType: req.file.mimetype,
    },
  };
  if (req.body.socials.instagram)
    data.socials.instagram = req.body.socials.instagram;
  if (req.body.socials.facebook)
    data.socials.facebook = req.body.socials.facebook;
  if (req.body.socials.github) data.socials.github = req.body.socials.github;
  if (req.body.socials.linkedin)
    data.socials.linkedin = req.body.socials.linkedin;

  data.profilePhoto.data = fs.readFileSync("uploads\\" + req.file.filename);

  const newAuthor = await new Author(data);

  if (!newAuthor) {
    fs.unlinkSync("uploads\\" + req.file.filename);
    return res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }

  const savedAuthor = await newAuthor.save();

  if (!savedAuthor) {
    fs.unlinkSync("uploads\\" + req.file.filename);
    return res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
  fs.unlinkSync("uploads\\" + req.file.filename);
  res.json({
    success: true,
    author: savedAuthor,
    message: "Author Creation Successful.",
  });
});

/*
Method  : GET
Route   : /assist/author/all
Access  : Public
*/
router.get("/author/all", async (req, res) => {
  const authors = await Author.find({});

  if (!authors) {
    return res.json({
      success: false,
      message: "No Authors Found!",
    });
  }

  return res.json({
    success: true,
    message: "Authors Found!",
    authors: authors.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    }),
  });
});

// Category Routes

/*
Method  : POST
Route   : /assist/category/create
Access  : Private
*/

router.post("/category/create", async (req, res) => {
  const { errors, isValid } = categoryValidator(req.body);

  if (!isValid) {
    return res.json({
      success: false,
      errors,
    });
  }

  //   Finding Existence
  const exisitingCategory = await Category.findOne({
    name: req.body.name.toLowerCase(),
  }).exec();

  if (exisitingCategory) {
    return res.json({
      success: false,
      message: "Category Already Exisits",
    });
  }

  const data = {
    name: req.body.name.toLowerCase(),
    desc: req.body.desc,
  };

  const newCategory = await new Category(data);
  if (!newCategory) {
    return res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
  const savedCategory = await newCategory.save();

  if (!savedCategory) {
    return res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }

  return res.json({
    success: true,
    message: "Category Created!",
    category: savedCategory,
  });
});

/*
Method  : GET
Route   : /assist/category/all
Access  : Public
*/

router.get("/category/all", async (req, res) => {
  const categories = await Category.find({});

  if (!categories) {
    return res.json({
      success: false,
      message: "No Category Found!",
    });
  }

  return res.json({
    success: true,
    message: "Categories Found!",
    categories: categories.map((item) => {
      return {
        id: item.id,
        name: item.name,
        count: 12,
      };
    }),
  });
});

module.exports = router;
