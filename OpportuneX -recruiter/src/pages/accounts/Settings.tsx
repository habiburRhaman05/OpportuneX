import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AccountSettingLayout = () => {
  const path = useLocation().pathname;
  const items = ["account-info", "change-password", "security"];
  const navigate = useNavigate();
  useEffect(() => {
    if (path === "/recruiter/dashboard/account-settings") {
      navigate("/recruiter/dashboard/account-settings/account-info");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background ">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account preferences and security settings
          </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-0">
            <Tabs defaultValue="account" className="w-full">
              <div className="border-b bg-muted/30 flex items-center gap-x-4 p-2">
                {items.map((val) => {
                  return (
                    <Link
                      to={`/recruiter/dashboard/account-settings/${val} `}
                      className={`capitalize py-1 px-3 rounded-md ${
                        path.includes(val)
                          ? "bg-blue-600"
                          : "text-gray-500 bg-zinc-900"
                      }`}
                    >
                      {val}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6">
                <Outlet />
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettingLayout;
