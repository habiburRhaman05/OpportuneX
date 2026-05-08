
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Briefcase, Star, BookmarkPlus } from "lucide-react";

interface JobListingCardProps {
  job: any;
}

const JobListingCard = ({ job }: JobListingCardProps) => {
  return (
    <div className="job-card transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Company logo */}
        <div className="h-14 w-14 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
          {job.logo ? (
            <img src={job.logo} alt={`${job.company} logo`} className="h-10 w-10" />
          ) : (
            <span className="font-bold text-xl text-gray-500">{job.company.substring(0, 2).toUpperCase()}</span>
          )}
        </div>
        
        {/* Job details */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link to={`/jobs/${job.id}`} className="font-semibold text-lg hover:text-shimmer-primary transition-colors duration-200">
              {job.title}
            </Link>
            {job.featured && (
              <Badge className="bg-shimmer-primary/20 text-shimmer-primary hover:bg-shimmer-primary/30">
                Featured
              </Badge>
            )}
            {job.isNew && (
              <Badge variant="outline" className="border-shimmer-secondary text-shimmer-secondary">
                New
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
            <span>{job.company}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <MapPin className="h-4 w-4 text-gray-400" /> 
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <Briefcase className="h-4 w-4 text-gray-400" /> 
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <DollarSign className="h-4 w-4 text-gray-400" /> 
              <span>{job.salary}</span>
            </div>
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 4).map((skill: string, idx: number) => (
              <Badge key={idx} variant="outline" className="rounded-md">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="outline" className="rounded-md">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{job.postedAt}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <BookmarkPlus className="h-4 w-4" />
              </Button>
              <Link to={`/jobs/${job.id}`}>
                <Button className="group-hover:bg-shimmer-secondary transition-colors duration-300">View Job</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
