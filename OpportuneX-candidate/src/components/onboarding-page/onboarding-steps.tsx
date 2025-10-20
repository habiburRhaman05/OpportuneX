import { useUser } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { object } from "zod";

export default function DarkStepper() {
  const [steps, setSteps] = useState([]);
  const currentPath = useLocation().pathname;
  const { user } = useUser();
  const arr = user?.data?.onboardingSteps;

  function takeLavel(key) {
    switch (key) {
      case "emailVerification":
        return {
          id: "email-verification",
          label: "Email Verification",
          complete: user?.data?.onboardingSteps?.emailVerification,
        };

      case "profileInfo":
        return {
          id: "profile-info",
          label: "Profile",
          complete: user?.data?.onboardingSteps.profileInfo,
        };
      // case "preferences":
      //   return {
      //     id: "preferences",
      //     label: "Preferences",
      //     complete: user?.data?.onboardingSteps.preferences,
      //   };
    }
  }

  useEffect(() => {
    const steps = [];
    for (let step in arr) {
      const lavel = takeLavel(step);
      steps.push(lavel);
    }
    setSteps(steps);
  }, [user, currentPath]);

  return (
    <div className="w-full flex justify-center bg-zinc-950 mt-5 px-1">
      <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full shadow-md">
        {steps.map((step, index) => {
          const isActive = currentPath.includes(step?.id);
          return (
            <div key={step?.id} className="flex  items-center">
              <span
                className={`flex items-center gap-1 text-sm font-medium transition-colors 
                  


                  ${
                    step?.complete
                      ? "text-green-800"
                      : isActive
                      ? "text-blue-800"
                      : "text-zinc-500"
                  }
                  `}
              >
                {step?.complete && <Check />}
                {step?.label}
              </span>

              {index < steps.length - 1 && (
                <span className=" ml-2 justify-end h-[1px] w-8 bg-zinc-700"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
