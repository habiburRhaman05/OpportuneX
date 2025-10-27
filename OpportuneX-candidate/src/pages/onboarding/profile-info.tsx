import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Check,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Loader2,
  Plus,
  Twitter,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/AuthContext";

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSkill, setNewSkill] = useState("");
  const { user, isLoading } = useUser();
  const { onboardingProfileInfoMutation: onboardingHandler } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // About Section
    fullName: user?.data?.fullName || "habib",

    location: "",
    bio: "",

    // Social Profiles
    socialProfiles: {
      website: "",
      linkedin: "",
      github: "",
      twitter: "",
    },

    // Work Experience
    workExperience: [
      {
        id: 1,
        company: "",
        position: "",
        duration: "",
        description: "",
        logo: "",
      },
    ],

    // Education
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

    // Skills
    skills: [],
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (!formData.bio.trim()) newErrors.bio = "Bio is required";

    if (formData.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    // Validate social profiles (at least one should be provided)
    const socialFields = ["website", "linkedin", "github", "twitter"];
    const hasSocialProfile = socialFields.some((field) =>
      formData.socialProfiles[field]?.trim()
    );
    if (!hasSocialProfile)
      newErrors.socialProfiles = "At least one social profile is required";

    // Validate individual social profile URLs if provided
    if (
      formData.socialProfiles.website &&
      !isValidUrl(formData.socialProfiles.website)
    ) {
      newErrors.website = "Please enter a valid website URL";
    }
    if (
      formData.socialProfiles.linkedin &&
      !formData.socialProfiles.linkedin.includes("linkedin.com")
    ) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }
    if (
      formData.socialProfiles.github &&
      !formData.socialProfiles.github.includes("github.com")
    ) {
      newErrors.github = "Please enter a valid GitHub URL";
    }
    if (
      formData.socialProfiles.twitter &&
      !formData.socialProfiles.twitter.includes("twitter.com") &&
      !formData.socialProfiles.twitter.includes("x.com")
    ) {
      newErrors.twitter = "Please enter a valid Twitter/X URL";
    }

    // Validate work experience
    // formData.workExperience.forEach((exp, index) => {
    //   if (!exp.company.trim())
    //     newErrors[`workExp_${exp.id}_company`] = "Company name is required";
    //   if (!exp.position.trim())
    //     newErrors[`workExp_${exp.id}_position`] = "Position is required";
    //   if (!exp.duration.trim())
    //     newErrors[`workExp_${exp.id}_duration`] = "Duration is required";
    // });

    // Validate education
    formData.education.forEach((edu, index) => {
      if (!edu.institution.trim())
        newErrors[`edu_${edu.id}_institution`] = "Institution is required";
      if (!edu.degree.trim())
        newErrors[`edu_${edu.id}_degree`] = "Degree is required";
      if (!edu.field.trim())
        newErrors[`edu_${edu.id}_field`] = "Field of study is required";
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

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
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

    const payload = {
      ...formData,
    };

    payload.workExperience.forEach((exp, index) => {
      if (!exp.company.trim()) delete payload.workExperience;
      if (!exp.position.trim()) delete payload.workExperience;
      if (!exp.duration.trim()) delete payload.workExperience;
    });
    await onboardingHandler.mutateAsync(payload);
    navigate("/onboarding/welcome");
  };

  useEffect(() => {
    if (user?.data?.onboardingSteps?.profileInfo) {
      navigate("/onboarding/welcome");
    }
  }, [user?.data?.onboardingSteps?.profileInfo, navigate]);

  const renderProfileTab = () => (
    <div className="space-y-2 rounded-md bg-zinc-900/50">
      <Card className=" border-none bg-transparent  backdrop-blur-sm animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5 text-blue-400" />
            About
          </CardTitle>
          <p className="text-sm text-zinc-400">
            Tell us about yourself so startups know who you are.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Your name*</Label>
              <Input
                id="fullName"
                name="fullName"
                data-field="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                className={`bg-zinc-800 border-zinc-600 text-white focus:bg-zinc-700 transition-colors ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                placeholder="Subhajit Halder"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.fullName}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="location">Where are you based?*</Label>
              <Input
                id="location"
                name="location"
                data-field="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                className={`bg-zinc-800 border-zinc-600 text-white focus:bg-zinc-700 transition-colors ${
                  errors.location
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                placeholder="Dhaka Division, Bangladesh"
              />
              {errors.location && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.location}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Your bio*</Label>
            <p className="text-sm text-zinc-400 mb-2">
              Hi I am a full stack dev
            </p>
            <Textarea
              id="bio"
              name="bio"
              data-field="bio"
              value={formData.bio}
              onChange={(e) => updateFormData("bio", e.target.value)}
              className={`bg-zinc-800 border-zinc-600 text-white min-h-[120px] focus:bg-zinc-700 transition-colors ${
                errors.bio
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-blue-500"
              }`}
              placeholder="Tell us about yourself, your experience, and what you're passionate about..."
            />
            {errors.bio && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.bio}
              </p>
            )}
          </div>
          <div>
            <Label className="text-white">Your Skills*</Label>
            <p className="text-sm text-zinc-400 mb-3">
              Add skills that represent your expertise
            </p>
            {errors.skills && (
              <p className="text-red-400 text-sm mb-2 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.skills}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-900/30 text-blue-300 border-blue-700 hover:bg-blue-900/50 transition-colors"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => {
                      const newSkills = formData.skills.filter(
                        (_, i) => i !== index
                      );
                      updateFormData("skills", newSkills);
                    }}
                    className="ml-2 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="bg-zinc-800 border-zinc-600 text-white focus:bg-zinc-700 focus:border-blue-500 transition-colors"
              placeholder="e.g., Python, React, Machine Learning"
            />
            <Button
              type="button"
              onClick={addSkill}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-transparent  backdrop-blur-sm animate-fade-in-up animation-delay-100">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-400" />
            Social Profiles
          </CardTitle>
          <p className="text-sm text-zinc-400">
            Where can people find you online? (At least one required)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {errors.socialProfiles && (
            <p className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.socialProfiles}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                value={formData.socialProfiles.website}
                onChange={(e) =>
                  updateFormData("socialProfiles", {
                    ...formData.socialProfiles,
                    website: e.target.value,
                  })
                }
                className={`bg-zinc-800 border-zinc-600 text-white focus:bg-zinc-700 transition-colors ${
                  errors.website
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                placeholder="https://yourwebsite.com"
              />
              {errors.website && (
                <p className="text-red-400 text-xs mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={formData.socialProfiles.linkedin}
                onChange={(e) =>
                  updateFormData("socialProfiles", {
                    ...formData.socialProfiles,
                    linkedin: e.target.value,
                  })
                }
                className={`bg-zinc-800 border-zinc-600 text-white focus:bg-zinc-700 transition-colors ${
                  errors.linkedin
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                placeholder="https://linkedin.com/in/username"
              />
              {errors.linkedin && (
                <p className="text-red-400 text-xs mt-1">{errors.linkedin}</p>
              )}
            </div>

            <div>
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Label>
              <Input
                id="github"
                value={formData.socialProfiles.github}
                onChange={(e) =>
                  updateFormData("socialProfiles", {
                    ...formData.socialProfiles,
                    github: e.target.value,
                  })
                }
                className={`bg-zinc-800 border-zinc-600 text-white focus:bg-zinc-700 transition-colors ${
                  errors.github
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                placeholder="https://github.com/username"
              />
              {errors.github && (
                <p className="text-red-400 text-xs mt-1">{errors.github}</p>
              )}
            </div>

            <div>
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter/X
              </Label>
              <Input
                id="twitter"
                value={formData.socialProfiles.twitter}
                onChange={(e) =>
                  updateFormData("socialProfiles", {
                    ...formData.socialProfiles,
                    twitter: e.target.value,
                  })
                }
                className={`bg-zinc-800 border-zinc-600 text-white focus:bg-zinc-700 transition-colors ${
                  errors.twitter
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                placeholder="https://twitter.com/username"
              />
              {errors.twitter && (
                <p className="text-red-400 text-xs mt-1">{errors.twitter}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-transparent  backdrop-blur-sm animate-fade-in-up animation-delay-200">
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
                <Label>Duration*</Label>
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

              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, "description", e.target.value)
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
        </CardContent>
      </Card>

      <Card className="border-none bg-transparent  backdrop-blur-sm animate-fade-in-up animation-delay-300">
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
                  <Label>Duration</Label>
                  <Input
                    value={edu.duration}
                    onChange={(e) =>
                      updateEducation(edu.id, "duration", e.target.value)
                    }
                    className="bg-zinc-800/80 border-zinc-700 text-white focus:bg-zinc-800 focus:border-blue-500 transition-colors"
                    placeholder="2018 - 2022"
                  />
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

          <Button
            onClick={handleSubmit}
            disabled={onboardingHandler.isPending}
            className="bg-blue-600 hover:bg-blue-700 w-full text-white px-8 py-2"
          >
            {onboardingHandler.isPending ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <Check className="h-5 w-5 mr-2" />
            )}
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen  bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {renderProfileTab()}
      </div>
    </div>
  );
}
