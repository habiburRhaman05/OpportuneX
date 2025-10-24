const bcrypt = require("bcryptjs");
const Candidate = require("../models/candidate");
const { generateTokens } = require("../utils/authHandler");
const { sendVerificationMail } = require("../services/mailServices");
const { generateOTP } = require("../utils/generateOtp");
const { comparePassword } = require("../utils/hashPassword");
const ErrorHandler = require("../utils/errorHandler");
const { delay } = require("../utils/delay");
const profileData = {
  _id: "afsgsgg",
  fullName: "Habibur Rhaman",
  email: "habib.dev@gmail.com",
  phone: "",
  role: "candidate",
  emailOtp: null,
  otpExpiresAt: null,
  onboardingSteps: {
    emailVerification: false,
    profileInfo: false,
  },
  profilePhoto: "http://localhost:8080/my.jpg",
  bio: "19-year-old self-taught MERN Stack & React Native developer. Passionate about building scalable web and mobile applications.",
  resumeUrl:
    "https://drive.google.com/file/d/1tcZ9B4RG2ApNT-t9ScFB1i-_5dRf-Iju/view?usp=drive_link",
  location: "Dhaka, Bangladesh",
  socialProfiles: {
    linkedin: "https://linkedin.com/in/habibhassan",
    github: "https://github.com/habibdev",
    twitter: "https://twitter.com/habibcodes",
    website: "https://habib.dev",
  },

  education: [
    {
      _id: "sfusfsdfjvjsdf64sf9sfsfsdf6",
      institution: "Self-Taught / Online Platforms",
      degree: "Software Engineering (Non-CS)",
      fieldOfStudy: "Full-Stack Web Development",
      startDate: "2021-01-01",
      isCurrent: true,
      description:
        "Focused on JavaScript, React, Next.js, Node.js, Express, MongoDB, and React Native.",
    },
  ],
  savedJobs: [
    {
      _id: "sfusfsdfjvjsdf64sf9sfsfsdf6",
      jobTitle: "Senior Software Developer",
      company: "Brain Station",
      savedDate: "8 Aug 2024",
      location: "Dhaka",
      type: "full-time",
      appliedDeadLine: "2025-09-28",
    },
    {
      _id: "sfusfsdfjvjsdf64sf9sfsfsdf6",
      jobTitle: "Frontend developer ",
      company: "Adidas",
      savedDate: "8 Sep 2024",
      location: "Dhaka",
      type: "full-time",
      appliedDeadLine: "2025-09-28",
    },
  ],

  workExperiences: [
    {
      _id: "sfusfsdfjvjsdf64sf9sfsfsdf6",
      company: "BD Tech Limited",
      position: "Full-Stack MERN Developer",
      startDate: "Auguest 2025",
      isCurrent: true,
      description:
        "Worked on multiple freelance projects, including e-commerce, job portals, and real-time collaboration apps.",
    },
  ],

  achievements: [
    "Built 10+ full-stack projects",
    "Completed 30-day frontend challenge",
    "Mastered React and Next.js",
  ],

  skills: [
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "React Native",
  ],
};
/**
 *
 *
 *
 *
 * 📌 Register (Signup)
 *
 *
 */

exports.registerCandidate = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if email already exists
    const existing = await Candidate.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const candidate = await Candidate.create({
      fullName,
      email,
      password: hashedPassword,
      role,

    });

      //  const otp = await sendVerificationMail(candidate)
    // candidate.emailOtp = generateOTP();
    // candidate.otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);
    // candidate.onboardingSteps.emailVerification = true
    // await candidate.save();
    const { token } = await generateTokens(
      candidate,
      "5m",
      process.env.AUTH_JWT_SECRIT
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // Set to true in production (with HTTPS)
      sameSite: "Lax", // Or 'None' if frontend & backend are different origins
      maxAge: 1000 * 60 * 5, // ✅ 2 minutes in milliseconds (not seconds)
    });
    // Send success response
    res
      .json({
        success: true,
        message: "user register successfuly",
      })
      .status(201);
  } catch (err) {
    next(err);
  }
};

/**
 * 📌 Login
 */
