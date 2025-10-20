// const { handleValidationError } = require('../utils/handleValidationError');
const { sendApiResponse } = require("../utils/sendApiResponse");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const User = require("../models/userModel");
const {
  sendVerificationMail,
  sendForgetPasswordLink,
} = require("../services/mailServices");
const {
  generateDecodedToken,
  generateTokens,
} = require("../utils/authHandler");
const handleValidationError = require("../utils/handleValidationError");
const { createUserOrUpdate, findUser } = require("../services/authservices");
const ErrorHandler = require("../utils/errorHandler");
const Candidate = require("../models/candidate");
const Recruiter = require("../models/recruiter");
const JobApplication = require("../models/jobApplication");

exports.getUserByIdController = async (req, res, next) => {
  // extracting the id
  // const userId = req.user.id;
  // console.log(userId);
  // try {
  //   // or from req.user._id if auth middleware

  //   // Step 1: Get user + candidate info
  //   const userInfo = await User.findById({ _id: userId }).lean();
  //   if (!userInfo || !userInfo.candidate) {
  //     return res.status(404).json({ message: "User not found" });
  //   }

  //   if (userInfo.role === "candidate") {
  //   const candidates = await Candidate.aggregate([
  //     // 1️⃣ Join with User
  //     {
  //       $lookup: {
  //         from: "users",
  //         localField: "userId",
  //         foreignField: "_id",
  //         as: "userData",
  //       },
  //     },
  //     { $unwind: "$userData" },

  //     // 2️⃣ Join with JobApplication

  //     // 2️⃣ Join Candidate → JobApplication
  //     // {
  //     //   $lookup: {
  //     //     from: "jobapplications", // collection name in DB
  //     //     localField: "_id", // Candidate._id
  //     //     foreignField: "candidate", // ✅ matches your JobApplication schema
  //     //     as: "applications",
  //     //   },
  //     // },

  //     // { $unwind: { path: "$applications", preserveNullAndEmptyArrays: true } },
  //     // 3️⃣ Join JobApplication → Job
  //     // {
  //     //   $lookup: {
  //     //     from: "jobs",
  //     //     localField: "applications.job", // ✅ check if your field is named "job"
  //     //     foreignField: "_id",
  //     //     as: "jobData",
  //     //   },
  //     // },
  //     // { $unwind: { path: "$jobData", preserveNullAndEmptyArrays: true } },

  //     // 4️⃣ Final Shape
  //     {
  //       $project: {
  //         _id: 1,
  //         fullName: 1,
  //         bio: 1,
  //         skills: 1,
  //         email: "$userData.email",
  //         username: "$userData.username",
  //         userId: "$userData._id",
  //         location: 1,
  //         education: 1,
  //         resumeUrl: 1,
  //         profileImage: 1,
  //         experience:1,
  //         role: "$userData.role",
  //         // applicationStatus: "$applications.status",

  //         // ✅ should now appear
  //         // jobId: "$jobData._id", // ✅ jobId from Job collection
  //         // jobTitle: "$jobData.title",
  //       },
  //     },
  //   ]);


  //     // Step 3: Combine and send
  //     return res.json({
  //       success: true,
  //       data: {...candidates[0]},
  //     });
  //   } else {
  //     const recruiterInfo = await Recruiter.findOne({ userId }).populate(
  //       "company"
  //     );
  //     // Step 2: Get applied jobs and populate job details

  //     // Step 3: Combine and send
  //     return res.json({
  //       success: true,
  //       data: {
  //         user: userInfo,
  //         recruiter: recruiterInfo,
  //       },
  //     });
  //   }
  // } catch (error) {
  //   next(error);
  // }
  console.log(req.user);
  
    const profileData  = {
      id:"afsgsgg",
      fullName: "Habibur Rhaman",
      email: "habib.dev@gmail.com",
      password: "$2a$10$hashedPasswordHere",
      phone: "01605746821",
      role: "candidate",
      headLine:"software enginner",
      onboardingComplete: false,
      profilePic: "https://drive.google.com/file/d/1-YbO0ui0gzTFnjcPJyJO2an4ssuLfY1G/view?usp=drive_link",
      bio: "19-year-old self-taught MERN Stack & React Native developer. Passionate about building scalable web and mobile applications.",
      resumeUrl: "https://drive.google.com/file/d/1tcZ9B4RG2ApNT-t9ScFB1i-_5dRf-Iju/view?usp=drive_link",
      portfolioUrl: "https://myportfolio.com",
      location: "Dhaka, Bangladesh",
  
      social: {
        linkedin: "https://linkedin.com/in/habibhassan",
        github: "https://github.com/habibdev",
        twitter: "https://twitter.com/habibcodes",
        personalWebsite: "https://habib.dev",
      },
  
      education: [
        {
          institution: "Self-Taught / Online Platforms",
          degree: "Software Engineering (Non-CS)",
          fieldOfStudy: "Full-Stack Web Development",
          startDate: "2021-01-01",
          isCurrent: true,
          description:
            "Focused on JavaScript, React, Next.js, Node.js, Express, MongoDB, and React Native.",
        },
      ],
  
      experiences: [
        {
          company: "Freelance",
          title: "Full-Stack MERN Developer",
          employmentType: "freelance",
          startDate: "2022-01-01",
          isCurrent: true,
          location: "Remote",
          description:
            "Worked on multiple freelance projects, including e-commerce, job portals, and real-time collaboration apps.",
        },
      ],
  
      achievements: [
        "Built 10+ full-stack projects",
        "Completed 30-day frontend challenge",
        "Mastered React and Next.js",
      ],
  
      certificates: [
        {
          name: "JavaScript Mastery",
          issuingOrganization: "Udemy",
          issueDate: "2023-05-01",
          credentialUrl: "https://udemy.com/certificate/abc123",
          onlinePic: "https://udemy.com/certificates/abc123.png",
        },
      ],
  
      projects: [
        {
          name: "Job Portal App",
          description:
            "A full-stack job portal where developers and companies interact with job applications in real time.",
          technologies: ["React", "Next.js", "Express", "MongoDB", "TailwindCSS"],
          projectUrl: "https://jobportal-habib.vercel.app",
          repoUrl: "https://github.com/habibdev/job-portal",
          thumbnail: "https://jobportal-habib.vercel.app/preview.png",
        },
        {
          name: "E-Commerce Web App",
          description:
            "An e-commerce platform with cart, wishlist, and order management features.",
          technologies: ["React", "Express", "MongoDB", "Stripe"],
          projectUrl: "https://habibshop.vercel.app",
          repoUrl: "https://github.com/habibdev/ecommerce",
          thumbnail: "https://habibshop.vercel.app/preview.png",
        },
      ],
      skills: [
        "JavaScript",
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "React Native",
      ],
      jobAlerts: true,
      jobPreferences: {
        skills: ["JavaScript", "React"],
        location: "Remote / Dhaka, Bangladesh",
        jobType: "full-time",
        jobTitle: "Frontend Developer / Full-Stack Engineer",
      },
    };
  return res.json({
    success:true,
    data:profileData,
    message:"user fetch successfully"
  })
};

