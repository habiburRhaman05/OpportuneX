
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Shield, User, Mail, Clock } from "lucide-react";

export function AccountInfoTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Account Information</h3>
        <p className="text-sm text-muted-foreground">
          View your account details and status information.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">User ID</span>
              <span className="text-sm text-muted-foreground font-mono">usr_2nv8wr7k3d9x</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Account Type</span>
              <Badge variant="secondary">Premium</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Status</span>
              <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200">
                Active
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Verification</span>
              <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-blue-200">
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Account Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Account Created</span>
              <span className="text-sm text-muted-foreground">March 15, 2024</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Last Login</span>
              <span className="text-sm text-muted-foreground">Today, 2:30 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Password Changed</span>
              <span className="text-sm text-muted-foreground">January 20, 2024</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Email Updated</span>
              <span className="text-sm text-muted-foreground">March 15, 2024</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Two-Factor Auth</span>
              <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200">
                Enabled
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Login Alerts</span>
              <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200">
                Enabled
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Active Sessions</span>
              <span className="text-sm text-muted-foreground">2 devices</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
