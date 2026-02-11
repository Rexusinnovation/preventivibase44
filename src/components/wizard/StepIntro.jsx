import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StepIntro({ onNext, logoUrl }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center px-4"
    >
      {logoUrl && (
        <div className="mb-8">
          <img
            src={logoUrl}
            alt="Rexus Innovation"
            className="w-28 h-28 object-contain"
          />
        </div>
      )}

      <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Benvenuto in <span className="text-gold-gradient">Rexus Innovation</span>
      </h2>
      <p className="text-[#8a8a9a] text-lg mb-10 max-w-md">
        Hai un'idea? Noi possiamo realizzarla. Inizia il tuo preventivo ora 🚀
      </p>

      <button
        onClick={onNext}
        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F0D060] text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-105"
      >
        Inizia ora
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}