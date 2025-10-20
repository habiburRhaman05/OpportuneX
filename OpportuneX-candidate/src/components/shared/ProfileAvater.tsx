import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Link, NavLink, useLocation } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import LogoutButton from "@/components/shared/logoutButton";
import { useUser } from "@/context/AuthContext";

const ProfileAvatar = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  const togglePopup = () => setShowPopup((prev) => !prev);
  const path = useLocation().pathname;
  const { user } = useUser();

  const navItems = ["profile", "account/settings"];
  return (
    <Popover open={showPopup} onOpenChange={setShowPopup}>
      <PopoverTrigger asChild>
        <div
          onClick={togglePopup}
          className=" flex relative  rounded-md  items-center  overflow-hidden   cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <Avatar className="w-10 h-10 object-cover  ">
            <AvatarImage
              src={"http://localhost:8080/avatar-placeholder.png"}
              alt={"user?.data"}
            />
            <AvatarFallback className="bg-white/20 text-white">
              HR
            </AvatarFallback>
          </Avatar>

          {/* Online Dot */}
        </div>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={12}
        className="w-[250px] rounded-md border border-zinc-700 bg-zinc-900/90 backdrop-blur-md shadow-2xl p-4 text-zinc-100 "
      >
        <div className="text-left mb-3">
          <h4 className="text-xl font-semibold tracking-wide">
            {user?.data.fullName}
          </h4>

          <p className="text-sm text-zinc-400">{user?.data.email}</p>
        </div>

        <div>
          <span className="text-zinc-400 mb-2">Menu</span>
          <Separator />
          <div className="flex flex-col mt-2 gap-y-2 ">
            {navItems.map((val) => {
              return (
                <Link
                  to={"/candidate/" + val}
                  className={cn(
                    "flex items-center gap-2 bg-zinc-800/50 mt-1 rounded-md px-2 py-1 transition-colors capitalize",
                    path.includes(val.toLowerCase())
                      ? "bg-blue-800 text-white hover:bg-blue-800"
                      : "text-zinc-400 hover:text-blue-400 hover:bg-zinc-800"
                  )}
                >
                  {val}
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
