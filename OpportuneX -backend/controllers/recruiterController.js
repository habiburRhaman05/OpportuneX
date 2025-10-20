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

const JWT_SECRIT = process.env.AUTH_JWT_SECRIT
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // cookie expiry
      const dummyRecruiter = {
      _id: 5492645965697,
      bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum, aliquam repudiandae modi doloribus repellat molestias illo ex quis eius enim accusantium soluta quam, quasi aliquid. Labore, officiis, provident eaque reprehenderit minus perspiciatis id quam culpa illum ducimus eos ullam iste suscipit a! Officiis, blanditiis rerum dolorum fuga sed ducimus!",
      profilePhoto:"",
      role:"recruiter",
      fullName: "Abdur Rhaman",
      email: "rhaman@gmail.com",
      position: "Senior recruiter",
      location: "Gulshan,Dhaka",
      socialLinks:{
        facebook:"www.facebook.com/adbur_rahim",
        linkedin:"www.linkedin.in/adbur_rahim",
        github:"www.github.com/adbur_rahim",

      },
      profileComplection:50,
      emailVerified:false,
      otpExpiresAt:null,
      emailOtp:null,
      onboardingSteps:{
        emailVerification:false,
        company:false
      },
      company:companyData,
      messingFeilds:[
        "profilePhoto"
      ]
    };
// controllers/recruiterAuthController.js
// Mongoose model (or Sequelize if SQL)

// @desc    Register recruiter
// @route   POST /api/v1/auth/recruiter/register
// @access  Public
exports.registerRecruiter = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullName, email, password, company } = req.body;

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
      company,
      role: "recruiter",
    });
    logger.info(`Recruiter registered: ${newRecruiter.email}`);

    //sending email

    const otp = await sendVerificationMail(newRecruiter);

    newRecruiter.emailOtp = otp;
    newRecruiter.otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);
    newRecruiter.onboardingSteps = {
      register: true,
      emailVerification: false,
      company: false,
    };
    await newRecruiter.save();

    // Generate JWT
    const token = generateTokens(newRecruiter, JWT_EXPIRES_IN, JWT_SECRIT);

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

    // const recruiter = await Recruiter.findOne({ email });
    // if (!recruiter) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid email or password",
    //   });
    // }

    // const isMatch = await bcrypt.compare(password, recruiter.password);
    // if (!isMatch) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid email or password",
    //   });
    // }



    const { token } = await generateTokens(
      dummyRecruiter,
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

// @desc    Get recruiter profile
// @route   GET /api/v1/auth/recruiter/profile
// @access  Private (Recruiter only)
exports.getRecruiterProfile = async (req, res, next) => {
  try {
    // const recruiter = await Recruiter.findById(req.user.id).select("-password");

    // if (!recruiter) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Recruiter not found",
    //   });
    // }


    return res.status(200).json({
      success: true,
      data: dummyRecruiter,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// @desc    Update recruiter profile
// @route   PUT /api/v1/auth/recruiter/profile
// @access  Private (Recruiter only)
exports.updateRecruiterProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // const recruiter = await Recruiter.findByIdAndUpdate(req.user.id, updates, {
    //   new: true,
    // }).select("-password");

    // if (!recruiter) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Recruiter not found",
    //   });
    // }

    // logger.info(`Recruiter updated profile: ${recruiter.email}`);
// console.log(updates);

    // dummyRecruiter.profilePhoto = updates.profilePhoto
//     console.log(dummyRecruiter);

dummyRecruiter.onboardingSteps = {
  register:true,
  emailVerification:true,
  company:true
}
    

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      // data: recruiter,
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
    // On client side: remove token from storage
    // On server: optionally implement token blacklist
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

    // const recruiter = await Recruiter.findOne({ email });
    // if (!recruiter) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Recruiter not found with this email",
    //   });
    // }

    // // Generate 6-digit OTP
    const otp = 111111 || (await sendVerificationMail(recruiter));

    // recruiter.emailOtp = otp;
    // recruiter.otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);
    // await recruiter.save();
   dummyRecruiter.emailOtp = otp;
    dummyRecruiter.otpExpiresAt = new Date(Date.now() + 1 * 60 * 1000).getTime()

    logger.info(`OTP sent to recruiter: ${email}`);

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

    // const recruiter = await Recruiter.findOne({ email });
    // if (!recruiter) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Recruiter not found with this email",
    //   });
    // }
    // if (
    //   !recruiter ||
    //   recruiter.emailOtp !== otp ||
    //   recruiter.otpExpiresAt < Date.now()
    // ) {
    //   recruiter.onboardingSteps = {
    //     register: true,
    //     emailVerification: true,
    //     company: false,
    //   };
    //   await recruiter.save();
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid or expired OTP",
    //   });
    // }

    // // Mark recruiter emailVerified = true
    // recruiter.emailVerified = true;
    // recruiter.emailOtp = null;
    // recruiter.otpExpiresAt = null;


     if (
      dummyRecruiter.emailOtp !== Number(otp)
    ) {
      
 return res.status(400).json({
      success: false,
      message: "Your OTP is Invalid",
    });
    }
     if (
      dummyRecruiter.otpExpiresAt < new Date(Date.now()).getTime()
     
    ) {
 return res.status(400).json({
      success: false,
      message: "Your OTP is Expired",
    });
    }
    
    dummyRecruiter.emailVerified = true;
    dummyRecruiter.emailOtp = null;
    dummyRecruiter.otpExpiresAt = null;
    dummyRecruiter.onboardingSteps.emailVerification = true
    logger.info(`OTP verified for recruiter: ${email}`);

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

    // const recruiter = await Recruiter.findById(req.user.id);
    // if (!recruiter) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Recruiter not found",
    //   });
    // }

    // const isMatch = await bcrypt.compare(oldPassword, recruiter.password);
    // if (!isMatch) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Old password is incorrect",
    //   });
    // }

    // const salt = await bcrypt.genSalt(10);
    // recruiter.password = await bcrypt.hash(newPassword, salt);

    // await recruiter.save();

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
    // const recruiter = await Recruiter.findByIdAndDelete(req.user.id);

    // if (!recruiter) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Recruiter not found",
    //   });
    // }

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
