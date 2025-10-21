import DashboardSkelection from "@/components/skelections/DashboardSkelection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApiQuery } from "@/hooks/useApi";
import { routes } from "@/lib/clientRoutes";
import { Briefcase, Building, List, User } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { data, isLoading, error } = useApiQuery<{
    totalJob: number;
    activeJobs: number;
    company: {
      name: string;
      lastUpdate: number;
    };
  }>({
    url: "/recruiter/data/dashboard",
    queryKey: ["dashboard-data"],
    enabled: true,
    cacheTime: 5,
  });

  const dummyData = {
    totalJobs: 0,
    activeJobs: 0,
    company: "No Company Found",
    Profile: "User Not Found",
  };

  if (isLoading) {
    return <DashboardSkelection />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your job dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {error ? dummyData.totalJobs : data?.totalJobs}
            </div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to={routes.posted_jobs_page}>View all jobs</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {error ? dummyData.activeJobs : data?.activeJobs}
            </div>

            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to={routes.post_new_job_page}>Post a new job</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company Info</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {error ? (
              <p>{dummyData.company}</p>
            ) : (
              <>
                <div className="text-md font-bold truncate">
                  {data?.company?.name}
                </div>

                <p className="text-xs text-muted-foreground">
                  Last updated{data?.company?.lastUpdate} days ago
                </p>
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to={routes.companyProfile}>View company</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {error ? (
              <p>{dummyData.Profile}</p>
            ) : (
              <>
                <div className="text-md font-bold truncate">
                  {data?.recruiter?.name}
                </div>

                <p className="text-xs text-muted-foreground">
                  {data?.recruiter?.role}
                </p>
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to={routes.profile_edit_personal_page}>Edit profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
