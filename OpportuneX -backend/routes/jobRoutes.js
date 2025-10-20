
const { createJob,updateJob, getJobDetails,getAllJobs ,applyJob, getAllAppledJobs, searchJob, getAllApplication, getJobApplicants, getJobCategories, savedJob, selectApplications, rejectApplications, shortListApplications } = require('../controllers/jobController');
const express = require('express');
const { authenticatedRoutes, authorize } = require('../middlewares/authMiddleware');



const router = express.Router();

// Register API
router.get('/all', getAllJobs);
router.get('/search', searchJob);
// candidate can access
router.get('/applied-jobs/:userId', authenticatedRoutes,authorize(['candidate']), getAllAppledJobs);
router.get('/:jobId/details', getJobDetails);
router.post('/:jobId/apply', applyJob);
router.post('/:jobId/save',authenticatedRoutes,authorize(['candidate']), savedJob);
router.put('/:jobId/update', updateJob);
router.get('/:jobId/applicants', getJobApplicants);
router.get('/categories', getJobCategories);
router.get('/all-applications',authenticatedRoutes,authorize(['recruiter']),  getAllApplication);
router.post('/select-applications',authenticatedRoutes,authorize(['recruiter']),  selectApplications);
router.post('/reject-applications',authenticatedRoutes,authorize(['recruiter']),  rejectApplications);
router.post('/shortlist-applications', authenticatedRoutes,authorize(['recruiter']), shortListApplications);
router.post('/create',authenticatedRoutes,authorize(['recruiter']),  createJob);




module.exports = router;
