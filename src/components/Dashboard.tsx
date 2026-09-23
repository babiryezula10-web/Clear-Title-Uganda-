import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  FileCheck,
  Lock,
  Bell,
  FileText,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  Download,
  Award,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Briefcase,
  User,
  Users,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import {
  PropertyRecord,
  VerificationStage,
  LanguageCode,
  CaseMessage,
  VaultDocument,
  LandAlert,
  LandTransaction,
  ActivityItem,
  UserRole,
} from '../types';
import { translations } from '../data/translations';

interface DashboardProps {
  userName?: string;
  userRole?: UserRole;
  properties: PropertyRecord[];
  transactions?: LandTransaction[];
  activities?: ActivityItem[];
  alerts: LandAlert[];
  messages: CaseMessage[];
  onStartNewVerification: () => void;
  onStartNewTransaction?: () => void;
  onViewRiskReport: (property: PropertyRecord) => void;
  onViewVerificationReport?: (property: PropertyRecord) => void;
  onViewEscrow: (property: PropertyRecord) => void;
  onViewCertificate: (property: PropertyRecord) => void;
  onViewAlerts: () => void;
  onViewTransactions?: () => void;
  onSendMessage: (caseId: string, text: string) => void;
  language: LanguageCode;
}

export const Dashboard: React.FC<DashboardProps> = ({
  userName = 'Ronald Kigozi',
  userRole = 'diaspora_buyer',
  properties,
  transactions = [],
  activities = [],
  alerts,
  messages,
  onStartNewVerification,
  onStartNewTransaction,
  onViewRiskReport,
  onViewVerificationReport,
  onViewEscrow,
  onViewCertificate,
  onViewAlerts,
  onViewTransactions,
  onSendMessage,
  language,
}) => {
  const t = translations[language] || translations.en;

  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    properties[0]?.id || ''
  );
  const [activeRoleView, setActiveRoleView] = useState<'buyer' | 'seller' | 'advocate' | 'admin'>('buyer');
  const [expandedWarningId, setExpandedWarningId] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState('');
  const [activeDocumentPreview, setActiveDocumentPreview] = useState<VaultDocument | null>(null);

  const selectedProperty =
    properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const caseMessages = messages.filter(
    (m) => !selectedProperty || m.caseId === selectedProperty.id
  );

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !selectedProperty) return;
    onSendMessage(selectedProperty.id, newMessageText.trim());
    setNewMessageText('');
  };

  // Plain-Language Status Helpers (Section 7)
  const getPlainStatus = (status: string) => {
    switch (status) {
      case 'clear':
        return {
          label: 'Verified',
          icon: CheckCircle2,
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dotClass: 'bg-emerald-500',
          desc: 'Title verified against White Page with zero registered encumbrances.',
        };
      case 'flagged':
        return {
          label: 'Issue Detected',
          icon: XCircle,
          badgeClass: 'bg-red-50 text-red-800 border-red-300',
          dotClass: 'bg-red-500',
          desc: 'Seller identity mismatch or active family caveat detected.',
        };
      case 'pending':
      default:
        return {
          label: 'Pending Review',
          icon: AlertCircle,
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
          dotClass: 'bg-amber-500',
          desc: 'A registered interest on this property requires review.',
        };
    }
  };

  // Section 5 Greeting calculation
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Activity cards data (Section 5)
  const activeTxCount = transactions.filter((t) => t.status !== 'completed').length || 2;
  const verifiedCount = properties.filter((p) => p.status === 'clear').length || 4;
  const pendingActionsCount = transactions.filter((t) => t.status === 'action_required').length || 1;
  const completedTxCount = transactions.filter((t) => t.status === 'completed').length || 3;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 select-none text-slate-900">
      {/* 1. Header with Personalized Greeting & + Start New Land Transaction Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0b1e36] via-[#102a4c] to-[#0b1e36] text-white border border-blue-900/60 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">
              CLEAR TITLE UGANDA • PROPERTY INTEGRITY PLATFORM
            </span>
          </div>

          {/* Section 5: Good morning, [User Name] */}
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-serif">
            {getGreeting()}, {userName}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 max-w-xl font-normal">
            Verify land information, track active custodial escrow transfers, and review statutory legal certificates.
          </p>
        </div>

        {/* Section 6: Highly Visible + Start New Land Transaction Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="start-new-land-transaction-btn"
            onClick={onStartNewTransaction || onStartNewVerification}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Start New Land Transaction</span>
          </button>

          <button
            onClick={onStartNewVerification}
            className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs transition flex items-center gap-1.5 cursor-pointer border border-white/10"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Verify Parcel Only</span>
          </button>
        </div>
      </div>

      {/* 2. Section 16: Role Experience Switcher Bar */}
      <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-2">
            Tailored View:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveRoleView('buyer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeRoleView === 'buyer'
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buyer
            </button>
            <button
              onClick={() => setActiveRoleView('seller')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeRoleView === 'seller'
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Seller
            </button>
            <button
              onClick={() => setActiveRoleView('advocate')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeRoleView === 'advocate'
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Advocate / Professional
            </button>
            <button
              onClick={() => setActiveRoleView('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeRoleView === 'admin'
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Dynamic Role Roadmap strip (Section 16) */}
        <div className="text-xs text-slate-500 hidden sm:flex items-center gap-1.5 font-mono">
          {activeRoleView === 'buyer' && (
            <span>Workflow: <strong>Find → Verify → Review → Secure Payment → Transfer → Completion</strong></span>
          )}
          {activeRoleView === 'seller' && (
            <span>Workflow: <strong>Verify Identity → Property → Documents → Transaction → Payment</strong></span>
          )}
          {activeRoleView === 'advocate' && (
            <span>Workflow: <strong>Assigned Transactions → Documents → Legal Review → Completion</strong></span>
          )}
          {activeRoleView === 'admin' && (
            <span>Workflow: <strong>Users → Transactions → Fraud Reports → Audit Logs</strong></span>
          )}
        </div>
      </div>

      {/* 3. Section 5: "Your Property Activity" Simple Metric Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
          Your Property Activity
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Transactions: 2 */}
          <div
            onClick={onViewTransactions}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Active Transactions
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4 text-blue-700" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-[#0b1e36]">
              {activeTxCount}
            </p>
            <p className="text-[11px] text-blue-800 font-semibold group-hover:underline flex items-center gap-1">
              <span>View transaction timeline</span>
              <ArrowRight className="w-3 h-3" />
            </p>
          </div>

          {/* Verified Properties: 4 */}
          <div
            onClick={() => onViewRiskReport(properties[0])}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Verified Properties
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-900">
              {verifiedCount}
            </p>
            <p className="text-[11px] text-emerald-800 font-semibold group-hover:underline flex items-center gap-1">
              <span>View clear title records</span>
              <ArrowRight className="w-3 h-3" />
            </p>
          </div>

          {/* Pending Actions: 1 */}
          <div
            onClick={onViewAlerts}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Pending Actions
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-900">
              {pendingActionsCount}
            </p>
            <p className="text-[11px] text-amber-800 font-semibold group-hover:underline flex items-center gap-1">
              <span>Action required: Spousal deed</span>
              <ArrowRight className="w-3 h-3" />
            </p>
          </div>

          {/* Completed Transactions: 3 */}
          <div
            onClick={onViewTransactions}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Completed Deals
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold">
                <Award className="w-4 h-4 text-indigo-700" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-indigo-950">
              {completedTxCount}
            </p>
            <p className="text-[11px] text-indigo-800 font-semibold group-hover:underline flex items-center gap-1">
              <span>Titles issued & archived</span>
              <ArrowRight className="w-3 h-3" />
            </p>
          </div>
        </div>
      </div>

      {/* 4. Main Two-Column Layout: Section 5 Recent Activity & Section 7 Verification Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Properties & Plain-Language Status System (Section 7 & 9) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Your Land Properties ({properties.length})
            </h2>
            <span className="text-[11px] text-slate-400">
              Select a parcel to inspect status and reports
            </span>
          </div>

          <div className="space-y-3">
            {properties.map((property) => {
              const statusInfo = getPlainStatus(property.status);
              const isSelected = property.id === selectedPropertyId;
              const StatusIcon = statusInfo.icon;
              const isWarningOpen = expandedWarningId === property.id;

              return (
                <div
                  key={property.id}
                  className={`p-5 rounded-3xl border transition ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/10'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div
                      onClick={() => setSelectedPropertyId(property.id)}
                      className="cursor-pointer space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-[#0b1e36]">
                          {property.parcelId}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          {property.titleRef}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>
                          {property.village}, {property.county}, {property.district} • {property.approxSize} • {property.tenureType}
                        </span>
                      </p>
                    </div>

                    {/* Section 7: Clear Verification Status Badge */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 ${statusInfo.badgeClass}`}>
                        <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass}`} />
                        <span>{statusInfo.label}</span>
                      </div>

                      <button
                        onClick={() => {
                          if (onViewVerificationReport) {
                            onViewVerificationReport(property);
                          } else {
                            onViewRiskReport(property);
                          }
                        }}
                        className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-98"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Section 7 & 9: Plain Language Explanation & "Why am I seeing this warning?" */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <p className="text-slate-600">
                      {statusInfo.desc}
                    </p>

                    {property.status !== 'clear' && (
                      <button
                        onClick={() => setExpandedWarningId(isWarningOpen ? null : property.id)}
                        className="text-blue-800 hover:text-blue-950 font-bold inline-flex items-center gap-1 text-[11px] self-start sm:self-auto cursor-pointer"
                      >
                        <span>Why am I seeing this warning?</span>
                        {isWarningOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>

                  {/* Expandable Explanation (Section 9) */}
                  {isWarningOpen && (
                    <div className="mt-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1 animate-in fade-in duration-150">
                      <p className="font-bold">
                        ⚠️ Registry Interest Notice:
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        A registered interest on this property requires review. Ground survey detected a boundary beacon variance or missing notarized spousal consent affidavit. Funds should not be released until verified by an advocate.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Section 5 "Recent Activity" Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Recent Activity
            </h2>
            <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
              Live Feed
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            {activities.length > 0 ? (
              activities.map((act) => {
                const isComplete = act.type === 'completed';
                const isAction = act.type === 'action_required';

                return (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isComplete
                              ? 'bg-emerald-500'
                              : isAction
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}
                        />
                        <h4 className="text-xs font-bold text-slate-900">
                          {act.title}
                        </h4>
                      </div>

                      {isAction && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          Action Required
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] font-semibold text-slate-700">
                      {act.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400">
                      <span>{act.date}</span>
                      {act.transactionRef && (
                        <span className="text-blue-700 font-bold">
                          {act.transactionRef}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-xs text-slate-400 text-center py-4">
                No recent activity recorded today.
              </div>
            )}

            <button
              onClick={onViewTransactions}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition text-center cursor-pointer"
            >
              View Full Transaction Log
            </button>
          </div>

          {/* Quick Statutory Trust Card */}
          <div className="p-5 rounded-3xl bg-[#0b1e36] text-white border border-blue-900/60 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Lock className="w-4 h-4" />
              <span>Stanbic Bank Escrow Protected</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never pay the seller directly. Funds are securely locked in a regulated custodial trust until legal title is confirmed in your name.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
