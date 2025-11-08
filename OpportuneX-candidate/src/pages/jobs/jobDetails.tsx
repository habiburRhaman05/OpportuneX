// "use client"

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Heart,
  Share2,
  Bookmark,
  Briefcase,
  DollarSign,
  Eye,
  Users,
  ArrowRight,
  Check,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import JobDetailsSkeleton from "@/components/skelections/job-details-skelection";
import ApplyModal from "@/components/job-page/apply-modal";
import ShareModal from "@/components/job-page/share-modal";
import { useParams } from "react-router-dom";

// Mock job data
const jobsData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Giants Inc",
    location: "San Francisco, CA",
    salary: "$180K - $220K",
    type: "Full-time",
    level: "Senior",
    experience: "5+ years",
    description:
      "We are looking for an experienced Full Stack Developer to join our innovative team. You will work on cutting-edge technologies and have the opportunity to make a significant impact on our platform.",
    fullDescription: `
    We are seeking a talented Senior Full Stack Developer to join our Engineering team at Tech Giants Inc. In this role, you will:

    • Design and implement scalable web applications using React and Node.js
    • Collaborate with cross-functional teams to deliver high-quality software solutions
    • Mentor junior developers and contribute to team growth
    • Participate in code reviews and contribute to best practices
    • Work with modern development tools and methodologies
    • Help establish and maintain coding standards

    This is an exciting opportunity to work on products used by millions of users worldwide.
    `,
    requirements: [
      "5+ years of professional software development experience",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with PostgreSQL and NoSQL databases",
      "Knowledge of cloud platforms (AWS, GCP, or Azure)",
      "Experience with Docker and Kubernetes",
      "Strong problem-solving skills",
      "Excellent communication abilities",
    ],
    benefits: [
      "Competitive salary and stock options",
      "Health insurance (medical, dental, vision)",
      "401(k) matching",
      "Flexible work schedule and remote options",
      "Professional development budget",
      "Generous PTO policy",
      "Wellness programs",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "AWS", "TypeScript"],
    views: "12.5K",
    applications: "3,420",
    posted: "2 days ago",
    company_logo: "/tech-company-logo.jpg",
    company_description:
      "Tech Giants Inc is a leading software company focused on building innovative solutions for enterprises.",
  },
};

export default function JobDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { jobId } = useParams();
  const [job, setJob] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      const jobData = jobsData[jobId];
      if (jobData) {
        setJob(jobData);
      }
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [jobId]);

  const handleSaveJob = async () => {
    setIsSaved(!isSaved);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast({
      title: isSaved ? "Removed from saved" : "Saved successfully",
      description: isSaved
        ? "Job removed from your saved list"
        : "Job added to your saved list",
    });
  };

  const handleApply = async (formData: any) => {
    setIsApplying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsApplying(false);
    setShowApplyModal(false);
    toast({
      title: "Application submitted",
      description: "Your application has been sent successfully!",
    });
  };

  const handleShare = async (platform: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setShowShareModal(false);
    toast({
      title: `Shared on ${platform}`,
      description: `Job posted on ${platform}`,
    });
  };

  if (isLoading) {
    return (
      <main className="relative min-h-screen bg-zinc-950 overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-15" />
        </div>
        <div className="relative z-10">
          <JobDetailsSkeleton />
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="relative min-h-screen bg-zinc-950 overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-15" />
        </div>
        <div className="relative z-10">
          <div className="pt-28 pb-12 px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Job not found
              </h1>
              <p className="text-gray-400">
                The job you are looking for does not exist.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative z-10">
        {/* Job Header Section */}
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-b border-blue-400/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Left Content */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-blue-400" size={32} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {job.title}
                    </h1>
                    <p className="text-lg text-blue-300 mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30 text-sm">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-300 border border-purple-400/30 text-sm">
                        {job.level}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30 text-sm">
                        {job.posted}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Salary</div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <DollarSign size={16} className="text-blue-400" />
                      {job.salary}
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Experience</div>
                    <div className="text-white font-semibold">
                      {job.experience}
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Views</div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <Eye size={16} className="text-blue-400" />
                      {job.views}
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">
                      Applications
                    </div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <Users size={16} className="text-blue-400" />
                      {job.applications}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              {/* About Section */}
              <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  About This Role
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {job.fullDescription}
                </p>
              </div>

              {/* Requirements */}
              <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-400/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                      </div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <div className="flex flex-col gap-3 w-full  backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl p-6">
                <Button
                  onClick={() => setShowApplyModal(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold h-12 rounded-lg transition-all"
                >
                  Apply Now
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button
                  onClick={handleSaveJob}
                  variant="outline"
                  className={`w-full h-12 rounded-lg transition-all ${
                    isSaved
                      ? "bg-green-500/30 border-green-400/60 text-white hover:bg-blue-500/40"
                      : "bg-blue-500/10 border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                  }`}
                >
                  <Bookmark size={16} className="mr-2" />
                  {isSaved ? "Saved" : "Save Job"}
                </Button>
                <Button
                  onClick={() => setShowShareModal(true)}
                  variant="outline"
                  className="w-full bg-blue-500/10 border-blue-400/30 text-blue-300 hover:bg-blue-500/20 h-12 rounded-lg transition-all"
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
              {/* Skills */}
              <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30 text-sm hover:bg-blue-500/40 transition cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  About Company
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {job.company_description}
                </p>
                <Button className="w-full bg-blue-500/30 hover:bg-blue-500/40 border border-blue-400/30 text-blue-300 h-10 rounded-lg transition-all">
                  View Company
                </Button>
              </div>

              {/* Similar Jobs CTA */}
              <div className="backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-blue-400/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  Like this job?
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Check out similar positions from other companies.
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-10 rounded-lg transition-all">
                  See Similar Jobs
                </Button>
              </div>
            </div>
          </div>
          {/* Benefits */}
          <div className="backdrop-blur-md max-w-6xl mx-auto mt-8 bg-blue-500/10 border border-blue-400/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Benefits & Perks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {job.benefits.map((benefit: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-400/10"
                >
                  <CheckCircle
                    size={18}
                    className="text-blue-400 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-blue-400/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Ready to apply?
            </h2>
            <p className="text-gray-400 mb-6">
              Submit your application now and let's start your journey with us
            </p>
            <Button
              onClick={() => setShowApplyModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 h-12 rounded-lg transition-all"
            >
              Apply Now
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </section>
      </div>

      {/* Modals */}
      {showApplyModal && (
        <ApplyModal
          job={job}
          isLoading={isApplying}
          onSubmit={handleApply}
          onClose={() => setShowApplyModal(false)}
        />
      )}
      {showShareModal && (
        <ShareModal
          jobTitle={job.title}
          onShare={handleShare}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </main>
  );
}
