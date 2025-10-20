import React from "react";
import ApplicationsPage from "./ApplicationsPage";
import { DashboardLayout } from "@/components/dashboard/layout";

const ApplicationsPageWrapper = () => {
  return (
    <DashboardLayout>
      <ApplicationsPage />
    </DashboardLayout>
  );
};

export default ApplicationsPageWrapper;
