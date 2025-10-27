declare global {
  interface Window {
    puter: any;
  }
}

export async function parseResume(resumeText, schema) {
  if (!window.puter || !window.puter.ai) {
    throw new Error(
      "Puter.js SDK not loaded. Add <script src='https://js.puter.com/v2/'></script>"
    );
  }

  const prompt = `
Extract the following resume into this JSON structure:
${JSON.stringify(schema, null, 2)}

Resume Text:
${resumeText}

fullName: extract full name of the candidate

if some fields are missing in the resume,and have  in ${schema} then return empty string or empty array for those fields.

remove dublicates json feild if some have address then remove location or some have location then remove address 

add text spaceing in bio if some text is joined together

⚠️ IMPORTANT: Return only valid JSON, no explanation.

`;

  const response = await window.puter.ai.chat(prompt);

  // কখনও কখনও AI extra text দিয়ে দেয়, তাই JSON.parse safe করতে try/catch
  try {
    return JSON.parse(response.message.content);
  } catch (err) {
    console.error("Failed to parse JSON:", response.message);
    throw err;
  }
}

import { useEffect, useState } from "react";

function ResumeParserDemo() {
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    const demoResume =
      "\n\nSantanu Dutta\nBankura,West Bengal\nÓ\n+91-8944012587\nR\nsantanu4245@gmail.com\n°\nLinkedin\n\nGithub\ng\nPortfolio\nTECHNICAL SKILLS\nFrontend:React.js, Next.js, Tailwind CSS, Zustand, shadcn UI, Magic UI, GSAP, Framer Motion\nBackend:Node.js, Express.js, MongoDB, Mongoose, Supabase, PostgreSQL, Prisma, Socket.io, JWT, Zod\nTools:Git, Postman, Cloudinary, Cursor ai, Claude, Lovable, V0\nEXPERIENCE\nWeb Developer InternDec 2024 – March 2025\nAcceptare Technology Pvt Ltd, Remote\n•\nDeveloped scalable web applications withTypeScript,React,Node.js,ensuring performance and maintainability.\n•\nImplemented role-based authentication and document management usingPrismaandPostgreSQL.\n•\nOptimized backend performance, improving query efficiency withPrisma ORM.\n•\nBuilt an employee verification system for selfie-based attendance, managed by supervisors.\n•\nDesigned and developed a responsive CMS-integrated website for IQMCGlobal usingTailwind CSS,React, and\nTypeScript.\nTech Stack:TypeScript, React, Node.js, Express, Prisma, PostgreSQL, Tailwind CSS, Framer Motion\nFreelance DeveloperJan 2025 – Present\nSelf-Employed\n•\nDeveloped a modern, high-performance landing page usingAstro.js.\n•\nBuilt a cross-platform mobile app withReact NativeandSupabasefor authentication and real-time database\nmanagement.\nTech Stack:Astro.js, React Native, Supabase\nSUMMARY\nFull Stack Developer skilled inNext.js,PostgreSQL, and theMERN stack.  Experienced in building real-time features\nwithSocket.ioand dynamic UIs withsmooth animations.  Proficient in writingclean, optimized code and leveraging AI\ntools likeCursor,Claude, andv0etc.\nPROJECTS\nQuizSync\nW\n|Next.js, Tailwind CSS, Node.js, Express, Prisma, PostgreSQL, Socket.IOFeb 2025\n•\nInteractive platform for real-time quiz battles among users.\n•\nLive site here\n•\nReal-Time Engagement:  Users can create or join quiz battles with friends.\n•\nLeaderboard System:  Tracks user performance and rankings.\n•\nGoogle Authentication:  Secure real-time login usingNextAuth.\nFoodForYou\nW\n|React.js, Tailwind CSS, Express, Node.js, MongoDB, ZustandSep 2024\n•\nComprehensive food delivery platform enabling multi-restaurant orders.\n•\nLive site here\n•\nMaster Admin Panel:  Centralized management of restaurants, users, orders, and analytics.\n•\nRestaurant Admin Panel:  Tools for restaurants to manage profiles, menus, and orders.\n•\nMulti-Cart Functionality:  Users can maintain separate carts for different restaurants.\n•\nSecure Authentication:  Utilizes JWT tokens to ensure data privacy.\n•\nPayment Integration:  Seamless transactions through Razorpay.\nEDUCATION\nInstitute Of Computer And Information Sciences2022 – 2025\nBCA(H) -CGPA-7.89 [Till 2nd Year]Bankura,West Bengal";

    const customSchema = {
      fullName: "",
      email: "",
      phone: "",
      bio: "",
      skills: [],
      location: "",
      educations: [],
      experience: [],
    };

    async function run() {
      try {
        const data = await parseResume(demoResume, customSchema);
        setParsedData(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }

    run();
  }, []);

  return (
    <div>
      <h2>Parsed Resume JSON</h2>
      <pre>
        {parsedData ? JSON.stringify(parsedData, null, 2) : "Parsing..."}
      </pre>
      {/* {parsedData && <ResumeReviewForm parsedData={parsedData} />} */}
    </div>
  );
}

