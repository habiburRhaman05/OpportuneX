const helmet = require("helmet");
const recruiterRoutes = require("../routes/recruiterRoutes")
const companyRoutes = require("../routes/companyRoutes")
const candidateRoutes = require("../routes/candidateRoutes")
const errorHandler = require("../middlewares/errorMiddleare");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const express = require("express");

var cors = require("cors");
const multer = require("multer");
const { uploadFile } = require("../controllers/uploadFile");
const jobRoutes = require("../routes/jobRoutes");
const { delay } = require("../utils/delay");
exports.appConfig = async (app) => {
  const port = process.env.PORT || 5500;
  const upload = multer({ dest: "uploads/" });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // CORS configuration (example using Express)
  const allowedOrigins = [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://192.168.0.107:5173",
    "http://localhost:5173",
    "http://localhost:5500",
  ];
  const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(cookieParser());
  app.use("/api/v1/recruiter",recruiterRoutes)
  app.get("/api/v1/test",async(req,res) =>{

    await delay(6000)
    res.json({data:"data"})
  })
  app.use("/api/v1/job",jobRoutes)
  app.use("/api/v1/company",companyRoutes)
  app.use("/api/v1/candidate",candidateRoutes)
  app.get("/api/v1/recruiter/data/dashboard", (req,res)=>{
     res.json({
      totalJobs:8,
      activeJobs:20,
      company:{
        name:"Google LLC",
        lastUpdate:"3"
      },
      recruiter:{
        name:"Habib",
        role:"Recruiter"
      }
     })
  })
  app.use(errorHandler);
  app.post("/api/v1/upload-file", upload.single("file"), uploadFile);
  app.listen(port, () => {
    console.log(`🚀 REST: http://localhost:${port}`);
  });
};
