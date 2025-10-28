import { Mail, Briefcase, CheckCircle2 } from "lucide-react";

interface Candidate {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  jobTitle: string;
}

export default function CandidateCard({
  candidate,
}: {
  candidate: Candidate & { jobTitle: string };
}) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-300 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {candidate.name}
          </h3>
          <a
            href={`mailto:${candidate.email}`}
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {candidate.email}
          </a>
        </div>
        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
      </div>

      <div className="mb-4 pb-4 border-b border-zinc-800">
        <p className="text-zinc-400 text-xs mb-1">Selected For</p>
        <p className="text-white font-medium flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-400" />
          {candidate.jobTitle}
        </p>
      </div>

      <div>
        <p className="text-zinc-400 text-xs mb-2">Skills</p>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-green-500/10 border border-green-500/30 text-green-300 text-xs rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