exports.loginCandidate = async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
    // Service Function to find data from email or username
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      throw new ErrorHandler("candidate or Email not exist", 401);
    }
    // hash password
    const correctPassword = await comparePassword(password, candidate.password);
    if (!correctPassword) {
      throw new ErrorHandler("Password doesnot match", 401);
    }
    const { token, refreshToken } = await generateTokens(
      candidate,
      "30m",
      process.env.AUTH_JWT_SECRIT
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // Set to true in production (with HTTPS)
      sameSite: "Lax", // Or 'None' if frontend & backend are different origins
      maxAge: 1000 * 60 * 30, // ✅ 2 minutes in milliseconds (not seconds)
    });

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "Lax",
    //   maxAge: 60 * 2,
    // });

    res.status(200).json({
      success: true,
      message: "Login Success",
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutController = async (req, res, next) => {
  const id = req.user?.id;
  try {
    const user = await Candidate.findById(id)

    // if user is not exist
    if (!user) {
      throw new ErrorHandler('User with id not found!');
    }
    // clearing the cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    // clearing the cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.status(200).json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 📌 Get Candidate Profile (Protected)
 */
exports.getCandidateProfile = async (req, res) => {

  try {
    const candidate = await Candidate.findById(req.user.id).select("-password")
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json({
      data: candidate,
      message: "Candidate profile fetched successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * 📌 Update Candidate Profile (Protected)
 */
exports.updateCandidateProfile = async (req, res) => {
  try {
    const updates = req.body;

    // Prevent password updates here (create separate endpoint if needed)
    if (updates.password) delete updates.password;

    const candidate = await Candidate.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * 📌 Complete Onboarding (Protected)
 */
exports.completeOnboarding = async (req, res) => {
  try {
    const updates = req.body;

    const candidate = await Candidate.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    candidate.onboardingComplete = true;
    await candidate.save();

    res.json({ message: "Onboarding completed", candidate });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * 📌 Change Password (Protected)
 */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // const candidate = await Candidate.findById(req.user._id);
    // if (!candidate)
    //   return res.status(404).json({ message: "Candidate not found" });

    // const isMatch = await bcrypt.compare(oldPassword, candidate.password);
    // if (!isMatch)
    //   return res.status(400).json({ message: "Old password is incorrect" });

    // candidate.password = await bcrypt.hash(newPassword, 10);
    // await candidate.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * 📌 Delete Account (Protected)
 */
exports.deleteCandidate = async (req, res) => {
  try {
    // await Candidate.findByIdAndDelete(req.user._id);
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * 📌 Resend OTP
 */
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const candidate = await Candidate.findOne({ email });
    if (!candidate) return res.status(404).json({ message: "User not found" });

    // Generate new OTP
    const otp = generateOTP(); // 6-digit OTP
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000).getTime() // 5 minutes

    candidate.emailOtp = otp;
    candidate.otpExpiresAt = otpExpires;
    await candidate.save();

    // Send OTP
    // await sendOtp(candidate.email, otp);

    res.json({success:true, message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * 📌 Verify OTP
 */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const candidate = await Candidate.findOne({ email });
    if (!candidate) return res.status(404).json({ message: "User not found" });

    if (!candidate.emailOtp || !candidate.otpExpiresAt) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please request again." });
    }

    if (candidate.emailOtp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (candidate.otpExpiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please request again." });
    }
    // Mark verified
    candidate.emailOtp = null;
    candidate.otpExpiresAt = null;
    candidate.onboardingSteps.emailVerification = true
    await candidate.save();


    
    // if (profileData.emailOtp != otp) {
    //   return res.status(400).json({ message: "Invalid OTP" });
    // }

    // if (profileData.otpExpiresAt < Date.now()) {
    //   return res
    //     .status(400)
    //     .json({ message: "OTP expired. Please request again." });
    // }
    // // Mark verified
    // profileData.emailOtp = null;
    // profileData.otpExpiresAt = null;
    // profileData.onboardingSteps.emailVerification = true;

    res.json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateProfileInfo = async (req, res) => {
  try {
    const updates = req.body;
console.log(updates);

    const candidate = await Candidate.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    candidate.onboardingSteps.profileInfo = true;
    await candidate.save();

    res.json({
      success: true,
      message: "Profile update completed",
      nextUrl: "preference",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.updatePreferences = async (req, res) => {
  try {
    const updates = req.body;

    // const candidate = await Candidate.findByIdAndUpdate(req.user.id, updates, {
    //   new: true,
    //   runValidators: true,
    // }).select("-password");
    // candidate.onboardingStep = "finish";
    // await candidate.save();
    profileData.onboardingSteps.preferences = true;
    res.json({
      success: true,
      message: "Profile update completed",
      nextUrl: "finish",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { token, refreshToken } = await generateTokens(
      profileData,
      "5m",
      process.env.AUTH_JWT_SECRIT
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 1000 * 60 * 30,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 1000 * 60 * 30,
    });

    res.json({ success: true, message: "Token refresh" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
