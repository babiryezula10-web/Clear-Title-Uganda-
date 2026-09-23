import React, { useState, useEffect } from 'react';
import propertyLandscape from '../assets/images/verdant_estate_watermark_1790089492569.jpg';
import cadastralDeed from '../assets/images/cadastral_survey_watermark_1790089443239.jpg';
import blueprintScan from '../assets/images/blueprint_plan_watermark_1790089462834.jpg';
import { ShieldCheck, CheckCircle2, FileSearch, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // Stages: 0: Property Landscape, 1: Document Scan, 2: Verification Shield & Logo
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Stage 0: 0 - 900ms: Property Landscape
    const t1 = setTimeout(() => {
      setStage(1);
    }, 900);

    // Stage 1: 900ms - 1900ms: Title Document & Verification Scan
    const t2 = setTimeout(() => {
      setStage(2);
    }, 1900);

    // Stage 2: 1900ms - 3200ms: Shield Check + Logo + Tagline
    const t3 = setTimeout(() => {
      setFadingOut(true);
    }, 3100);

    const t4 = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#071322] text-white overflow-hidden transition-opacity duration-500 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Layers with cross-dissolve transitions */}
      <div className="absolute inset-0">
        {/* Layer 1: Modern Ugandan Property Landscape */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 transform scale-105 ${
            stage === 0 ? 'opacity-50' : 'opacity-10'
          }`}
          style={{ backgroundImage: `url(${propertyLandscape})` }}
        />

        {/* Layer 2: Cadastral Survey & Blueprint Scan Layer */}
        <div
          className={`absolute inset-0 bg-cover bg-center mix-blend-overlay transition-opacity duration-700 ${
            stage === 1 ? 'opacity-70' : stage === 2 ? 'opacity-25' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${blueprintScan})` }}
        />

        {/* Subtle Vignette & Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/80 to-[#071322]/90" />
      </div>

      {/* Interactive Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
      >
        <span>Skip</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Main Animated Sequence Container */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Visual Icon Sequence */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          {/* Pulsing Aura Rings */}
          <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-xl animate-pulse" />
          <div className="absolute -inset-2 rounded-3xl border border-amber-400/30 animate-spin" style={{ animationDuration: '18s' }} />

          {/* Step 0: Property Demarcation Frame */}
          {stage === 0 && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl shadow-blue-900/60 animate-in zoom-in-95 duration-500 relative bg-slate-900">
              <img
                src={propertyLandscape}
                alt="Ugandan Property"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end justify-center pb-2">
                <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300 font-bold">
                  Plot Boundary
                </span>
              </div>
            </div>
          )}

          {/* Step 1: Cadastral Title Document Scan */}
          {stage === 1 && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-400 shadow-2xl shadow-blue-500/40 animate-in fade-in zoom-in duration-500 relative bg-slate-900">
              <img
                src={blueprintScan}
                alt="Title Deed Verification"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Laser Scanning Line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-bounce" />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-950/40">
                <FileSearch className="w-8 h-8 text-cyan-300 animate-pulse" />
              </div>
            </div>
          )}

          {/* Step 2: Certified Shield & Clear Title Uganda Crest */}
          {stage === 2 && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl shadow-amber-500/30 animate-in zoom-in-90 duration-500 relative bg-slate-900">
              <img
                src={cadastralDeed}
                alt="Clear Title Uganda Crest"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-950/20" />
              <div className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white/80 shadow-xs animate-in zoom-in duration-300">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        {/* Micro-Progress Pill Indicator */}
        <div className="flex items-center gap-1.5 mb-5">
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              stage === 0 ? 'w-8 bg-amber-400' : 'w-2 bg-slate-600'
            }`}
          />
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              stage === 1 ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-600'
            }`}
          />
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              stage === 2 ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-600'
            }`}
          />
        </div>

        {/* Stage 0 & 1 Subtitle Tracker */}
        {stage < 2 && (
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 h-4 animate-in fade-in duration-200">
            {stage === 0 ? '1. Ground Reconnaissance & Cadastre...' : '2. Validating National Registry Deeds...'}
          </p>
        )}

        {/* Brand Name & Tagline */}
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white font-serif drop-shadow-md">
          CLEAR TITLE UGANDA
        </h1>

        <p className="mt-2 text-sm sm:text-base font-semibold text-amber-300 tracking-wide font-sans">
          “Verify. Protect. Own with Confidence.”
        </p>

        <p className="mt-3 text-xs text-slate-400 max-w-sm font-normal leading-relaxed">
          The sovereign verification & bank escrow safeguard for Ugandan land transactions.
        </p>

        {/* Bottom Statutory Seal */}
        <div className="mt-8 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Registration of Titles Act Cap 230</span>
        </div>
      </div>
    </div>
  );
};
