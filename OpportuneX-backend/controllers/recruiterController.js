const logger = require("../utils/logger.js"); // Winston/Pino logger
const { companyData } = require("../utils/data.js");
const { sendVerificationMail } = require("../services/mailServices.js");
const { sendCookie } = require("../utils/cookice.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Recruiter = require("../models/recruiter");
const Company = require("../models/company");
const { generateTokens } = require("../utils/authHandler");
const { emailQueue } = require("../queue/emailQueue.js");
const { generateOTP } = require("../utils/generateOtp.js");
const JWT_SECRIT = process.env.AUTH_JWT_SECRIT
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // cookie expiry
exports.registerRecruiter = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullName, email, password,bio,location } = req.body;

    console.log(fullName, email, password);
    

    // Check if recruiter already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(409).json({
        success: false,
        message: "Recruiter with this email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create recruiter
    const newRecruiter = await Recruiter.create({
      fullName,
      email,
      password: hashedPassword,
      role:"recruiter",
      bio,
      location
    });
 const verificationOTP = await generateOTP();
      const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
   newRecruiter.emailOtp = verificationOTP;
    newRecruiter.otpExpiresAt = new Date(otpExpiry);
    await newRecruiter.save();
    //sending email
        await emailQueue.add("welcomeEmail", newRecruiter);

    // Generate JWT
     const { token } = await generateTokens(
      newRecruiter,
      JWT_EXPIRES_IN,
       process.env.AUTH_JWT_SECRIT
    );

    //sending cookice
    const cookieName = "accessToken";
    const cookieConfig = {
      httpOnly: true,
      secure: false, // Set to true in production (with HTTPS)
      sameSite: "Lax", // Or 'None' if frontend & backend are different origins
      maxAge: 1000 * 60 * 30, // ✅ 2 minutes in milliseconds (not seconds)
    };
    await sendCookie(res, cookieName, token, cookieConfig);

    return res.status(201).json({
      success: true,
      message: "registered successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error); // send to error middleware
  }
};

// @desc    Login recruiter
// @route   POST /api/v1/auth/recruiter/login
// @access  Public
exports.loginRecruiter = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }



    const { token } = await generateTokens(
      recruiter,
      JWT_EXPIRES_IN,
       process.env.AUTH_JWT_SECRIT
    );

    //sending cookice
    const cookieName = "accessToken";
    const cookieConfig = {
      httpOnly: true,
      secure: false, // Set to true in production (with HTTPS)
      sameSite: "Lax", // Or 'None' if frontend & backend are different origins
      maxAge: 1000 * 60 * 30, // ✅ 2 minutes in milliseconds (not seconds)
    };
    await sendCookie(res, cookieName, token, cookieConfig);

    // logger.info(`Recruiter logged in: ${recruiter.email}`);
    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};


exports.getRecruiterProfile = async (req, res, next) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id).select("-password").populate("company")

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: recruiter,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.updateRecruiterProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const recruiter = await Recruiter.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }



    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};


// @desc    Logout recruiter
// @route   POST /api/v1/auth/recruiter/logout
// @access  Private
exports.logoutRecruiter = async (req, res, next) => {
  try {

   res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc    Send OTP (for email verification / password reset)
exports.sendOtp = async (req, res, next) => {
  try {
    const email = req.user.email;

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found with this email",
      });
    }

    // // Generate 6-digit OTP
   const verificationOTP = await generateOTP();
      const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
   recruiter.emailOtp = verificationOTP;
    recruiter.otpExpiresAt = new Date(otpExpiry);
    await recruiter.save();
    // Send OTP
    await emailQueue.add("resendOtp", recruiter);
    return res.status(200).json({
      success: true,
      message: "OTP sent in your email successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc    Verify OTP
// @route   POST /api/v1/auth/recruiter/verify-otp
// @access  Public
exports.verifyOtp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, otp } = req.body;

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found with this email",
      });
    }
console.log(otp,recruiter.emailOtp);


     // Check if OTP matches
    if (recruiter.emailOtp != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check if OTP is expired
    if (recruiter.otpExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

       recruiter.onboardingSteps.emailVerification = true;
       recruiter.emailOtp = null;
       recruiter.otpExpiresAt = null;
       await recruiter.save();


  
    return res.status(200).json({
      success: true,
      message: "email verified successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc    Change Password (authenticated user)
// @route   PUT /api/v1/auth/recruiter/change-password
// @access  Private (Recruiter only)
exports.changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { oldPassword, newPassword } = req.body;

    const recruiter = await Recruiter.findById(req.user.id);
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, recruiter.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    recruiter.password = await bcrypt.hash(newPassword, salt);

    await recruiter.save();

    // logger.info(`Recruiter changed password: ${recruiter.email}`);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc    Delete Recruiter Account
// @route   DELETE /api/v1/auth/recruiter/delete
// @access  Private (Recruiter only)
exports.deleteAccount = async (req, res, next) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.user.id);

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    // logger.warn(`Recruiter account deleted: ${recruiter.email}`);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
