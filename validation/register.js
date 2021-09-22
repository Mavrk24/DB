const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "กรุณาใส่ Email";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email ไม่ถูกต้อง";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "กรุณาใส่รหัสผ่าน";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "กรุณายืนยันรหัสผ่าน";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "รหัสผ่านไม่ตรงหัน";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};