import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Scale,
  BookOpen,
  AlertOctagon,
  HelpCircle,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisor: () => void;
  onOpenLearn: () => void;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({
  isOpen,
  onClose,
  onOpenAdvisor,
  onOpenLearn,
}) => {
  const [activeSection, setActiveSection] = useState<'main' | 'report_fraud' | 'faq'>('main');
  const [fraudSubmitted, setFraudSubmitted] = useState(false);
  const [fraudPlot, setFraudPlot] = useState('');
  const [fraudDetails, setFraudDetails] = useState('');

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How does the bank escrow arrangement protect my money?',
      a: 'Your purchase capital is deposited into a regulated custodial trust account (Stanbic Bank Uganda). The seller cannot withdraw the funds until all conditions (White Page search, physical boundary opening, and deed registration) are officially certified.',
    },
    {
      q: 'What is the difference between Mailo and Freehold land?',
      a: 'Mailo land (predominant in central Uganda) involves registered land ownership where lawful occupants (bibanja) have constitutionally protected tenancy rights. Freehold confers absolute ownership without dual-occupancy divisions.',
    },
    {
      q: 'Can a seller sell land without spousal consent?',
      a: 'No. Under Section 39 of the Land Act, if the property is considered matrimonial home or family sustenance land, a transfer executed without written spousal consent is legally void.',
    },
    {
      q: 'How long does an official land verification search take?',
      a: 'Digital NLIS checks take 24–48 hours, while physical boundary opening with beacon verification typically takes 2–4 business days depending on location.',
    },
  ];

  const handleReportFraud = (e: React.FormEvent) => {
    e.preventDefault();
    setFraudSubmitted(true);
    setTimeout(() => {
      setFraudSubmitted(false);
      setActiveSection('main');
      setFraudPlot('');
      setFraudDetails('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-6 animate-in zoom-in-95 duration-200 text-slate-900">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0b1e36] text-white flex items-center justify-between border-b border-blue-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-amber-400">
                Support & Assistance
              </p>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                Need Help?
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {activeSection === 'main' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 mb-2">
                Choose an assistance option below to speak with legal professionals, report suspicious activity, or review common questions:
              </p>

              {/* 💬 Contact Support */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Contact Support</h3>
                    <p className="text-xs text-slate-500">Live chat desk & WhatsApp verification assistance</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <span>+256 700 123456</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* ⚖️ Speak to a Professional */}
              <div
                onClick={() => {
                  onClose();
                  onOpenAdvisor();
                }}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Speak to a Professional</h3>
                    <p className="text-xs text-slate-500">Connect with participating enrolled advocates & licensed surveyors</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
              </div>

              {/* 📚 Help Centre */}
              <div
                onClick={() => {
                  onClose();
                  onOpenLearn();
                }}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Help Centre & Red Flags</h3>
                    <p className="text-xs text-slate-500">Educational articles, common scam tactics, and tenure guides</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
              </div>

              {/* 🚨 Report Suspected Fraud */}
              <div
                onClick={() => setActiveSection('report_fraud')}
                className="p-4 rounded-2xl border border-red-200 bg-red-50/70 hover:bg-red-50 transition flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-red-950">Report Suspected Fraud</h3>
                    <p className="text-xs text-red-700">Flag double-titling, unrecorded caveats, or fake documents immediately</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition" />
              </div>

              {/* ❓ Frequently Asked Questions */}
              <div
                onClick={() => setActiveSection('faq')}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Frequently Asked Questions</h3>
                    <p className="text-xs text-slate-500">Answers to escrow, deed search, and legal protection inquiries</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
              </div>
            </div>
          )}

          {/* Report Fraud Sub-View */}
          {activeSection === 'report_fraud' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                  <AlertOctagon className="w-4 h-4" />
                  <span>Report Suspected Land Fraud</span>
                </div>
                <button
                  onClick={() => setActiveSection('main')}
                  className="text-xs text-blue-700 hover:underline font-bold"
                >
                  Back to Help Menu
                </button>
              </div>

              {fraudSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-950">Fraud Report Submitted Successfully</h4>
                  <p className="text-xs text-emerald-800">
                    Your confidential alert has been logged for review by our registry audit counsel.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportFraud} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                      Plot / Block or Location
                    </label>
                    <input
                      type="text"
                      required
                      value={fraudPlot}
                      onChange={(e) => setFraudPlot(e.target.value)}
                      placeholder="e.g. Busiro Block 102 Plot 45, Wakiso"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                      Details of Suspicious Activity
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={fraudDetails}
                      onChange={(e) => setFraudDetails(e.target.value)}
                      placeholder="Describe what occurred (e.g. seller refused search certificate, competing title deed appeared, fake letters of administration)..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Submit Confidential Fraud Alert
                  </button>
                </form>
              )}
            </div>
          )}

          {/* FAQ Sub-View */}
          {activeSection === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-sm text-[#0b1e36]">
                  Frequently Asked Questions
                </h3>
                <button
                  onClick={() => setActiveSection('main')}
                  className="text-xs text-blue-700 hover:underline font-bold"
                >
                  Back to Help Menu
                </button>
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="text-xs font-bold text-slate-900">{faq.q}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
