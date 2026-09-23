import React, { useState } from 'react';
import {
  LandTransaction,
  PropertyRecord,
} from '../types';
import {
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  ShieldCheck,
  FileText,
  UserCheck,
  Building,
  RefreshCw,
  ExternalLink,
  Plus,
} from 'lucide-react';

interface TransactionTimelineViewProps {
  transactions: LandTransaction[];
  properties: PropertyRecord[];
  onStartNewTransaction: () => void;
  onViewEscrow: () => void;
  onViewPropertyReport: (prop: PropertyRecord) => void;
}

export const TransactionTimelineView: React.FC<TransactionTimelineViewProps> = ({
  transactions,
  properties,
  onStartNewTransaction,
  onViewEscrow,
  onViewPropertyReport,
}) => {
  const [selectedTxId, setSelectedTxId] = useState<string>(
    transactions[0]?.id || 'CTU-001245'
  );

  const selectedTx =
    transactions.find((tx) => tx.id === selectedTxId) || transactions[0];

  const matchedProperty = properties.find(
    (p) => p.id === selectedTx?.propertyId
  );

  // 8 Milestones as specified in Section 12:
  // ✅ Buyer verified
  // ✅ Seller verified
  // ✅ Property verification completed
  // ✅ Sale agreement uploaded
  // 🔄 Transfer in progress
  // ⏳ Registration confirmation pending
  // 🔒 Funds held according to escrow arrangement
  // ⬜ Completion
  const timelineStages = [
    {
      id: 'buyer_verified',
      label: 'Buyer verified',
      desc: 'National ID & diaspora KYC authenticated',
      status: selectedTx?.timeline?.buyerVerified ? 'completed' : 'pending',
    },
    {
      id: 'seller_verified',
      label: 'Seller verified',
      desc: 'White page identity match & spousal consent',
      status: selectedTx?.timeline?.sellerVerified ? 'completed' : 'pending',
    },
    {
      id: 'property_verified',
      label: 'Property verification completed',
      desc: 'NLIS registry check & GPS boundary beacon opening',
      status: selectedTx?.timeline?.propertyVerified ? 'completed' : 'pending',
    },
    {
      id: 'agreement_uploaded',
      label: 'Sale agreement uploaded',
      desc: 'Bilateral agreement witnessed by enrolled advocate',
      status: selectedTx?.timeline?.saleAgreementUploaded ? 'completed' : 'pending',
    },
    {
      id: 'transfer_in_progress',
      label: 'Transfer in progress',
      desc: 'URA Stamp duty clearance & assessment filing',
      status: selectedTx?.timeline?.transferInProgress
        ? 'in_progress'
        : selectedTx?.timeline?.completed
        ? 'completed'
        : 'pending',
    },
    {
      id: 'registration_pending',
      label: 'Registration confirmation pending',
      desc: 'Ministry Zonal Office memorial registration',
      status: selectedTx?.timeline?.registrationPending
        ? 'waiting'
        : selectedTx?.timeline?.completed
        ? 'completed'
        : 'pending',
    },
    {
      id: 'funds_held_escrow',
      label: 'Funds held according to escrow arrangement',
      desc: 'Stanbic Bank Custodial Trust locking 100% purchase capital',
      status: selectedTx?.timeline?.escrowHeld ? 'locked' : 'pending',
    },
    {
      id: 'completion',
      label: 'Completion & Title Handover',
      desc: 'Deed transferred and final funds disbursed to seller',
      status: selectedTx?.timeline?.completed ? 'completed' : 'pending',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 select-none relative z-10 text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0b1e36] text-white border border-blue-900/60 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Transaction Surveillance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-serif">
            Secure Transaction Timelines
          </h1>
          <p className="text-xs sm:text-sm text-blue-200">
            Real-time stage-by-stage audit trail from due diligence to registered title handover.
          </p>
        </div>

        <button
          onClick={onStartNewTransaction}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Start New Transaction</span>
        </button>
      </div>

      {/* Main Grid: Transaction Selector on Left, Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Transaction List */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
            All Active & Past Deals ({transactions.length})
          </h2>

          <div className="space-y-2.5">
            {transactions.map((tx) => {
              const isSelected = tx.id === selectedTxId;
              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTxId(tx.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-blue-900">
                      {tx.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tx.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : tx.status === 'action_required'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {tx.status === 'completed'
                        ? 'Completed'
                        : tx.status === 'action_required'
                        ? 'Action Required'
                        : 'Active Deal'}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900">{tx.propertyTitle}</p>
                  <p className="text-xs text-slate-500">{tx.location}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-mono">
                    <span>UGX {tx.amountUGX.toLocaleString()}</span>
                    <span>{tx.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Transaction Detail & 8-Stage Timeline */}
        {selectedTx && (
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Transaction Reference
                  </span>
                  <h3 className="text-xl font-black text-[#0b1e36]">
                    {selectedTx.id}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Escrow Reference
                  </span>
                  <p className="font-mono font-bold text-sm text-emerald-800">
                    {selectedTx.escrowRef || 'Stanbic Trust Active'}
                  </p>
                </div>
              </div>

              {/* Deal Participants */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Buyer</span>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedTx.buyerName}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Seller</span>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedTx.sellerName}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Legal Counsel</span>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedTx.advocateAssigned || 'Advocate Assigned'}</p>
                </div>
              </div>
            </div>

            {/* Section 12: Visual 8-Stage Timeline */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-[#0b1e36]">
                    Secure Transaction Timeline
                  </h4>
                  <p className="text-xs text-slate-500">
                    Every statutory condition must be satisfied before final payment release.
                  </p>
                </div>
                <button
                  onClick={onViewEscrow}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Escrow Status</span>
                </button>
              </div>

              {/* Timeline Items */}
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {timelineStages.map((stage, idx) => {
                  const isCompleted = stage.status === 'completed';
                  const isInProgress = stage.status === 'in_progress';
                  const isWaiting = stage.status === 'waiting';
                  const isLocked = stage.status === 'locked';

                  return (
                    <div key={stage.id} className="relative flex items-start gap-4 pl-8 group">
                      {/* Icon Bullet */}
                      <div
                        className={`absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                          isCompleted
                            ? 'bg-emerald-500 border-white text-white shadow-xs'
                            : isInProgress
                            ? 'bg-blue-600 border-white text-white animate-pulse shadow-xs'
                            : isWaiting
                            ? 'bg-amber-400 border-white text-slate-950'
                            : isLocked
                            ? 'bg-emerald-800 border-white text-amber-300'
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isInProgress ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : isWaiting ? (
                          <Clock className="w-3.5 h-3.5" />
                        ) : isLocked ? (
                          <Lock className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 group-hover:bg-slate-50 transition">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-900">
                            {stage.label}
                          </h5>
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800'
                                : isInProgress
                                ? 'bg-blue-100 text-blue-800'
                                : isWaiting
                                ? 'bg-amber-100 text-amber-800'
                                : isLocked
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isCompleted
                              ? 'Verified'
                              : isInProgress
                              ? 'In Progress'
                              : isWaiting
                              ? 'Pending Confirmation'
                              : isLocked
                              ? 'Funds Locked'
                              : 'Upcoming'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Strip */}
              {matchedProperty && (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Need the complete statutory audit breakdown for this parcel?
                  </p>
                  <button
                    onClick={() => onViewPropertyReport(matchedProperty)}
                    className="px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Property Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