exports.registerController = async (req, res, next) => {
  // Validate input
  const error = handleValidationError(req, res);
  if (error) return;

  try {
    const { email, username, password, role } = req.body;

    // // Check if user already exists with same email or username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.json({
        success: false,
        message: "user already exist with this email",
      });
    }
    // Hash password
    const hashed = await hashPassword(password);
    // Create new user
    const newUser = await User.create({
      email,
      username,
      password: hashed,
      role,
    });
    // const otp = await sendVerificationMail(newUser)
    // newUser.emailOtp = otp
    // newUser.otpExpiresAt = new Date(Date.now() + 3 * 60*1000)
    // await newUser.save()
    // Send success response

    res
      .json({
        success: true,
        message: "user register successfuly",
        onboardingComplete: newUser.onboardingComplete,
      })
      .status(201);
  } catch (err) {
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Service Function to find data from email or username
    const user = await findUser({ email });
    if (!user) {
      throw new ErrorHandler("Username or Email not exist", 401);
    }
    // hash password
    const correctPassword = await comparePassword(password, user.password);
    if (!correctPassword) {
      throw new ErrorHandler("Password doesnot match", 401);
    }
    const { token, refreshToken } = await generateTokens(
      user,
      "25m",
      process.env.JWT_SECRIT
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // Set to true in production (with HTTPS)
      sameSite: "Lax", // Or 'None' if frontend & backend are different origins
      maxAge: 1000 * 60 * 30, // ✅ 2 minutes in milliseconds (not seconds)
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 60 * 2,
    });

    res.status(201).json({
      success: true,
      role: user.role,
      message: "Login Success",
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyMailController = async (req, res, next) => {
  // await isFieldErrorFree(req, res);
  const { email, otp, userId } = req.body;
  try {
    const user = await findUser({ id: userId, email });
    // if user is not exist
    if (!user) {
      throw new ErrorHandler("User with this id not found!");
    }

    // Check expiry
    if (user.otpExpiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }

    if (user.emailOtp !== otp) {
      throw new ErrorHandler("OTP doesnot match");
    }
    // updating the email verified
    let response = await createUserOrUpdate(
      { email_verfied: true, emailOtp: null, otpExpiresAt: null },
      user
    );
    res.status(200).json({ data: user, message: "Acees Token Generated" });
  } catch (error) {
    next(error);
  }
};

exports.updateUserProfileByIdController = async (req, res, next) => {
  // data sanitization aginst site script XSS and validate
  await isFieldErrorFree(req, res);
  const { userId, ...userData } = req.body;
  try {
    // Service Function to find data from email or username
    const userExist = await findUser({ id: userId });
    if (!userExist) {
      throw new ErrorHandler(
        "User With Email or Username Not already exist",
        400
      );
    }
    // Store User
    const savedData = await createUserOrUpdate(
      {
        ...userData,
      },
      userExist
    );

    res.status(201).json({
      error: false,
      data: savedData,
      message: "User Update Successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshTokenController = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  // if no refresh token
  if (!refreshToken) {
    throw new ErrorHandler("Refresh Teken not found", 401);
  }

  try {
    //changed
    // verify the incoming refresh token requred token and secret key
    const { err, decoded } = await generateDecodedToken(
      refreshToken,
      "LOGIN_SECRET"
    );

    if (Boolean(err)) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    // find the user associated with refresh token
    const user = await User.findById(decoded?.data?.id);

    // if user isnt found, deny access
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    // if the stored refresh token doesnt match the incomning
    // deny access
    if (user?.refreshToken !== refreshToken) {
      throw new ErrorHandler("Refresh Token is not valid", 401);
    }

    // changed
    const { token: accessToken } = await generateTokens(user, "LOGIN_SECRET");

    // set options
    const options = {
      httpOnly: true,
      secure: false,
      // sameSite: 'Lax',
    };

    // clear existing cookie
    // res.clearCookie('accessToken', options);

    // set the new tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 2,
    });

    res.status(200).json({ accessToken, message: "Acees Token Generated" });
  } catch (error) {
    next(error);
  }
};

exports.sendEmailOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);
    const otp = await sendVerificationMail({
      email,
    });

    const user = await findUser({ email });
    if (!user) {
      throw new ErrorHandler("User Not Found With this Email", 404);
    }
    user.emailOtp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();
    res
      .json({
        success: true,
        message: "Sebd otp on you email successfully",
      })
      .status(200);
  } catch (error) {
    next(error);
  }
};

