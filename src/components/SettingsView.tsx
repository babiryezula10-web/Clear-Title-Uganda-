import React, { useState } from 'react';
import {
  Globe,
  User,
  Shield,
  Bell,
  Smartphone,
  CheckCircle2,
  Lock,
  Save,
} from 'lucide-react';
import { LanguageCode, UserProfile, UserRole } from '../types';
import { languageNames, translations } from '../data/translations';

interface SettingsViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  language,
  onSelectLanguage,
  currentRole,
  onRoleChange,
}) => {
  const t = translations[language] || translations.en;
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [location, setLocation] = useState(userProfile.location);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(userProfile.twoFactorEnabled);
  const [smsNotif, setSmsNotif] = useState(userProfile.notifications.sms);
  const [whatsappNotif, setWhatsappNotif] = useState(userProfile.notifications.whatsapp);
  const [emailNotif, setEmailNotif] = useState(userProfile.notifications.email);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name,
      email,
      phone,
      location,
      twoFactorEnabled,
      preferredLanguage: language,
      notifications: {
        sms: smsNotif,
        whatsapp: whatsappNotif,
        email: emailNotif,
      },
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-blue-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0b1e36]">
            {t.navSettings} & Account Security
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your language preferences, contact details, role, and escrow security notifications.
          </p>
        </div>

        {saveSuccess && (
          <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg flex items-center gap-1 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Saved Successfully
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Language Selection */}
        <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Preferred Language (7 Languages Supported)
            </h2>
          </div>
          <p className="text-[11px] text-slate-500">
            Select your language for all land titles, escrow updates, and legal advisor interactions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {(Object.keys(languageNames) as LanguageCode[]).map((code) => {
              const isSelected = language === code;
              return (
                <button
                  type="button"
                  key={code}
                  onClick={() => onSelectLanguage(code)}
                  className={`p-3 rounded-xl border text-left transition ${
                    isSelected
                      ? 'border-blue-700 bg-blue-50 text-blue-950 font-bold shadow-xs'
                      : 'border-slate-200 bg-white hover:border-blue-300 text-slate-700'
                  }`}
                >
                  <p className="text-xs">{languageNames[code].nativeName}</p>
                  <p className="text-[10px] text-slate-400 font-normal">
                    {languageNames[code].label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Role Switcher */}
        <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">Workspace Role</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                id: 'diaspora_buyer',
                title: 'Diaspora Buyer',
                desc: 'Buying remotely from UK, USA, UAE, Kenya',
              },
              {
                id: 'local_owner',
                title: 'Local Land Owner',
                desc: 'Monitoring land in Uganda with Mobile Money',
              },
              {
                id: 'verification_agent',
                title: 'Verification Agent',
                desc: 'Field surveyor & legal audit officer',
              },
            ].map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => onRoleChange(r.id as any)}
                className={`p-3 rounded-xl border text-left transition ${
                  currentRole === r.id
                    ? 'border-blue-700 bg-blue-50 text-blue-950 font-bold shadow-xs'
                    : 'border-slate-200 bg-white hover:border-blue-300 text-slate-700'
                }`}
              >
                <p className="text-xs">{r.title}</p>
                <p className="text-[10px] text-slate-500 font-normal mt-0.5">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">User Contact Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number(s)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Security & 2FA */}
        <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">Security & 2-Factor Authentication</h2>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <div>
              <p className="font-bold text-slate-900 text-xs">
                Two-Factor Escrow Authorization (2FA)
              </p>
              <p className="text-[11px] text-slate-500">
                Requires OTP code confirmation before executing any escrow disbursements.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                twoFactorEnabled
                  ? 'bg-blue-800 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-2 active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
