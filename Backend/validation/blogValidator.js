const isEmpty = require("../utils/isEmpty");
const validator = require("validator");
const mongoose = require("mongoose");

const blogValidator = (data) => {
  let errors = {};
  data.content = !isEmpty(data.content) ? data.content : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.tags = !isEmpty(data.tags) ? data.tags : "";

  if (!validator.isLength(data.content, { min: 100 })) {
    errors.content = "Content must be atleat 100 charachter length.";
  }

  if (validator.isLength(data.title, { max: 100, min: 6 })) {
    errors.title = "Title must be 6 to 100 charachter length.";
  }

  if (!mongoose.Types.ObjectId.isValid(data.author)) {
    errors.author = "Author must be an ObjectID!";
  }

  if (!mongoose.Types.ObjectId.isValid(data.category)) {
    errors.category = "Category must be an ObjectID!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = blogValidator;
