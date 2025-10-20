import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Bell, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";

type PreferencesData = {
  preferences: {
    applicationAlert: boolean;
  };
};

export default function PreferencePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<PreferencesData | any>({
    preferences: {
      applicationAlert: false,
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep initial data for dirty check
  const initialDataRef = useRef<PreferencesData>(formData);

  useEffect(() => {
    if (user?.data.preferences) {
      setFormData({ preferences: { ...user.data.preferences } });
      console.log(user?.data.preferences.jobType);
    }
  }, [user]);

  // Update a field
  const updateField = (
    field: keyof PreferencesData["preferences"],
    value: any
  ) => {
    setFormData((prev) => {
      const updated = {
        preferences: { ...prev.preferences, [field]: value },
      };
      // Clear error if exists
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
      return updated;
    });
  };

  // Toggle category
  const toggleCategory = (cat: string) => {
    setFormData((prev) => {
      const updatedCategories = prev.preferences.category.includes(cat)
        ? prev.preferences.category.filter((c) => c !== cat)
        : [...prev.preferences.category, cat];
      // Clear error
      if (errors.category) setErrors((prev) => ({ ...prev, category: "" }));
      return {
        preferences: { ...prev.preferences, category: updatedCategories },
      };
    });
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const { preferences } = formData;
    if (!preferences.jobType) newErrors.jobType = "Job type is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];
      const el =
        document.querySelector(`[data-field="${firstError}"]`) ||
        document.querySelector(`select[name="${firstError}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  // Submit handler
  const submitHandler = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    console.log(formData);

    try {
      // Example: replace with real API call
      // await api.put("/api/auth/candidate/onboarding/preference", formData);

      toast({ title: "Preferences updated successfully!" });
      initialDataRef.current = { ...formData }; // reset dirty state
    } catch (err: any) {
      toast({
        title: err?.response?.data?.message || "Failed to update preferences",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const industries = ["frontend", "backend", "fullstack", "web-design"];
  const isDirty =
    JSON.stringify(formData) !== JSON.stringify(initialDataRef.current);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Job Preferences */}

        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" />
              Preferences Settings
            </CardTitle>
            <p className="text-sm text-zinc-400">
              Customize your Notifaction system
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Remote Work */}
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.preferences.remoteWork}
                onCheckedChange={(val) => updateField("applicationAlert", val)}
              />
              <Label className="text-white">Open to remote work</Label>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={submitHandler}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </div>
  );
}
