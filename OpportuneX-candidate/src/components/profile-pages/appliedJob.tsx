import { AnimatePresence } from "framer-motion";

import { useUser } from "@/context/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { AppliedJob } from "@/types/user.type";
import { Button } from "../ui/button";
import AppliedJobCard from "./AppliedJobCard";
import AppliedJobCardSkelection from "../skelections/AppliedJobCardSkelection";
import { Link } from "react-router-dom";

const statusStyles = {
  applied: "bg-blue-500/20 text-blue-300 border border-blue-400/30",
  "in-review": "bg-amber-500/20 text-amber-300 border border-amber-400/30",
  selected: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30",
  rejected: "bg-rose-500/20 text-rose-300 border border-rose-400/30",
};

export default function AppliedJobsPage() {
  const { user } = useUser();
  const { isLoading, data, refetch, isError, error } = useApiQuery<{
    data: AppliedJob[];
  }>({
    queryKey: ["fetch-appliedjob", user?.data?._id],
    url: `/job/applied-jobs/${user?.data?._id}`,
    enabled: true,
  });

  if (isLoading) {
    return <AppliedJobCardSkelection />;
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
            <h1 className="text-xl font-bold">Applied Jobs</h1>
            <Link to={"/candidate/profile/applied-applications"}>View All</Link>
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
