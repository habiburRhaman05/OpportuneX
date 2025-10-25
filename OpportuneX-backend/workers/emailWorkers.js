const { Worker } = require("bullmq");
const { connection } = require("../config/redis");
const nodemailer = require("nodemailer");
const { set } = require("mongoose");
const { sendVerificationMail, sendForgetPasswordLink, resendOtpEmail } = require("../services/mailServices");
require("dotenv").config();


const worker = new Worker(
  "emailQueue",
  async (job) => {
  
   switch (job.name) {
    case 'welcomeEmail':

    await sendVerificationMail(job.data)
    case 'resendOtp':

    await resendOtpEmail(job.data)
    case 'forgotPassword':

    await sendForgetPasswordLink(job.data)
    default:
      return true
   }
    
    
  },
  { connection }
);


// const sendMail = (data,type) =>{

// }

worker.on("completed", (job) => console.log(`✅ Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`❌ Job ${job.id} failed:`, err));

module.exports = worker;
 