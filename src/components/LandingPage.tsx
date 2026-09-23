import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileCheck,
  Compass,
  Building,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface LandingPageProps {
  onStartVerification: () => void;
  onViewRiskReport: () => void;
  onExploreEscrow: () => void;
  language: LanguageCode;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartVerification,
  onViewRiskReport,
  onExploreEscrow,
  language,
}) => {
  const t = translations[language] || translations.en;
  const [searchDistrict, setSearchDistrict] = useState('Wakiso');
  const [searchBlock, setSearchBlock] = useState('102');
  const [searchPlot, setSearchPlot] = useState('45');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleInstantSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult(
        `Verified Registry Match: ${searchDistrict}, Block ${searchBlock}, Plot ${searchPlot}. Title: Clean Mailo Register. Deal Risk Score: 94/100 (Low Risk).`
      );
    }, 700);
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-blue-100 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold mb-6 animate-in fade-in">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Uganda's Verified Land Title & Escrow Protection Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0b1e36] leading-tight">
              Buy Ugandan Land Safely. Never Lose Money to Fraud.
            </h1>

            {/* One-line value proposition */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We verify ownership at the Ministry registry, inspect physical boundary beacons on ground, and safeguard your funds in bank escrow until the title is registered in your name.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="hero-verify-cta"
                onClick={onStartVerification}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>{t.verifyCTA}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-check-title-cta"
                onClick={onViewRiskReport}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-blue-950 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Sample Risk Score Report (94/100)</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
              </button>
            </div>
          </div>

          {/* Quick Registry Title Checker Tool */}
          <div className="mt-12 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-blue-200 p-5 sm:p-7">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Instant National Registry Search Preview
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                NLIS Database Connected
              </span>
            </div>

            <form onSubmit={handleInstantSearch} className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">District</label>
                <select
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-700"
                >
                  <option value="Wakiso">Wakiso</option>
                  <option value="Kampala">Kampala</option>
                  <option value="Mukono">Mukono</option>
                  <option value="Mpigi">Mpigi</option>
                  <option value="Jinja">Jinja</option>
                  <option value="Mbarara">Mbarara</option>
                  <option value="Gulu">Gulu</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Block Number</label>
                <input
                  type="text"
                  value={searchBlock}
                  onChange={(e) => setSearchBlock(e.target.value)}
                  placeholder="e.g. 102"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Plot Number</label>
                <input
                  type="text"
                  value={searchPlot}
                  onChange={(e) => setSearchPlot(e.target.value)}
                  placeholder="e.g. 45"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full py-2 px-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  {isSearching ? 'Auditing...' : 'Check Title'}
                </button>
              </div>
            </form>

            {searchResult && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{searchResult}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={onViewRiskReport}
                      className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                    >
                      View Full Audit Report <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators Bar */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 leading-tight">14,820+</p>
                <p className="text-xs text-slate-500 font-medium">{t.statsDone}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 leading-tight">135 Districts</p>
                <p className="text-xs text-slate-500 font-medium">{t.statsDistricts}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 leading-tight">Stanbic Escrow</p>
                <p className="text-xs text-slate-500 font-medium">{t.statsEscrow}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Visual: How It Works */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
              End-to-End Protection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36]">
              How Clear Title Protects You in 3 Steps
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A comprehensive system designed specifically for the realities of land ownership in Uganda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-900 text-white font-extrabold text-sm flex items-center justify-center">
                    1
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Registry & Ground
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Title & Boundary Verification
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We check the original White Page at Ministry zonal offices for hidden caveats, then send a licensed surveyor to locate the 4 boundary beacons on ground.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                <span>Eliminates fake search certificates</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-900 text-white font-extrabold text-sm flex items-center justify-center">
                    2
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Deal Score (0–100)
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Deal Risk Score Issued
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You receive an easy-to-read Deal Risk Score analyzing ownership chain, spousal consent, bibanja occupants, and local LC1 dispute records.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                <span>Plain language, zero legal jargon</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-900 text-white font-extrabold text-sm flex items-center justify-center">
                    3
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Zero Risk Payment
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Regulated Bank Escrow Release
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your purchase funds stay locked in our regulated bank trust account. The seller is only paid once the new title deed is officially transferred into your name.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                <span>100% money-back safety trigger</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Fraud Warnings Section */}
      <section className="py-14 bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2.5 mb-3">
              <AlertTriangle className="w-5 h-5 text-blue-800" />
              <h3 className="text-lg font-bold text-slate-900">
                Protecting You Against Common Land Frauds in Uganda
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Over 60% of contested land transactions in Central Uganda involve one of these preventable warning signs:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <p className="font-bold text-blue-950 mb-1">Double Title Allocation</p>
                <p className="text-slate-600 text-[11px]">
                  Multiple titles issued over the same parcel. We cross-verify cadastral coordinates with the National GIS grid.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <p className="font-bold text-blue-950 mb-1">Unregistered Powers of Attorney</p>
                <p className="text-slate-600 text-[11px]">
                  Relatives attempting to sell deceased parents’ land without High Court letters of administration.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <p className="font-bold text-blue-950 mb-1">Hidden Family & Court Caveats</p>
                <p className="text-slate-600 text-[11px]">
                  Informal sale agreements made while a formal injunction freezes the registry register.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <p className="font-bold text-blue-950 mb-1">Unrecorded Bibanja Occupants</p>
                <p className="text-slate-600 text-[11px]">
                  Failing to verify lawful tenants on Mailo land whose constitutional rights survive ownership transfers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1e36] text-slate-300 py-12 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-blue-900/60">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                  CT
                </div>
                <span className="font-extrabold text-white text-lg tracking-tight">CLEAR TITLE UGANDA</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 max-w-sm">
                Empowering safe, transparent land ownership across Uganda for citizens at home and the diaspora worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <p className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Services</p>
                <ul className="space-y-1.5 text-slate-400">
                  <li>Title Search & Verification</li>
                  <li>Physical Boundary Opening</li>
                  <li>Deal Risk Score Reports</li>
                  <li>Regulated Bank Escrow</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Coverage</p>
                <ul className="space-y-1.5 text-slate-400">
                  <li>Wakiso & Kampala</li>
                  <li>Mukono & Mpigi</li>
                  <li>Mbarara & Western</li>
                  <li>Gulu & Northern Region</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Regulatory Trust</p>
                <ul className="space-y-1.5 text-slate-400">
                  <li>RTA Compliance (Cap 230)</li>
                  <li>Licensed Land Surveyors</li>
                  <li>Stanbic Escrow Trust</li>
                  <li>High Court Advocates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>© 2026 Clear Title Uganda. All rights reserved.</p>
            <p className="text-center sm:text-right">{t.legalDisclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
