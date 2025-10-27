import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  Calendar,
  AlertCircle,
  Edit,
  Users,
  Star,
  TrendingUp,
  Clock,
  MessageSquare,
  Target,
  Award,
  Building2,
  Globe,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/context/AuthContext";
import { RecruiterProfileSkeleton } from "@/components/skelections/profile-skelection";
import { routes } from "@/lib/clientRoutes";

// Helper: calculate profile completion %
function calculateProfileCompletion(user: any) {
  const fields = [
    "fullName",
    "emailVerified",
    "position",
    "location",
    "company",
    "bio",
    "profilePhoto",
  ];
  const total = fields.length;
  let completed = 0;

  fields.forEach((field) => {
    if (field === "emailVerified") {
      if (user.emailVerified) completed++;
    } else if (user[field]) {
      completed++;
    }
  });

  return Math.floor((completed / total) * 100);
}

// Main Profile Component
export default function RecruiterProfilePublic() {
  const { recruiter, isLoading } = useUser();
  if (isLoading) {
    return <RecruiterProfileSkeleton />;
  }

  const {
    fullName,
    email,
    emailVerified,
    position,
    location,
    company,
    profilePhoto,
    bio,
    // skills,
    profileComplection,
    socialLinks,
  } = recruiter;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground relative">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32 border-4 border-white/20">
              <AvatarImage
                src={profilePhoto || "/recruiter-avatar.jpg"}
                alt={fullName || "Recruiter"}
              />
              <AvatarFallback className="bg-white/20 text-white text-4xl">
                {fullName ? fullName[0] : "R"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">
                {fullName || "Name not set"}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-3">
                {position || "Position not set"}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-primary-foreground/90">
                {location ? (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Location not set
                  </span>
                )}
              </div>
            </div>
          </div>
          <Link
            to={routes.profile_edit_personal_page}
            className="p-2 rounded-md absolute top-3 right-3 bg-blue-800 flex items-center w-[120px]"
          >
            Edit Profile <Edit className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </header>

      {/* Profile Completion */}
      <div className="container mx-auto px-6 mt-4">
        <Progress
          value={profileComplection}
          className="h-2 rounded-full bg-zinc-600"
        />
        <div className="mb-2 flex justify-between w-full items-center">
          <p className="text-sm text-muted-foreground">
            Profile Completion: {profileComplection}%
          </p>
          {profileComplection && (
            <div>
              <Link
                to="/recruiter/dashboard/profile/edit/personal"
                className="text-sm underline text-primary-foreground"
              >
                Complete Now
              </Link>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card className="bg-gradient-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" /> About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bio ? (
                  bio
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground italic">
                      No bio provided
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company */}
            <Card className="bg-gradient-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" /> Company
                </CardTitle>
              </CardHeader>
              <CardContent>
                {company ? (
                  <div>
                    <p className="font-semibold">{company.name}</p>
                    <p className="text-muted-foreground">
                      {company.description}
                    </p>
                    <Link
                      to={`${routes.companyProfile}$${company.name}`}
                      className="text-blue-800 mt-2 underline"
                    >
                      View Profile
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground italic">
                      Company info not provided
                    </p>
                    <Link to={""} className="text-blue-800 mt-2 underline">
                      Create Company
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <Card className="bg-gradient-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {email ? (
                  <p>Email: {email}</p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No email provided
                  </p>
                )}
                {location ? (
                  <p>Location: {location}</p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No location provided
                  </p>
                )}
                {socialLinks?.linkedin ? (
                  <p>Linkedin: {socialLinks?.linkedin}</p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No location provided
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
