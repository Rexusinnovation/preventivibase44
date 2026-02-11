import React from "react";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function StepContact({ formData, onChange, onSubmit, onPrev, errors, isSubmitting }) {
  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Informazioni di contatto
      </h2>
      <p className="text-[#8a8a9a] text-center mb-8">
        Come possiamo contattarti per il tuo preventivo personalizzato?
      </p>

      <div className="max-w-md mx-auto space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-[#a0a0b0] mb-2">Nome e Cognome*</label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Inserisci il tuo nome e cognome"
            className="w-full bg-[#12121a] border-2 border-[#1e1e2e] rounded-xl p-3.5 text-white placeholder-[#4a4a5a] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#a0a0b0] mb-2">Email*</label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Inserisci la tua email"
            className="w-full bg-[#12121a] border-2 border-[#1e1e2e] rounded-xl p-3.5 text-white placeholder-[#4a4a5a] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#a0a0b0] mb-2">Telefono (opzionale)</label>
          <input
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Inserisci il tuo numero di telefono"
            className="w-full bg-[#12121a] border-2 border-[#1e1e2e] rounded-xl p-3.5 text-white placeholder-[#4a4a5a] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#a0a0b0] mb-2">CAP (opzionale)</label>
          <input
            type="text"
            value={formData.zip || ""}
            onChange={(e) => handleChange("zip", e.target.value)}
            placeholder="Inserisci il tuo CAP"
            className="w-full bg-[#12121a] border-2 border-[#1e1e2e] rounded-xl p-3.5 text-white placeholder-[#4a4a5a] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.privacy || false}
            onChange={(e) => handleChange("privacy", e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-[#1e1e2e] accent-[#D4AF37]"
          />
          <label className="text-sm text-[#8a8a9a]">
            Ho letto e accetto la <span className="text-[#D4AF37] underline cursor-pointer">privacy policy</span> e acconsento al trattamento dei dati*
          </label>
        </div>
        {errors.privacy && <p className="text-red-400 text-xs">{errors.privacy}</p>}
      </div>

      <div className="flex justify-between max-w-md mx-auto">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-3 text-[#8a8a9a] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Indietro
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F0D060] text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0a0a0f] border-t-transparent rounded-full animate-spin" />
              Invio...
            </>
          ) : (
            <>
              Invia richiesta <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}