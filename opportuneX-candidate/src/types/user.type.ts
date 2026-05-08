export interface User {
  _id: string;
  fullName: string;
  profilePhoto: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  bio: string;
  role: "candidate" | "recruiter" | "admin";
  emailOtp: string | null;
  otpExpiresAt: string | null;
  onboardingSteps: {
    emailVerification: boolean;
    profileInfo: boolean;
  };
  socialProfiles: {
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  workExperience: Experience[];
  appliedJobs: Experience[];
  education: [];
  savedJobs: SavedJob[];
  skills: string[];
  achievements?: string[];
  resumeUrl?: string;
  profileCompletion: number;
}
export interface AuthContextType {
  user: { data: User } | null;
  isLoading: boolean;
  error: any;
}

export type SavedJob = {
  _id: string;
  jobTitle: string;
  company: string;
  savedDate: string;
  location: string;
  type: string;
  appliedDeadLine: string;
};

export type Education = {
  _id?: string;

  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
};
export type Experience = {
  _id?: string;

  company: string;
  position: string;
  duration: string;
  description: string;
  logo?: string;
};

export type AppliedJob = {
  applicationId: string;
  status:
    | "applied"
    | "reviewing"
    | "shortlisted"
    | "interview"
    | "hired"
    | "rejected"; // extend with your actual statuses
  appliedAt: string; // ISO Date string
  resumeUrl?: string;
  coverLetter?: string;

  // optional if you sometimes exclude it
  // Job
  jobId: string;
  jobTitle: string;
  jobType?: string;
  location: string;
  description: string;

  // Company
  company: {
    _id: string;
    name: string;
    logo: string;
    description: string;
  };
};

export type RevalidateDataType = "reFetch" | "reValidate" | "removeQuery";
