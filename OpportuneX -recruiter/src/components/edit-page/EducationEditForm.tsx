import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Briefcase,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Plus,
  X,
  Upload,
  Building2,
  GraduationCap,
  AlertCircle,
  FileText,
  Settings,
  Bell,
} from "lucide-react";

export default function EducationEditForm() {
  const [activeTab, setActiveTab] = useState("profile");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSkill, setNewSkill] = useState("");

  //   const [formData, setFormData] = useState({
  //     // About Section
  //     fullName: "Habib Hassan",
  //     profilePhoto: "https://avatars.githubusercontent.com/u/12345678",
  //     location: "Dhaka, Bangladesh",
  //     primaryRole: "fullstack-developer",
  //     yearsExperience: "1-3",
  //     openToRoles: ["frontend", "fullstack"],
  //     bio: "19-year-old self-taught MERN Stack & React Native developer. Passionate about building scalable web and mobile applications.",

  //     // Social Profiles
  //     socialProfiles: {
  //       website: "https://habib.dev",
  //       linkedin: "https://linkedin.com/in/habibhassan",
  //       github: "https://github.com/habibdev",
  //       twitter: "https://twitter.com/habibcodes",
  //     },

  //     // Work Experience
  //     workExperience: [
  //       {
  //         id: 1,
  //         company: "Freelance",
  //         position: "Full-Stack MERN Developer",
  //         duration: "Jan 2022 - Present",
  //         description:
  //           "Worked on multiple freelance projects, including e-commerce, job portals, and real-time collaboration apps.",
  //         logo: "",
  //       },
  //     ],

  //     // Education
  //     education: [
  //       {
  //         id: 1,
  //         institution: "Self-Taught / Online Platforms",
  //         degree: "Software Engineering (Non-CS)",
  //         field: "Full-Stack Web Development",
  //         duration: "2021 - Present",
  //         gpa: "",
  //       },
  //     ],

  //     // Skills
  //     skills: [
  //       "JavaScript",
  //       "React",
  //       "Next.js",
  //       "Node.js",
  //       "MongoDB",
  //       "React Native",
  //     ],

  //     // Achievements
  //     achievements:
  //       "Built 10+ full-stack projects\nCompleted 30-day frontend challenge\nMastered React and Next.js",

  //     // Projects
  //     projects: [
  //       {
  //         id: 1,
  //         name: "Job Portal App",
  //         description:
  //           "A full-stack job portal where developers and companies interact with job applications in real time.",
  //         technologies: ["React", "Next.js", "Express", "MongoDB", "TailwindCSS"],
  //         projectUrl: "https://jobportal-habib.vercel.app",
  //         repoUrl: "https://github.com/habibdev/job-portal",
  //       },
  //       {
  //         id: 2,
  //         name: "E-Commerce Web App",
  //         description:
  //           "An e-commerce platform with cart, wishlist, and order management features.",
  //         technologies: ["React", "Express", "MongoDB", "Stripe"],
  //         projectUrl: "https://habibshop.vercel.app",
  //         repoUrl: "https://github.com/habibdev/ecommerce",
  //       },
  //     ],

  //     // Certificates
  //     certificates: [
  //       {
  //         id: 1,
  //         name: "JavaScript Mastery",
  //         organization: "Udemy",
  //         issueDate: "2023-05-01",
  //         credentialUrl: "https://udemy.com/certificate/abc123",
  //       },
  //     ],

  //     // Identity
  //     pronouns: "",
  //     displayPronouns: false,
  //     gender: "male",
  //     raceEthnicity: [],

  //     // Resume/CV
  //     resumeFile: null,
  //     resumeTemplate: "modern",

  //     // Preferences
  //     jobType: "full-time",
  //     remoteWork: true,
  //     notifications: true,
  //     salaryRange: "50k-80k",
  //     preferredCompanySize: "startup",
  //     industries: ["Technology", "SaaS", "E-commerce"],
  //     jobAlerts: true,
  //     emailNotifications: true,
  //     profileVisibility: "public",
  //   });

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

  const handleSubmit = () => {
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
    console.log("Profile data:", formData);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="space-y-8">
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
          </CardContent>
          <div className="flex justify-end animate-fade-in-up animation-delay-700 mb-5">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
