import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { AlertCircle, GraduationCap, Loader, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function EducationEditForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useUser();
  const { profileUpdateMutation } = useAuth();

  const [formData, setFormData] = useState({
    education: [
      {
        id: 1,
        institution: "",
        degree: "",
        field: "",
        duration: "",
        gpa: "",
      },
    ],
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate individual social profile URLs if provided

    // Validate education
    formData.education.forEach((edu, index) => {
      if (!edu.institution.trim())
        newErrors[`edu_${edu.id}_institution`] = "Institution is required";
      if (!edu.degree.trim())
        newErrors[`edu_${edu.id}_degree`] = "Degree is required";
      if (!edu.field.trim())
        newErrors[`edu_${edu.id}_field`] = "Field of study is required";
      if (!edu.duration.trim())
        newErrors[`edu_${edu.id}_duration`] = "Duration is required";
      if (!edu.gpa.trim()) newErrors[`edu_${edu.id}_gpa`] = "GPA is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      institution: "",
      degree: "",
      field: "",
      duration: "",
      gpa: "",
    };
    setFormData((prev) => ({
      ...prev,
      education: [newEdu, ...prev.education],
    }));

    // Scroll to the new form after a brief delay
    setTimeout(() => {
      const newEduElement = document.querySelector(
        `[data-edu-id="${newEdu.id}"]`
      );
      newEduElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const removeEducation = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const updateEducation = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
    const errorKey = `edu_${id}_${field}`;
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

    const payload = formData.education.map((item) => {
      const { id, ...others } = item;
      return others;
    });

    await profileUpdateMutation.mutateAsync({ education: payload });
  };

  useEffect(() => {
    if (user?.data) {
      setFormData({
        education: user.data.education,
      });
    }
  }, []);

  return (
    <div className=" bg-zinc-950 text-white">
      <div className="space-y-1">
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm animate-fade-in-up animation-delay-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-400" />
              Education
            </CardTitle>
            <p className="text-sm text-zinc-400">
              What schools have you studied at?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.education.map((edu, index) => (
              <div
                key={edu.id}
                data-edu-id={edu.id}
                className="border border-zinc-700 rounded-lg p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">
                      {edu.institution || "University of Dhaka"}
                    </h4>
                    <p className="text-sm text-zinc-400">
                      {edu.degree || "Bachelor's"}
                    </p>
                  </div>
                  {formData.education.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Institution*</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, "institution", e.target.value)
                      }
                      className={`bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 transition-colors ${
                        errors[`edu_${edu.id}_institution`]
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-blue-500"
                      }`}
                      placeholder="University of Dhaka"
                    />
                    {errors[`edu_${edu.id}_institution`] && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors[`edu_${edu.id}_institution`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Degree*</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, "degree", e.target.value)
                      }
                      className={`bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 transition-colors ${
                        errors[`edu_${edu.id}_degree`]
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-blue-500"
                      }`}
                      placeholder="Bachelor's in CSE"
                    />
                    {errors[`edu_${edu.id}_degree`] && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors[`edu_${edu.id}_degree`]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Field of Study*</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(edu.id, "field", e.target.value)
                      }
                      className={`bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 transition-colors ${
                        errors[`edu_${edu.id}_field`]
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-blue-500"
                      }`}
                      placeholder="Computer Science"
                    />
                    {errors[`edu_${edu.id}_field`] && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors[`edu_${edu.id}_field`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Duration (2020-2024) </Label>
                    <Input
                      value={edu.duration}
                      onChange={(e) =>
                        updateEducation(edu.id, "duration", e.target.value)
                      }
                      className="bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 focus:border-blue-500 transition-colors"
                      placeholder="2018 - 2022"
                    />
                    {errors[`edu_${edu.id}_duration`] && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors[`edu_${edu.id}_duration`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>GPA (5.00) </Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) =>
                        updateEducation(edu.id, "gpa", e.target.value)
                      }
                      className="bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 focus:border-blue-500 transition-colors"
                      placeholder="2018 - 2022"
                    />
                    {errors[`edu_${edu.id}_gpa`] && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors[`edu_${edu.id}_gpa`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addEducation}
              className="border-zinc-600 text-zinc-400 hover:bg-zinc-700 hover:border-zinc-500 hover:text-white bg-transparent transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add education
            </Button>
          </CardContent>
          <div className="flex justify-end animate-fade-in-up animation-delay-700 mb-5">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
            >
              Save Changes
              {profileUpdateMutation.isPending && (
                <Loader className="animate-spin ml-3" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
