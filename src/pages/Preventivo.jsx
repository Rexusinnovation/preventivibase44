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