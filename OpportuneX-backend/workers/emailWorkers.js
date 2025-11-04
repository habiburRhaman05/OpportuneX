const { Worker } = require("bullmq");
const { connection } = require("../config/redis");
const nodemailer = require("nodemailer");
const { set } = require("mongoose");
const {
  sendVerificationMail,
  sendForgetPasswordLink,
  sendOtpEmail,
} = require("../services/mailServices");
require("dotenv").config();

const worker = new Worker(
  "emailQueue",
  async (job) => {
    switch (job.name) {
      case "welcomeEmail":
        await sendVerificationMail(job.data);
        break;

      case "sent-otp":
        await sendOtpEmail(job.data);
        break;

      case "forgotPassword":
        await sendForgetPasswordLink(job.data);
        break;

      default:
        return true;
    }
  },
  { connection }
);

// const sendMail = (data,type) =>{

// }

worker.on("completed", (job) => console.log(`✅ Job ${job.id} completed`));
worker.on("failed", (job, err) =>
  console.error(`❌ Job ${job.id} failed:`, err)
);

module.exports = worker;
