import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Building,
  DollarSign,
  Award,
  Share2,
  BookmarkPlus,
  Send,
} from "lucide-react";
import { useApiQuery } from "@/hooks/useApi";
import { jobData } from "@/data/job-data";
import { ApplyJobModal } from "@/components/modals/ApplyJobModal";
import useAuth from "@/hooks/useAuth";
import SaveJobButton from "@/components/job-page/SaveJobButton";

type JobDataFetchType = {
  success: boolean;
  data: Job;
};

const JobDetailsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const {
    refetch,
    data: jobDetails,
    isLoading,
    error,
  } = useApiQuery<JobDataFetchType>({
    url: `/job/${jobId}/details`,
    queryKey: ["job-details", jobId],
    enabled: true,
  });

  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-10">
          <div className="mb-8">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-10 w-3/4 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 mb-6">
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-32 w-full mb-4" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>

            <div>
              <div className="bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 sticky top-24">
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-2/3 mb-4" />
                <Skeleton className="h-10 w-full mb-2" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!jobDetails.data) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/jobs">
            <Button>Browse All Jobs</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-shimmer-primary/10 to-shimmer-secondary/10 dark:from-shimmer-dark dark:to-shimmer-dark/80 py-6">
          <div className="container mx-auto px-4">
            <Link
              to="/jobs"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-shimmer-primary mb-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to all jobs
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {jobDetails.data.title}
                </h1>
                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                  <Building className="w-4 h-4 mr-1" />
                  <span>{jobDetails.data.company.name}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 md:mt-0">
                <SaveJobButton jobId={jobId} />
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 mb-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className="px-3 py-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {jobDetails.data.location}
                  </Badge>
                  <Badge className="px-3 py-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {jobDetails.data.type}
                  </Badge>

                  <Badge
                    className="px-3 py-1 flex items-center gap-1"
                    variant="outline"
                  >
                    <Clock className="w-3 h-3" />
                    {jobDetails.data.postedAt}
                  </Badge>
                </div>

                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose dark:prose-invert max-w-none mb-6">
                  <p>{jobDetails.data.description}</p>
                  <h3>{jobDetails.data.responsibility.title}</h3>
                  <ul>
                    {jobDetails.data.responsibility.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <div className="prose dark:prose-invert max-w-none mb-6">
                  <ul>
                    <li>{jobDetails.data.requirements.education}</li>
                    <li>{jobDetails.data.requirements.experience}</li>
                  </ul>
                </div>

                <h2 className="text-xl font-semibold mb-4">
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {jobDetails.data.requirements.skills.map(
                    (skill: string, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {skill}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  About {jobDetails.data.company.name}
                </h2>
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    {jobDetails.data.company.logo ? (
                      <img
                        src={jobDetails.data.company.logo}
                        alt={`${jobDetails.data.company.name} logo`}
                        className="h-12 w-12"
                      />
                    ) : (
                      <span className="font-bold text-xl text-gray-500">
                        {jobDetails.data.company.name
                          .substring(0, 2)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {jobDetails.data.company.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {jobDetails.data.company.companyDescription}
                    </p>

                    <Link
                      to={`/companies/${jobDetails.data.company.name.replace(
                        " ",
                        "-"
                      )}`}
                      className="text-blue-600 underline"
                    >
                      View Company Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">
                  Apply for this job
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Apply before{" "}
                  <span className="font-medium text-foreground">
                    {jobDetails.data.appliedDeadLine}
                  </span>
                </p>

                {user ? (
                  <ApplyJobModal jobId={jobId} />
                ) : (
                  <Link to={"/auth/login"}>
                    <Button className="w-full my-2">Sign Now</Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Email Application
                </Button>

                <Separator className="my-6" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetailsPage;
