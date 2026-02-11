import React from "react";
import { Rocket, MonitorSmartphone, Target, Coins, CalendarDays, User } from "lucide-react";

const steps = [
  { icon: Rocket },
  { icon: MonitorSmartphone },
  { icon: Target },
  { icon: Coins },
  { icon: CalendarDays },
  { icon: User },
];

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="w-full px-4 py-6">
      <div className="relative flex items-center justify-between max-w-md mx-auto">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#1e1e2e] -translate-y-1/2 z-0" />
        {/* Progress line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F0D060] -translate-y-1/2 z-0 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                  ${isCurrent
                    ? "bg-gradient-to-br from-[#F0D060] to-[#D4AF37] text-[#0a0a0f] scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    : isActive
                      ? "bg-[#D4AF37] text-[#0a0a0f]"
                      : "bg-[#1e1e2e] text-[#4a4a5a]"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}