import React, { useState } from 'react';
import {
  Compass,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Camera,
  MapPin,
  Save,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { PropertyRecord, VerificationStage, PropertyStatus, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface AgentPortalProps {
  properties: PropertyRecord[];
  onUpdateProperty: (updated: PropertyRecord) => void;
  language?: LanguageCode;
}

export const AgentPortal: React.FC<AgentPortalProps> = ({
  properties,
  onUpdateProperty,
  language = 'en',
}) => {
  const t = translations[language] || translations.en;
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    properties[0]?.id || ''
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const selectedProperty =
    properties.find((p) => p.id === selectedPropertyId) || properties[0];

  // Editable fields
  const [stage, setStage] = useState<VerificationStage>(
    selectedProperty?.stage || 'inquiry'
  );
  const [status, setStatus] = useState<PropertyStatus>(
    selectedProperty?.status || 'pending'
  );
  const [score, setScore] = useState<number>(
    selectedProperty?.currentRiskScore || 70
  );
  const [surveyNotes, setSurveyNotes] = useState(
    'Conducted physical inspection with geodetic GNSS receiver. Verified 4 concrete boundary beacons along boundary hedge.'
  );

  const handleSelectCase = (p: PropertyRecord) => {
    setSelectedPropertyId(p.id);
    setStage(p.stage);
    setStatus(p.status);
    setScore(p.currentRiskScore || 70);
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      const updated: PropertyRecord = {
        ...selectedProperty,
        stage,
        status,
        currentRiskScore: score,
        riskReport: selectedProperty.riskReport
          ? {
              ...selectedProperty.riskReport,
              overallScore: score,
              rating: status,
              summarySentence: surveyNotes,
            }
          : undefined,
      };
      onUpdateProperty(updated);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {t.fieldSurveyorNotes}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1e36]">
            {t.agentPortalTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cadastral beacon uncovery, White-Page registry checks, and certified risk scoring.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-900 text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Surv. David Byaruhanga (#UG-382)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Case Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            {t.myPropertiesTitle} ({properties.length})
          </h2>

          <div className="space-y-2.5">
            {properties.map((p) => {
              const isSelected = p.id === selectedProperty?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectCase(p)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition text-xs ${
                    isSelected
                      ? 'border-blue-700 bg-blue-50/80 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{p.parcelId}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        p.status === 'clear'
                          ? 'bg-blue-100 text-blue-900'
                          : p.status === 'pending'
                          ? 'bg-slate-100 text-slate-800'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      {p.status === 'clear'
                        ? t.statusClear
                        : p.status === 'pending'
                        ? t.statusPending
                        : t.statusFlagged}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {p.district} • {p.tenureType}
                  </p>
                  <p className="text-[10px] text-blue-700 font-semibold mt-1">
                    {t.stageWorkflow}: {p.stage.replace('_', ' ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Case Editor & Inspection Controls (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Auditing: {selectedProperty?.parcelId}
              </h2>
              <p className="text-xs text-slate-500">
                {t.titleRefNumber}: {selectedProperty?.titleRef} • {t.registeredOwner}: {selectedProperty?.registeredOwners[0]}
              </p>
            </div>

            {saveSuccess && (
              <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Updated &amp; Certified
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.stageWorkflow}
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                >
                  <option value="inquiry">1. {t.stageInquiry}</option>
                  <option value="document_check">2. {t.stageDocCheck}</option>
                  <option value="physical_inspection">3. {t.stagePhysicalInspection}</option>
                  <option value="risk_score_issued">4. {t.stageRiskScore}</option>
                  <option value="escrow_active">5. {t.stageEscrow}</option>
                  <option value="registration_confirmed">6. {t.stageRegConfirmed}</option>
                  <option value="completed">7. {t.stageCompleted}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.status}
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                >
                  <option value="pending">{t.statusPending}</option>
                  <option value="clear">{t.statusClear}</option>
                  <option value="flagged">{t.statusFlagged}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.dealRiskScore} (0–100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(parseInt(e.target.value, 10) || 50)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-blue-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.fieldSurveyorNotes}
              </label>
              <textarea
                rows={4}
                value={surveyNotes}
                onChange={(e) => setSurveyNotes(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Updating...' : t.saveChanges}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
