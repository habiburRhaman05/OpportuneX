const express = require("express");
const {
  registerCandidate,
  loginCandidate,
  updateCandidateProfile,
  completeOnboarding,
  getCandidateProfile,
  resendOtp,
  verifyOtp,
  updateProfileInfo,
  logoutController,
  changePassword,
  deleteCandidate,
  refreshToken,
  forgotPassword,
  verifyForgotToken,
  resetPassword,
} = require("../controllers/candidateController");
const {
  authenticatedRoutes,
  authorize,
} = require("../middlewares/authMiddleware");
const {
  validateRegistrationRules,
  validateLoginRules,
} = require("../middlewares/validationMiddlewere");
const router = express.Router();

// Auth routes
router.post("/auth/register", validateRegistrationRules, registerCandidate);
router.post("/auth/login", validateLoginRules, loginCandidate);
router.post("/auth/refresh", refreshToken);
router.put(
  "/auth/change-password",
  authenticatedRoutes,
  authorize("candidate"),
  changePassword,
);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/verify-forgot-password-token/:token", verifyForgotToken);
router.post("/auth/reset-password/:token", resetPassword);
router.post(
  "/auth/logout",
  authenticatedRoutes,
  authorize("candidate"),
  logoutController,
);
router.post(
  "/auth/resend-otp",
  authenticatedRoutes,
  authorize("candidate"),
  resendOtp,
);
router.post(
  "/auth/security/delete-account",
  authenticatedRoutes,
  authorize("candidate"),
  deleteCandidate,
);
router.post(
  "/auth/verify-otp",
  authenticatedRoutes,
  authorize("candidate"),
  verifyOtp,
);

// Protected routes
router.put(
  "/auth/profile/update",
  authenticatedRoutes,
  authorize("candidate"),
  updateCandidateProfile,
);
router.put(
  "/auth/onboarding/email-verify",
  authenticatedRoutes,
  authorize("candidate"),
  verifyOtp,
);
router.put(
  "/auth/onboarding/profile-info",
  authenticatedRoutes,
  authorize("candidate"),
  updateProfileInfo,
);
// Protected profile route
router.get(
  "/auth/profile/me",
  authenticatedRoutes,
  authorize("candidate"),
  getCandidateProfile,
);

module.exports = router;
