const Company = require("../models/company");
const Recruiter = require("../models/recruiter");
const Candidate = require("../models/candidate");
const searchDBClient = require("../utils/searchDB.js")
const logger =  require("../utils/logger.js");
const { validationResult } = require("express-validator");
// import searchDBClient from "../utils/searchDBClient.js"; // Elasticsearch client

// @desc    Create Company
// @route   POST /api/v1/companies
// @access  Private (Recruiter/Admin)
exports.createCompany = async (req, res, next) => {
  try {
          const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, errors: errors.array() });
        }
    const { name, location, description, website ,officialEmail,industry,size} = req.body;

      const recruiter = await Recruiter.findOne({ email:req.user.email });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found with this email",
      });
    }

    const company = await Company.create({
      name,
      location,
      officialEmail,
      description,
      website,
      createdBy:recruiter._id,industry
      ,size
    });

    recruiter.company = company._id;
    company.recruiters.push(recruiter._id);
    recruiter.onboardingSteps = {
     register:true,
     emailVerification:true,
     company:true
   }
    await recruiter.save();
    await company.save();


    // Sync to Elasticsearch
    // await searchDBClient.index({
    //   index: "companies",
    //   id: company._id.toString(),
    //   document: {
    //     name,
    //     location,
    //     description,
    //     website,
    //   },
    // });

    logger.info(`Company created: ${company.name}`);

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc    Search Companies
// @route   GET /api/v1/companies/search
// @access  Public
exports.searchCompanies = async (req, res, next) => {
  try {
    const { q } = req.query;

    // const result = await searchDBClient.search({
    //   index: "companies",
    //   query: {
    //     multi_match: {
    //       query: q,
    //       fields: ["name", "location", "description"],
    //     },
    //   },
    // });

    // return res.status(200).json({
    //   success: true,
    //   data: result.hits.hits.map(hit => hit._source),
    // });
    return res.status(200).json({
      success: true,
      data:[
        {
          _id:3244694949,
          name:"google",
          location:"america",
        },
        {
          _id:32446984949,
          name:"amazon",
          location:"india",
        },
      ],
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc    Update Company
// @route   PUT /api/v1/companies/:id
// @access  Private (Owner/Admin)
exports.updateCompany = async (req, res, next) => {
  try {
    const updates = req.body;
    // const company = await Company.findByIdAndUpdate(req.params.id, updates, {
    //   new: true,
    // });

    // if (!company) {
    //   return res.status(404).json({ success: false, message: "Company not found" });
    // }

    // // Update Elasticsearch
    // await searchDBClient.update({
    //   index: "companies",
    //   id: company._id.toString(),
    //   doc: updates,
    // });

    return res.status(200).json({
      success: true,
      message: "Company updated",
      // data: company,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc    Delete Company
// @route   DELETE /api/v1/companies/:id
// @access  Private (Owner/Admin)
exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    // Remove from Elasticsearch
    await searchDBClient.delete({
      index: "companies",
      id: company._id.toString(),
    });

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};


// @desc    choose existing Company
// @route   POST /api/v1/companies
// @access  Private (Recruiter/Admin)
exports.chooseCompany = async (req, res, next) => {
  try {
          const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, errors: errors.array() });
        }
    const { companyId,recuriterEmail} = req.body;

      const recruiter = await Recruiter.findOne({ email:recuriterEmail });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found with this email",
      });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Your selected company not found or not registered",
      });
    }

    recruiter.company = company._id;
    company.recruiters.push(recruiter._id);
    recruiter.onboardingSteps = {
     register:true,
     emailVerification:true,
     company:true
   }
    await recruiter.save();
    await company.save();


    // Sync to Elasticsearch
    await searchDBClient.index({
      index: "companies",
      id: company._id.toString(),
      document: {
        name,
        location,
        description,
        website,
      },
    });

    logger.info(`Company created: ${company.name}`);

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc   verify company by officialEmail
// @route   POST /api/v1/companies
// @access  Private (Recruiter/Admin)
exports.verifyCompany = async (req, res, next) => {
  try {
          const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, errors: errors.array() });
        }
    const { companyId,recuriterEmail,companyEmail} = req.body;

      const recruiter = await Recruiter.findOne({ email:recuriterEmail });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found with this email",
      });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Your selected company not found or not registered",
      });
    }

    recruiter.company = company._id;
    company.recruiters.push(recruiter._id);
    recruiter.onboardingSteps = {
     register:true,
     emailVerification:true,
     company:true
   }
    await recruiter.save();
    await company.save();


    // Sync to Elasticsearch
    await searchDBClient.index({
      index: "companies",
      id: company._id.toString(),
      document: {
        name,
        location,
        description,
        website,
      },
    });

    logger.info(`Company created: ${company.name}`);

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};