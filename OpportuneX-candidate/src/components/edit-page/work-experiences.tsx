import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Loader,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function WorkExperience() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useUser();
  const { profileUpdateMutation } = useAuth();

  const [formData, setFormData] = useState({
    // Work Experience
    workExperience: [],
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate work experience
    formData.workExperience.forEach((exp, index) => {
      if (!exp.company.trim())
        newErrors[`workExp_${exp.id}_company`] = "Company name is required";
      if (!exp.position.trim())
        newErrors[`workExp_${exp.id}_position`] = "Position is required";
      if (!exp.duration.trim())
        newErrors[`workExp_${exp.id}_duration`] = "Duration is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addWorkExperience = () => {
    const newExp = {
      id: Date.now(),
      company: "",
      position: "",
      duration: "",
      description: "",
      logo: "",
    };
    setFormData((prev) => ({
      ...prev,
      workExperience: [newExp, ...prev.workExperience],
    }));

    // Scroll to the new form after a brief delay
    setTimeout(() => {
      const newExpElement = document.querySelector(
        `[data-exp-id="${newExp.id}"]`
      );
      newExpElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const removeWorkExperience = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp) => exp.id !== id),
    }));
  };

  const updateWorkExperience = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
    const errorKey = `workExp_${id}_${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
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

    await profileUpdateMutation.mutateAsync(formData);
  };

  useEffect(() => {
    if (user?.data) {
      setFormData({
        workExperience: user.data.workExperience.map((exp) => {
          return { id: exp._id, ...exp };
        }),
      });
    }
  }, [user]);

  return (
    <div className=" bg-zinc-950 text-white">
      <div className="space-y-8">
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm animate-fade-in-up animation-delay-200">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-400" />
              Your work experience
            </CardTitle>
            <p className="text-sm text-zinc-400">
              What other positions have you held?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.workExperience.map((exp, index) => (
              <div
                key={exp.id}
                data-exp-id={exp.id}
                className="border border-zinc-700 rounded-lg p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center ">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          {exp.position || "Software Engineer"}
                        </h4>
                        <p className="text-sm text-zinc-400">
                          {exp.company || "Company Name"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {formData.workExperience.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWorkExperience(exp.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company*</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, "company", e.target.value)
                      }
                      className={`bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 transition-colors ${
                        errors[`workExp_${exp.id}_company`]
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-blue-500"
                      }`}
                      placeholder="Google"
                    />
                    {errors[`workExp_${exp.id}_company`] && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors[`workExp_${exp.id}_company`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Position*</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, "position", e.target.value)
                      }
                      className={`bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 transition-colors ${
                        errors[`workExp_${exp.id}_position`]
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-blue-500"
                      }`}
                      placeholder="Software Engineer"
                    />
                    {errors[`workExp_${exp.id}_position`] && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors[`workExp_${exp.id}_position`]}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Start Date*</Label>
                  <Input
                    value={exp.duration}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, "duration", e.target.value)
                    }
                    className={`bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 transition-colors ${
                      errors[`workExp_${exp.id}_duration`]
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-blue-500"
                    }`}
                    placeholder="Jan 2022 - Present"
                  />
                  {errors[`workExp_${exp.id}_duration`] && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors[`workExp_${exp.id}_duration`]}
                    </p>
                  )}
                </div>
                {exp.isCurrent && "current working here"}

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateWorkExperience(
                        exp.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 focus:border-blue-500 transition-colors"
                    placeholder="Describe your role and achievements..."
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addWorkExperience}
              className="border-zinc-600 text-zinc-400 hover:bg-zinc-700 hover:border-zinc-500 hover:text-white bg-transparent transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add work experience
            </Button>

            <Button
              onClick={handleSubmit}
              className="bg-blue-600 w-full hover:bg-blue-700 text-white px-8 py-2"
            >
              Save Changes
              {profileUpdateMutation.isPending && (
                <Loader className="ml-2 animate-spin" />
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
