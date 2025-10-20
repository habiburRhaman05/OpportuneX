"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateToMonthYear } from "@/helper/formatDate";
import { SavedJob } from "@/types/user.type";
import { Eye, Heart } from "lucide-react";
import { MdOutlineLocationOn } from "react-icons/md";

type PageProps = {
  job: SavedJob;
  onUnsave: (jobId: string) => void;
  onView: (jobId: string) => void;
};

export default function SavedJobCard({ job, onUnsave, onView }: PageProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        {/* <ExperienceModal /> */}
      </div>
      <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-md hover:shadow-lg transition rounded-2xl rounded-2xl shadow-md hover:shadow-lg transition-all">
        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-5">
          {/* Job Info */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white">{job.jobTitle}</h2>
            <p className="text-sm text-zinc-300">{job.company}</p>
            <div className="flex items-center">
              <MdOutlineLocationOn className="text-zinc-500" />
              <p className="text-sm text-zinc-500  ">
                {job.location} • {job.type}
              </p>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Deadline:{" "}
              <span className="text-red-400 font-medium">
                {formatDateToMonthYear(job.appliedDeadLine)}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              onClick={() => onView(job._id)}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => onUnsave(job._id)}
            >
              <Heart className="w-4 h-4 mr-1" />
              Unsave
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
