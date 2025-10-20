import { JobPostingForm } from "@/components/job-posting-form";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const PostJobPage = () => {
  const { recruiter } = useUser();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Post a New Job</h1>
      <p className="text-muted-foreground">Create a new job listing</p>

      {!recruiter.company.verified && (
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-semibold text-red-800">
            You cannot post a job - please verify you company EMail
          </h1>{" "}
          <Button>
            <Link to={"/recruiter/company/verify"} className="underline ">
              Verify Now
            </Link>
          </Button>
        </div>
      )}

      <div className="rounded-lg border bg-card p-6">
        <JobPostingForm />
      </div>
    </div>
  );
};

export default PostJobPage;
