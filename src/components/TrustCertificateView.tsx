import React, { useState } from 'react';
import formalAppIcon from '../assets/images/formal_ctu_icon_1790180602124.jpg';
import {
  Award,
  ShieldCheck,
  QrCode,
  Download,
  Share2,
  Printer,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Check,
} from 'lucide-react';
import { PropertyRecord, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface TrustCertificateViewProps {
  property: PropertyRecord;
  allProperties: PropertyRecord[];
  onSelectProperty: (property: PropertyRecord) => void;
  language?: LanguageCode;
}

export const TrustCertificateView: React.FC<TrustCertificateViewProps> = ({
  property,
  allProperties,
  onSelectProperty,
  language = 'en',
}) => {
  const t = translations[language] || translations.en;
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const certId = `CTU-CERT-2026-${property.id.toUpperCase()}-99`;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            {t.ownershipGuarantee}
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1e36]">
            {t.trustCertificate}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-proof verifiable record for buyers, financial institutions, and courts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={property.id}
            onChange={(e) => {
              const selected = allProperties.find((p) => p.id === e.target.value);
              if (selected) onSelectProperty(selected);
            }}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg px-2.5 py-2 focus:outline-none focus:border-blue-700"
          >
            {allProperties
              .filter((p) => p.status === 'clear')
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.parcelId} ({p.currentRiskScore}/100)
                </option>
              ))}
          </select>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5 text-blue-700" />
            <span className="hidden sm:inline">{t.printReport}</span>
          </button>
        </div>
      </div>

      {/* Main Certificate Frame */}
      <div className="relative bg-white rounded-2xl border-4 border-double border-blue-900 p-8 sm:p-12 shadow-xl overflow-hidden print:m-0 print:border-2">
        {/* Subtle Watermark Shield & Cadastral Security Seal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
          <div className="w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full border-4 border-double border-blue-900/50 flex items-center justify-center text-center p-6 -rotate-12">
            <div className="space-y-1.5 text-blue-950 font-serif">
              <p className="text-xs font-mono tracking-widest uppercase font-bold">THE REPUBLIC OF UGANDA</p>
              <p className="text-xl sm:text-2xl font-black tracking-widest uppercase">STATUTORY DEED SEAL</p>
              <p className="text-[11px] font-mono tracking-wider uppercase font-semibold">REGISTRATION OF TITLES ACT CAP 230</p>
              <p className="text-[9px] font-mono tracking-widest uppercase text-blue-900">VERIFIED GROUND TRUTH CADASTRAL AUDIT</p>
            </div>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="relative text-center space-y-6">
          {/* Official Formal Registry Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl shadow-blue-950/20 mb-3 bg-[#0b1e36]">
              <img
                src={formalAppIcon}
                alt="Republic of Uganda Land Title Seal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-2 ring-amber-400/40 rounded-full pointer-events-none" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0b1e36] tracking-tight uppercase">
              {t.republicOfUganda}
            </h2>
            <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mt-1">
              Clear Title Uganda Official Verification Audit
            </p>
          </div>

          <div className="max-w-xl mx-auto border-t border-b border-blue-200 py-4 my-2">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              {t.certifiesProperty}
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {property.parcelId}
            </h3>
            <p className="text-xs font-mono text-blue-800 mt-1 font-bold">
              {t.titleRefNumber}: {property.titleRef}
            </p>
          </div>

          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            {t.certDescription}
          </p>

          {/* Certificate Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-left">
            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                {t.registeredOwner}
              </span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {property.registeredOwners[0]}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                {t.district}
              </span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {property.district}, {property.county}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                {t.tenure}
              </span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {property.tenureType}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                {t.dealRiskScore}
              </span>
              <span className="text-xs font-black text-blue-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                <span>{property.currentRiskScore}/100</span>
              </span>
            </div>
          </div>

          {/* Verification QR Stamp & Signature Block */}
          <div className="pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center p-1 shadow-2xs">
                <QrCode className="w-12 h-12 text-blue-900" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{certId}</p>
                <p className="text-[11px] text-slate-500 max-w-[200px] leading-tight">
                  {t.scanQrVerification}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="h-8 border-b border-blue-900 flex items-end justify-end pb-1">
                <span className="font-serif italic font-bold text-blue-950 text-sm tracking-widest">
                  K. Ssenabulya (Registrar)
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                Chief Registrar of Titles • NLIS Seal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={handleShare}
          className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-blue-700" />}
          <span>{copiedLink ? 'Link Copied!' : t.shareVerificationLink}</span>
        </button>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>{t.downloadCertificate}</span>
        </button>
      </div>
    </div>
  );
};
