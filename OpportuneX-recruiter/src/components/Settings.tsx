import { DashboardLayout } from "@/components/dashboard/layout";
import { AccountInfoTab } from "@/components/settings/AccountInfoTab";
import { ChangeEmailTab } from "@/components/settings/ChangeEmailTab";
import { ChangePasswordTab } from "@/components/settings/ChangePasswordTab";
import { LogoutTab } from "@/components/settings/SecurityTab";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AccountSetting = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
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
                <div className="border-b bg-muted/30">
                  <TabsList className="h-auto p-0 bg-transparent w-full justify-start rounded-none">
                    <TabsTrigger
                      value="account"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Account Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Change Password
                    </TabsTrigger>
                    <TabsTrigger
                      value="email"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Change Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="logout"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Logout
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="account" className="mt-0">
                    <AccountInfoTab />
                  </TabsContent>

                  <TabsContent value="password" className="mt-0">
                    <ChangePasswordTab />
                  </TabsContent>

                  <TabsContent value="email" className="mt-0">
                    <ChangeEmailTab />
                  </TabsContent>

                  <TabsContent value="logout" className="mt-0">
                    <LogoutTab />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountSetting;
