import { s } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

export interface RecruiterType {
  _id: number;
  bio: string;
  profilePhoto: string;
  role: string;
  fullName: string;
  email: string;
  position: string;
  location: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    github: string;
  };
  profileComplection: number;
  messingFeilds: string[];
  emailVerified: boolean;
  otpExpiresAt: Date | null;
  emailOtp: Date | null;
  onboardingSteps: {
    emailVerification: boolean;
    company: boolean;
  };
  company: CompanyType;
}

export interface CompanyType {
  _id: Number;
  name: string;
  logo: string;
  verified: false;
  officialEmail: string;
  website: string;
  industry: string;
  size: string;
  location: string;
  description: string;
}
