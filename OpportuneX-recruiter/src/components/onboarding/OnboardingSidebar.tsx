import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface OnboardingSidebarProps {
  currentStep: number;
}

const steps = [
  { id: 1, title: "Register", description: "Create your account" },
  { id: 2, title: "Email Verification", description: "Verify your email" },
  { id: 3, title: "Create Company", description: "Find or create company" },
  { id: 4, title: "Welcome", description: "Begin your journey" },
];

export function OnboardingSidebar({ currentStep }: OnboardingSidebarProps) {
  const path = useLocation().pathname;

  const isFinal = path.includes("start-recruiting");
  return (
    <div className="w-80 h-screen  bg-sidebar text-sidebar-foreground p-8 border-r border-sidebar-border">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-sidebar-primary mb-2">
          Welcome
        </h2>
        <p className="text-sm text-sidebar-foreground/70">
          Complete your setup to get started
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start space-x-4">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                isFinal
                  ? " text-white bg-green-600"
                  : currentStep > step.id
                  ? " text-white bg-green-600"
                  : currentStep === step.id
                  ? "border-blue-800 text-white bg-blue-800"
                  : "border-sidebar-border text-sidebar-foreground/50"
              )}
            >
              {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <div className="flex-1">
              <h3
                className={cn(
                  "font-medium transition-colors",
                  currentStep >= step.id
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground/50",
                  currentStep === step.id && "text-blue-600"
                )}
              >
                {step.title}
              </h3>
              <p
                className={cn(
                  "text-sm transition-colors",
                  currentStep >= step.id
                    ? "text-sidebar-foreground/70"
                    : "text-sidebar-foreground/40"
                )}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
