import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StepObjective({ value, onChange, onNext, onPrev, error }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Obiettivo del progetto
      </h2>
      <p className="text-[#8a8a9a] text-center mb-8">
        Descrivi brevemente cosa desideri ottenere
      </p>

      <div className="max-w-md mx-auto mb-8">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder="Descrivi il tuo progetto..."
          className="w-full bg-[#12121a] border-2 border-[#1e1e2e] rounded-2xl p-4 text-white placeholder-[#4a4a5a] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300 resize-none"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

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