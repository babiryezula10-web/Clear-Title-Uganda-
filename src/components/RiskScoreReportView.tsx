import React, { useState } from 'react';
import {
  FileCheck,
  ShieldAlert,
  ShieldCheck,
  Download,
  Share2,
  Lock,
  ArrowRight,
  Printer,
  Calendar,
  UserCheck,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Check,
} from 'lucide-react';
import { PropertyRecord, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface RiskScoreReportViewProps {
  property: PropertyRecord;
  allProperties: PropertyRecord[];
  onSelectProperty: (property: PropertyRecord) => void;
  onProceedToEscrow: (property: PropertyRecord) => void;
  onViewCertificate: (property: PropertyRecord) => void;
  language?: LanguageCode;
}

export const RiskScoreReportView: React.FC<RiskScoreReportViewProps> = ({
  property,
  allProperties,
  onSelectProperty,
  onProceedToEscrow,
  onViewCertificate,
  language = 'en',
}) => {
  const t = translations[language] || translations.en;
  const [copiedLink, setCopiedLink] = useState(false);
  const report = property.riskReport;
  const score = report?.overallScore ?? property.currentRiskScore ?? 50;

  const isClear = score >= 80;
  const isCaution = score >= 50 && score < 80;
  const isHighRisk = score < 50;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Selector & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {t.certifiedAudit}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1e36]">
            {t.dealRiskScore}: {property.parcelId}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.titleRefNumber}: {property.titleRef} • {property.district} {t.district}
          </p>
        </div>

        {/* Property Selector & Print */}
        <div className="flex items-center gap-2">
          <select
            value={property.id}
            onChange={(e) => {
              const selected = allProperties.find((p) => p.id === e.target.value);
              if (selected) onSelectProperty(selected);
            }}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg px-2.5 py-2 focus:outline-none focus:border-blue-700"
          >
            {allProperties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.parcelId} ({p.currentRiskScore}/100)
              </option>
            ))}
          </select>

          <button
            onClick={() => window.print()}
            className="p-2 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            title="Print or Save PDF"
          >
            <Printer className="w-4 h-4 text-blue-700" />
            <span className="hidden sm:inline">{t.printReport}</span>
          </button>
        </div>
      </div>

      {/* Hero Score Card */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border transition ${
          isClear
            ? 'bg-blue-50/70 border-blue-200 text-blue-950'
            : isCaution
            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Visual Gauge */}
            <div
              className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-md ${
                isClear
                  ? 'bg-blue-800 text-white'
                  : isCaution
                  ? 'bg-amber-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              <span className="text-3xl font-black leading-none">{score}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-80">
                / 100
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                    isClear
                      ? 'bg-blue-200 text-blue-900'
                      : isCaution
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-red-900/60 text-red-200'
                  }`}
                >
                  {isClear ? t.lowRisk : isCaution ? t.moderateRisk : t.highRisk}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mt-2">
                {report?.summarySentence || t.riskAssessmentDesc}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs opacity-80">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  {t.auditedBy}: {report?.verifiedByAgent || 'Registry Board'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {t.inspectionDate}: {report?.issuedAt || 'Recent'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick CTA inside hero */}
          <div className="flex flex-col gap-2 shrink-0">
            {isClear && (
              <button
                onClick={() => onProceedToEscrow(property)}
                className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{t.proceedToEscrow}</span>
              </button>
            )}

            {isClear && (
              <button
                onClick={() => onViewCertificate(property)}
                className="px-5 py-2.5 bg-white hover:bg-blue-50 text-blue-950 font-bold border border-blue-200 rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <span>{t.officialCertificate}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-700" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5 Categories Breakdown */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          {t.categoriesBreakdown}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report?.categories &&
            Object.entries(report.categories).map(([key, cat]) => {
              const isCatExcellent = cat.status === 'excellent';
              const isCatWarning = cat.status === 'warning';

              return (
                <div
                  key={key}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">{cat.name}</span>
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded ${
                          isCatExcellent
                            ? 'bg-blue-100 text-blue-900'
                            : isCatWarning
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-red-100 text-red-900'
                        }`}
                      >
                        {cat.score}/100
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.plainExplanation}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-blue-800">
                      {isCatExcellent ? t.statusClear : isCatWarning ? t.statusPending : t.statusFlagged}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Audit Log Timestamp Trail */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          {t.fieldSurveyorNotes} &amp; Audit Trail
        </h3>

        <div className="space-y-3">
          {report?.auditLogs.map((log, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs gap-2"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-700 shrink-0"></span>
                <div>
                  <p className="font-bold text-slate-900">{log.action}</p>
                  <p className="text-[11px] text-slate-500">
                    {t.auditedBy} {log.actor} • {log.timestamp}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                {log.verifiedProof}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Share / Download Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={handleShare}
          className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-blue-700" />}
          <span>{copiedLink ? 'Link Copied!' : t.shareLink}</span>
        </button>

        {isClear && (
          <button
            onClick={() => onProceedToEscrow(property)}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{t.proceedToEscrow}</span>
          </button>
        )}
      </div>
    </div>
  );
};
