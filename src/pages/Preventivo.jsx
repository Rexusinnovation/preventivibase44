import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "../components/wizard/ProgressBar";
import StepIntro from "../components/wizard/StepIntro";
import StepProjectType from "../components/wizard/StepProjectType";
import StepObjective from "../components/wizard/StepObjective";
import StepBudget from "../components/wizard/StepBudget";
import StepTimeline from "../components/wizard/StepTimeline";
import StepContact from "../components/wizard/StepContact";
import StepSuccess from "../components/wizard/StepSuccess";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c9e9a6e02fa4dbabadcb7/3740dff44_rexus_logo.png";

const TOTAL_STEPS = 6;

export default function Preventivo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    project_type: "",
    project_objective: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    zip: "",
    privacy: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const validateStep1 = () => {
    if (!formData.project_type) {
      setErrors({ project_type: "Per favore, seleziona un tipo di progetto." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    if (!formData.project_objective.trim()) {
      setErrors({ project_objective: "Per favore, descrivi l'obiettivo del tuo progetto." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep3 = () => {
    if (!formData.budget) {
      setErrors({ budget: "Per favore, seleziona un budget indicativo." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep4 = () => {
    if (!formData.timeline) {
      setErrors({ timeline: "Per favore, seleziona una tempistica." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep5 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Per favore, inserisci il tuo nome.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Per favore, inserisci un indirizzo email valido.";
    if (!formData.privacy) newErrors.privacy = "Per procedere è necessario accettare la privacy policy.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextWithValidation = (validator) => {
    if (validator()) goNext();
  };

  const handleSubmit = async () => {
    if (!validateStep5()) return;

    setIsSubmitting(true);
    
    await base44.entities.QuoteRequest.create({
      project_type: formData.project_type,
      project_objective: formData.project_objective,
      budget: formData.budget,
      timeline: formData.timeline,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      zip: formData.zip,
      privacy_accepted: formData.privacy,
    });

    // Email a Rexus Innovation
    const emailToRexus = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(to right, #D4AF37, #F0D060); height: 4px; margin-bottom: 20px;"></div>
        <h2 style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Nuova richiesta di preventivo</h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1a1a1a; font-size: 18px; font-weight: bold; margin-bottom: 15px;">Informazioni di contatto</h3>
          <p style="margin: 8px 0;"><strong>Nome:</strong> ${formData.name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <span style="color: #D4AF37;">${formData.email}</span></p>
          ${formData.phone ? `<p style="margin: 8px 0;"><strong>Telefono:</strong> ${formData.phone}</p>` : ''}
          ${formData.zip ? `<p style="margin: 8px 0;"><strong>CAP:</strong> ${formData.zip}</p>` : ''}
        </div>

        <div style="background-color: white; padding: 20px; border-radius: 10px;">
          <h3 style="color: #1a1a1a; font-size: 18px; font-weight: bold; margin-bottom: 15px;">Dettagli del progetto</h3>
          <p style="margin: 8px 0;"><strong>Tipo di progetto:</strong> ${formData.project_type}</p>
          <p style="margin: 8px 0;"><strong>Budget:</strong> ${formData.budget}</p>
          <p style="margin: 8px 0;"><strong>Tempistiche:</strong> ${formData.timeline}</p>
          <p style="margin: 8px 0;"><strong>Obiettivo del progetto:</strong></p>
          <div style="background-color: #f5f5f5; padding: 10px; border-left: 3px solid #D4AF37; margin-top: 5px;">
            ${formData.project_objective}
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="mailto:${formData.email}" style="display: inline-block; background: linear-gradient(to right, #D4AF37, #F0D060); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Rispondi al cliente</a>
        </div>
      </div>
    `;

    await base44.integrations.Core.SendEmail({
      from_name: "Rexus Innovation - Preventivi",
      to: "info@rexusinnovation.it",
      subject: "Nuova richiesta di preventivo",
      body: emailToRexus,
    });

    // Email di conferma al cliente
    const emailToClient = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a; font-size: 28px; font-weight: bold; margin-bottom: 10px;">Ciao ${formData.name.split(' ')[0]}</h2>
        
        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          grazie per averci contattato! 🚀
        </p>
        
        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Abbiamo ricevuto la tua richiesta di preventivo e il nostro team sta già analizzando tutte le informazioni per offrirti la soluzione digitale più adatta alle tue esigenze.
        </p>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; border-left: 4px solid #D4AF37; margin: 30px 0;">
          <h3 style="color: #1a1a1a; font-size: 18px; font-weight: bold; margin-bottom: 10px;">🛠️ Cosa succede ora?</h3>
          <p style="color: #1a1a1a; font-size: 14px; line-height: 1.6; margin: 0;">
            Entro 24/48 ore riceverai un'email con una proposta personalizzata basata sui dettagli che ci hai fornito.
          </p>
        </div>

        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Se hai bisogno di aggiungere ulteriori informazioni, non esitare a rispondere a questa email.
        </p>

        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Nel frattempo, puoi scoprire di più su di noi visitando il nostro sito: 
          <a href="https://www.rexusinnovation.it" style="color: #D4AF37; text-decoration: none; font-weight: bold;">www.rexusinnovation.it</a>
        </p>

        <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0; text-align: center;">
          <h3 style="color: #1a1a1a; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Rexus Innovation®</h3>
          <p style="color: #666; font-size: 14px; margin: 5px 0;">💡 Creatività. Innovazione. Soluzioni digitali su misura.</p>
          <p style="color: #D4AF37; font-size: 14px; margin: 10px 0;">
            📧 <a href="mailto:info@rexusinnovation.it" style="color: #D4AF37; text-decoration: none;">info@rexusinnovation.it</a>
          </p>
          <p style="color: #666; font-size: 14px; margin: 5px 0;">
            📱 Seguici su Instagram: <a href="https://instagram.com/rexusinnovation" style="color: #D4AF37; text-decoration: none;">@rexusinnovation</a>
          </p>
        </div>
      </div>
    `;

    await base44.integrations.Core.SendEmail({
      from_name: "Rexus Innovation",
      to: formData.email,
      subject: `Ciao ${formData.name.split(' ')[0]}`,
      body: emailToClient,
    });

    setIsSubmitting(false);
    setIsComplete(true);
    setCurrentStep(TOTAL_STEPS);
  };

  const handleReset = () => {
    setFormData({
      project_type: "",
      project_objective: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
      zip: "",
      privacy: false,
    });
    setErrors({});
    setIsComplete(false);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress */}
          {!isComplete && <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />}

          {/* Content */}
          <div className="py-8 pb-12">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <StepIntro key="intro" onNext={goNext} logoUrl={LOGO_URL} />
              )}
              {currentStep === 1 && (
                <StepProjectType
                  key="project"
                  value={formData.project_type}
                  onChange={(v) => setFormData({ ...formData, project_type: v })}
                  onNext={() => handleNextWithValidation(validateStep1)}
                  onPrev={goPrev}
                  error={errors.project_type}
                />
              )}
              {currentStep === 2 && (
                <StepObjective
                  key="objective"
                  value={formData.project_objective}
                  onChange={(v) => setFormData({ ...formData, project_objective: v })}
                  onNext={() => handleNextWithValidation(validateStep2)}
                  onPrev={goPrev}
                  error={errors.project_objective}
                />
              )}
              {currentStep === 3 && (
                <StepBudget
                  key="budget"
                  value={formData.budget}
                  onChange={(v) => setFormData({ ...formData, budget: v })}
                  onNext={() => handleNextWithValidation(validateStep3)}
                  onPrev={goPrev}
                  error={errors.budget}
                />
              )}
              {currentStep === 4 && (
                <StepTimeline
                  key="timeline"
                  value={formData.timeline}
                  onChange={(v) => setFormData({ ...formData, timeline: v })}
                  onNext={() => handleNextWithValidation(validateStep4)}
                  onPrev={goPrev}
                  error={errors.timeline}
                />
              )}
              {currentStep === 5 && (
                <StepContact
                  key="contact"
                  formData={formData}
                  onChange={setFormData}
                  onSubmit={handleSubmit}
                  onPrev={goPrev}
                  errors={errors}
                  isSubmitting={isSubmitting}
                />
              )}
              {isComplete && (
                <StepSuccess key="success" onReset={handleReset} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          © 2025 Rexus Innovation® — Tutti i diritti riservati
        </p>
      </div>
    </div>
  );
}