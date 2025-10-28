import { Users, Clock, TrendingUp } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  status: "active" | "closed";
  createdAt: string;
  applicants?: number;
  salary?: string;
  selectedCandidates: any[];
}

export default function JobCard({ job }: { job: Job }) {
  const isActive = job.status === "active";
  const daysAgo = Math.floor(
    (Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-300 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {job.title}
          </h3>
          <p className="text-zinc-400 text-sm">{job.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
            isActive
              ? "bg-green-500/10 border border-green-500/30 text-green-400"
              : "bg-zinc-800 border border-zinc-700 text-zinc-400"
          }`}
        >
          {isActive ? "Active" : "Closed"}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-xs text-zinc-400 mb-2">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-zinc-800">
        <div>
          <p className="text-zinc-400 text-xs mb-1">Applicants</p>
          <p className="text-white font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            {job.applicants || 0}
          </p>
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Selected</p>
          <p className="text-white font-semibold flex items-center gap-1">
            <Users className="w-4 h-4 text-green-400" />
            {job.selectedCandidates.length}
          </p>
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Posted</p>
          <p className="text-white font-semibold flex items-center gap-1">
            <Clock className="w-4 h-4 text-zinc-400" />
            {daysAgo}d ago
          </p>
        </div>
      </div>

      {job.salary && (
        <div className="pt-4 border-t border-zinc-800">
          <p className="text-zinc-400 text-xs mb-1">Salary Range</p>
          <p className="text-white font-semibold">{job.salary}</p>
        </div>
      )}
    </div>
  );
}
