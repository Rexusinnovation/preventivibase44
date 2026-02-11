import React from "react";
import { Zap, CalendarDays, CalendarCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const timelineOptions = [
  { value: "Il prima possibile", label: "Il prima possibile", icon: Zap },
  { value: "1-2 mesi", label: "1-2 mesi", icon: CalendarDays },
  { value: "3+ mesi", label: "3+ mesi", icon: CalendarCheck },
];

export default function StepTimeline({ value, onChange, onNext, onPrev, error }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Tempistiche ideali
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Quando vorresti che il tuo progetto fosse completato?
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
        {timelineOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`
                relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                ${isSelected
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <Icon className={`w-7 h-7 ${isSelected ? "text-[#D4AF37]" : "text-gray-500"}`} />
              <span className={`text-xs font-medium text-center ${isSelected ? "text-[#D4AF37]" : "text-gray-700"}`}>
                {opt.label}
              </span>
              {isSelected && (
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
              )}
            </button>
          );
        })}
      </div>

      {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

      <div className="flex justify-between max-w-md mx-auto">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Indietro
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F0D060] text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
        >
          Avanti <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}