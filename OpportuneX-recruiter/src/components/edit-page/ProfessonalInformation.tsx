import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Loader, Plus, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import useAuth from "@/hooks/useAuth";
import WorkExperience from "./work-experiences";
import { useUser } from "@/context/AuthContext";

interface FormData {
  skills: string[];
  achievements: string[];
  socialProfiles: {
    website: string;
    linkedin: string;
    github: string;
  };
}

const ProfessionalInformation = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState<FormData>({
    skills: [],
    achievements: [],
    socialProfiles: {
      website: "",
      linkedin: "",
      github: "",
    },
  });

  const [originalData, setOriginalData] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 🔹 Update form data
  const updateInputChanges = (name: string, value: any) => {
    setFormData((prev) => {
      const keys = name.split(".");
      const updated = { ...prev };
      let temp: any = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value;
      return updated;
    });

    // Clear error when user types
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const updateArrayField = (
    field: "skills" | "achievements",
    updatedValue: string[]
  ) => {
    updateInputChanges(field, updatedValue);
  };

  // 🔹 Load user data
  useEffect(() => {
    if (user?.data) {
      const freshData: FormData = {
        skills: user.data.skills || [],
        achievements: user.data.achievements || [],
        socialProfiles: {
          website: user.data.socialProfiles?.website || "",
          linkedin: user.data.socialProfiles?.linkedin || "",
          github: user.data.socialProfiles?.github || "",
        },
      };
      setFormData(freshData);
      setOriginalData(freshData);
    }
  }, [user]);

  const isDirty = JSON.stringify(formData) !== JSON.stringify(originalData);

  // 🔹 Validate fields
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.socialProfiles.website.trim())
      newErrors["socialProfiles.website"] = "Website is required";
    if (!formData.socialProfiles.linkedin.trim())
      newErrors["socialProfiles.linkedin"] = "LinkedIn is required";
    if (!formData.socialProfiles.github.trim())
      newErrors["socialProfiles.github"] = "GitHub is required";
    if (formData.skills.length === 0)
      newErrors["skills"] = "Add at least one skill";
    if (formData.achievements.length === 0)
      newErrors["achievements"] = "Add at least one achievement";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    console.log("Saving data...", formData);
    setOriginalData(formData);
  };

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <SocialForm
          updateChanges={updateInputChanges}
          socialLinks={formData.socialProfiles}
          errors={errors}
        />

        <Skills
          skills={formData.skills}
          updateChanges={(updated) => updateArrayField("skills", updated)}
          error={errors["skills"]}
        />

        <AchievementsForm
          achievements={formData.achievements}
          updateChanges={(updated) => updateArrayField("achievements", updated)}
          error={errors["achievements"]}
        />

        {isDirty && (
          <Button
            onClick={handleSave}
            className="mt-3 bg-blue-600 hover:bg-blue-800 text-white"
          >
            Update Now
          </Button>
        )}
      </div>
      <div className="mt-8">
        <WorkExperience />
      </div>
    </div>
  );
};

export default ProfessionalInformation;

// ------------------- SOCIAL FORM -------------------
const SocialForm = ({
  socialLinks,
  updateChanges,
  errors = {},
}: {
  socialLinks: { website?: string; linkedin?: string; github?: string };
  updateChanges: (name: string, value: string) => void;
  errors?: { [key: string]: string };
}) => {
  const handleInputChange = (name: string, value: string): void => {
    updateChanges(name, value.charAt(0).toUpperCase() + value.slice(1)); // auto-capitalize
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl">Social Profiles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["website", "linkedin", "github"].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={field}
                value={socialLinks[field] || ""}
                onChange={(e) =>
                  handleInputChange(`socialProfiles.${field}`, e.target.value)
                }
                className={`bg-zinc-800 border ${
                  errors[`socialProfiles.${field}`]
                    ? "border-red-500"
                    : "border-zinc-700"
                } text-white`}
                placeholder={`Enter your ${field}`}
              />
              {errors[`socialProfiles.${field}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`socialProfiles.${field}`]}
                </p>
              )}
            </div>
          ))}
        </form>
      </CardContent>
    </Card>
  );
};

// ------------------- SKILLS -------------------
const Skills = ({
  skills,
  updateChanges,
  error,
}: {
  skills: string[];
  updateChanges: (updatedValue: string[]) => void;
  error?: string;
}) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      updateChanges([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateChanges(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl">Skills *</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              className="bg-blue-600/20 text-blue-300 border-blue-600/30"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            value={newSkill}
            onChange={(e) =>
              setNewSkill(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
            className={`bg-zinc-800 border ${
              error ? "border-red-500" : "border-zinc-700"
            } text-white capitalize`}
            placeholder="Add a skill"
          />
          <Button
            onClick={addSkill}
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </CardContent>
    </Card>
  );
};

// ------------------- ACHIEVEMENTS -------------------
const AchievementsForm = ({
  achievements,
  updateChanges,
  error,
}: {
  achievements: string[];
  updateChanges: (updatedValue: string[]) => void;
  error?: string;
}) => {
  const [newAchievement, setNewAchievement] = useState("");

  const addAchievement = () => {
    if (
      newAchievement.trim() !== "" &&
      !achievements.includes(newAchievement.trim())
    ) {
      updateChanges([...achievements, newAchievement.trim()]);
      setNewAchievement("");
    }
  };

  const removeAchievement = (item: string) => {
    updateChanges(achievements.filter((a) => a !== item));
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800 p-4">
      <Label className="text-white text-xl">Achievements</Label>
      <p className="text-sm text-zinc-400 mb-3">
        Share your notable achievements and accomplishments
      </p>
      <Textarea
        value={newAchievement}
        onChange={(e) => setNewAchievement(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addAchievement();
          }
        }}
        className={`bg-zinc-800 border ${
          error ? "border-red-500" : "border-zinc-600"
        } text-white min-h-[100px] focus:bg-zinc-700 focus:border-blue-500 transition-colors`}
        placeholder="e.g., Won first place in hackathon..."
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <div className="mt-2 flex flex-col gap-2">
        {achievements.map((ach, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-blue-300 border-blue-600/30"
          >
            <span>{ach}</span>
            <button
              onClick={() => removeAchievement(ach)}
              className="ml-2 hover:text-red-400"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};
