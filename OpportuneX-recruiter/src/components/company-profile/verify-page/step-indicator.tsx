import { CheckCircle2 } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const steps = ["Email Verification", "Company Info", "Confirmation"]

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1
          const isCompleted = stepNum < currentStep
          const isCurrent = stepNum === currentStep

          return (
            <div key={stepNum} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold transition-all duration-300 shadow-lg ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : isCurrent
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white ring-4 ring-blue-500/20"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : stepNum}
                </div>
                <p
                  className={`text-sm font-medium mt-3 text-center transition-colors ${
                    stepNum <= currentStep ? "text-white" : "text-zinc-500"
                  }`}
                >
                  {steps[idx]}
                </p>
              </div>
              {stepNum < totalSteps && (
                <div
                  className={`h-1 w-12 mx-2 rounded-full transition-all duration-300 ${
                    isCompleted ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-zinc-800"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
