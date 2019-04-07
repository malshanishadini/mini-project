const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";
  data.categoryID = !isEmpty(data.categoryID) ? data.categoryID : "";
  data.remarks = !isEmpty(data.remarks) ? data.remarks : "";
  data.publish = !isEmpty(data.publish) ? data.publish : "";
  
// title checks
if (Validator.isEmpty(data.title)) {
  errors.title = "Title field is required";
}

// content checks
  if (Validator.isEmpty(data.content)) {
    errors.content = "Content field is required";
  }

// CategoryID checks
  if (Validator.isEmpty(data.categoryID)) {
    errors.categoryID = "CategoryID field is required";
  }

// Remarks checks
if (Validator.isEmpty(data.remarks)) {
  errors.remarks = "Remarks field is required";
}  

// publish checks
if (Validator.isEmpty(data.publish)) {
  errors.publish = "Publish field is required";
} 

return {
    errors,
    isValid: isEmpty(errors)
  };
};