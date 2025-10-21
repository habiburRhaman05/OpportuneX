// routes/recruiterAuthRoutes.js

const express = require('express');

const {
  registerRecruiter,
  loginRecruiter,
  getRecruiterProfile,
  updateRecruiterProfile,
  logoutRecruiter,
  sendOtp,
  verifyOtp,
  changePassword,
  deleteAccount,
} = require( "../controllers/recruiterController.js")
// for JWT auth
const { body } = require ("express-validator")
const { authenticatedRoutes, authorize } = require("../middlewares/authMiddleware.js");
const { updateCompany } = require('../controllers/companyController.js');

const router = express.Router();

// =================== Public Routes ===================

// Register recruiter
router.post(
  "/auth/register",
  [
    body("fullName").notEmpty().withMessage("fullName is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerRecruiter
);

// Login recruiter
router.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginRecruiter
);

// Send OTP
router.post(
  "/auth/send-otp",
  [body("email").isEmail().withMessage("Valid email is required")],
  authenticatedRoutes,
  authorize(["recruiter"]),
  sendOtp
);

// Verify OTP
router.post(
  "/auth/verify-otp",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("otp").isLength({ min: 4, max: 6 }).withMessage("Valid OTP required"),
  ],
    authenticatedRoutes,
  authorize(["recruiter"]),
  verifyOtp
);




// =================== Private Routes ===================

// Get profile
router.get("/auth/profile/me", authenticatedRoutes,authorize(["recruiter"]), getRecruiterProfile);


// Update profile
router.put("/auth/profile/update", authenticatedRoutes,authorize(["recruiter"]), updateRecruiterProfile);
router.put("/auth/company/update", authenticatedRoutes,authorize(["recruiter"]), updateCompany);




// Change password
router.put(
  "/auth/change-password",
  [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ],
  authenticatedRoutes,authorize(["recruiter","super_admin"]),
  changePassword
);

// Delete account
router.delete("/auth/profile/delete", authenticatedRoutes,authorize(["recruiter","super_admin"]), deleteAccount);

// Logout
router.post("/auth/logout", authenticatedRoutes,authorize(["recruiter"]), logoutRecruiter);
//resend-email-otp
router.get("/auth/resend-otp", authenticatedRoutes,authorize(["recruiter"]), sendOtp);
router.post("/auth/security/delete-account", authenticatedRoutes,authorize(["recruiter"]), deleteAccount);


module.exports = router;