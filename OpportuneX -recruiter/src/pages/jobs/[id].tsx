import JobDetailsPageSkelection from "@/components/skelections/JobDetailsPageSkelection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiQuery } from "@/hooks/useApi";
import { routes } from "@/lib/clientRoutes";
import { ArrowLeft, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

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
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 1 step back in history
  };
  const { refetch, data, isLoading, error } = useApiQuery({
    url: `/job/${id}/details`,
    queryKey: ["job-details", id],
    enabled: true,
  });

  if (isLoading) {
    return <JobDetailsPageSkelection />;
  }

  return (
    <div className="space-y-6">
      <div className="md:flex block items-center justify-between">
        <Button
          variant="ghost"
          className="mb-2 bg-zinc-800"
          onClick={() => goBack()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              navigate(
                `${routes.posted_jobs_page}/${data?.data?._id}/applicants`
              )
            }
          >
            View Applications <Badge className="ml-3 bg-zinc-900">30</Badge>
          </Button>
          <Button
            onClick={() => navigate(`${routes.posted_jobs_page}/${id}/update`)}
          >
            <Edit className="h-4 w-4 mr-2" /> Edit Job
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{data?.data?.title}</h1>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">{data?.data?.location}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{data?.data?.type}</span>
          <Badge
            variant={data?.data?.status === "open" ? "default" : "secondary"}
          >
            {data?.data?.status}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data?.data?.description}</p>

          <h3 className="text-lg font-semibold mt-4 mb-2">
            {data?.data?.responsibility.title}
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {data?.data?.responsibility.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">Requirements</h3>
          <p>
            <strong>Education:</strong> {data?.data?.requirements.education}
          </p>
          <p>
            <strong>Experience:</strong> {data?.data?.requirements.experience}
          </p>
          <p className="mb-2">
            <strong>Skills:</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {data?.data?.requirements.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailsPage;
