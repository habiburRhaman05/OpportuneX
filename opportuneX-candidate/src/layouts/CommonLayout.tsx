import AbortController from "@/components/shared/AbortController";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/Header";
import ProfileSkeleton from "@/components/skelections/ProfilePageSkelection";
import useAuth from "@/hooks/useAuth";

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const CommonLayout = () => {
  return (
    <div>
      <Header />

      <Outlet />
      <Footer />
    </div>
  );
};

export default CommonLayout;
