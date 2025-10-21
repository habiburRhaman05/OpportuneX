import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/types/candidate";
import { Download, User, Check, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CandidateCardProps {
  candidate: Candidate;
  jobId: string;
}

export const CandidateCard = ({ candidate, jobId }: CandidateCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "selected":
        return "bg-green-100 text-green-800";
      case "rejected":
      case "not_selected":
        return "bg-red-100 text-red-800";
      case "interview":
        return "bg-blue-100 text-blue-800";
      case "offer_sent":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex items-start space-x-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={candidate.profilePhoto} alt={candidate.fullName} />
        <AvatarFallback>{getInitials(candidate.fullName)}</AvatarFallback>
      </Avatar>

      <div>
        <h3 className="font-semibold">{candidate.fullName}</h3>
        <p className="text-sm text-muted-foreground">{candidate.email}</p>
        <p className="text-sm font-medium">{candidate.location}</p>
      </div>
    </div>
  );
};
