import { useEffect, useState } from "react";
import {
  MapPin,
  Globe,
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  Share2,
  Heart,
  ExternalLink,
} from "lucide-react";

interface Candidate {
  _id: string;
  name: string;
  email: string;
  skills: string[];
}

interface Job {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  status: "active" | "closed";
  createdAt: string;
  selectedCandidates: Candidate[];
  applicants?: number;
  salary?: string;
}

interface Company {
  _id: string;
  name: string;
  verified: boolean;
  officialEmail: string;
  logo?: string;
  website?: string;
  industry: string;
  size?: string;
  location?: string;
  description?: string;
}

const dummyCompany: Company = {
  _id: "c1",
  name: "Tech Innovators Ltd.",
  verified: true,
  officialEmail: "contact@techinnovators.com",
  logo: "https://via.placeholder.com/100",
  website: "https://techinnovators.com",
  industry: "Information Technology",
  size: "51-200",
  location: "Dhaka, Bangladesh",
  description:
    "Tech Innovators Ltd. is a leading IT company specializing in cutting-edge software solutions and innovative tech products. We're committed to building world-class applications and fostering a culture of innovation.",
};

const dummyJobs: Job[] = [
  {
    _id: "j1",
    title: "Frontend Developer",
    description:
      "Work on React-based web applications with modern tooling and best practices.",
    skills: ["React", "TypeScript", "TailwindCSS"],
    status: "active",
    createdAt: "2025-10-20",
    applicants: 24,
    salary: "$80k - $120k",
    selectedCandidates: [
      {
        _id: "u1",
        name: "Alice Johnson",
        email: "alice@example.com",
        skills: ["React", "JS"],
      },
      {
        _id: "u2",
        name: "Bob Smith",
        email: "bob@example.com",
        skills: ["React", "TS"],
      },
    ],
  },
  {
    _id: "j2",
    title: "Backend Developer",
    description:
      "Build scalable Node.js APIs and microservices for enterprise applications.",
    skills: ["Node.js", "Express", "MongoDB"],
    status: "active",
    createdAt: "2025-10-15",
    applicants: 18,
    salary: "$90k - $130k",
    selectedCandidates: [
      {
        _id: "u3",
        name: "Charlie Brown",
        email: "charlie@example.com",
        skills: ["Node.js", "MongoDB"],
      },
    ],
  },
  {
    _id: "j3",
    title: "Product Designer",
    description:
      "Design beautiful and intuitive user experiences for our flagship products.",
    skills: ["Figma", "UI/UX", "Prototyping"],
    status: "active",
    createdAt: "2025-10-18",
    applicants: 32,
    salary: "$75k - $110k",
    selectedCandidates: [
      {
        _id: "u4",
        name: "Diana Lee",
        email: "diana@example.com",
        skills: ["Figma", "UI/UX"],
      },
    ],
  },
];

function PublicJobCard({ job }: { job: Job }) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-300 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {job.title}
          </h3>
          <p className="text-zinc-400 text-sm line-clamp-2">
            {job.description}
          </p>
        </div>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`ml-4 p-2 rounded-lg transition-all ${
            isSaved
              ? "bg-red-500/20 border border-red-500/30 text-red-400"
              : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-300"
          }`}
        >
          <Heart className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-xs text-zinc-400 mb-2">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-zinc-800">
        <div>
          <p className="text-zinc-400 text-xs mb-1">Applicants</p>
          <p className="text-white font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            {job.applicants || 0}
          </p>
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Posted</p>
          <p className="text-white font-semibold flex items-center gap-1">
            <Clock className="w-4 h-4 text-zinc-400" />
            {daysAgo}d ago
          </p>
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Salary</p>
          <p className="text-white font-semibold text-sm">
            {job.salary || "Negotiable"}
          </p>
        </div>
      </div>

      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
        Apply Now
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function PublicCompanyView() {
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobFilter, setJobFilter] = useState<"all" | "active">("active");

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setCompany(dummyCompany);
        setJobs(dummyJobs);
      } catch (err) {
        console.error("Failed to load company data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanyData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-zinc-800 border-t-blue-500 animate-spin" />
          <p className="text-zinc-400 text-sm">Loading company profile...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 backdrop-blur-xl shadow-lg text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-zinc-600" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Company Not Found
            </h2>
            <p className="text-zinc-400 text-sm">
              The company profile you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredJobs =
    jobFilter === "active" ? jobs.filter((j) => j.status === "active") : jobs;
  const activeJobsCount = jobs.filter((j) => j.status === "active").length;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 backdrop-blur-xl bg-zinc-900/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">TI</span>
            </div>
            <span className="text-white font-semibold">Tech Innovators</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 text-sm transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <a
              href="/"
              className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
            >
              Back
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Company Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src={
                    company.logo ||
                    "/placeholder.svg?height=96&width=96&query=company-logo"
                  }
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {company.verified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-2 border-zinc-950 shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">
                  {company.name}
                </h1>
                {company.verified && (
                  <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-zinc-400 mb-4">{company.industry}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {company.location}
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Users className="w-4 h-4 text-blue-400" />
                  {company.size}
                </div>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 backdrop-blur-xl hover:border-zinc-700 transition-colors shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              About the Company
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-6">
              {company.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <p className="text-zinc-400 text-sm mb-1">Industry</p>
                <p className="text-white font-medium">{company.industry}</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <p className="text-zinc-400 text-sm mb-1">Company Size</p>
                <p className="text-white font-medium">{company.size}</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <p className="text-zinc-400 text-sm mb-1">Location</p>
                <p className="text-white font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <p className="text-zinc-400 text-sm mb-1">Contact</p>
                <a
                  href={`mailto:${company.officialEmail}`}
                  className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                >
                  {company.officialEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Open Positions
              </h2>
              <p className="text-zinc-400">
                {activeJobsCount}{" "}
                {activeJobsCount === 1 ? "position" : "positions"} available
              </p>
            </div>
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value as any)}
              className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 text-sm hover:border-zinc-600 transition-colors focus:outline-none focus:border-blue-500"
            >
              <option value="active">Active Positions</option>
              <option value="all">All Positions</option>
            </select>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <PublicJobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <Briefcase className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-white font-medium mb-1">
                No Positions Available
              </p>
              <p className="text-zinc-400 text-sm">
                Check back soon for new opportunities.
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Interested in working here?
            </h3>
            <p className="text-zinc-300 mb-6">
              Explore open positions and apply to join our innovative team.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Positions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
