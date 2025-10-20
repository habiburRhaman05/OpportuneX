import { SavedJob } from "@/types/user.type";
import SavedJobCard from "./savedJobsCard";

export default function SavedJobsList({
  savedJobs,
}: {
  savedJobs: SavedJob[];
}) {
  const handleUnsave = (jobId) => {
    console.log("Unsave clicked:", jobId);
  };

  const handleView = (jobId) => {
    console.log("View clicked:", jobId);
  };

  return (
    <div className="space-y-1">
      <h3 className="text-xl font-semibold">Saved Jobs</h3>
      {/* <Link>View All</Link> */}
      {savedJobs.map((job, idx) => (
        <SavedJobCard
          key={idx}
          job={job}
          onUnsave={handleUnsave}
          onView={handleView}
        />
      ))}
    </div>
  );
}
