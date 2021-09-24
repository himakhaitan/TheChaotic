const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const commentValidator = (data) => {
  let errors = {};
  data.comment = !isEmpty(data.comment) ? data.comment : "";
  if (!validator.isLength(data.comment, { max: 100 })) {
    errors.comment = "Comment must be less than 100 char longs!";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = commentValidator;
