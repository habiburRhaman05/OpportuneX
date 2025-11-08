const Job = require("../models/job.js")

exports.createJobService = async (data, recruiterId) => {
  return await Job.create({ ...data, createdBy: recruiterId });
};

exports.getJobsService = async (filters = {}, pagination = {}) => {
  const { page = 1, limit = 10 } = pagination;

  const skip = (page - 1) * limit;

  // Build query with filters
  const query = Job.find()
    .populate({
      path: "companyId",
      model: "Company"
    })

  // Execute query
  const jobs = await query;


  return jobs
};

exports.updateJobService = async (id, updates) => {

  const updatedJob = await Job.findByIdAndUpdate(id, updates, {
    new: true,             // return the updated document
    runValidators: true    // ensure validation rules are respected
  });

  return updatedJob;
};
exports.deleteJobService = async (id) => {
  return await Job.findByIdAndDelete(id);
};

exports.getJobDetailsService = async (jobId) => {
  const job = await Job.findById(jobId)
    .populate({
      path: "companyId",
      model: "Company"
    });

  return job;
};
