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
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Obiettivo del progetto
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Descrivi brevemente cosa desideri ottenere
      </p>

      <div className="max-w-md mx-auto mb-8">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder="Descrivi il tuo progetto..."
          className="w-full bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-900 placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300 resize-none"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

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