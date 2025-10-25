const Candidate = require("../models/candidate");



exports.getUserById = async  (id)  =>{
 const candidate = await Candidate.findById(id).select("-password -emailOtp ");
  return  candidate
}






