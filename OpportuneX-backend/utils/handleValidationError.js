// utils/handleValidationError.js
const { validationResult } = require('express-validator');

const handleValidationError = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({
        path: err.path,
        message: err.msg
      }))
    });
  }
  return null;
};

module.exports = handleValidationError;
