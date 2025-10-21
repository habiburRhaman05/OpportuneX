import useAuth from "@/hooks/useAuth";
import { Menu } from "lucide-react";
import ProfileAvatar from "../ProfileAvater";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { useUser } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  const { toggleSidebar, isMobile } = useSidebar();
  const { recruiter } = useUser();

  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center border-b bg-background/95 backdrop-blur-sm px-4">
      <div className="flex flex-1 items-center justify-between">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        {isMobile && (
          <div className="flex items-center gap-2 ">
            <div className="rounded-md bg-primary/20 p-1.5">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 11h4a2 2 0 0 1 0 4h-4" />
                <path d="M11 13c.6.5 1 1.5 1 2.5s-.4 2-.9 2.5" />
                <path d="M11 8c0-5-3-7-6-7" />
                <path d="M11 8c0 3-2 5-5 5a5 5 0 0 1-5-5c0-3 2-4 5-4 4 0 5 3 5 4Z" />
              </svg>
            </div>
            <span className="text-lg font-bold">OpportuneX</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {recruiter ? (
            <ProfileAvatar />
          ) : (
            <Link to={"/recruiter/auth/login"}>
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
