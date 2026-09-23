import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Lock,
  Award,
  ArrowRight,
  FileCheck,
  ChevronRight,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  UserCheck,
  BookOpen,
  ArrowDown,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface FormalWelcomePageProps {
  onEnterDashboard: () => void;
  onStartVerification: () => void;
  onViewRiskReport: () => void;
  onExploreEscrow: () => void;
  onViewCertificate: () => void;
  onOpenAdvisor: () => void;
  onOpenAuth?: () => void;
  onOpenLearn?: () => void;
  onOpenMenu?: () => void;
  onReplaySplash?: () => void;
  language: LanguageCode;
}

export const FormalWelcomePage: React.FC<FormalWelcomePageProps> = ({
  onEnterDashboard,
  onStartVerification,
  onViewRiskReport,
  onExploreEscrow,
  onViewCertificate,
  onOpenAdvisor,
  onOpenAuth,
  onOpenLearn,
  onReplaySplash,
  language,
}) => {
  const t = translations[language] || translations.en;

  // Search input state for quick check
  const [district, setDistrict] = useState('Wakiso');
  const [block, setBlock] = useState('214');
  const [plot, setPlot] = useState('458');

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onStartVerification();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 select-none relative z-10">
      {/* 1. Main Welcome Landing Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
        {/* Core Value Pillar Pills */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-950 text-xs font-bold shadow-2xs">
          <span className="flex items-center gap-1 text-blue-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Land Verification</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-amber-900">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Fraud Prevention</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-emerald-900">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure Transactions</span>
          </span>
        </div>

        {/* Main Header Message */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0b1e36] tracking-tight leading-tight uppercase font-serif">
          Buy Land With Confidence.
        </h1>

        {/* Short Supporting Text */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          Clear Title Uganda helps you verify land information, identify potential risks and navigate safer land transactions.
        </p>

        {/* Prominent Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Primary CTA: Get Started */}
          <button
            id="welcome-get-started-btn"
            onClick={onEnterDashboard}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0b1e36] to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          {/* Secondary CTA: Sign In */}
          {onOpenAuth && (
            <button
              id="welcome-sign-in-btn"
              onClick={onOpenAuth}
              className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Sign In</span>
            </button>
          )}

          {/* Re-play Splash Intro (Optional subtle trigger) */}
          {onReplaySplash && (
            <button
              onClick={onReplaySplash}
              className="px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition"
              title="Watch introduction animation again"
            >
              Watch Intro
            </button>
          )}
        </div>

        {/* Smaller Option: Explore How It Works */}
        <div className="pt-2">
          <button
            onClick={scrollToHowItWorks}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 underline underline-offset-4 cursor-pointer"
          >
            <span>Explore How It Works</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* High-Impact Visual Tagline Banner */}
        <div className="pt-6">
          <div className="inline-block px-5 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs sm:text-sm font-black tracking-widest uppercase shadow-2xs">
            ⚡ VERIFY BEFORE YOU PAY.
          </div>
        </div>
      </section>

      {/* 2. Simple "How It Works" Section (Section 3) */}
      <section id="how-it-works-section" className="scroll-mt-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-700 font-bold">
            Four Simple Steps
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1e36] tracking-tight uppercase font-serif">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            From initial search to registered ownership, you are protected at every stage.
          </p>
        </div>

        {/* 4-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1: Verify */}
          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-800 px-2.5 py-1 rounded-lg bg-blue-50">
                01
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Search className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#0b1e36] uppercase tracking-wide">
              Verify
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check the land and parties involved. Cross-reference registry records, survey beacons, and seller identity.
            </p>
          </div>

          {/* Step 2: Review */}
          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-800 px-2.5 py-1 rounded-lg bg-amber-50">
                02
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#0b1e36] uppercase tracking-wide">
              Review
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review title information and required documents. Inspect spousal consent, mutations, caveats, and risk flags.
            </p>
          </div>

          {/* Step 3: Secure */}
          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-800 px-2.5 py-1 rounded-lg bg-emerald-50">
                03
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#0b1e36] uppercase tracking-wide">
              Secure
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use the supported secure payment/escrow arrangement. Funds remain safely held with Stanbic Bank custodial escrow.
            </p>
          </div>

          {/* Step 4: Complete */}
          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-800 px-2.5 py-1 rounded-lg bg-indigo-50">
                04
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#0b1e36] uppercase tracking-wide">
              Complete
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete the transfer and confirm registration before funds are released according to the agreed conditions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Instant Title Quick-Check Card */}
      <section className="bg-white/95 backdrop-blur-md rounded-3xl border border-blue-100 p-6 sm:p-8 shadow-lg max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-700 animate-pulse" />
            <h3 className="text-sm font-black text-[#0b1e36] uppercase tracking-wide">
              Instant Cadastral Search
            </h3>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            NLIS & Deeds Registry
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Have a plot number? Check whether this parcel has recorded caveats, title conflicts, or pending surveys:
        </p>

        <form onSubmit={handleQuickSearch} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">
                District
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                placeholder="District"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">
                Block No.
              </label>
              <input
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                placeholder="Block"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">
                Plot No.
              </label>
              <input
                type="text"
                value={plot}
                onChange={(e) => setPlot(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                placeholder="Plot"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Example:</span>
              <button
                type="button"
                onClick={() => {
                  setDistrict('Wakiso');
                  setBlock('214');
                  setPlot('458');
                }}
                className="text-blue-700 hover:underline font-mono"
              >
                Kyadondo Block 214 Plot 458
              </button>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition active:scale-98 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify Land Information</span>
            </button>
          </div>
        </form>
      </section>

      {/* 4. Education & Red Flags Teaser Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {/* Know the Red Flags Teaser */}
        <div
          onClick={onOpenLearn || onEnterDashboard}
          className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-xs hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Know the Red Flags</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition" />
          </div>
          <h4 className="text-sm font-black text-slate-900">
            Top 7 Land Fraud Warning Signs
          </h4>
          <p className="text-xs text-slate-600 leading-normal">
            Seller rushing for cash payment? Identity not matching the white page? Learn how to spot land scams before losing money.
          </p>
        </div>

        {/* Learn Before You Buy Teaser */}
        <div
          onClick={onOpenLearn || onEnterDashboard}
          className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-xs hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>Learn Before You Buy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-700 group-hover:translate-x-1 transition" />
          </div>
          <h4 className="text-sm font-black text-slate-900">
            Ugandan Land Buyer's Guide
          </h4>
          <p className="text-xs text-slate-600 leading-normal">
            Understand Mailo vs Freehold vs Customary, spousal consent rules, mutation forms, and why you always need an advocate.
          </p>
        </div>
      </section>

      {/* 5. Statutory Trust & Accreditation Footer */}
      <footer className="pt-6 border-t border-slate-200/80 text-center space-y-2">
        <p className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          REPUBLIC OF UGANDA • REGISTRATION OF TITLES ACT CAP 230 • SURVEY ACT CAP 232
        </p>
        <p className="text-[10px] text-slate-400 max-w-xl mx-auto">
          Custodial escrow services conducted in partnership with licensed commercial banking institutions in Uganda. Clear Title Uganda is an independent verification platform.
        </p>
      </footer>
    </div>
  );
};
