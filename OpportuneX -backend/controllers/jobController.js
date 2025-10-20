const Job = require("../models/job.js");
const JobApplication = require("../models/jobApplication.js");
const {
  createJobService,
  getJobsService,
  updateJobService,
  softDeleteJobService,
  getJobDetailsService,
  deleteJobService
}  = require( "../services/jobService.js");
const { delay } = require("../utils/delay.js");
const ErrorHandler = require("../utils/errorHandler.js");


// Create Job
exports.createJob = async (req, res, next) => {
  try {
    // const job = await createJobService(req.body,req.body.postedBy);
    res.status(201).json({ success: true, message:"your job create successfully"  });
  } catch (err) {
    next(err);
  }
};

// Get All Jobs (with filters & pagination)
exports.getAllJobs = async (req, res, next) => {
  try {

    const filters = req.query
    console.log(filters);
    const  jobs = await getJobsService();
    res.json({ success: true,totalPages:8, data: jobs ,message:"fetch jobs posts successfully"});
  } catch (err) {
    next(err);
  }
};
exports.searchJob = async (req, res, next) => {
  try {
    // const  jobs = await getJobsService();
    res.json({ success: true, data: ["frontend developer","react developer"] ,message:"fetch jobs posts successfully"});
  } catch (err) {
    next(err);
  }
};

