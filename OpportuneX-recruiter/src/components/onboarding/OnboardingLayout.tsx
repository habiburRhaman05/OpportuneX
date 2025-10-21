import useAuth from "@/hooks/useAuth";
import { OnboardingSidebar } from "./OnboardingSidebar";
import { Navigate } from "react-router-dom";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  title?: string;
  subtitle?: string;
}

export function OnboardingLayout({
  children,
  currentStep,
  title,
  subtitle,
}: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen overflow-auto bg-background">
      <OnboardingSidebar currentStep={currentStep} />
      <div className="flex-1 flex items-start justify-center p-8  overflow-auto max-h-screen bg-zinc-950 ">
        <div className="w-full max-w-2xl">
          {(title || subtitle) && (
            <div className="mb-8 text-center">
              {title && <h1 className="text-3xl font-bold mb-2">{title}</h1>}
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
