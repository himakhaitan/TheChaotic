const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const validateNewsletter = (data) => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  // Email Valiation
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid E-mail";
  }
  if (isEmpty(data.email)) {
    errors.email = "E-mail Field is Required!";
  }
  //  Name Validation
  if (isEmpty(data.name)) {
    errors.name = "Name Field is Required!";
  }
  //   Message Validation
  if (!validator.isLength(data.message, { min: 10, max: 200 })) {
    errors.message = "Message must be of the length 10 to 200 charachters!";
  }

  if (isEmpty(data.message)) {
    errors.message = "Message Field is Required!";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateNewsletter;