// job details 
exports.getJobDetails = async (req, res, next) => {
  try {
    const {jobId} = req.params
    
    // const job = await getJobDetailsService(id)
    const job = {
 _id:jobId,
  title: "Frontend Developer 2",
  location: "San Francisco, CA",
  description: "We are looking for a passionate Frontend Developer to join our growing team.",
  responsibility: {
    title: "Key Responsibilities",
    list: [
      "Develop and maintain user interfaces using React.js",
      "Collaborate with backend developers and designers",
      "Optimize components for performance",
      "Write clean, maintainable, and scalable code"
    ]
  },
  status: "open",
  requirements: {
    education: "Bachelor's degree in Computer Science or related field",
    experience: "2+ years of frontend development experience",
    skills: [
      "JavaScript",
      "React",
      "HTML",
      "CSS",
      "REST APIs"
    ]
  },
  type: "Full-time",
  company: {
    name:"google",
    
  },
  postedAt:"Sep 8, 2025",
  appliedDeadLine:"Dec 8, 2025",
  }
  
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};



// Update Job
exports.updateJob = async (req, res, next) => {
  try {
    // const job = await updateJobService(req.params.id, req.body);
    res.json({ success: true, message:"Job Post Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Soft Delete Job
exports.deleteJob = async (req, res, next) => {
  try {
    await deleteJobService(req.params.id);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};


// applied jonbs 

exports.applyJob = async (req, res, next) => {
  const {jobId,
    userId,
    resumeUrl,
    coverLetter} = req.body
  try {
  
//     const  alreadyApplied =  await JobApplication.findOne({
//       candidate:userId,
//    job:jobId 
// });
// if(alreadyApplied){
//   throw new ErrorHandler("you are already applid this job",500)
// }
// const data = await JobApplication.create({
//       candidate:userId,
//    job:jobId ,
//     resumeUrl,
//     coverLetter
// });
// await data.save();
    res.status(201).json({ success: true ,message:"Applied Job Successfully"});
  } catch (err) {
    next(err);
  }
};
exports.getAllAppledJobs = async (req, res, next) => {
  try {
    const userId = req.params.userId;


    // const data = await JobApplication.find({ candidate: userId })
    //   .populate({
    //     path: "job",
    //     populate: [
    //       {
    //         path: "company",
    //         model: "Company",
    //         select: "name industry",
    //         populate: {
    //           path: "recruiterId",
    //           model: "Recruiter",
    //           select: "fullName bio",
    //         },
    //       },
    //     ],
    //   })
    //   .populate({
    //     path: "candidate",
    //     select: "fullName email",
    //   });

    // // 🔹 Flatten response
    // const flattened = data.map((app) => ({
    //   applicationId: app._id,
    //   status: app.status,
    //   appliedAt: app.appliedAt,
    //   resumeUrl: app.resumeUrl,
    //   coverLetter: app.coverLetter,

    //   // Candidate info
    //   candidateId: app.candidate?._id,
    //   candidateName: app.candidate?.fullName,
    //   candidateEmail: app.candidate?.email,

    //   // Job info
    //   jobId: app.job?._id,
    //   jobTitle: app.job?.title,
    //   jobType: app.job?.jobType,
    //   experienceLevel: app.job?.experienceLevel,
    //   location: app.job?.location,
    //   description: app.job?.description,

    //   // Company info
    //   companyId: app.job?.company?._id,
    //   companyName: app.job?.company?.name,
    //   companyIndustry: app.job?.company?.industry,

    //   // Recruiter info
    //   recruiterId: app.job?.company?.recruiterId?._id,
    //   recruiterName: app.job?.company?.recruiterId?.fullName,
    //   recruiterBio: app.job?.company?.recruiterId?.bio,
    // }));

    const data = [
      {
        applicationId: "sfsf54sd9f4sd9f",
        status: "rejected", // extend with your actual statuses
          appliedAt: 1759936866906, // ISO Date string
          resumeUrl: "string",
          coverLetter: "string",
        
          // optional if you sometimes exclude it
          // Job
          jobId: "sfsf54sd9f4sd9f",
          jobTitle: "frontend developer",
          jobType: "full-time",
          location: "dhaka",
          description: "sdjfbvwejtbvjetbejrgtertgewruitgertogo5uwtiwtiwtiwtiwtiwtierut",
        
          // Company
          company: {
            _id: "sfsf54sd9f4sd9f",
            name: "google",
            logo: "logo-url",
                     description: "sdjfbvwejtbvjetbejrgtertgewruitgertogo5uwtiwtiwtiwtiwtiwtierut",

          },

      }
    ]

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};


// recruiter 


exports.getAllApplication = async (req, res, next) => {
  try {
  
    const data = [{
         jobTitle:"Senior Software Enginner",
         "description":`
         job description Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga veniam assumenda quidem dignissimos sapiente praesentium dolore soluta. Maxime beatae minus dicta Ipsam
         `,
         location:"Dhaka,Bangladesh",
         company:"Google LLC",
         totalApplication:25
    }]

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
exports.getJobApplicants = async (req, res, next) => {
  try {
  
    const data = [

        {
    _id: "1",
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    profilePhoto: "",
    resumeUrl: "#",
    status: "selected",
    aiMatchScore:77,
    location: "New York, NY",

    cover_letter:
      "Passionate developer with 5 years of experience in building web applications.",
  },
  {
    _id: "2",
    fullName: "Sarah Williams",
    email: "sarah.w@example.com",
    profilePhoto: "",
    resumeUrl: "#",
    status: "pending",
    aiMatchScore:47,
    location: "New York, NY",
    cover_letter:
      "Frontend engineer focused on creating beautiful and functional user interfaces.",
  },
    ]

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};




//  get job categories

exports.getJobCategories = async (req,res,next) =>{
  const data = [
    {
     _id:"2348236b23wrb6c2343",
      name:"Web Development",
      jobCount:757
    },
    {
     _id:"2348236b2b3b6c2343",
      name:"UI/UX Design",
      jobCount:575
    },
    {
     _id:"2348236btweb23b6c2343",
      name:"Data Science",
      jobCount:75
    },
    {
     _id:"2348236bw2w3b6c2343",
      name:"DevOps",
      jobCount:878
    },
    {
     _id:"2348236gbb23b6c2343",
      name:"Cybersecurity",
      jobCount:789
    },
    {
     _id:"2348236qwb23b6c2343",
      name:"Blockchain",
      jobCount:45
    },
    {
     _id:"234823r6b23wb6c2343",
      name:"AI/ML Enginner",
      jobCount:868
    },
    {
     _id:"2348236bw23b6c2343",
      name:"Cloud Enginner",
      jobCount:88
    },
    {
     _id:"2348236b23bw6c2343",
      name:"Merchandiser",
      jobCount:79
    },
    {
     _id:"2348236b2w3b6c2343",
      name:"Human Resources",
      jobCount:77
    },
    {
     _id:"2348236b23eb6c2343",
      name:"Frontend Development",
      jobCount:45
    },
    {
     _id:"2348236eb23b6c2343",
      name:"Backend Enginner",
      jobCount:4544
    },
    {
     _id:"2348236b23b6c2343",
      name:"Wordpress Deverloper",
      jobCount:454
    },
    {
     _id:"2348236b23b6c2343",
      name:"Shofipy Deverloper",
      jobCount:45
    },
  ];


  res.json({message:"fetch data successfully", data}).status(200)
}

// save job 

exports.savedJob = async (req, res, next) => {
  const {jobId,
    userId} = req.body
  try {
  

    res.status(201).json({ success: true ,message:"Saved Job Successfully"});
  } catch (err) {
    next(err);
  }
};
// selectApplications
exports.selectApplications = async (req, res, next) => {
 
  try {
  

    res.status(201).json({ success: true ,message:"Candidates Selected Successfully"});
  } catch (err) {
    next(err);
  }
};
// rejectApplications
exports.rejectApplications = async (req, res, next) => {
 
  try {
  

    res.status(201).json({ success: true ,message:"Candidates Rejected Successfully"});
  } catch (err) {
    next(err);
  }
};
// shortListApplications
exports.shortListApplications = async (req, res, next) => {
 
  try {

    res.status(201).json({ success: true ,message:"Candidates shortListed Successfully"});
  } catch (err) {
    next(err);
  }
};