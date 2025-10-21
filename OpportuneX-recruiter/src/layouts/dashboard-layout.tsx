import { ReactNode, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export function DashboardLayout() {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  useEffect(() => {
    if (path === "/recruiter/dashboard") {
      navigate("/recruiter/dashboard/overview");
    }
  }, []);
  return (
    <ProtectedRoute>
      <SidebarProvider className="" defaultOpen={true}>
        <div className="min-h-screen bg-background flex w-full">
          <DashboardSidebar />
          <div className="flex flex-col flex-1 w-full">
            <DashboardHeader />

            <main className="flex-1 p-4 md:p-6">{<Outlet />}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
