const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const categoryValidator = (data) => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";

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

module.exports = categoryValidator;
