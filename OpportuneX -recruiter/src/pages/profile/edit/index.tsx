import { routes } from "@/lib/clientRoutes";
import { Outlet, NavLink, Link } from "react-router-dom";

// const tabs = [{ id: "personal", label: "Personal Info", path: "/personal" }];

function TabLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `pb-4 transition-colors ${
          isActive
            ? "text-blue-400 border-b-2 border-blue-400"
            : "hover:text-white text-zinc-400"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

const ProfileEditLayout = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-2">
            Edit your Wellfound profile
          </h1>
          <Link
            to={routes.profile_page}
            className="text-blue-600 underline
            "
          >
            View Profile
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-5 text-sm border-b border-zinc-800">
          <TabLink
            label="Recruiter Profile"
            to={routes.profile_edit_personal_page}
          ></TabLink>
          <TabLink
            label="Company Profile"
            to={routes.profile_edit_company_page}
          ></TabLink>
        </div>
      </div>

      {/* Nested Routes */}
      <Outlet />
    </div>
  );
};

export default ProfileEditLayout;
