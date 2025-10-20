import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const AccountSettingLayout = () => {
  const path = useLocation().pathname;
  const items = ["account-info", "change-password", "security"];
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/candidate/account/settings/account-info");
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
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
            <Tabs defaultValue="personal" className="w-full">
              <div className="border-b bg-muted/30">
                <TabsList className="h-auto p-0 bg-transparent w-full justify-start rounded-none">
                  {items.map((item, index) => {
                    return (
                      <Link
                        to={"/candidate/account/settings/" + item}
                        key={index}
                        className={cn(
                          `rounded-none bg-transparent border-b-2 border-transparent   px-6 py-4 capitalize`,
                          path.includes(item) &&
                            "border-blue-800 bg-transparent"
                        )}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </TabsList>
              </div>
            </Tabs>
          </CardContent>
        </Card>
        <div className="mt-5">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default AccountSettingLayout;
