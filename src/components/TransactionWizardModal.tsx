import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Building,
  User,
  ShieldCheck,
  FileText,
  Lock,
  Award,
  Upload,
  Sparkles,
} from 'lucide-react';
import { LandTransaction, LandTenure } from '../types';

interface TransactionWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newTx: LandTransaction) => void;
}

export const TransactionWizardModal: React.FC<TransactionWizardModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [district, setDistrict] = useState('Wakiso');
  const [block, setBlock] = useState('118');
  const [plot, setPlot] = useState('24');
  const [village, setVillage] = useState('Kiwenda');
  const [tenure, setTenure] = useState<LandTenure>('Mailo');
  const [size, setSize] = useState('25 Decimals (0.25 Acres)');
  const [priceUGX, setPriceUGX] = useState('65000000');

  // Seller Details
  const [sellerName, setSellerName] = useState('Sempebwa John Baptist');
  const [sellerNIN, setSellerNIN] = useState('CM7502910398KJ');
  const [sellerPhone, setSellerPhone] = useState('+256 702 445566');
  const [hasSpousalConsent, setHasSpousalConsent] = useState(true);

  // Buyer Details
  const [buyerName, setBuyerName] = useState('Kigozi Ronald');
  const [buyerPhone, setBuyerPhone] = useState('+256 772 123456');
  const [isDiaspora, setIsDiaspora] = useState(true);

  // Documents
  const [uploadedTitle, setUploadedTitle] = useState(true);
  const [uploadedSearch, setUploadedSearch] = useState(true);
  const [uploadedSpousal, setUploadedSpousal] = useState(true);

  // Secure Escrow
  const [escrowBank, setEscrowBank] = useState('Stanbic Bank Uganda - Custodial Trust');
  const [milestone1Release, setMilestone1Release] = useState('30% upon physical beacon opening & White Page verification');
  const [milestone2Release, setMilestone2Release] = useState('70% upon execution of Ministry deed transfer');

  if (!isOpen) return null;

  const stepsList = [
    { num: 1, label: 'Property Details', icon: Building },
    { num: 2, label: 'Seller Details', icon: User },
    { num: 3, label: 'Buyer Details', icon: User },
    { num: 4, label: 'Documents', icon: FileText },
    { num: 5, label: 'Verification', icon: ShieldCheck },
    { num: 6, label: 'Secure Payment', icon: Lock },
    { num: 7, label: 'Transfer & Completion', icon: Award },
  ];

  const handleFinish = () => {
    const newTx: LandTransaction = {
      id: `CTU-${Math.floor(100000 + Math.random() * 900000)}`,
      propertyId: `prop-${Date.now()}`,
      propertyTitle: `Plot ${plot}, Block ${block}`,
      location: `${village}, ${district}`,
      buyerName: buyerName,
      sellerName: sellerName,
      amountUGX: parseInt(priceUGX) || 65000000,
      amountUSD: Math.round((parseInt(priceUGX) || 65000000) / 3700),
      status: 'pending_review',
      currentStep: 2,
      date: '23 September 2026',
      timeline: {
        buyerVerified: true,
        sellerVerified: true,
        propertyVerified: false,
        saleAgreementUploaded: uploadedTitle,
        transferInProgress: false,
        registrationPending: false,
        escrowHeld: false,
        completed: false,
      },
      advocateAssigned: 'Advocate Florence Namubiru',
      escrowRef: `SB-ESC-2026-${Math.floor(10 + Math.random() * 89)}`,
    };

    onCreated(newTx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0b1e36] text-white flex items-center justify-between border-b border-blue-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400">
                Step {step} of {totalSteps}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white mt-0.5">
              Start New Land Transaction
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar 1 ━ 2 ━ 3 ━ 4 ━ 5 ━ 6 ━ 7 */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {stepsList.map((s, idx) => {
              const isPast = s.num < step;
              const isCurrent = s.num === step;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isPast
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-[#0b1e36] text-amber-300 ring-2 ring-amber-400 shadow-sm'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                    </div>
                    <span
                      className={`text-[9px] font-mono tracking-tight mt-1 hidden sm:inline ${
                        isCurrent ? 'font-bold text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {s.label.split(' ')[0]}
                    </span>
                  </div>
                  {idx < stepsList.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 sm:mx-2 transition-all ${
                        s.num < step ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Wizard Form Body */}
        <div className="p-6 space-y-4 min-h-[300px]">
          {/* Step 1: Property Details */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[#0b1e36] uppercase tracking-wide">
                  Step 1: Property Identification
                </h3>
                <p className="text-xs text-slate-500">
                  Enter the cadastral description of the land parcel to initiate registry checks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Block No.</label>
                  <input
                    type="text"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Plot No.</label>
                  <input
                    type="text"
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Village / Parish</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Tenure Type</label>
                  <select
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value as LandTenure)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Mailo">Mailo</option>
                    <option value="Freehold">Freehold</option>
                    <option value="Leasehold">Leasehold</option>
                    <option value="Customary">Customary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Approximate Size</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Agreed Price (UGX)</label>
                <input
                  type="text"
                  value={priceUGX}
                  onChange={(e) => setPriceUGX(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold text-slate-900 border border-slate-300 rounded-xl"
                  placeholder="e.g. 65000000"
                />
              </div>
            </div>
          )}

          {/* Step 2: Seller Details */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[#0b1e36] uppercase tracking-wide">
                  Step 2: Seller Identification & Authority
                </h3>
                <p className="text-xs text-slate-500">
                  Verify the party selling the land to ensure identity matches the white page registry deed.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Seller Full Name</label>
                  <input
                    type="text"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">National ID (NIN)</label>
                  <input
                    type="text"
                    value={sellerNIN}
                    onChange={(e) => setSellerNIN(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Seller Phone / WhatsApp</label>
                <input
                  type="text"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-900">Spousal / Family Consent Required?</p>
                  <p className="text-[11px] text-amber-700">Under the Land Act, family land requires signed spousal consent.</p>
                </div>
                <input
                  type="checkbox"
                  checked={hasSpousalConsent}
                  onChange={(e) => setHasSpousalConsent(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Step 3: Buyer Details */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[#0b1e36] uppercase tracking-wide">
                  Step 3: Buyer Information
                </h3>
                <p className="text-xs text-slate-500">
                  Details for the purchaser who will receive the registered certificate of title.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Buyer Full Name</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">Buyer Contact</label>
                  <input
                    type="text"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-blue-900">Diaspora Land Buyer?</p>
                  <p className="text-[11px] text-blue-700">Enables cross-border bank escrow routing and digital advocate oversight.</p>
                </div>
                <input
                  type="checkbox"
                  checked={isDiaspora}
                  onChange={(e) => setIsDiaspora(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[#0b1e36] uppercase tracking-wide">
                  Step 4: Upload Transaction Documents
                </h3>
                <p className="text-xs text-slate-500">
                  Upload copies of the deed, search certificate, and identity papers for legal audit.
                </p>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Duplicate Certificate of Title Copy</p>
                      <p className="text-[10px] text-slate-500">Front cover, cadastral deed plan, and memorials</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={uploadedTitle}
                    onChange={(e) => setUploadedTitle(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Official Ministry Search Certificate</p>
                      <p className="text-[10px] text-slate-500">Issued by the relevant Ministerial Zonal Office (MZO)</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={uploadedSearch}
                    onChange={(e) => setUploadedSearch(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-emerald-700" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Spousal Consent & National ID</p>
                      <p className="text-[10px] text-slate-500">Notarized statutory declaration of consent</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={uploadedSpousal}
                    onChange={(e) => setUploadedSpousal(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Verification */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[#0b1e36] uppercase tracking-wide">
                  Step 5: Statutory Verification Parameters
                </h3>
                <p className="text-xs text-slate-500">
                  Clear Title Uganda initiates multi-tier verification before any money is paid.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2.5 text-xs text-blue-950">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>National Land Information System (NLIS) White Page cross-check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>High Court Caveat and pending succession dispute scan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Physical boundary beacon opening with registered surveyor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bibanja / third-party occupant occupancy reconnaissance</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                * An independent advocate and surveyor review board verifies these conditions prior to escrow disbursement.
              </p>
            </div>
          )}

          {/* Step 6: Secure Payment */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[#0b1e36] uppercase tracking-wide">
                  Step 6: Custodial Escrow Agreement
                </h3>
                <p className="text-xs text-slate-500">
                  Buyer funds are locked in a regulated custodial trust account until all title conditions are fulfilled.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                  <Lock className="w-4 h-4 text-emerald-700" />
                  <span>Regulated Partner: Stanbic Bank Uganda Escrow Custody</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Total Custodial Amount:{' '}
                  <strong className="font-mono text-sm text-emerald-950">
                    UGX {parseInt(priceUGX).toLocaleString()}
                  </strong>
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <label className="block text-[10px] font-mono uppercase text-slate-500">Release Milestone 1</label>
                <input
                  type="text"
                  value={milestone1Release}
                  onChange={(e) => setMilestone1Release(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
                <label className="block text-[10px] font-mono uppercase text-slate-500">Release Milestone 2</label>
                <input
                  type="text"
                  value={milestone2Release}
                  onChange={(e) => setMilestone2Release(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Step 7: Transfer & Completion */}
          {step === 7 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[#0b1e36] uppercase tracking-wide">
                  Step 7: Transfer & Registration Execution
                </h3>
                <p className="text-xs text-slate-500">
                  Review the complete transaction summary and initiate statutory escrow protection.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Property:</span>
                  <span className="font-bold text-slate-900">Plot {plot}, Block {block}, {village}, {district}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Seller:</span>
                  <span className="font-bold text-slate-900">{sellerName} ({sellerNIN})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Buyer:</span>
                  <span className="font-bold text-slate-900">{buyerName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Total Purchase:</span>
                  <span className="font-mono font-bold text-blue-900">UGX {parseInt(priceUGX).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Custodial Escrow:</span>
                  <span className="font-semibold text-emerald-800">Stanbic Bank Uganda Protected</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {step < totalSteps ? (
            <button
              onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
              className="px-5 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Launch Transaction & Escrow</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
