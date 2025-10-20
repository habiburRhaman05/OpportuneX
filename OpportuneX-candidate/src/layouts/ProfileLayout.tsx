import Header from "@/components/shared/Header";

import { Outlet } from "react-router-dom";

const CandidateProfileLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default CandidateProfileLayout;
