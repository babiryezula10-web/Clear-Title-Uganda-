import React, { useState } from 'react';
import {
  Bell,
  ShieldCheck,
  Smartphone,
  Mail,
  MessageSquare,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Trash2,
  Clock,
  Radio,
} from 'lucide-react';
import { LandAlert, PropertyRecord, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface LandAlertsViewProps {
  alerts: LandAlert[];
  properties: PropertyRecord[];
  onAddAlertSubscription: (parcelTitle: string, district: string) => void;
  onClearAlert: (alertId: string) => void;
  language?: LanguageCode;
}

export const LandAlertsView: React.FC<LandAlertsViewProps> = ({
  alerts,
  properties,
  onAddAlertSubscription,
  onClearAlert,
  language = 'en',
}) => {
  const t = translations[language] || translations.en;
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  // New parcel enrollment state
  const [newDistrict, setNewDistrict] = useState('Wakiso');
  const [newParcel, setNewParcel] = useState('Plot 15, Block 84, Entebbe Road');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEnrollTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParcel.trim()) return;
    onAddAlertSubscription(newParcel, newDistrict);
    setNewParcel('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {t.sentinelTitle}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1e36]">
            {t.alertsTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.alertsSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.monitorNewTitleBtn}</span>
        </button>
      </div>

      {/* Notification Channel Toggles */}
      <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          {t.notificationChannelsTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* SMS */}
          <div
            onClick={() => setSmsEnabled(!smsEnabled)}
            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              smsEnabled
                ? 'bg-blue-50/70 border-blue-300 text-blue-950'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Smartphone className={`w-4 h-4 ${smsEnabled ? 'text-blue-700' : 'text-slate-400'}`} />
              <div>
                <p className="text-xs font-bold">{t.smsAlertTitle}</p>
                <p className="text-[10px] text-slate-500">+256 / Diaspora</p>
              </div>
            </div>
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                smsEnabled ? 'bg-blue-800 text-white' : 'bg-slate-300'
              }`}
            >
              {smsEnabled && '✓'}
            </span>
          </div>

          {/* WhatsApp */}
          <div
            onClick={() => setWhatsappEnabled(!whatsappEnabled)}
            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              whatsappEnabled
                ? 'bg-blue-50/70 border-blue-300 text-blue-950'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className={`w-4 h-4 ${whatsappEnabled ? 'text-blue-700' : 'text-slate-400'}`} />
              <div>
                <p className="text-xs font-bold">{t.whatsappAlertTitle}</p>
                <p className="text-[10px] text-slate-500">Instant PDF &amp; Stamp</p>
              </div>
            </div>
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                whatsappEnabled ? 'bg-blue-800 text-white' : 'bg-slate-300'
              }`}
            >
              {whatsappEnabled && '✓'}
            </span>
          </div>

          {/* Email */}
          <div
            onClick={() => setEmailEnabled(!emailEnabled)}
            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              emailEnabled
                ? 'bg-blue-50/70 border-blue-300 text-blue-950'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className={`w-4 h-4 ${emailEnabled ? 'text-blue-700' : 'text-slate-400'}`} />
              <div>
                <p className="text-xs font-bold">{t.emailAlertTitle}</p>
                <p className="text-[10px] text-slate-500">Legal Audit Digest</p>
              </div>
            </div>
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                emailEnabled ? 'bg-blue-800 text-white' : 'bg-slate-300'
              }`}
            >
              {emailEnabled && '✓'}
            </span>
          </div>
        </div>
      </div>

      {/* Monitored Properties Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            {t.monitoredTitlesTitle}
          </h2>
          <span className="text-xs font-semibold text-blue-700">
            {properties.filter((p) => p.monitoredForAlerts).length} {t.monitoredTitlesTitle}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {properties
            .filter((p) => p.monitoredForAlerts)
            .map((prop) => (
              <div
                key={prop.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                    <span className="text-xs font-bold text-slate-900">
                      {prop.parcelId}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({t.titleRefNumber}: {prop.titleRef})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-4 mt-0.5">
                    {prop.district} • {prop.tenureType} • {t.registeredOwner}: {prop.registeredOwners[0]}
                  </p>
                </div>

                <div className="flex items-center gap-2 pl-4 sm:pl-0">
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-700" />
                    <span>{t.statusClear}</span>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Live Alerts Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            {t.activityFeedTitle}
          </h2>
          <span className="text-xs text-slate-400">
            {alerts.length} Records
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => {
            const isCritical = alert.severity === 'high';
            const isWarning = alert.severity === 'medium';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                  isCritical
                    ? 'bg-red-50/70 border-red-200 text-red-950'
                    : isWarning
                    ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                    : 'bg-slate-50/80 border-slate-100 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isCritical
                        ? 'bg-red-600 text-white'
                        : isWarning
                        ? 'bg-amber-600 text-white'
                        : 'bg-blue-800 text-white'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{alert.parcelTitle}</span>
                      <span className="text-[10px] opacity-70">({alert.district})</span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed">{alert.message}</p>
                    <p className="text-[10px] opacity-60 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => onClearAlert(alert.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition"
                    title={t.dismissAlert}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Subscription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-100 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {t.monitorNewTitleBtn}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEnrollTitle} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.district}
                </label>
                <select
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="Wakiso">Wakiso District</option>
                  <option value="Kampala">Kampala District</option>
                  <option value="Mukono">Mukono District</option>
                  <option value="Mpigi">Mpigi District</option>
                  <option value="Jinja">Jinja District</option>
                  <option value="Gulu">Gulu District</option>
                  <option value="Mbarara">Mbarara District</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.titleRefNumber}
                </label>
                <input
                  type="text"
                  required
                  value={newParcel}
                  onChange={(e) => setNewParcel(e.target.value)}
                  placeholder="e.g. Plot 45, Block 102, Wakiso"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs"
                >
                  {t.monitorNewTitleBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
