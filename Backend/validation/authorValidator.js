const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const authorValidation = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.instagram = !isEmpty(data.instagram) ? data.instagram : {};
  data.facebook = !isEmpty(data.facebook) ? data.facebook : {};
  data.github = !isEmpty(data.github) ? data.github : {};
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : {};

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a Valid URL!";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a Valid URL!";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a Valid URL!";
    }
  }
  if (!isEmpty(data.github)) {
    if (!validator.isURL(data.github)) {
      errors.github = "Not a Valid URL!";
    }
  }
  if (isEmpty(data.name)) {
    errors.name = "Name must not be Empty";
  }
  if (!validator.isLength(data.desc, { min: 10, max: 100 })) {
    errors.desc = "Description must be 10 to 100 char long!";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = authorValidation;
