const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const authorValidation = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  
  

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
