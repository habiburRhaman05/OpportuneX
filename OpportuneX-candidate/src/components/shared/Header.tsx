import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import ProfileAvater from "./ProfileAvater";
import { Sheet, SheetContent } from "../ui/sheet";
import { useUser } from "@/context/AuthContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useLocation().pathname;
  const [showAvaterIcon, setShowAvatericon] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setShowAvatericon(!!user);
  }, [user]);

  const navLinks = [
    { id: 1, name: "home", path: "/home" },
    { id: 2, name: "find jobs", path: "/jobs" },
    { id: 3, name: "companies", path: "/companies" },
    { id: 6, name: "resources", path: "/resources" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-zinc-900/50 transition-all duration-300 ${
        scrolled
          ? "shadow-md backdrop-blur-xl fixed top-0 left-0 right-0 z-50 py-2"
          : "backdrop-blur-lg py-4 relative"
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* === Mobile Menu Button === */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-zinc-900 md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </Button>

        {/* === Logo === */}
        <Link to={"/"} className="flex items-center gap-2">
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
        </Link>

        {/* === Desktop Navigation === */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`${link.path === "/home" ? "/" : link.path}`}
              className={`capitalize text-md font-medium hover:text-blue-600 transition-colors ${
                path.includes(link.path)
                  ? "text-blue-600"
                  : link.path === "/home" && path === "/"
                  ? "text-blue-600"
                  : "text-zinc-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* === Right Section (Desktop) === */}
        <div className="hidden md:flex items-center space-x-4">
          {showAvaterIcon ? (
            <ProfileAvater />
          ) : (
            // ✅ Updated Popover Content
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex items-center gap-2 text-white ">
                  Sign In
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                sideOffset={8}
                className="w-72 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4 space-y-4"
              >
                {/* === Job Seeker === */}
                <div className="border-b border-zinc-700 pb-4">
                  <h4 className="text-lg font-semibold text-white">
                    Job Seeker
                  </h4>
                  <p className="text-sm text-zinc-400 mb-3">
                    Join & find your dream job today!
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/auth/login"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      Sign In
                    </Link>
                    <span className="text-zinc-500 text-sm">or</span>
                    <Link
                      to="/auth/register"
                      className="px-3 py-1.5 border border-zinc-600 text-zinc-200 rounded-md text-sm hover:bg-zinc-800"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>

                {/* === Employer === */}
                <div>
                  <h4 className="text-lg font-semibold text-white">Employer</h4>
                  <p className="text-sm text-zinc-400 mb-3">
                    Find the best candidates for your company.
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      to="https://opportune-hr.vercel.app/recruiter/auth/login"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      Sign In
                    </Link>
                    <span className="text-zinc-500 text-sm">or</span>
                    <Link
                      to="https://opportune-hr.vercel.app/recruiter/auth/onboarding/register"
                      className="px-3 py-1.5 border border-zinc-600 text-zinc-200 rounded-md text-sm hover:bg-zinc-800"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* === Right Section (Mobile) === */}
        <div className="flex md:hidden items-center space-x-4">
          {showAvaterIcon ? (
            <ProfileAvater />
          ) : (
            // ✅ Same Popover for Mobile
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex items-center gap-2 text-white">
                  Sign In
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                sideOffset={8}
                className="w-72 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4 space-y-4"
              >
                {/* === Job Seeker === */}
                <div className="border-b border-zinc-700 pb-4">
                  <h4 className="text-lg font-semibold text-white">
                    Job Seeker
                  </h4>
                  <p className="text-sm text-zinc-400 mb-3">
                    Join & find your dream job today!
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/auth/login"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      Sign In
                    </Link>
                    <span className="text-zinc-500 text-sm">or</span>
                    <Link
                      to="/auth/register"
                      className="px-3 py-1.5 border border-zinc-600 text-zinc-200 rounded-md text-sm hover:bg-zinc-800"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>

                {/* === Employer === */}
                <div>
                  <h4 className="text-lg font-semibold text-white">Employer</h4>
                  <p className="text-sm text-zinc-400 mb-3">
                    Find the best candidates for your company.
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      to="https://opportune-hr.vercel.app/recruiter/auth/login"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      Sign In
                    </Link>
                    <span className="text-zinc-500 text-sm">or</span>
                    <Link
                      to="https://opportune-hr.vercel.app/recruiter/auth/onboarding/register"
                      className="px-3 py-1.5 border border-zinc-600 text-zinc-200 rounded-md text-sm hover:bg-zinc-800"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* === Mobile Navigation Drawer === */}
      <Sheet open={isMenuOpen} onOpenChange={(value) => setIsMenuOpen(value)}>
        <SheetContent>
          <nav className="md:hidden flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                onClick={() => setIsMenuOpen(false)}
                key={link.id}
                to={`${link.path === "/home" ? "/" : link.path}`}
                className={`capitalize text-md p-4 w-full font-medium hover:text-blue-600 transition-colors ${
                  path.includes(link.path)
                    ? "text-blue-600"
                    : link.path === "/home" && path === "/"
                    ? "text-blue-600"
                    : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