exports.forgetPasswordController = async (req, res, next) => {
  // receive email
  const { email } = req.body;
  try {
    // Service Function to find data from email or username
    const user = await findUser({ email });
    if (!user) {
      throw new ErrorHandler("Username or Email not exist", 401);
    }

    // sending Mail
    const token = await sendForgetPasswordLink(user);

    res.status(201).json({
      error: false,
      message: "Link has been sent!",
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPasswordController = async (req, res, next) => {
  // extracting the id
  const userId = req.user?.id;
  const { password } = req.body;
  // console.log(userId);
  try {
    const user = await findUser({ id: userId }, [
      "-password",
      "-refreshToken",
      "-emailOtp",
      "-__v",
    ]);

    // if user is not exist
    if (!user) {
      throw new ErrorHandler("User with id not found!");
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // Updating Refresh Token in the existing user model
    const updatedData = await createUserOrUpdate(
      {
        password: hashedPassword,
      },
      user
    );

    res.status(201).json({
      message: "Password update success",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutController = async (req, res, next) => {
  const userId = req.user?.id;
  try {
    if (!userId) {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
      res.status(200).json({
        error: false,
        message: "Logout Success",
      });
    }

    const user = await findUser({ id: userId });

    // if user is not exist
    if (!user) {
      throw new ErrorHandler("User with id not found!");
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
      error: false,
      message: "Logout Success",
    });
  } catch (error) {
    next(error);
  }
};

// complete-profile => onboarding

exports.completeCandidatePorfile = async (req, res, next) => {
  const data = req.body;
  try {
    // Service Function to find data from email or username
    const userExist = await User.findOne({ _id: data.userId });
    if (!userExist) {
      throw new ErrorHandler(
        "User With Email or Username Not already exist",
        400
      );
    }
    const newCandidate = await Candidate.create({
      ...data,
    });
    userExist.candidate = newCandidate._id;
    await userExist.save();
    await newCandidate.save();

    res.status(201).json({
      error: false,
      data: userExist,
      message: "User Update Successfully",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateCandidatePorfile = async (req, res, next) => {
  const data = req.body;

  try {
    // Check if candidate exists
    const candidate = await Candidate.findOne({ userId: data.userId });
    if (!candidate) {
      throw new ErrorHandler("User with this userId does not exist", 400);
    }

    // Update the candidate profile
    const updated = await Candidate.findOneAndUpdate(
      { userId: data.userId }, // filter
      { $set: data }, // new data
      { new: true, runValidators: true } // return updated doc
    );

    res.status(200).json({
      error: false,
      data: updated,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.completeRecruiterProfile = async (req, res, next) => {
  const data = req.body;
  try {
    // Check if user exists
    const userExist = await findUser({ _id: req.user?.id || data.userId });
    if (!userExist) {
      throw new ErrorHandler("User with this ID does not exist", 400);
    }

    const newRecruiter = await Recruiter.create(data); // create() already saves
    userExist.recruiter = newRecruiter._id;
    await userExist.save();
    res.status(201).json({
      error: false,
      data: newRecruiter,
      message: "Recruiter profile created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateRecruiterProfile = async (req, res, next) => {
  const data = req.body;

  try {
    // Check if recruiter exists
    const recruiter = await Recruiter.findOne({ userId: data.userId });
    if (!recruiter) {
      throw new ErrorHandler("Recruiter with this userId does not exist", 400);
    }

    // Allow only safe fields to update
    const allowedFields = [
      "fullName",
      "phone",
      "position",
      "company",
      "linkedin",
      "bio",
    ];
    const safeData = {};
    allowedFields.forEach((field) => {
      if (data[field] !== undefined) safeData[field] = data[field];
    });

    const updated = await Recruiter.findOneAndUpdate(
      { userId: data.userId },
      { $set: safeData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      error: false,
      data: updated,
      message: "Recruiter updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
