import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  Search,
  User2,
} from "lucide-react";
import { useState } from "react";

import { useApiQuery } from "@/hooks/useApi";

import { useUser } from "@/context/AuthContext";

import { AppliedJob } from "@/types/user.type";
import AppliedJobCard from "@/components/profile-pages/AppliedJobCard";
import { Button } from "@/components/ui/button";

const statusStyles = {
  applied: "bg-blue-500/20 text-blue-300 border border-blue-400/30",
  "in-review": "bg-amber-500/20 text-amber-300 border border-amber-400/30",
  selected: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30",
  rejected: "bg-rose-500/20 text-rose-300 border border-rose-400/30",
};

export default function AppliedApplications() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const { user } = useUser();
  const { isLoading, data, refetch, isError, error } = useApiQuery<{
    data: AppliedJob[];
  }>({
    queryKey: ["fetch-appliedjob", user?.data?._id],
    url: `/job/applied-jobs/${user?.data?._id}`,
    enabled: true,
  });

  if (isLoading) {
    return <JobCardSkeleton />;
  }
  if (isError) {
    return (
      <Error reFetch={refetch} error={` ${error.name} -- ${error.message}`} />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br  via-zinc-900 to-black text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Applied Jobs
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Your application history with a modern, sleek view.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <label className="relative inline-flex items-center w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none transition"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 focus:border-blue-500 transition"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="in-review">In Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </header>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 gap-6 ">
            {data?.data.map((item) => (
              <AppliedJobCard key={item.applicationId} item={item} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const JobCardSkeleton = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-lg"
    >
      <div className="animate-pulse space-y-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-zinc-800" />
            <div>
              <div className="h-4 w-32 rounded bg-zinc-800" />
              <div className="mt-2 flex gap-2">
                <div className="h-3 w-20 rounded bg-zinc-800" />
                <div className="h-3 w-16 rounded bg-zinc-800" />
              </div>
            </div>
          </div>
          <div className="h-6 w-16 rounded-full bg-zinc-800" />
        </div>

        {/* Description */}
        <div className="h-3 w-full rounded bg-zinc-800" />
        <div className="h-3 w-2/3 rounded bg-zinc-800" />

        {/* Tags */}
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-20 rounded-full bg-zinc-800" />
          <div className="h-6 w-20 rounded-full bg-zinc-800" />
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <div className="h-4 w-32 rounded bg-zinc-800" />
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-lg bg-zinc-800" />
            <div className="h-8 w-24 rounded-lg bg-zinc-800" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Error = ({ error, reFetch }) => {
  return (
    <div className="flex items-center flex-col space-y-2">
      <h1 className="text-xl text-red-800">{error}</h1>
      <p className="text-muted-foreground">
        we are failed to fetch your Applied jobs Data
      </p>
      <Button className="text-white" onClick={reFetch}>
        Reload
      </Button>
    </div>
  );
};
