import React, { useState } from 'react';
import { X, Smartphone, Mail, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userRole: UserRole, userType: 'local' | 'diaspora') => void;
  currentRole: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentRole,
}) => {
  const [authMode, setAuthMode] = useState<'local' | 'diaspora'>('diaspora');
  const [localPhone, setLocalPhone] = useState('0772 123456');
  const [network, setNetwork] = useState<'MTN' | 'Airtel'>('MTN');
  const [diasporaEmail, setDiasporaEmail] = useState('babiryezula10@gmail.com');
  const [diasporaPhone, setDiasporaPhone] = useState('+44 7911 123456');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('8492');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpStep) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setOtpStep(true);
      }, 500);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(authMode === 'diaspora' ? 'diaspora_buyer' : 'local_owner', authMode);
        onClose();
        setOtpStep(false);
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0b1e36] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Clear Title Uganda</h3>
              <p className="text-[11px] text-blue-200">Verified Identity & Secure Account Access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1 rounded-lg hover:bg-blue-900/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch between Local & Diaspora */}
        <div className="p-5">
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-5">
            <button
              type="button"
              onClick={() => {
                setAuthMode('local');
                setOtpStep(false);
              }}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
                authMode === 'local'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-700" />
              <span>Local User (Uganda)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('diaspora');
                setOtpStep(false);
              }}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
                authMode === 'diaspora'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-blue-700" />
              <span>Diaspora User</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'local' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Mobile Money Network
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNetwork('MTN')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${
                        network === 'MTN'
                          ? 'border-blue-700 bg-blue-50 text-blue-900 font-extrabold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      MTN Mobile Money
                    </button>
                    <button
                      type="button"
                      onClick={() => setNetwork('Airtel')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${
                        network === 'Airtel'
                          ? 'border-blue-700 bg-blue-50 text-blue-900 font-extrabold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      Airtel Money Uganda
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Ugandan Phone Number
                  </label>
                  <div className="flex rounded-lg border border-slate-300 overflow-hidden focus-within:border-blue-700">
                    <span className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 border-r border-slate-300 flex items-center">
                      +256
                    </span>
                    <input
                      type="tel"
                      required
                      value={localPhone}
                      onChange={(e) => setLocalPhone(e.target.value)}
                      placeholder="0772 000 000"
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Direct identity verification via telecom-linked National ID.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={diasporaEmail}
                    onChange={(e) => setDiasporaEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    International Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={diasporaPhone}
                    onChange={(e) => setDiasporaPhone(e.target.value)}
                    placeholder="+44 7911 123456 or +1 415 555 2671"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-700"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Receive WhatsApp & SMS deal notifications and escrow triggers.
                  </p>
                </div>
              </>
            )}

            {otpStep && (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 animate-in fade-in">
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Enter 4-Digit Verification Code
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-32 text-center tracking-widest text-lg font-black bg-white border border-blue-300 rounded-lg py-1.5 text-blue-900 focus:outline-none"
                  />
                  <span className="text-[11px] text-blue-800">
                    Auto-filled verification code for instant demo.
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Securing Connection...</span>
              ) : otpStep ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Enter Workspace</span>
                </>
              ) : (
                <>
                  <span>Send One-Time Passcode (OTP)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Stanbic Bank Escrow Guarded</span>
            <span>256-bit Title Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};
