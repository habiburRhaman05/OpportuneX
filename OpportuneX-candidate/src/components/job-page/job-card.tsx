import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job.type";
import { Link } from "react-router-dom";

export interface JobCardProps extends Partial<Job> {
  featured?: boolean;
}

const JobCard = ({
  _id,
  title,
  company,
  location,
  type,
  postedAt,
  featured = false,
}: JobCardProps) => {
  return (
    <div
      className={`job-card h-full ${
        featured ? "border-l-4 border-l-shimmer-primary" : ""
      }`}
    >
      <div className="flex items-start gap-4 h-full flex-col">
        <div className="flex items-start gap-4 w-full">
          <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
            {company.logo ? (
              <img
                src={company.logo}
                alt={`${company.logo} logo`}
                className="h-8 w-8"
              />
            ) : (
              <span className="font-bold text-gray-500 text-xs">
                {company.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold line-clamp-1">{title}</h3>
              {featured && (
                <Badge className="bg-shimmer-primary/20 text-shimmer-primary hover:bg-shimmer-primary/30">
                  Featured
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {company.name}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {location}
          </span>
          <span className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {type}
          </span>
        </div>

        <div className="flex items-center justify-between w-full mt-auto">
          <span className="text-xs text-gray-500">{postedAt}</span>
          {_id ? (
            <Button variant="outline" className="text-xs h-8" asChild>
              <Link to={`/jobs/${_id}`}>Apply Now</Link>
            </Button>
          ) : (
            <Button variant="outline" className="text-xs h-8">
              Apply Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
