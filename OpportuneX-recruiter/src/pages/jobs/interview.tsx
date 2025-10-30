import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Candidate } from "@/types/candidate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/layouts/dashboard-layout";

// Mock function to get candidates by IDs
const getMockCandidatesById = (ids: string[]): Candidate[] => {
  return ids.map((id) => ({
    id,
    name: `Candidate ${id}`,
    email: `candidate${id}@example.com`,
    avatar: "",
    title: "Senior Frontend Developer",
    resumeUrl: "#",
    status: "interview",
    skills: ["React", "TypeScript", "Next.js"],
    experience: 5,
    education: "Bachelor's in Computer Science",
    location: "San Francisco, CA",
    about: "Passionate developer with experience in building web applications.",
  }));
};

interface Question {
  id: string;
  content: string;
  type: "text" | "code" | "image";
}

const InterviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const selectedCandidateIds = location.state?.selectedCandidates || [];
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      content: "Explain the difference between props and state in React.",
      type: "text",
    },
    {
      id: "2",
      content: "Write a function to reverse a linked list.",
      type: "code",
    },
    {
      id: "3",
      content: "Design a simple component for a product card.",
      type: "image",
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionType, setNewQuestionType] = useState<
    "text" | "code" | "image"
  >("text");

  useEffect(() => {
    if (selectedCandidateIds.length > 0) {
      // In a real app, fetch candidates from API
      const fetchedCandidates = getMockCandidatesById(selectedCandidateIds);
      setCandidates(fetchedCandidates);
    } else {
      // No candidates selected, redirect back to job details
      navigate(`/jobs/${id}`);
    }
  }, [selectedCandidateIds, id, navigate]);

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: newQuestion,
          type: newQuestionType,
        },
      ]);
      setNewQuestion("");
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const handleStartInterview = () => {
    // In a real app, start the interview session via API
    toast({
      title: "Interview prepared!",
      description: `Interview with ${candidates.length} candidate(s) has been scheduled.`,
    });
    navigate(`/jobs/${id}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
          <h1 className="text-3xl font-bold">Interview Playground</h1>
          <p className="text-muted-foreground">
            Create and customize questions for your interview.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Questions</CardTitle>
                <CardDescription>
                  Add and manage your interview questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question) => (
                    <Card key={question.id} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => handleRemoveQuestion(question.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {question.type}
                          </Badge>
                        </div>
                        <p>{question.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex gap-2">
                <Input
                  placeholder="Type a new question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="flex-1"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      {newQuestionType}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="grid gap-1">
                      <Button
                        variant="ghost"
                        onClick={() => setNewQuestionType("text")}
                        className="justify-start"
                      >
                        Text
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setNewQuestionType("code")}
                        className="justify-start"
                      >
                        Code
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setNewQuestionType("image")}
                        className="justify-start"
                      >
                        Image
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button onClick={handleAddQuestion}>
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Notes</CardTitle>
                <CardDescription>
                  Add any notes or instructions for the interview.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your interview notes here..."
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Selected Candidates</CardTitle>
                <CardDescription>
                  {candidates.length} candidate(s) selected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center space-x-4"
                    >
                      <Avatar>
                        <AvatarImage
                          src={candidate.avatar}
                          alt={candidate.name}
                        />
                        <AvatarFallback>
                          {getInitials(candidate.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {candidate.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleStartInterview} className="w-full">
              <Send className="h-4 w-4 mr-2" /> Schedule Interview
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPage;

// Missing component so adding it here
const Badge = ({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}) => {
  const baseClass =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  const variantClass =
    variant === "outline"
      ? "border border-primary text-primary"
      : "bg-primary text-primary-foreground";

  return (
    <span className={`${baseClass} ${variantClass} ${className || ""}`}>
      {children}
    </span>
  );
};
