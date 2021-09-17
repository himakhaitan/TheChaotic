const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const authorValidation = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.socials = !isEmpty(data.socials) ? data.socials : {};

  if (!isEmpty(data.socials.instagram)) {
    if (!validator.isURL(data.socials.instagram)) {
      errors.instagram = "Not a Valid URL!";
    }
  }
  if (!isEmpty(data.socials.facebook)) {
    if (!validator.isURL(data.socials.facebook)) {
      errors.facebook = "Not a Valid URL!";
    }
  }
  if (!isEmpty(data.socials.linkedin)) {
    if (!validator.isURL(data.socials.linkedin)) {
      errors.linkedin = "Not a Valid URL!";
    }
  }
  if (!isEmpty(data.socials.github)) {
    if (!validator.isURL(data.socials.github)) {
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
