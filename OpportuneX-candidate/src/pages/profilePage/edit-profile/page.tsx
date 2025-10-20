import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/context/AuthContext";
import {
  ArrowBigLeft,
  Crosshair,
  FileText,
  Loader2,
  Settings,
} from "lucide-react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function ProfileEditPage() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PageHeader navigate={navigate} path={path} />
        <div className="w-full mt-8 flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-800 w-10 h-10" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (!user?.data?.onboardingSteps.emailVerification) {
    navigate("/onboarding/email-verification");
  } else if (!user?.data?.onboardingSteps.profileInfo) {
    navigate("/onboarding/profile-info");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader navigate={navigate} path={path} />

      <div className="flex-1 mt-2">
        <Outlet />
      </div>
    </div>
  );
}

const PageHeader = ({ navigate, path }) => {
  return (
    <div className="">
      <Button
        onClick={() => {
          navigate("/candidate/profile");
        }}
        className="bg-zinc-800 mb-4 text-white"
      >
        {" "}
        <ArrowBigLeft /> View Profile
      </Button>
      {/* Desktop Sidebar Navigation */}
      <div className=" bg-zinc-900/50 border rounded-md border-zinc-800 lg:block w-66  shrink-0">
        <div className="sticky top-24 min-h-full">
          <Card className="bg-transparent border-none">
            <CardContent className="p-4">
              <nav className=" flex gap-x-3 flex-wrap items-center">
                {[
                  {
                    id: "personal",
                    label: "personal Information",
                    icon: Settings,
                  },
                  {
                    id: "professional",
                    label: "Professional  Information",
                    icon: Crosshair,
                  },
                  // {
                  //   id: "educations",
                  //   label: "Educational Background",
                  //   icon: Crosshair,
                  // },
                  // {
                  //   id: "experiences",
                  //   label: "Work Experiences",
                  //   icon: Crosshair,
                  // },
                  { id: "resume", label: "Resume", icon: FileText },
                  // {
                  //   id: "preferences",
                  //   label: "Job Preferences",
                  //   icon: Settings,
                  // },
                ].map((tab) => (
                  <Link to={`/candidate/profile/edit/${tab.id}`}>
                    <button
                      key={tab.id}
                      className={`w-full flex items-center gap-3 px-3 py-2 mb-2 rounded-lg text-left transition-colors ${
                        path.includes(tab.id)
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
