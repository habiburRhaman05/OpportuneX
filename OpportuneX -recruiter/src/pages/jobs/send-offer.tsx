
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useCandidateStore } from "@/store/useCandidateStore";
import { useJobStore } from "@/store/useJobStore";

// Sample offer template
const offerTemplate = `Dear [Candidate Name],

We are pleased to offer you the position of [Job Title] at our company. After reviewing your qualifications, we believe your skills and experience will be a valuable asset to our team.

Details of your offer:
- Position: [Job Title]
- Salary: $[Salary] per year
- Start Date: [Start Date]

Please let us know if you have any questions or would like to discuss this offer further.

Best regards,
[Company Name] HR Team`;

const SendJobOfferPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const selectedCandidateIds = location.state?.selectedCandidates || [];
  const [offerContent, setOfferContent] = useState(offerTemplate);
  
  // Get data from our stores
  const getJobById = useJobStore(state => state.getJobById);
  const job = getJobById(id || "");
  const getCandidatesByJobId = useCandidateStore(state => state.getCandidatesByJobId);
  const updateCandidateStatus = useCandidateStore(state => state.updateCandidateStatus);
  const allJobCandidates = getCandidatesByJobId(id || "");
  
  // Filter only selected candidates
  const candidates = allJobCandidates.filter(c => selectedCandidateIds.includes(c.id));
  
  useEffect(() => {
    if (selectedCandidateIds.length === 0 && id) {
      // No candidates selected, redirect back to job details
      navigate(`/jobs/${id}`);
    } else if (selectedCandidateIds.length === 1 && job) {
      // Personalize the template for a single candidate
      const candidate = candidates[0];
      let personalized = offerTemplate
        .replace("[Candidate Name]", candidate.name)
        .replace("[Job Title]", job.title)
        .replace("[Salary]", job.salary.toLocaleString())
        .replace("[Start Date]", new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toLocaleDateString())
        .replace("[Company Name]", "Your Company");
      
      setOfferContent(personalized);
    }
  }, [selectedCandidateIds, id, navigate, candidates, job]);

  const handleSendOffer = () => {
    // Update the status of selected candidates to "offer_sent"
    if (id) {
      selectedCandidateIds.forEach(candidateId => {
        updateCandidateStatus(id, candidateId, "offer_sent");
      });
      
      toast({
        title: "Job offer sent!",
        description: `Job offer sent to ${candidates.length} candidate(s).`
      });
      
      navigate(`/jobs/${id}`);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!job || !id) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(`/jobs/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Job
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Send Job Offer</h1>
          <p className="text-muted-foreground">
            Send a personalized job offer to selected candidates.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Job Offer Template</CardTitle>
              <CardDescription>
                Customize this offer template before sending.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={offerContent} 
                onChange={(e) => setOfferContent(e.target.value)}
                className="min-h-[300px]"
              />
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button onClick={handleSendOffer} className="ml-auto">
                <Send className="h-4 w-4 mr-2" /> Send Job Offer
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Selected Candidates</CardTitle>
              <CardDescription>
                {candidates.length} candidate(s) selected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidates.map(candidate => (
                  <div key={candidate.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SendJobOfferPage;
