export interface Job {
  _id: string; // Unique job identifier
  title: string; // Job title (e.g., Frontend Developer)
  location: string; // Job location (e.g., San Francisco, CA)
  description: string; // Job description text

  responsibility: {
    title: string; // Section title (e.g., "Key Responsibilities")
    list: string[]; // List of responsibilities
  };

  status: "open" | "closed"; // Job status
  requirements: {
    education: string; // Required education
    experience: string; // Required experience
    skills: string[]; // Required skill list
  };

  type: "Full-time" | "Part-time" | "Remote" | "Contract" | "Internship"; // Job type

  company: {
    _id?: string; // Optional company ID if linked from backend
    name: string; // Company name
    logo?: string; // Optional logo URL
    companyDescription?: string; // Optional description
  };
  postedAt: string; // Posting date (e.g., "Sep 8, 2025")
  appliedDeadLine: string; // Application deadline (e.g., "Dec 8, 2025")
}
