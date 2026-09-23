import React, { useState } from 'react';
import {
  BookOpen,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  FileText,
  UserCheck,
  Scale,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';

interface LearnCentreViewProps {
  onStartVerification?: () => void;
  onContactAdvocate?: () => void;
}

export const LearnCentreView: React.FC<LearnCentreViewProps> = ({
  onStartVerification,
  onContactAdvocate,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'red_flags'>('guide');
  const [expandedArticle, setExpandedArticle] = useState<string | null>('verify_land');

  const redFlagsList = [
    {
      id: 'rf-1',
      title: 'Seller refuses verification',
      desc: 'The seller or broker refuses to provide plot, block, or volume/folio numbers for independent Ministry checks.',
      risk: 'Critical Red Flag',
      advice: 'Never make any down-payment if a seller insists on physical inspection without allowing deed registry searches.',
    },
    {
      id: 'rf-2',
      title: "Seller's identity does not match ownership records",
      desc: 'The name on the national ID (NIN) differs from the registered proprietor on the official White Page.',
      risk: 'High Fraud Risk',
      advice: 'Demand Letters of Administration or registered Power of Attorney notarized by the High Court of Uganda.',
    },
    {
      id: 'rf-3',
      title: 'Pressure to pay immediately',
      desc: 'Urgent pressure claiming "another buyer with cash is waiting" to force hasty wire transfers or cash handovers.',
      risk: 'Classic Scam Tactic',
      advice: 'Authentic land transactions require at least 5 business days for search certificates and boundary surveys.',
    },
    {
      id: 'rf-4',
      title: 'Suspicious or inconsistent documents',
      desc: 'Photocopied titles without official watermark seals, missing mutation forms, or unclear registrar stamps.',
      risk: 'Deed Forgery Risk',
      advice: 'Only rely on official searches printed directly from the Ministry of Lands Zonal Office (MZO) system.',
    },
    {
      id: 'rf-5',
      title: 'Different people claim ownership',
      desc: 'Conflicting bibanja tenant claims, family squabbles, or neighbors disputing the physical boundary fence.',
      risk: 'Tenure & Boundary Conflict',
      advice: 'Conduct on-ground LC1 consultation and beacon opening before signing any memorandum of understanding.',
    },
    {
      id: 'rf-6',
      title: 'Seller refuses professional/legal verification',
      desc: 'Seller insists on using their private informal agreement and objects to your enrolled advocate or licensed surveyor.',
      risk: 'Legal Vulnerability',
      advice: 'The Registration of Titles Act requires properly witnessed transfer deeds. Never bypass independent legal counsel.',
    },
    {
      id: 'rf-7',
      title: 'Unexplained changes to payment instructions',
      desc: 'Sudden requests to send money via mobile money, cash in an envelope, or a personal bank account instead of escrow.',
      risk: 'Financial Interception',
      advice: 'Always route purchase funds through a regulated custodial bank escrow arrangement (e.g. Stanbic Escrow Trust).',
    },
  ];

  const guideArticles = [
    {
      id: 'verify_land',
      title: '1. How to Verify Land in Uganda',
      summary: 'A step-by-step statutory process under the Registration of Titles Act (Cap 230).',
      content: `1. Obtain Exact Parcel Details: Request the District, County, Block, and Plot Number.
2. Conduct an Official Search: Submit a search application at the relevant Ministry Zonal Office (MZO) or through the National Land Information System (NLIS).
3. Check the White Page: Verify the original volume and folio registered in the government repository, not just the owner's duplicate copy.
4. Physical Boundary Opening: Commission a registered surveyor under the Survey Act (Cap 232) to locate the corner beacons and verify the actual acreage against the deed plan.
5. Community Inquiries: Speak with the local LC1 chairperson and adjacent neighbors to confirm uninterrupted occupancy.`,
    },
    {
      id: 'before_paying',
      title: '2. What to Check Before Paying Any Money',
      summary: 'Essential checkpoints before any deposit or escrow funding.',
      content: `• Search Certificate Validity: Ensure the official search is dated within the last 14 days.
• Spousal Consent: Under Section 39 of the Land Act, if the property is family land, the spouse must sign a notarized consent affidavit.
• Absence of Caveats: Confirm no pending mortgages, High Court civil suits, or claims by heirs are registered on the memorials page.
• Tax Clearance: Confirm property rates or ground rent (Busuulu for Mailo land) are up to date.
• Regulated Escrow: Ensure purchase funds are held in a bank custodial account rather than directly given to the seller.`,
    },
    {
      id: 'fraud_methods',
      title: '3. Common Land Fraud Methods in Uganda',
      summary: 'Understand the schemes fraudsters use in urban and peri-urban areas.',
      content: `• Double Titling: Printing duplicate deeds on the same parcel of land, often facilitated by corrupt clerks.
• Fake Letters of Administration: Presenting forged High Court probate orders claiming to represent a deceased proprietor's estate.
• Unsettled Bibanja Claims: Selling Mailo land without disclosing lawful or bona fide occupants (kibanja owners) who have statutory protection against eviction.
• Boundary Manipulation: Tampering with survey beacons to artificially inflate plot dimensions into road reserves or wetlands.`,
    },
    {
      id: 'land_tenure',
      title: '4. Understanding Ugandan Land Tenure Systems',
      summary: 'Mailo, Freehold, Leasehold, and Customary land laws under Article 237 of the 1995 Constitution.',
      content: `• Mailo Land: Unique to central Uganda (Buganda). Has perpetual ownership, but often involves dual rights between the registered title holder and lawful kibanja occupants.
• Freehold: Absolute ownership in perpetuity without landlord-tenant splits. Most common in western and parts of eastern Uganda.
• Leasehold: Ownership granted by a landlord (e.g. KCCA, Uganda Land Commission, or private owner) for a fixed duration (commonly 49 or 99 years) subject to ground rent.
• Customary: Governed by indigenous traditions and communal rules, prevalent in northern and north-eastern Uganda. Can be converted to Freehold.`,
    },
    {
      id: 'caveats_mortgages',
      title: '5. Understanding Caveats and Mortgages',
      summary: 'How legal encumbrances protect interests or freeze land transfers.',
      content: `A caveat is a formal statutory notice lodged with the Registrar of Titles warning the world that a third party claims an interest in the land. Once a caveat is active:
• The Registrar cannot register any transfer or new deed.
• Caveats can only be removed by court order, statutory lapse, or voluntary withdrawal by the caveator.
• Never proceed with a purchase assuming a caveat "will be sorted out later".`,
    },
    {
      id: 'advocate_role',
      title: '6. Why You Should Always Use an Enrolled Advocate',
      summary: 'The legal safeguard of professional legal counsel in Uganda.',
      content: `Under Ugandan law, only an advocate with a valid practicing certificate issued by the Law Council can legally draft conveyancing documents and conduct due diligence.
Your advocate will:
1. Conduct the official search and verify file folios.
2. Draft and witness a binding Sale Agreement with appropriate warranties.
3. Manage the transfer forms and stamp duty assessment at URA.
4. Ensure seller warranties are enforceable in the High Court if defects arise.`,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 select-none relative z-10 text-slate-900">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1e36] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-blue-900/60 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Public Education & Fraud Sentinel
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-serif">
            Learn Before You Buy
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
            Empowering Ugandan and diaspora property buyers with statutory knowledge and practical due diligence guidance.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl self-start sm:self-auto border border-white/10">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Buyer's Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('red_flags')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'red_flags'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Know the Red Flags</span>
          </button>
        </div>
      </div>

      {/* Mandatory Statutory Notice (Section 10) */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-bold">Important Notice:</strong> This information is educational and does not replace professional legal advice. Always engage an enrolled advocate and a registered surveyor before executing binding agreements.
        </p>
      </div>

      {/* Section 11: Know the Red Flags View */}
      {activeTab === 'red_flags' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-600 font-bold">
              Fraud Detection Radar
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0b1e36]">
              Know the Red Flags: 7 Major Warning Signs
            </h2>
            <p className="text-xs text-slate-600">
              If any of these conditions occur during your transaction, halt payments immediately until verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {redFlagsList.map((rf, idx) => (
              <div
                key={rf.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition space-y-2.5 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚩</span>
                    <span className="text-xs font-mono font-bold text-red-700 uppercase px-2 py-0.5 rounded-md bg-red-50 border border-red-200">
                      {rf.risk}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">0{idx + 1}</span>
                </div>

                <h3 className="text-sm font-black text-slate-900 leading-snug">
                  {rf.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {rf.desc}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                  <strong className="text-blue-900">Recommended Action: </strong>
                  {rf.advice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 10: Buyer's Guide View */}
      {activeTab === 'guide' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-700 font-bold">
              Statutory Knowledge Base
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0b1e36]">
              Before Buying Land: Comprehensive Guide
            </h2>
            <p className="text-xs text-slate-600">
              Practical due diligence procedures tailored to Uganda's land market reality.
            </p>
          </div>

          <div className="space-y-3">
            {guideArticles.map((art) => {
              const isExpanded = expandedArticle === art.id;
              return (
                <div
                  key={art.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setExpandedArticle(isExpanded ? null : art.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-[#0b1e36]">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {art.summary}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 ml-3">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-700 leading-relaxed border-t border-slate-100 whitespace-pre-line bg-slate-50/50">
                      {art.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
