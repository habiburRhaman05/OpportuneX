import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Bell, Loader2, Settings } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";

import { useApiMutation } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { queryClient } from "@/App";

export default function JobPreferencesEditPage() {
  const { user } = useAuth();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preferencesData, setPreferencesData] = useState({
    jobType: "",
    remoteWork: false,
    industry: [],
    jobAlerts: false,
  });
  const submitMutation = useApiMutation({
    url: "/candidate/auth/profile/update",
    method: "put",
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-profile-data"],
      });
      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
      });
    },
    onError: (err) => {
      toast({
        title: "failed to Profile updated",
        variant: "destructive",
      });
    },
  });
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!preferencesData.jobType) {
      newErrors.jobType = "Job type is required";
    }
    if (preferencesData.industry.length === 0) {
      newErrors.industry = "Select at least one job industry";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: string, value: any) => {
    setPreferencesData((prev) => {
      return { ...prev, [field]: value };
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorElement =
        document.querySelector(`[data-field="${firstErrorKey}"]`) ||
        document.querySelector(`input[name="${firstErrorKey}"]`) ||
        document.querySelector(`select[name="${firstErrorKey}"]`);
      firstErrorElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    await submitMutation.mutateAsync({ preferences: preferencesData });
  };

  const toggleIndustry = (industry: string) => {
    setPreferencesData((prev) => {
      const isSelected = prev.industry.includes(industry);
      const updatedIndustry = isSelected
        ? prev.industry.filter((cat) => cat !== industry)
        : [...prev.industry, industry];
      return {
        ...prev,
        industry: updatedIndustry,
      };
    });
  };

  useEffect(() => {
    setPreferencesData(user?.data.preferences);
  }, [user]);

  const renderPreferencesTab = () => (
    <div className="space-y-8">
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-400" />
            Job Preferences
          </CardTitle>
          <p className="text-sm text-zinc-400">
            Help us recommend the best opportunities for you.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Job Type</Label>
              <Select
                value={preferencesData?.jobType}
                onValueChange={(value) => updateFormData("jobType", value)}
              >
                <SelectTrigger className="bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 focus:border-blue-500 transition-colors">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.jobType && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.jobType}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remoteWork"
              checked={preferencesData?.remoteWork}
              onCheckedChange={(checked) =>
                updateFormData("remoteWork", checked)
              }
              className="border-zinc-600 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="remoteWork" className="text-white">
              Open to remote work
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm animate-fade-in-up animation-delay-100">
        <CardHeader>
          <CardTitle className="text-white">Industries of Interest</CardTitle>
          <p className="text-sm text-zinc-400">
            Select industries you're interested in working in.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "frontend",
              "backend",
              "fullstack",
              "web-design",
              "germents",
              "textile",
            ].map((industry) => (
              <div
                key={industry}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  preferencesData?.industry.includes(industry)
                    ? "border-blue-500 bg-blue-900/20 text-blue-300"
                    : "border-zinc-700 hover:border-zinc-600 text-zinc-300"
                }`}
                onClick={() => toggleIndustry(industry)}
              >
                <span className="text-sm">{industry}</span>
              </div>
            ))}
          </div>
          {errors.industry && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.industry}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm animate-fade-in-up animation-delay-200">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-400" />
            Notification Settings
          </CardTitle>
          <p className="text-sm text-zinc-400">
            Manage how you receive job recommendations and updates.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Job Alerts</Label>
              <p className="text-sm text-zinc-400">
                Receive notifications for new job matches
              </p>
            </div>
            <Checkbox
              checked={preferencesData?.jobAlerts}
              onCheckedChange={(checked) =>
                updateFormData("jobAlerts", checked)
              }
              className="border-zinc-600 data-[state=checked]:bg-blue-600"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
          >
            Update{" "}
            {submitMutation.isPending && (
              <Loader2 className="animate-spin ml-2" />
            )}
          </Button>
        </CardContent>
        <div className="flex justify-end animate-fade-in-up animation-delay-700"></div>
      </Card>
    </div>
  );

  return <>{renderPreferencesTab()}</>;
}
