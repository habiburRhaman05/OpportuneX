import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job.type";
import { Calendar, Eye, Zap } from "lucide-react";
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
  description,
  tags = ["react", "javascript", "nodeJs"],
  appliedDeadLine,
}: JobCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 via-zinc-900/50 to-transparent border border-blue-400/30 p-6 hover:border-blue-400/60 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 animate-fade-in">
      {/* Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30">
          {type}
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">
          {postedAt || "2 Days Ago"}
        </span>
      </div>

      {/* Title and Company */}
      <div className="mb-2">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-400">{company.name}</p>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-400/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10  my-3" />

      {/* Location and Salary */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Location</span>
          <span className="text-sm font-semibold text-white">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Salary</span>
          <span className="text-sm font-semibold text-blue-300">
            {"Negotiable "}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-white/10 py-4 mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-500 flex  items-center gap-x-2">
            <Calendar />
            DeadLine
          </span>
          <span className="font-semibold text-white text-sm">
            {appliedDeadLine || "12/3/2025"}
          </span>
        </div>
      </div>

      {/* Apply Button */}
      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all group-hover:shadow-lg group-hover:shadow-blue-500/30">
        <Zap size={16} className="mr-2" />
        Apply Now
      </Button>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default JobCard;
