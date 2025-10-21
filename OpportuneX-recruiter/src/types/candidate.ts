
export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  resumeUrl: string;
  status: "selected" | "not_selected" | "pending" | "interview" | "rejected" | "offer_sent";
  skills: string[];
  experience: number;
  education: string;
  location: string;
  about: string;
}
