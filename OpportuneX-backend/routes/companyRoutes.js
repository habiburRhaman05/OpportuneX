const express = require('express');
const { createCompany, searchCompanies, otpVerifyCompanyForm, sendVerifyFormOtp, receiveVerifyCompanyForm } = require('../controllers/companyController');
const { authenticatedRoutes, authorize } = require('../middlewares/authMiddleware');



const router = express.Router();

// Register API
router.post('/create',authenticatedRoutes,authorize(["recruiter"]), createCompany);
router.get('/search-companies', searchCompanies);
router.post('/verify-otp', otpVerifyCompanyForm);
router.post('/send-verify-otp', sendVerifyFormOtp);
router.post('/verify-form-submit',authenticatedRoutes, receiveVerifyCompanyForm);

module.exports = router;
