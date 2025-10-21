const express = require('express');
const { createCompany, searchCompanies } = require('../controllers/companyController');
const { authenticatedRoutes } = require('../middlewares/authMiddleware');



const router = express.Router();

// Register API
router.post('/create',authenticatedRoutes, createCompany);
router.get('/search-companies', searchCompanies);




module.exports = router;
