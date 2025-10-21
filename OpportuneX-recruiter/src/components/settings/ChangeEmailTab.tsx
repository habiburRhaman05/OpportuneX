
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ChangeEmailTab() {
  const [currentEmail] = useState("john.doe@example.com");
  const [newEmail, setNewEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newEmail || newEmail === currentEmail) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid new email address.",
        variant: "destructive",
      });
      return;
    }

    setVerificationSent(true);
    toast({
      title: "Verification Email Sent",
      description: "Please check your new email address for a verification link.",
    });
  };

  const resendVerification = () => {
    toast({
      title: "Verification Email Resent",
      description: "A new verification email has been sent to your address.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Change Email Address</h3>
        <p className="text-sm text-muted-foreground">
          Update your email address for account notifications and security.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Current Email Address
          </CardTitle>
          <CardDescription>
            This is the email address currently associated with your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="font-medium">{currentEmail}</span>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              Verified
            </div>
          </div>
        </CardContent>
      </Card>

      {!verificationSent ? (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">New Email Address</CardTitle>
            <CardDescription>
              Enter your new email address. You'll need to verify it before the change takes effect.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">New Email Address</Label>
              <Input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="bg-background"
                placeholder="Enter your new email address"
              />
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Important:</p>
                <p>After clicking "Send Verification", you'll receive an email at your new address. Click the verification link to complete the change.</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit}
                disabled={!newEmail}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Verification
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/50 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-orange-800">
              <Mail className="h-4 w-4" />
              Verification Pending
            </CardTitle>
            <CardDescription className="text-orange-700">
              We've sent a verification email to your new address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-orange-800">New Email Address:</p>
              <div className="p-3 bg-white border border-orange-200 rounded-lg">
                <span className="font-medium">{newEmail}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-orange-700">
                Please check your email and click the verification link to complete the change.
              </p>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={resendVerification}
                  className="border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  Resend Verification
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setVerificationSent(false)}
                  className="text-orange-700 hover:bg-orange-50"
                >
                  Use Different Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
