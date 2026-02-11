import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function StepSuccess({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F0D060] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)]">
          <CheckCircle className="w-12 h-12 text-[#0a0a0f]" />
        </div>
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <span className="text-gold-gradient">Grazie!</span>
      </h2>
      <p className="text-[#8a8a9a] text-lg mb-10 max-w-md">
        Riceverai il tuo preventivo personalizzato al più presto. Rexus Innovation® è già al lavoro per te 🚀
      </p>

      <button
        onClick={onReset}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F0D060] text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-105"
      >
        Nuova richiesta
      </button>
    </motion.div>
  );
}