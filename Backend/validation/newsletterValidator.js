const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const validateNewsletter = (data) => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.preference = !isEmpty(data.preference) ? data.preference : "";

  //   Preference Validation
  if (!validator.isBoolean(data.preference.toString())) {
    errors.preference = "Preference Field Must be Boolean!";
  }
  if (isEmpty(data.preference)) {
    errors.preference = "Preference Field Is Required!";
  }

  // Email Valiation
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid E-mail";
  }
  if (isEmpty(data.email)) {
    errors.email = "E-mail Field is Required!";
  }

  // Name
  if (isEmpty(data.name)) {
    errors.name = "Name Field is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateNewsletter;
