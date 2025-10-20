const Job = require("../models/job.js")

exports.createJobService = async (data, recruiterId) => {
  return await Job.create({ ...data, postedBy: recruiterId });
};

exports.getJobsService = async (filters = {}, pagination = {}) => {
  // const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;

  // const skip = (page - 1) * limit;

  // // Build query with filters
  // const query = Job.find(filters)
  //   .populate({
  //     path: "postedBy",
  //     model: "Company"
  //   })
  //   .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
  //   .skip(skip)
  //   .limit(limit);

  // // Execute query
  // const jobs = await query;

  // // Get total count for pagination metadata
  // const total = await Job.countDocuments(filters);
  const jobs = [
       {
        _id:"346545fgddfgdf4g",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
       {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.",
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
      experience: "5+ years of frontend development experience",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "State Management",
        "REST APIs"
      ]
    },
    _id: 120900,
    type: "Full-time",
    postedDate: new Date().toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
   {
    title: "Backend Developer",
    location: "Remote",
    description: "We're seeking a skilled backend developer to join our engineering team.",
    responsibility: {
      title: "Key Responsibilities",
      list: [
        "Design and implement scalable backend services",
        "Work with databases and APIs",
        "Collaborate with frontend developers",
        "Optimize application performance"
      ]
    },
    status: "closed",
    requirements: {
      education: "Bachelor's degree in Computer Science",
      experience: "3+ years of backend development experience",
      skills: [
        "Node.js",
        "Express",
        "MongoDB",
        "RESTful APIs",
        "GraphQL"
      ]
    },
    _id: 75000,
    type: "Part-time",
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
   {
    title: "UX Designer",
    location: "Chicago, IL",
    description: "We need a creative UX designer to help us create intuitive user experiences.",
    responsibility: {
      title: "Key Responsibilities",
      list: [
        "Create wireframes and prototypes",
        "Conduct user research and testing",
        "Collaborate with developers and product managers",
        "Design beautiful and functional interfaces"
      ]
    },
    status: "open",
    requirements: {
      education: "Bachelor's degree in Design or related field",
      experience: "3+ years of UX design experience",
      skills: [
        "Figma",
        "User Research",
        "Wireframing",
        "Prototyping",
        "UI Design"
      ]
    },
    _id: 90000,
    type: "Contract",
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  },
   {
    title: "DevOps Engineer",
    location: "New York, NY",
    description: "Looking for a DevOps engineer to help us streamline our development and deployment processes.",
    responsibility: {
      title: "Key Responsibilities",
      list: [
        "Set up and maintain CI/CD pipelines",
        "Manage cloud infrastructure",
        "Implement security best practices",
        "Optimize development workflows"
      ]
    },
    status: "open",
    requirements: {
      education: "Bachelor's degree in Computer Science or related field",
      experience: "4+ years of DevOps experience",
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Infrastructure as Code"
      ]
    },
    _id: 120000,
    type: "Full-time",
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    company: {
      name:"Google",
      logo:"http://localhost:8080/my.jpg",
      location:"New York"
    }
  }
  ]
  return jobs
};

exports.updateJobService = async (id, updates) => {

  const updatedJob = await Job.findByIdAndUpdate(id, updates, {
    new: true,             // return the updated document
    runValidators: true    // ensure validation rules are respected
  });

  return updatedJob;
};
exports.deleteJobService = async (id) => {
  return await Job.findByIdAndDelete(id);
};

exports.getJobDetailsService = async (jobId) => {
  const job = await Job.findById(jobId)
    .populate({
      path: "postedBy",
      model: "Company"
    });

  return job;
};
