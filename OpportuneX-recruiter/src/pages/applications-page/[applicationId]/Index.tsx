import { CandidateCard } from "@/components/candidate-card";
import ApplicantsListSkelection from "@/components/skelections/ApplicantsListSkelection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { routes } from "@/lib/clientRoutes";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const ApplicationWrapper = () => {
  const { id: jobId } = useParams<{ id: string }>();

  // Get data from our stores
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [activeCoverLetterText, setActiveCoverLetterText] = useState("");

  const [fromData, setFormData] = useState({
    emailAlert: false,
    status: "",
    feedbackText: "",
  });

  const selectCandidate = (candidateId) => {
    setSelectedCandidateIds((prev) => [...prev, candidateId]);
  };
  const unselectCandidate = (candidateId) => {
    const updated = [...selectedCandidateIds].filter(
      (item) => item !== candidateId
    );
    setSelectedCandidateIds(updated);
  };

  // Local state

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "selected":
        return "bg-green-500 text-zinc-900";
      case "shortlist":
        return "bg-blue-600 text-white";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handleToggleCandidate = (candidateId: string) => {
    if (selectedCandidateIds.includes(candidateId)) {
      unselectCandidate(candidateId);
    } else {
      selectCandidate(candidateId);
    }
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // 1 step back in history
  };

  const {
    data: candidates,
    isLoading,
    error,
  } = useApiQuery({
    url: `/job/${jobId}/applicants`,
    queryKey: ["fetch-applicants-list"],
    enabled: true,
  });

  const handleSelectMutation = useApiMutation({
    url: "/job/select-applications",
    method: "post",
    onSuccess: (data) => {
      toast({
        title: data.message,
      });
      setIsModalOpen(false);
      setFormData({});
    },
    onError: (err) => {
      toast({
        title: err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div>
      <div className="">
        <div>
          <h1 className="text-xl text-zinc-200 font-semibold">
            All Applied Candidate
          </h1>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Candidates ({candidates?.data?.length})
            </h2>
            <div className="flex items-center gap-4">
              {selectedCandidateIds.length > 0 && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                    }}
                  >
                    Change Status
                  </Button>
                </div>
              )}
              <Button className="bg-green-700 hover:bg-green-900">
                Export CSV
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              {isLoading ? (
                <ApplicantsListSkelection />
              ) : candidates?.data?.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <span className="sr-only">Select</span>
                      </TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Resume/CV</TableHead>
                      <TableHead>Cover Letter</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Match - Resume</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates?.data?.map((candidate) => (
                      <TableRow key={candidate._id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedCandidateIds.includes(
                              candidate._id
                            )}
                            onCheckedChange={() =>
                              handleToggleCandidate(candidate._id)
                            }
                            id={`select-candidate-${candidate._id}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CandidateCard
                              candidate={candidate}
                              jobId={jobId}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={candidate.resumeUrl}
                            target="_blank"
                            className="underline-offset-2 underline text-md text-blue-800"
                          >
                            View Resume
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              setShowCoverLetterModal(true);
                              setActiveCoverLetterText(candidate?.cover_letter);
                            }}
                            className="bg-zinc-800"
                          >
                            View
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(candidate.status)}>
                            {candidate.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex  flex-col  gap-y-2">
                            <Progress value={candidate?.aiMatchScore} />
                            <span>{candidate?.aiMatchScore}% Match</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(
                                `${routes.posted_jobs_page}/${jobId}/applicants/${candidate._id}`
                              )
                            }
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center py-10 text-muted-foreground">
                  No candidates have applied to this job yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        onOpenChange={(value) => {
          setIsModalOpen(value);

          setFormData({});
        }}
      >
        <DialogContent className="p-9">
          <form
            action=""
            className="flex flex-col gap-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (fromData.status === "") {
                return;
              }

              await handleSelectMutation.mutateAsync({});
            }}
          >
            <Select
              value={fromData.status}
              onValueChange={(value) => {
                setFormData((prev) => {
                  return { ...prev, status: value };
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="shortlist">shortList</SelectItem>
                <SelectItem value="selected">selected</SelectItem>
                <SelectItem value="rejected">rejected</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Write you Feedback about the candiate"
              value={fromData.feedbackText}
              onChange={(e) => {
                setFormData((prev) => {
                  return { ...prev, feedbackText: e.target.value };
                });
              }}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remoteWork"
                onCheckedChange={(checked) => {
                  setFormData((prev) => {
                    return { ...prev, emailAlert: checked };
                  });
                }}
                className="border-zinc-600 data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="remoteWork" className="text-white">
                Want to send email for candidate
              </Label>
            </div>
            <Button
              type="submit"
              disabled={
                handleSelectMutation.isPending || fromData.status === ""
              }
              className=""
            >
              Change Status{" "}
              {handleSelectMutation.isPending && (
                <Loader2 className="animate-spin ml-2" />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showCoverLetterModal}
        onOpenChange={(value) => {
          setShowCoverLetterModal(value);
          setActiveCoverLetterText("");
        }}
      >
        <DialogContent className="p-9">{activeCoverLetterText}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationWrapper;
