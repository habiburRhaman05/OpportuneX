"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  MapPin,
  Globe,
  Mail,
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Eye,
  Clock,
  X,
  Check,
} from "lucide-react";
import CompanyHeader from "@/components/company-profile/company-header";
import StatsCard from "@/components/company-profile/stats-card";
import JobCard from "@/components/company-profile/job-card";
import CandidateCard from "@/components/company-profile/candidate-card";
import { useUser } from "@/context/AuthContext";
import ErrorState from "@/components/company-profile/company-error";
import AppIntro from "@/components/AppIntro";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import PublicCompanyView from "@/components/company-profile/public-view-profile/company-public-view";
import VerifyPage from "./verify";

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
  _id: "hdfhfh9h7fg9hfg1h99",
  name: "Tech Innovators Ltd.",
  verified: false,
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
    status: "closed",
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

export default function CompanyProfile() {
  const { recruiter, isLoading } = useUser();
  // const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "jobs" | "candidates"
  >("overview");
  const [jobFilter, setJobFilter] = useState<"all" | "active" | "closed">(
    "all"
  );

  useEffect(() => {
    // setCompany(dummyCompany);
    setJobs(dummyJobs);
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

  let filteredJobs = [...jobs];
  if (jobFilter === "active")
    filteredJobs = filteredJobs.filter((job) => job.status === "active");
  if (jobFilter === "closed")
    filteredJobs = filteredJobs.filter((job) => job.status === "closed");

  const allCandidates = jobs.flatMap((job) =>
    job.selectedCandidates.map((c) => ({ ...c, jobTitle: job.title }))
  );

  const activeJobsCount = jobs.filter((j) => j.status === "active").length;
  const totalApplicants = jobs.reduce(
    (sum, job) => sum + (job.applicants || 0),
    0
  );
  const totalCandidates = allCandidates.length;

  if (!recruiter.company) {
    return <ErrorState message="Company Profile Not Set" onRetry={() => {}} />;
  }
  if (isLoading) {
    return <DashboardLayout></DashboardLayout>;
  }

  return <VerifyPage />;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <CompanyHeader company={recruiter.company} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <StatsCard
            icon={<Briefcase className="w-5 h-5" />}
            label="Active Jobs"
            value={activeJobsCount}
            trend="+2 this month"
          />
          <StatsCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Total Applicants"
            value={totalApplicants}
            trend="+12% from last month"
          />
          <StatsCard
            icon={<Users className="w-5 h-5" />}
            label="Selected Candidates"
            value={totalCandidates}
            trend="Across all positions"
          />
          <StatsCard
            icon={<Eye className="w-5 h-5" />}
            label="Profile Views"
            value="1.2K"
            trend="+8% this week"
          />
        </div>

        <div className="flex gap-2 mb-8 border-b border-zinc-800">
          {[
            { id: "overview", label: "Overview", icon: null },
            { id: "jobs", label: "Open Positions", icon: Briefcase },
            { id: "candidates", label: "Selected Candidates", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium transition-all duration-300 border-b-2 -mb-px flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 backdrop-blur-xl hover:border-zinc-700 transition-colors shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  About the Company
                </h2>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  {recruiter.company.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                    <p className="text-zinc-400 text-sm mb-1">Industry</p>
                    <p className="text-white font-medium">
                      {recruiter.company.industry}
                    </p>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                    <p className="text-zinc-400 text-sm mb-1">Company Size</p>
                    <p className="text-white font-medium">
                      {recruiter.company.size}
                    </p>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                    <p className="text-zinc-400 text-sm mb-1">Location</p>
                    <p className="text-white font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {recruiter.company.location}
                    </p>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                    <p className="text-zinc-400 text-sm mb-1">Status</p>
                    <p className="text-white font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Verified
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`mailto:${recruiter.company.officialEmail}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-500/50 hover:bg-zinc-900/80 transition-all group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm mb-1">Email</p>
                      <p className="text-white font-medium">
                        {recruiter.company.officialEmail}
                      </p>
                    </div>
                    <Mail className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                </a>
                <a
                  href={recruiter.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-500/50 hover:bg-zinc-900/80 transition-all group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm mb-1">Website</p>
                      <p className="text-white font-medium">
                        {recruiter.company.website}
                      </p>
                    </div>
                    <Globe className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                </a>
              </div>
            </div>
          )}

          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  {filteredJobs.length}{" "}
                  {filteredJobs.length === 1 ? "Position" : "Positions"}
                </h3>
                <select
                  value={jobFilter}
                  onChange={(e) => setJobFilter(e.target.value as any)}
                  className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 text-sm hover:border-zinc-600 transition-colors focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Positions</option>
                  <option value="active">Active Only</option>
                  <option value="closed">Closed Only</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-400">No positions found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">
                {allCandidates.length} Selected{" "}
                {allCandidates.length === 1 ? "Candidate" : "Candidates"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allCandidates.map((candidate) => (
                  <CandidateCard key={candidate._id} candidate={candidate} />
                ))}
              </div>

              {allCandidates.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-400">No candidates selected yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
