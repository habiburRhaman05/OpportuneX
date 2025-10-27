const express = require('express');
const { createCompany, searchCompanies } = require('../controllers/companyController');
const { authenticatedRoutes, authorize } = require('../middlewares/authMiddleware');



const router = express.Router();

// Register API
router.post('/create',authenticatedRoutes,authorize(["recruiter"]), createCompany);
router.get('/search-companies', searchCompanies);




module.exports = router;
