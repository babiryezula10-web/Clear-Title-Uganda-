import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Printer,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { PropertyRecord } from '../types';

interface VerificationReportModalProps {
  property: PropertyRecord;
  isOpen: boolean;
  onClose: () => void;
  onViewCertificate?: () => void;
}

export const VerificationReportModal: React.FC<VerificationReportModalProps> = ({
  property,
  isOpen,
  onClose,
  onViewCertificate,
}) => {
  const [showWarningDetails, setShowWarningDetails] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const isClear = property.status === 'clear';
  const isFlagged = property.status === 'flagged';

  // Plain-Language Status & Risk Overview (Section 9)
  const riskStatusText = isClear
    ? 'Low current risk indicators'
    : isFlagged
    ? 'Significant issue detected'
    : 'Review recommended';

  const riskBadgeColor = isClear
    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
    : isFlagged
    ? 'bg-red-50 text-red-800 border-red-300'
    : 'bg-amber-50 text-amber-800 border-amber-300';

  const riskDotColor = isClear ? 'bg-emerald-500' : isFlagged ? 'bg-red-500' : 'bg-amber-500';

  const refNumber = `CTU-2026-${property.id.replace('prop-', '892')}`;

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Clear Title Uganda Verification Report for ${property.parcelId}, ${property.district} - Ref: ${refNumber}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden my-6 animate-in zoom-in-95 duration-200 text-slate-900">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0b1e36] text-white flex items-center justify-between border-b border-blue-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-amber-400">
                Official Statutory Audit
              </p>
              <h2 className="text-base sm:text-xl font-black uppercase tracking-tight text-white">
                CLEAR TITLE VERIFICATION REPORT
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
              title="Print report"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Property & Reference Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="block text-[10px] font-mono uppercase text-slate-400">Property</span>
              <p className="font-black text-sm text-[#0b1e36]">{property.parcelId}</p>
              <p className="text-slate-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>
                  {property.village}, {property.county}, {property.district}
                </span>
              </p>
            </div>

            <div>
              <span className="block text-[10px] font-mono uppercase text-slate-400">Verification Reference</span>
              <p className="font-mono font-bold text-sm text-blue-900">{refNumber}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Tenure: <strong className="text-slate-800">{property.tenureType}</strong> • Size: {property.approxSize}
              </p>
            </div>
          </div>

          {/* Section 9: Property Risk Overview */}
          <div className="p-4 sm:p-5 rounded-2xl border bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                  Property Risk Overview
                </span>
                <div className={`mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${riskBadgeColor}`}>
                  <span className={`w-2 h-2 rounded-full ${riskDotColor}`} />
                  <span>{riskStatusText}</span>
                </div>
              </div>

              <button
                onClick={() => setShowWarningDetails(!showWarningDetails)}
                className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
              >
                <span>Why am I seeing this status?</span>
                {showWarningDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Expandable Explanation (Section 9) */}
            {showWarningDetails && (
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2 animate-in fade-in duration-200">
                <p className="font-semibold text-slate-900">
                  {isClear
                    ? 'Summary of Findings: All cadastral beacons match the official White Page deed, registered owner national IDs have been confirmed, and no court caveats or encumbrances exist.'
                    : isFlagged
                    ? '⚠️ Warning: Seller identity does not match current registered records, or an unresolved family caveat has been detected on the Ministry white page.'
                    : 'Notice: A registered interest on this property requires review. Coordinate opening confirmed boundary overlap with adjacent plot.'}
                </p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Information is corroborated against the Uganda Ministry of Lands NLIS database, local area land committee records, and registered land surveyors.
                </p>
              </div>
            )}
          </div>

          {/* Section 8: Verification Summary Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Verification Summary
            </h3>

            <div className="overflow-hidden border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="p-3">Audit Item</th>
                    <th className="p-3">Statutory Status</th>
                    <th className="p-3 hidden sm:table-cell">Findings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Title information</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Verified
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] hidden sm:table-cell">
                      Ministry White Page volume & folio verified
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Ownership information</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Checked
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] hidden sm:table-cell">
                      Unbroken chain of title verified from original grant
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Seller identity</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Checked
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] hidden sm:table-cell">
                      NIRA National ID & biometric verification confirmed
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Registered interests</td>
                    <td className="p-3">
                      {isClear ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Checked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          Requires Review
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] hidden sm:table-cell">
                      {isClear
                        ? 'No active caveats, mortgages, or court injunctions'
                        : 'A registered interest on this property requires review.'}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Documents</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Reviewed
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] hidden sm:table-cell">
                      Spousal consent affidavit and mutation deed verified
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Risk indicators</td>
                    <td className="p-3">
                      {isClear ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          No current flags
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          Flagged for review
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] hidden sm:table-cell">
                      {isClear
                        ? 'Zero fraudulent markers or boundary overlap detected'
                        : 'Review boundary demarcation with adjacent neighbor.'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 8: Metadata Stamp */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Verification date:</span>
              <span className="font-bold text-slate-800">23 September 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Source of information:</span>
              <span className="font-bold text-slate-800">Uganda NLIS & Field GPS Cadastral Survey</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Verified by:</span>
              <span className="font-bold text-slate-800">Surv. David Byaruhanga (Reg. Surveyor #UG-382)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Reference number:</span>
              <span className="font-bold text-blue-900">{refNumber}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer active:scale-98"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 transition flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied Link!' : 'Share Report'}</span>
            </button>
          </div>

          {onViewCertificate && isClear && (
            <button
              onClick={() => {
                onClose();
                onViewCertificate();
              }}
              className="px-4 py-2.5 rounded-xl bg-[#0b1e36] hover:bg-blue-900 text-amber-300 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <span>View Digital Certificate</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
