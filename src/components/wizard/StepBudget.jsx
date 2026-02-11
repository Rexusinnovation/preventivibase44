import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const budgetOptions = [
  { value: "Meno di 1.000€", label: "Meno di 1.000€" },
  { value: "1.000€ - 5.000€", label: "1.000€ - 5.000€" },
  { value: "5.000€ - 10.000€", label: "5.000€ - 10.000€" },
  { value: "Oltre 10.000€", label: "Oltre 10.000€" },
];

export default function StepBudget({ value, onChange, onNext, onPrev, error }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Budget indicativo
      </h2>
      <p className="text-[#8a8a9a] text-center mb-8">
        Seleziona il range di budget che hai previsto
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
        {budgetOptions.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`
                relative flex items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                ${isSelected
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                  : "border-[#1e1e2e] bg-[#12121a] hover:border-[#2e2e3e] hover:bg-[#16161f]"
                }
              `}
            >
              <span className={`text-sm font-semibold ${isSelected ? "text-[#D4AF37]" : "text-[#a0a0b0]"}`}>
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
          className="flex items-center gap-2 px-5 py-3 text-[#8a8a9a] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Indietro
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F0D060] text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
        >
          Avanti <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}