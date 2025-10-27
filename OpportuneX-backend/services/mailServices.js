
require('dotenv').config();
const { transporter } = require('../utils/mailHandler');
const { generateOTP } = require('../utils/generateOtp');
const { generateTokens } = require('../utils/authHandler');
const ErrorHandler = require('../utils/errorHandler');
const Candidate = require('../models/candidate');
    const Recruiter = require('../models/recruiter');

async function sendVerificationMail(user) {
try {
    let verificationOTP = await generateOTP();

  const mailOptions = {
    from:`OpportuneX  <${process.env.FORM_EMAIL}>`,
    to: user?.email,
    subject: "Welcome to OpportuneX!",
    html: `<p>welcome to OpportuneX, your account has been created with email: ${user?.email}<p><b>please verify the email by OTP </b> ${verificationOTP} <br/> or by clicking this <a href="">&nbsp;Verify Email</a>`,
  };
  await transporter.sendMail(mailOptions);

  const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  // Update user with OTP and expiry (assuming user is a Mongoose document)
  
  if(user.role==="candidate"){
    const candidate = await Recruiter.findById(user._id);
    candidate.emailOtp = verificationOTP;
    candidate.otpExpiresAt = new Date(otpExpiry);
    await candidate.save();
  }else if(user.role==="recruiter"){
    const recruiter = await Recruiter.findById(user._id);
    recruiter.emailOtp = verificationOTP;
    recruiter.otpExpiresAt = new Date(otpExpiry);
    await recruiter.save();
  }

  return true
} catch (error) {
  console.log("send mail failed",error);
  throw new  ErrorHandler("failed to send mail",400)
}
}

async function sendForgetPasswordLink(user) {
  const { token } = await generateTokens(user,"5m", process.env.RESET_SECRET);
  // Send verification mail
  const resetPasswordLink = `http://localhost:8080/check-token/${token}`;
  // verificatio email
  const mailOptions = {
    from:`OpportuneX  <${process.env.FORM_EMAIL}>`,
    to: user?.email,
    subject: 'Reset Password',
    html: `<p>welcome to OpportuneX, ${user?.email}<p><b>please reset password with this link by clicking this</b><a href="${resetPasswordLink}">&nbsp;Reset Password</a>`,
  };
  await transporter.sendMail(mailOptions);
  return token;
}

async function resendOtpEmail(user) {
try {
    let verificationOTP = await generateOTP();

 const mailOptions = {
      from: `OpportuneX <${process.env.FORM_EMAIL}>`,
      to: user.email,
      subject: "Verify Your Email - OpportuneX",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333">
          <h2>Welcome to OpportuneX!</h2>
          <p>Hi ${user.name || "there"},</p>
          <p>Your account has been created with this email: <b>${user.email}</b>.</p>
          <p><b>Your OTP:</b> <span style="font-size: 20px; color: #007bff;">${verificationOTP}</span></p>
       
          <br/><br/>
          <p>This OTP will expire in <b>5 minutes</b>.</p>
        </div>
      `,
    };
  await transporter.sendMail(mailOptions);

  const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  // Update user with OTP and expiry (assuming user is a Mongoose document)
  
   if(user.role==="candidate"){
    const candidate = await Recruiter.findById(user._id);
    candidate.emailOtp = verificationOTP;
    candidate.otpExpiresAt = new Date(otpExpiry);
    await candidate.save();
  }else if(user.role==="recruiter"){
    const recruiter = await Recruiter.findById(user._id);
    recruiter.emailOtp = verificationOTP;
    recruiter.otpExpiresAt = new Date(otpExpiry);
    await recruiter.save();
  }


  return true
} catch (error) {
  console.log("send mail failed",error);
  throw new  ErrorHandler("failed to send mail",400)
}
}


module.exports = {
  sendVerificationMail,
  sendForgetPasswordLink,
  resendOtpEmail
};
