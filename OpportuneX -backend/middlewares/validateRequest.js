const CustomError = require('./../utils/CustomError')


exports.validateRequest = (schema,type="body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,      // Show all errors
      allowUnknown: false,    // Disallow unknown keys
      stripUnknown: true      // Remove unknown keys
    });

    if (error) {
      // Replace double quotes with single quotes in Joi messages
      const messages = error.details.map(err => err.message.replace(/"/g, "'"));
      return next(new CustomError(messages.join(', '), 400));
    }

    req[type] = schema.validate(req[type], { stripUnknown: true }).value;
    next();
  };
};
