const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const validateEmail = (data) => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";

  // Email Valiation
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid E-mail";
  }
  if (isEmpty(data.email)) {
    errors.email = "E-mail Field is Required!";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateEmail;
