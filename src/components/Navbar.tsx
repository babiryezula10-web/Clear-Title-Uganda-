import React, { useState } from 'react';
import {
  ShieldCheck,
  Globe,
  Menu,
  X,
  FileCheck,
  Lock,
  Bell,
  Award,
  MessageSquare,
  ChevronDown,
  User,
  Plus,
  WifiOff,
} from 'lucide-react';
import { LanguageCode, UserRole } from '../types';
import { languageNames, translations } from '../data/translations';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  onNewVerification: () => void;
  unreadAlertsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage,
  role,
  onRoleChange,
  onOpenAuth,
  isLoggedIn,
  onNewVerification,
  unreadAlertsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const isOnline = useOnlineStatus();
  const t = translations[language] || translations.en;

  const navLinks = [
    { id: 'dashboard', label: t.navDashboard, icon: ShieldCheck },
    { id: 'risk_report', label: t.navRiskReport, icon: FileCheck },
    { id: 'escrow', label: t.navEscrow, icon: Lock },
    { id: 'alerts', label: t.navAlerts, icon: Bell, badge: unreadAlertsCount },
    { id: 'certificate', label: t.navCertificate, icon: Award },
    { id: 'advisor', label: t.navAdvisor, icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-blue-100 shadow-xs">
      {/* Top micro bar for status, language, PWA install */}
      <div className="bg-[#0b1e36] text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium text-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {t.appName} Official Platform
            </span>
            <span className="hidden sm:inline text-blue-300/60">|</span>
            <span className="hidden md:inline text-blue-200/90 font-normal">
              Ministry of Lands Registry Integration & Regulated Bank Escrow
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isOnline && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-800 text-[11px]">
                <WifiOff className="w-3 h-3 text-amber-300" />
                Offline Ready
              </span>
            )}

            <PWAInstallButton />

            {/* Language Selector */}
            <div className="relative">
              <button
                id="language-selector-button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800/80 text-blue-100 border border-blue-700/50 transition font-medium"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-blue-300" />
                <span>{languageNames[language]?.nativeName || 'English'}</span>
                <ChevronDown className="w-3 h-3 text-blue-300" />
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-1 w-44 rounded-lg bg-white shadow-xl border border-blue-100 py-1.5 text-slate-800 z-50 animate-in fade-in zoom-in-95"
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Select Language
                  </div>
                  {(Object.keys(languageNames) as LanguageCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        onSelectLanguage(code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-blue-50 transition ${
                        language === code ? 'font-bold text-blue-900 bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>{languageNames[code].nativeName}</span>
                      <span className="text-[11px] text-slate-400">{languageNames[code].label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-md shadow-blue-950/10 group-hover:bg-blue-800 transition">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-[#0b1e36] block leading-none">
                  CLEAR TITLE
                </span>
                <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mt-0.5">
                  Uganda
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => onSelectTab(link.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-blue-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge ? (
                    <span className="ml-1 w-4 h-4 rounded-full bg-blue-700 text-white text-[10px] flex items-center justify-center font-bold">
                      {link.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & User Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Start Verification button */}
            <button
              id="header-new-verify-btn"
              onClick={onNewVerification}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>{t.verifyCTA}</span>
            </button>

            {/* Role switch toggle */}
            <div className="relative">
              <button
                id="role-switch-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 text-slate-700 text-xs font-medium bg-white transition"
              >
                <User className="w-3.5 h-3.5 text-blue-700" />
                <span className="capitalize text-[11px]">
                  {role === 'diaspora_buyer'
                    ? 'Diaspora Buyer'
                    : role === 'local_owner'
                    ? 'Local Land Owner'
                    : 'Verification Agent'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 rounded-xl bg-white shadow-xl border border-blue-100 py-1.5 z-50 text-slate-800">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Workspace Role
                  </div>
                  <button
                    onClick={() => {
                      onRoleChange('diaspora_buyer');
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition flex flex-col"
                  >
                    <span className="font-semibold text-slate-900">Diaspora Property Buyer</span>
                    <span className="text-[10px] text-slate-500">London / UK / USA buyers</span>
                  </button>
                  <button
                    onClick={() => {
                      onRoleChange('local_owner');
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition flex flex-col"
                  >
                    <span className="font-semibold text-slate-900">Local Land Owner</span>
                    <span className="text-[10px] text-slate-500">Kampala / Wakiso / Mukono</span>
                  </button>
                  <button
                    onClick={() => {
                      onRoleChange('verification_agent');
                      setRoleDropdownOpen(false);
                      onSelectTab('agent_portal');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition flex flex-col border-t border-slate-100"
                  >
                    <span className="font-semibold text-blue-900">Verification Agent / Surveyor</span>
                    <span className="text-[10px] text-blue-600">Field audits & risk scoring</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile or Login */}
            <button
              id="auth-profile-btn"
              onClick={onOpenAuth}
              className="p-2 text-slate-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition"
              title="User Account"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center border border-blue-200">
                {isLoggedIn ? 'RK' : 'UG'}
              </div>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onNewVerification}
              className="sm:hidden px-2.5 py-1.5 text-xs font-bold text-white bg-blue-700 rounded-lg"
            >
              Verify
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-100 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 border border-blue-200'
                    : 'text-slate-700 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge ? (
                  <span className="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center font-bold">
                    {link.badge}
                  </span>
                ) : null}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onSelectTab('settings');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-slate-700 font-medium hover:bg-blue-50 rounded-lg"
            >
              {t.navSettings}
            </button>

            <button
              onClick={() => {
                onRoleChange(role === 'diaspora_buyer' ? 'verification_agent' : 'diaspora_buyer');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-blue-800 font-semibold bg-blue-50 rounded-lg flex items-center justify-between"
            >
              <span>Current Role: {role.replace('_', ' ')}</span>
              <span className="text-[10px] text-blue-600 underline">Tap to toggle</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