export default ResumeParserDemo;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

function ResumeReviewForm({ parsedData }) {
  // Initialize formData with defaults if keys are missing
  const initialData = {
    full_name: parsedData?.full_name || "",
    email: parsedData?.email || "",
    phone: parsedData?.phone || "",
    bio: parsedData?.bio || "",
    location: parsedData?.location || "",
    skills: parsedData?.skills || [],
    educations: parsedData?.educations || [],
    experience: parsedData?.experience || [],
    projects: parsedData?.projects || [],
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (section, index, field, value) => {
    const updated = [...(formData[section] || [])];
    updated[index] = { ...(updated[index] || {}), [field]: value };
    setFormData((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  const handleSubmit = () => {
    console.log("✅ Final Updated Data:", formData);
    alert("Profile Updated Successfully!");
  };

  const renderLabelInput = (label, value, onChange, type = "text") => (
    <div className="space-y-1">
      <Label className="font-semibold text-sm">{label}</Label>
      <Input type={type} value={value || ""} onChange={onChange} />
    </div>
  );

  const renderLabelTextarea = (label, value, onChange) => (
    <div className="space-y-1">
      <Label className="font-semibold text-sm">{label}</Label>
      <Textarea value={value || ""} onChange={onChange} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Review & Update Your Profile</h1>

      {/* Basic Info */}
      <Card>
        <CardContent className="space-y-4 p-4">
          {parsedData?.full_name !== undefined &&
            renderLabelInput("Full Name", formData.full_name, (e) =>
              handleChange("full_name", e.target.value)
            )}
          {parsedData?.email !== undefined &&
            renderLabelInput(
              "Email",
              formData.email,
              (e) => handleChange("email", e.target.value),
              "email"
            )}
          {parsedData?.phone !== undefined &&
            renderLabelInput("Phone", formData.phone, (e) =>
              handleChange("phone", e.target.value)
            )}
          {parsedData?.bio !== undefined &&
            renderLabelTextarea("Bio", formData.bio, (e) =>
              handleChange("bio", e.target.value)
            )}
          {parsedData?.location !== undefined &&
            renderLabelInput("Location", formData.location, (e) =>
              handleChange("location", e.target.value)
            )}
        </CardContent>
      </Card>

      {/* Skills */}
      {parsedData?.skills?.length > 0 && (
        <Card>
          <CardContent className="space-y-2 p-4">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 h-auto">
              {(formData.skills || []).map((skill, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 p-2 items-center flex gap-2 rounded-md"
                >
                  {skill}{" "}
                  <button
                    type="button"
                    className="text-sm"
                    onClick={() =>
                      handleChange(
                        "skills",
                        formData.skills.filter((_, i) => i !== index)
                      )
                    }
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Input
                type="text"
                placeholder="Add skill and press Enter"
                onKeyDown={(e: any) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleChange("skills", [
                      ...formData.skills,
                      e.target.value.trim(),
                    ]);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {parsedData?.educations?.length > 0 && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="font-semibold text-lg">Education</h2>
            {(formData.educations || []).map((edu, index) => (
              <div key={index} className="border p-3 rounded-md space-y-2">
                {renderLabelInput("Degree", edu.degree, (e) =>
                  handleNestedChange(
                    "educations",
                    index,
                    "degree",
                    e.target.value
                  )
                )}
                {renderLabelInput("Field", edu.field, (e) =>
                  handleNestedChange(
                    "educations",
                    index,
                    "field",
                    e.target.value
                  )
                )}
                {renderLabelInput("University", edu.university, (e) =>
                  handleNestedChange(
                    "educations",
                    index,
                    "university",
                    e.target.value
                  )
                )}
                {renderLabelInput("Location", edu.location, (e) =>
                  handleNestedChange(
                    "educations",
                    index,
                    "location",
                    e.target.value
                  )
                )}
                <div className="flex gap-2">
                  {renderLabelInput("Start Date", edu.start_date, (e) =>
                    handleNestedChange(
                      "educations",
                      index,
                      "start_date",
                      e.target.value
                    )
                  )}
                  {renderLabelInput("End Date", edu.end_date, (e) =>
                    handleNestedChange(
                      "educations",
                      index,
                      "end_date",
                      e.target.value
                    )
                  )}
                </div>
                {renderLabelInput("CGPA", edu.cgpa, (e) =>
                  handleNestedChange(
                    "educations",
                    index,
                    "cgpa",
                    e.target.value
                  )
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Experience */}
      {parsedData?.experience?.length > 0 && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="font-semibold text-lg">Experience</h2>
            {(formData.experience || []).map((exp, index) => (
              <div key={index} className="border p-3 rounded-md space-y-2">
                {renderLabelInput("Title", exp.title, (e) =>
                  handleNestedChange(
                    "experience",
                    index,
                    "title",
                    e.target.value
                  )
                )}
                {renderLabelInput("Organization", exp.organization, (e) =>
                  handleNestedChange(
                    "experience",
                    index,
                    "organization",
                    e.target.value
                  )
                )}
                {renderLabelInput("Location", exp.location, (e) =>
                  handleNestedChange(
                    "experience",
                    index,
                    "location",
                    e.target.value
                  )
                )}
                <div className="flex gap-2">
                  {renderLabelInput("Start Date", exp.start_date, (e) =>
                    handleNestedChange(
                      "experience",
                      index,
                      "start_date",
                      e.target.value
                    )
                  )}
                  {renderLabelInput("End Date", exp.end_date, (e) =>
                    handleNestedChange(
                      "experience",
                      index,
                      "end_date",
                      e.target.value
                    )
                  )}
                </div>
                {renderLabelTextarea(
                  "Description",
                  exp.description?.join("\n") || "",
                  (e) =>
                    handleNestedChange(
                      "experience",
                      index,
                      "description",
                      e.target.value.split("\n")
                    )
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {parsedData?.projects?.length > 0 && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="font-semibold text-lg">Projects</h2>
            {(formData.projects || []).map((proj, index) => (
              <div key={index} className="border p-3 rounded-md space-y-2">
                {renderLabelInput("Project Name", proj.name, (e) =>
                  handleNestedChange("projects", index, "name", e.target.value)
                )}
                {renderLabelInput(
                  "Technologies",
                  proj.technologies?.join(", ") || "",
                  (e) =>
                    handleNestedChange(
                      "projects",
                      index,
                      "technologies",
                      e.target.value.split(",").map((t) => t.trim())
                    )
                )}
                {renderLabelInput("Date", proj.date, (e) =>
                  handleNestedChange("projects", index, "date", e.target.value)
                )}
                {renderLabelTextarea(
                  "Description",
                  proj.description?.join("\n") || "",
                  (e) =>
                    handleNestedChange(
                      "projects",
                      index,
                      "description",
                      e.target.value.split("\n")
                    )
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Button onClick={handleSubmit} className="w-full">
        ✅ Update Profile
      </Button>
    </div>
  );
}
