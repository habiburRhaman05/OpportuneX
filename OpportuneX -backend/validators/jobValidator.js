const Joi = require("joi")

// Create Job Schema
exports.createJobSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  company: Joi.string().required(),
  location: Joi.string().required(),
  salary: Joi.number().min(0).optional(),
  jobType: Joi.string().valid("full-time", "part-time", "contract").required(),
  experienceLevel: Joi.string().valid("junior", "mid", "senior").required(),
  skillsRequired: Joi.array().items(Joi.string().min(2)).min(1).required(),
  postedBy: Joi.string().required(), // userId
  designation:Joi.string().required()
});

// Update Job Schema
exports.updateJobSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  company: Joi.string().optional(),
  location: Joi.string().optional(),
  salary: Joi.number().min(0).optional(),
  jobType: Joi.string().valid("full-time", "part-time", "contract").optional(),
  experience: Joi.string().valid("junior", "mid", "senior").optional(),
  skills: Joi.array().items(Joi.string().min(2)).min(1).optional(),
}).min(1); // Must have at least one field
