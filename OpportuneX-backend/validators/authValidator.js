const Joi = require("joi")

exports.candidateProfileSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  bio: Joi.string().min(10).required(),
  userId: Joi.string().required(),
});