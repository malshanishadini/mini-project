const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.userLevel = !isEmpty(data.userLevel) ? data.userLevel : "";

// Title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
// Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
// Firstname checks
if (Validator.isEmpty(data.firstName)) {
  errors.firstName = "Firstname field is required";
}
// Lastname checks
if (Validator.isEmpty(data.lastName)) {
  errors.lastName = "Lastname field is required";
}
// Userlavel checks
if (Validator.isEmpty(data.userLevel)) {
  errors.userLevel = "Userlevel field is required";
}
// Password checks
if (Validator.isEmpty(data.password)) {
  errors.password = "Password field is required";
} else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
  errors.password = "Password must be at least 6 characters";
}



return {
    errors,
    isValid: isEmpty(errors)
  };
};