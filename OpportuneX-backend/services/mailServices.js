
require('dotenv').config();
const { transporter } = require('../utils/mailHandler');
const { generateOTP } = require('../utils/generateOtp');
const { generateTokens } = require('../utils/authHandler');
const ErrorHandler = require('../utils/errorHandler');
const Candidate = require('../models/candidate');
    const Recruiter = require('../models/recruiter');

async function sendVerificationMail(user) {
try {
    

const mailOptions = {
  from: `OpportuneX <${process.env.FORM_EMAIL}>`,
  to: user?.email,
  subject: "Welcome to OpportuneX – Verify Your Email Address",
  html: `
  <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      
      <h2 style="color: #0f172a; text-align: center;">Welcome to <span style="color:#2563eb;">OpportuneX</span> 🎉</h2>
      
      <p style="font-size: 15px; color: #334155; line-height: 1.6;">
        Hi <b>${user?.name || "there"}</b>,<br/><br/>
        We're excited to have you on board! Your account has been successfully created using the email address:
        <b>${user?.email}</b>.
      </p>
      
      <div style="margin: 25px 0; text-align: center;">
        <p style="font-size: 15px; color: #334155; margin-bottom: 10px;">
          Please verify your email using the One-Time Password (OTP) below:
        </p>
        <div style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 20px; font-size: 20px; border-radius: 8px; letter-spacing: 2px;">
          ${user?.emailOtp}
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 8px;">
          This OTP will expire on <b>${new Date(user?.otpExpiresAt).toLocaleString()}</b>
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/verify-email?email=${encodeURIComponent(user?.email)}" 
           style="background-color: #16a34a; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px;">
          Verify Email
        </a>
      </div>

      <p style="font-size: 13px; color: #64748b; text-align: center;">
        If you did not create an account with OpportuneX, please ignore this email.
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #e2e8f0;"/>
      <p style="font-size: 12px; color: #94a3b8; text-align: center;">
        &copy; ${new Date().getFullYear()} OpportuneX. All rights reserved.
      </p>
    </div>
  </div>
  `,
};

  await transporter.sendMail(mailOptions);


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
  
const mailOptions = {
  from: `OpportuneX <${process.env.FORM_EMAIL}>`,
  to: user?.email,
  subject: "Welcome to OpportuneX – Verify Your Email Address",
  html: `
  <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      
      <h2 style="color: #0f172a; text-align: center;">Welcome to <span style="color:#2563eb;">OpportuneX</span> 🎉</h2>
      
      <p style="font-size: 15px; color: #334155; line-height: 1.6;">
        Hi <b>${user?.name || "there"}</b>,<br/><br/>
        We're excited to have you on board! Your account has been successfully created using the email address:
        <b>${user?.email}</b>.
      </p>
      
      <div style="margin: 25px 0; text-align: center;">
        <p style="font-size: 15px; color: #334155; margin-bottom: 10px;">
          Please verify your email using the One-Time Password (OTP) below:
        </p>
        <div style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 20px; font-size: 20px; border-radius: 8px; letter-spacing: 2px;">
          ${user?.emailOtp}
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 8px;">
          This OTP will expire on <b>${new Date(user?.otpExpiresAt).toLocaleString()}</b>
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/verify-email?email=${encodeURIComponent(user?.email)}" 
           style="background-color: #16a34a; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px;">
          Verify Email
        </a>
      </div>

      <p style="font-size: 13px; color: #64748b; text-align: center;">
        If you did not create an account with OpportuneX, please ignore this email.
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #e2e8f0;"/>
      <p style="font-size: 12px; color: #94a3b8; text-align: center;">
        &copy; ${new Date().getFullYear()} OpportuneX. All rights reserved.
      </p>
    </div>
  </div>
  `,
};

  await transporter.sendMail(mailOptions);


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
