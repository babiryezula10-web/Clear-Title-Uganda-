import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  ArrowRight,
  DollarSign,
  AlertCircle,
  FileCheck,
  RefreshCw,
} from 'lucide-react';
import { EscrowAccount, PropertyRecord, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface EscrowTrackerViewProps {
  escrow: EscrowAccount;
  property: PropertyRecord;
  onUpdateEscrow: (updated: EscrowAccount) => void;
  language?: LanguageCode;
}

export const EscrowTrackerView: React.FC<EscrowTrackerViewProps> = ({
  escrow,
  property,
  onUpdateEscrow,
  language = 'en',
}) => {
  const t = translations[language] || translations.en;
  const [isProcessing, setIsProcessing] = useState(false);

  // Toggle a condition checkbox for demonstration
  const handleToggleCondition = (index: number) => {
    const updatedConditions = [...escrow.conditions];
    updatedConditions[index].verified = !updatedConditions[index].verified;

    const allVerified = updatedConditions.every((c) => c.verified);

    // Update milestones accordingly
    const updatedMilestones = escrow.milestones.map((m) => {
      if (m.id === 'm2') {
        return {
          ...m,
          status: allVerified ? ('completed' as const) : ('in_progress' as const),
        };
      }
      if (m.id === 'm3' && allVerified) {
        return {
          ...m,
          status: 'in_progress' as const,
        };
      }
      return m;
    });

    onUpdateEscrow({
      ...escrow,
      conditions: updatedConditions,
      milestones: updatedMilestones,
    });
  };

  // Trigger release of funds
  const handleTriggerRelease = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const updatedMilestones = escrow.milestones.map((m) => ({
        ...m,
        status: 'completed' as const,
        completedAt: m.completedAt || '2026-03-22 10:00 EAT',
      }));

      onUpdateEscrow({
        ...escrow,
        status: 'funds_released',
        fundsHeldUGX: 0,
        fundsHeldUSD: 0,
        milestones: updatedMilestones,
      });
    }, 1000);
  };

  const allConditionsMet = escrow.conditions.every((c) => c.verified);
  const isReleased = escrow.status === 'funds_released';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {t.regulatedEscrowTitle}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1e36]">
            {t.escrow}: {escrow.parcelId}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.titleRefNumber}: {escrow.bankTrustRef}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
              isReleased
                ? 'bg-blue-900 text-white'
                : 'bg-blue-100 text-blue-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>
              {isReleased
                ? t.fundsReleased
                : `UGX ${escrow.fundsHeldUGX.toLocaleString()} ${t.fundsHeldInTrust}`}
            </span>
          </span>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-[#0b1e36] text-white p-6 rounded-2xl shadow-md space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
              {t.totalPurchaseEscrow}
            </p>
            <p className="text-xl sm:text-2xl font-black mt-1">
              UGX {escrow.totalAmountUGX.toLocaleString()}
            </p>
            <p className="text-xs text-blue-300 mt-0.5">
              ~${escrow.totalAmountUSD.toLocaleString()} USD
            </p>
          </div>

          <div>
            <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
              {t.partiesInvolved}
            </p>
            <p className="text-xs font-bold text-white mt-1">
              {t.buyer}: {escrow.buyerName}
            </p>
            <p className="text-xs text-blue-200 mt-0.5">
              {t.seller}: {escrow.sellerName}
            </p>
          </div>

          <div>
            <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
              {t.custodyBank}
            </p>
            <p className="text-xs font-bold text-white mt-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-blue-300" />
              <span>Stanbic Bank Uganda Limited</span>
            </p>
            <p className="text-[11px] text-blue-300 mt-0.5">
              {t.regulatedEscrowTitle}
            </p>
          </div>
        </div>
      </div>

      {/* 4-Stage Milestone Tracker */}
      <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          {t.escrowMilestonesTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {escrow.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in_progress';

            return (
              <div
                key={milestone.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                  isCompleted
                    ? 'border-blue-700 bg-blue-50/70 text-blue-950 shadow-xs'
                    : isInProgress
                    ? 'border-blue-300 bg-white shadow-xs'
                    : 'border-slate-100 bg-slate-50/60 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-blue-800 text-white'
                          : isInProgress
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isCompleted
                          ? 'bg-blue-200 text-blue-900'
                          : isInProgress
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? t.statusClear : isInProgress ? t.statusPending : 'Queued'}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                {milestone.completedAt && (
                  <p className="text-[10px] text-blue-800 font-semibold mt-3 pt-2 border-t border-blue-200/50">
                    {milestone.completedAt}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Conditions Precedent Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              {t.conditionsChecklistTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.escrowSafetyGuarantee}
            </p>
          </div>
          <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg">
            {escrow.conditions.filter((c) => c.verified).length} / {escrow.conditions.length}
          </span>
        </div>

        <div className="space-y-2.5">
          {escrow.conditions.map((cond, idx) => (
            <div
              key={idx}
              onClick={() => handleToggleCondition(idx)}
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition ${
                cond.verified
                  ? 'bg-blue-50/60 border-blue-200 text-blue-950 font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={cond.verified}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-blue-700 focus:ring-blue-600 cursor-pointer"
                />
                <span>{cond.description}</span>
              </div>
              <span
                className={`text-[11px] font-bold ${
                  cond.verified ? 'text-blue-800' : 'text-slate-400'
                }`}
              >
                {cond.verified ? t.statusClear : t.statusPending}
              </span>
            </div>
          ))}
        </div>

        {/* Release Action Trigger */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>{t.escrowSafetyGuarantee}</span>
          </div>

          {!isReleased ? (
            <button
              onClick={handleTriggerRelease}
              disabled={isProcessing}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition flex items-center justify-center gap-2 shadow-sm ${
                allConditionsMet
                  ? 'bg-blue-800 hover:bg-blue-900 active:scale-98'
                  : 'bg-slate-400 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.releaseEscrowFunds}</span>
                </>
              )}
            </button>
          ) : (
            <div className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-300" />
              <span>{t.fundsReleased}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
