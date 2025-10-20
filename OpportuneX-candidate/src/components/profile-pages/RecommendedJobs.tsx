import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Heart,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const recommendedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    postedTime: "2 days ago",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js"],
    description:
      "Join our team to build next-generation web applications using cutting-edge technologies.",
    companyLogo:
      "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=40&h=40&fit=crop&crop=center",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateLab",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $150k",
    postedTime: "1 week ago",
    matchScore: 87,
    skills: ["JavaScript", "Python", "AWS"],
    description:
      "Work on innovative projects that impact millions of users worldwide.",
    companyLogo:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=40&h=40&fit=crop&crop=center",
  },
];

const getMatchScoreColor = (score: number) => {
  if (score >= 90) return "text-green-500";
  if (score >= 80) return "text-blue-500";
  if (score >= 70) return "text-yellow-500";
  return "text-gray-500";
};

const getMatchScoreLabel = (score: number) => {
  if (score >= 90) return "Excellent Match";
  if (score >= 80) return "Great Match";
  if (score >= 70) return "Good Match";
  return "Fair Match";
};

export function RecommendedJobs() {
  return (
    <div className="  rounded-md  space-y-6 col-span-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Recommended Jobs
          </h2>
          <p className="text-gray-400 mt-1">
            Jobs tailored to your skills and experience
          </p>
        </div>
        <Button
          variant="default"
          className="text-white  bg-blue-600 border-white hover:bg-zinc-800"
        >
          View All Jobs
        </Button>
      </div>

      <div className="grid gap-4">
        {recommendedJobs.map((job) => (
          <Card
            key={job.id}
            className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white hover:text-blue-400 cursor-pointer transition-colors">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-400 mt-1">
                      <Building2 className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.postedTime}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp
                      className={`h-4 w-4 ${getMatchScoreColor(
                        job.matchScore
                      )}`}
                    />
                    <span
                      className={`font-semibold ${getMatchScoreColor(
                        job.matchScore
                      )}`}
                    >
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <div className="">
                    <Progress
                      value={job.matchScore}
                      className="h-2 bg-zinc-800"
                    />
                    <p
                      className={`text-xs mt-1 ${getMatchScoreColor(
                        job.matchScore
                      )}`}
                    >
                      {getMatchScoreLabel(job.matchScore)}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <Badge
                    variant="outline"
                    className="text-gray-400 border-gray-600"
                  >
                    {job.type}
                  </Badge>
                  <span className="text-green-400 font-semibold">
                    {job.salary}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">4.8 Company Rating</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t border-zinc-800">
              <div className="flex gap-3 w-full">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  className="text-white bg-zinc-800 hover:bg-blue-700"
                >
                  Save <Heart />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
