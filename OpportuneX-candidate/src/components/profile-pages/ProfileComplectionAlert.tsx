import React from "react";
import { Link } from "react-router-dom";
import { Progress } from "../ui/progress";

const ProfileComplectionAlert = ({ profileComplection }) => {
  return (
    <div className="container mx-auto px-6 mt-4">
      <div className="mb-2 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Profile Completion: {profileComplection}%
        </p>
        {profileComplection < 100 && (
          <Link
            to="/candidate/profile/edit/personal"
            className="text-sm underline "
          >
            Complete Now
          </Link>
        )}
      </div>
      <Progress
        value={profileComplection}
        className="h-2  rounded-full bg-zinc-800"
      />
    </div>
  );
};

export default ProfileComplectionAlert;
