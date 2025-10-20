import { AppliedJob } from "@/types/user.type";
import React from "react";
import { Link } from "react-router-dom";

const AppliedJobCard = ({ item }: { item: AppliedJob }) => {
  return (
    <div>
      <h1>AppliedJobCard</h1>
      <Link
        to={`/candidate/profile/applied-applications/${item.applicationId}`}
      >
        View Details
      </Link>
    </div>
  );
};

export default AppliedJobCard;
