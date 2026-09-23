import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Building,
  FileText,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { PropertyRecord, LandTransaction } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: PropertyRecord[];
  transactions: LandTransaction[];
  onSelectProperty: (property: PropertyRecord) => void;
  onSelectTransaction: (tx: LandTransaction) => void;
  onOpenReport: (property: PropertyRecord) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  properties,
  transactions,
  onSelectProperty,
  onSelectTransaction,
  onOpenReport,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { properties: properties.slice(0, 3), transactions: transactions.slice(0, 3) };

    const matchingProps = properties.filter(
      (p) =>
        p.parcelId.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.titleRef.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.sellerName.toLowerCase().includes(q)
    );

    const matchingTxs = transactions.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.propertyTitle.toLowerCase().includes(q) ||
        t.buyerName.toLowerCase().includes(q) ||
        t.sellerName.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q)
    );

    return { properties: matchingProps, transactions: matchingTxs };
  }, [query, properties, transactions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 backdrop-blur-xs p-4 pt-16 sm:pt-24 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search property, transaction or reference number..."
            className="w-full text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-5">
          {/* Transactions Match */}
          {filtered.transactions.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Transactions ({filtered.transactions.length})
              </span>
              <div className="space-y-2">
                {filtered.transactions.map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => {
                      onSelectTransaction(tx);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:bg-blue-50/50 hover:border-blue-300 transition flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-900">{tx.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                            {tx.status}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-900">{tx.propertyTitle} • {tx.location}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Properties Match */}
          {filtered.properties.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Properties & Verification Reports ({filtered.properties.length})
              </span>
              <div className="space-y-2">
                {filtered.properties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => {
                      onOpenReport(prop);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:bg-emerald-50/50 hover:border-emerald-300 transition flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{prop.parcelId}</span>
                          <span className="text-[10px] font-mono text-slate-500">{prop.titleRef}</span>
                        </div>
                        <p className="text-xs text-slate-600">{prop.village}, {prop.district} • {prop.tenureType}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-800 flex items-center gap-1">
                      <span>View Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filtered.transactions.length === 0 && filtered.properties.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching properties, transactions, or reference numbers found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
