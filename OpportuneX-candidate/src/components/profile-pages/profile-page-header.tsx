import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import {
  Camera,
  Download,
  Edit,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePhoto from "./ProfilePhoto";
import { User } from "@/types/user.type";

interface ProfileHeaderProps {
  profile: User;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex flex-col items-center md:flex-row gap-6 md:items-start">
          {/* Avatar */}
          <ProfilePhoto />

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="md:text-start text-center">
              <h1 className="text-3xl font-bold text-white mb-2 hover:text-blue-400 transition-colors duration-300">
                {profile?.fullName || (
                  <span className="text-red-600">Not Set</span>
                )}
              </h1>

              <p className="text-zinc-300 leading-relaxed">
                {" "}
                {profile?.bio || <span className="text-red-600">Not Set</span>}
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:place-items-start place-items-center sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200">
                <Mail className="w-4 h-4" />
                <span>
                  {" "}
                  {profile?.email || (
                    <span className="text-red-600">Not Set</span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200">
                <MapPin className="w-4 h-4" />
                <span>
                  {" "}
                  {profile?.location || (
                    <span className="text-red-600">Not Set</span>
                  )}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap md:justify-start justify-center gap-3 pt-2">
              {/* download resume button */}
              <Link
                to={profile?.resumeUrl || ""}
                download={profile?.resumeUrl || ""}
                target="_blank"
              >
                <Button
                  className="bg-blue-600 border-2 border-blue-600 text-white hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </Link>
              {profile?.socialProfiles && (
                <Link to={profile?.socialProfiles.github || ""}>
                  <Button
                    className="bg-transparent border-2 text-white transition-all duration-300 transform hover:scale-105"
                    size="sm"
                  >
                    <FaGithub className="w-4 h-4 " />
                    Github
                  </Button>
                </Link>
              )}
              {/* <Link to={profile?.socialProfiles.linkedin || ""}>
                <Button
                  className="bg-transparent border-2 text-white transition-all duration-300 transform hover:scale-105"
                  size="sm"
                >
                  <FaLinkedinIn className="w-4 h-4 " />
                  Linkedin
                </Button>
              </Link> */}
              <Link to={profile?.socialProfiles?.website || ""}>
                <Button
                  className="bg-transparent border-2 text-white transition-all duration-300 transform hover:scale-105"
                  size="sm"
                >
                  <Globe className="w-4 h-4 " />
                  Portfolio Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Link
          to={"/candidate/profile/edit/personal"}
          className="absolute top-5 right-5"
        >
          <Button
            variant="outline"
            className="  text-white hover:bg-blue-800 hover:scale-95 transition-all right-5"
          >
            <Edit /> Edit Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
