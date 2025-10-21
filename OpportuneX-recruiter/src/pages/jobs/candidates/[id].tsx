import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Send,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Candidate } from "@/types/candidate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock function to get candidate data
const getMockCandidate = (id: string): Candidate => {
  return {
    id,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "",
    title: "Senior Frontend Developer",
    resumeUrl: "#",
    status: "selected",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "HTML/CSS",
      "Redux",
      "GraphQL",
      "Jest",
      "Webpack",
    ],
    experience: 5,
    education: "Bachelor's in Computer Science, Stanford University",
    location: "San Francisco, CA",
    about:
      "Passionate frontend developer with 5 years of experience in building web applications. Specialized in React ecosystem and modern JavaScript frameworks. Experienced in leading small development teams and mentoring junior developers.",
  };
};

const CandidateDetailsPage = () => {
  const { id, candidateId } = useParams<{ id: string; candidateId: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    if (candidateId) {
      // In a real app, fetch candidate details from API
      setCandidate(getMockCandidate(candidateId));
    }
  }, [candidateId]);

  if (!candidate) {
    return <>Loading...</>;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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

  const handleStatusChange = (newStatus: string) => {
    // In a real app, update the candidate status via API
    setCandidate((prev) =>
      prev ? { ...prev, status: newStatus as any } : null
    );
  };
  const goBack = () => {
    navigate(-1); // 1 step back in history
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => goBack()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Job
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                navigate(`/jobs/${id}/interview`, {
                  state: { selectedCandidates: [candidateId] },
                })
              }
            >
              <Calendar className="h-4 w-4 mr-2" /> Schedule Interview
            </Button>
            <Button
              onClick={() =>
                navigate(`/jobs/${id}/send-offer`, {
                  state: { selectedCandidates: [candidateId] },
                })
              }
            >
              <Send className="h-4 w-4 mr-2" /> Send Job Offer
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="bg-primary/10 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback className="text-2xl">
                  {getInitials(candidate.name)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2 text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold">{candidate.name}</h1>
                <p className="text-xl">{candidate.title}</p>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                  <span className="text-muted-foreground">
                    {candidate.email}
                  </span>
                  <span className="hidden md:block text-muted-foreground">
                    •
                  </span>
                  <span className="text-muted-foreground">
                    {candidate.location}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Status</div>
                  <Select
                    value={candidate.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="selected">Selected</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="offer_sent">Offer Sent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p>{candidate.about}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <p>{candidate.education}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Experience</h3>
                  <p>{candidate.experience} years</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t p-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => window.open(candidate.resumeUrl, "_blank")}
            >
              <Download className="h-4 w-4 mr-2" /> Download Resume
            </Button>

            <Button onClick={() => navigate(`/jobs/${id}/chat/${candidateId}`)}>
              <MessageSquare className="h-4 w-4 mr-2" /> Chat History
            </Button>
          </CardFooter>
        </Card>
      </div>
      candidate profile page form candidate app
    </>
  );
};

export default CandidateDetailsPage;
