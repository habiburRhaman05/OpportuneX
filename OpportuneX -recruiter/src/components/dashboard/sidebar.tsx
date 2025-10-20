import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Grid, List, Settings, User } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoutButton from "../logoutButton";
import { Badge } from "../ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { routes } from "@/lib/clientRoutes";

const navItems = [
  {
    to: routes.overview_page,
    label: "Dashboard",
    icon: Grid,
    tooltip: "overview",
  },
  {
    to: routes.posted_jobs_page,
    label: "Posted Jobs",
    icon: List,
    tooltip: "All Jobs",
  },
  // {
  //   to: "/search-candidates",
  //   label: "Candidates",
  //   icon: User,
  //   tooltip: "Find Candidates",
  // },
];

const accountItems = [
  {
    to: routes.profile_page,
    label: "My Profile",
    icon: User,
    tooltip: "Edit Profile",
  },
];
const footerItems = [
  {
    to: routes.account_info_page,
    label: "Account Settings",
    icon: Settings,
    tooltip: "Account Settings",
  },
];

function SidebarNavItem({ to, label, icon: Icon, tooltip, badge }: any) {
  const path = useLocation().pathname;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={tooltip}>
        <Link
          to={to}
          className={cn(
            "flex items-center gap-2 bg-zinc-900/50 mt-1 rounded-md px-2 py-2 transition-colors",
            path.includes(to)
              ? "bg-blue-800 text-white hover:bg-blue-800"
              : "text-zinc-400 hover:text-blue-400 hover:bg-zinc-800"
          )}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span className="truncate">{label}</span>
          {badge && (
            <Badge variant={badge.variant} className={badge.className}>
              {badge.text}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function DashboardSidebar() {
  const isMobile = useIsMobile();
  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "icon"}
      className={` w-[250px] text-white  justify-center ${
        isMobile ? "bg-white" : "bg-zinc-900/30"
      }`}
    >
      {/* Header */}
      <SidebarHeader className={`border-b p-4 `}>
        <Link to={routes.overview_page} className="flex items-center gap-2 ">
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
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroupLabel className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Main Navigation
        </SidebarGroupLabel>
        <SidebarMenu className="px-3">
          {navItems.map((item) => (
            <SidebarNavItem key={item.to} {...item} />
          ))}
        </SidebarMenu>

        <SidebarGroupLabel className="mt-4 px-2 py-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Account
        </SidebarGroupLabel>
        <SidebarMenu className="px-3">
          {accountItems.map((item) => (
            <SidebarNavItem key={item.to} {...item} />
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t  flex flex-col gap-1">
        <SidebarGroupLabel className=" text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Settings
        </SidebarGroupLabel>
        <SidebarMenu className="">
          {footerItems.map((item) => (
            <SidebarNavItem key={item.to} {...item} />
          ))}
          <LogoutButton className={"mt-3"} />
        </SidebarMenu>

        <div className="sidebar-expanded:block hidden text-xs text-muted-foreground text-center ">
          © 2025 JobBoard
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
