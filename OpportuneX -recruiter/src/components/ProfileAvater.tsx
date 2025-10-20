import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Link, NavLink, useLocation } from "react-router-dom";

import LogoutButton from "./logoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowDown, ArrowLeft, Grid, List, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/context/AuthContext";
import { routes } from "@/lib/clientRoutes";

const ProfileAvatar = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  const togglePopup = () => setShowPopup((prev) => !prev);
  const path = useLocation().pathname;
  const { recruiter } = useUser();

  const navItems = [
    {
      to: routes.overview_page,
      label: "Dashboard",
      icon: Grid,
    },
    {
      to: routes.posted_jobs_page,
      label: "Posted Jobs",
      icon: List,
    },
    {
      to: routes.profile_page,
      label: "My Profile",
      icon: User,
    },
    // {
    //   to: "/search-candidates",
    //   label: "Candidates",
    //   icon: User,
    //   tooltip: "Find Candidates",
    // },
  ];
  return (
    <Popover open={showPopup} onOpenChange={setShowPopup}>
      <PopoverTrigger asChild>
        <div
          onClick={togglePopup}
          className="relative  md:border border-0 border-zinc-800/50 rounded-md px-4 flex items-center gap-x-4 overflow-hidden   cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <Avatar className="w-8 h-8 object-cover  ">
            <AvatarImage
              src={"http://localhost:8080/avatar-placeholder.png"}
              alt={"Recruiter"}
            />
            <AvatarFallback className="bg-white/20 text-white">
              HR
            </AvatarFallback>
          </Avatar>

          <div className="md:block hidden">
            <h1>{recruiter.fullName}</h1>
            <h3 className="text-sm text-zinc-400">{recruiter.email}</h3>
          </div>

          {/* Online Dot */}
        </div>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={12}
        className="w-[250px] rounded-md border border-zinc-700 bg-zinc-900/90 backdrop-blur-md shadow-2xl p-4 text-zinc-100 "
      >
        <div className="text-left mb-3">
          <h4 className="text-xl font-semibold tracking-wide">
            {recruiter?.fullName}
          </h4>

          <p className="text-sm text-zinc-400">{recruiter.email}</p>
        </div>

        <div>
          <span className="text-zinc-400 mb-2">Menu</span>
          <Separator />
          <div className="flex flex-col mt-2 gap-y-2 ">
            {navItems.map((item) => {
              return (
                <Link
                  onClick={() => {
                    setShowPopup(false);
                  }}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 bg-zinc-800/50 mt-1 rounded-md px-2 py-1 transition-colors",
                    path.includes(item.label.toLowerCase())
                      ? "bg-blue-800 text-white hover:bg-blue-800"
                      : "text-zinc-400 hover:text-blue-400 hover:bg-zinc-800"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <LogoutButton className={"w-full mt-3"} />
      </PopoverContent>
    </Popover>
  );
};

export default ProfileAvatar;
