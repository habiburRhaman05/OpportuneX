const { transporter } = require('../utils/mailHandler');
const { generateOTP } = require('../utils/generateOtp');
const { generateTokens } = require('../utils/authHandler');
const ErrorHandler = require('../utils/errorHandler');

async function sendVerificationMail(user) {
try {
    let verificationOTP = await generateOTP();
  const token = await generateTokens(user,"5m",process.env.EMAIL_VERIFY_SECRET)
  // Send verification mail
  const varificationLink = `http://localhost:5500/api/auth/verify/${token}`;
  // verificatio email
  const mailOptions = {
    from:"devhabib2005@gmail.com",
    to: user?.email,
    subject: 'Welcome to HireStack',
    html: `<p>welcome to HireStack, your account has been created with email: ${user?.email}<p><b>please verify the email by clicking this</b><a href="${varificationLink}">verify</a>`,
  };
  await transporter.sendMail(mailOptions);
  console.log("send mail success");

  return verificationOTP;
} catch (error) {
  
  console.log("send mail failed",error);
  
  throw new  ErrorHandler("failed to send mail",400)
}
}

async function sendForgetPasswordLink(user) {
  const { token } = await generateTokens(user, process.env.RESET_SECRET);
  // Send verification mail
  const resetPasswordLink = `http://localhost:5173/reset-password?token=${token}`;
  // verificatio email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: 'Reset Password',
    html: `<p>welcome to code with dipesh, ${user?.email}<p><b>please reset password with this link by clicking this</b><a href="${resetPasswordLink}">&nbsp;Reset Password</a>`,
  };
  await transporter.sendMail(mailOptions);
  return token;
}

module.exports = {
  sendVerificationMail,
  sendForgetPasswordLink,
};
