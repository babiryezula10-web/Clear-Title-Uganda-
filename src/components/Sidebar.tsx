import React, { useState } from 'react';
import formalAppIcon from '../assets/images/formal_ctu_icon_1790180602124.jpg';
import cadastralSurveyIcon from '../assets/images/cadastral_survey_watermark_1790089443239.jpg';
import {
  ShieldCheck,
  Globe,
  FileCheck,
  Lock,
  Bell,
  Award,
  MessageSquare,
  ChevronDown,
  User,
  Plus,
  WifiOff,
  Briefcase,
  Settings as SettingsIcon,
  X,
  Check,
  Landmark,
} from 'lucide-react';
import { LanguageCode, UserRole } from '../types';
import { languageNames, translations } from '../data/translations';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface SidebarProps {
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
  isOpen?: boolean;
  onClose?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
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
  isOpen,
  onClose,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const isOnline = useOnlineStatus();
  const t = translations[language] || translations.en;
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const drawerOpen = isOpen !== undefined ? isOpen : mobileOpen;
  const handleClose = onClose || onCloseMobile || (() => {});

  const navLinks = [
    { id: 'welcome', label: 'Welcome Portal', icon: Landmark },
    { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck },
    { id: 'new_verification', label: 'Verify Land', icon: FileCheck },
    { id: 'transactions', label: 'Transactions', icon: Briefcase },
    { id: 'escrow', label: 'Secure Payment', icon: Lock },
    { id: 'alerts', label: 'Risk & Alerts', icon: Bell, badge: unreadAlertsCount },
    { id: 'risk_report', label: 'Reports', icon: Award },
    { id: 'learn', label: 'Learn Before You Buy', icon: MessageSquare },
    { id: 'advisor', label: 'Professional Review', icon: User },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    handleClose();
  };

  const handleNewVerificationClick = () => {
    onNewVerification();
    handleClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0b1e36] text-slate-100 select-none">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-blue-900/60 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('welcome')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          {/* Official Formal Clear Title Uganda Emblem */}
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md shadow-blue-950/70 shrink-0 group-hover:scale-105 transition duration-300 bg-[#0b1e36]">
            <img
              src={formalAppIcon}
              alt="CLEAR TITLE UGANDA"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 ring-1 ring-amber-400/40 rounded-xl pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-base tracking-wider text-white uppercase">
                CLEAR TITLE UGANDA
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-blue-300 font-mono tracking-wider uppercase leading-tight mt-0.5">
              LAND REGISTRY & ESCROW
            </p>
          </div>
        </button>

        {/* Close Drawer Button */}
        <button
          onClick={handleClose}
          className="p-1.5 text-blue-300 hover:text-white rounded-lg hover:bg-blue-900/60 transition cursor-pointer"
          aria-label="Close menu"
          title="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Primary Action Button: New Verification */}
      <div className="p-3 sm:p-4">
        <button
          id="sidebar-verify-btn"
          onClick={handleNewVerificationClick}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs shadow-lg shadow-blue-900/40 transition active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>{t.verifyCTA}</span>
        </button>
      </div>

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-blue-300/60">
          Navigation
        </div>

        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600/30 text-white border border-blue-500/50 shadow-inner'
                  : 'text-slate-300 hover:bg-blue-900/40 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-blue-400' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Configuration & User Controls */}
      <div className="p-3 sm:p-4 border-t border-blue-900/60 space-y-3 bg-[#08172b]">
        {/* Offline / Online Status */}
        <div className="flex items-center justify-between text-[11px] px-2 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            ></span>
            <span>{isOnline ? 'Online Synced' : t.offlineReady}</span>
          </div>
          <PWAInstallButton />
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            id="sidebar-language-selector-btn"
            onClick={() => {
              setLangDropdownOpen(!langDropdownOpen);
              setRoleDropdownOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-blue-950/80 hover:bg-blue-900/80 border border-blue-800/60 text-xs font-medium text-blue-200 transition"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{languageNames[language]?.nativeName || 'English'}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
          </button>

          {langDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-[#0b1e36] rounded-xl border border-blue-700/60 shadow-2xl py-1 z-50 overflow-hidden">
              <div className="px-3 py-1.5 text-[10px] font-bold text-blue-300 uppercase tracking-wider border-b border-blue-900/80">
                {t.preferredLanguage}
              </div>
              <div className="max-h-56 overflow-y-auto">
                {(Object.keys(languageNames) as LanguageCode[]).map((code) => {
                  const lang = languageNames[code];
                  const isSelected = language === code;
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        onSelectLanguage(code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-blue-900/60 hover:text-white'
                      }`}
                    >
                      <div>
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] ml-1.5 opacity-70">
                          ({lang.label})
                        </span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Role Switcher */}
        <div className="relative">
          <button
            id="sidebar-role-selector-btn"
            onClick={() => {
              setRoleDropdownOpen(!roleDropdownOpen);
              setLangDropdownOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-blue-950/80 hover:bg-blue-900/80 border border-blue-800/60 text-xs font-medium text-blue-200 transition"
          >
            <div className="flex items-center gap-2 truncate">
              <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">
                {role === 'diaspora_buyer'
                  ? t.roleDiaspora
                  : role === 'local_owner'
                  ? t.roleLocal
                  : t.roleAgent}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-[#0b1e36] rounded-xl border border-blue-700/60 shadow-2xl py-1 z-50">
              <div className="px-3 py-1.5 text-[10px] font-bold text-blue-300 uppercase tracking-wider border-b border-blue-900/80">
                {t.workspaceRole}
              </div>
              <button
                onClick={() => {
                  onRoleChange('diaspora_buyer');
                  setRoleDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs transition ${
                  role === 'diaspora_buyer'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-blue-900/60 hover:text-white'
                }`}
              >
                <div>{t.roleDiaspora}</div>
                <div className="text-[10px] text-blue-300/80">
                  {t.roleDiasporaDesc}
                </div>
              </button>
              <button
                onClick={() => {
                  onRoleChange('local_owner');
                  setRoleDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs transition ${
                  role === 'local_owner'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-blue-900/60 hover:text-white'
                }`}
              >
                <div>{t.roleLocal}</div>
                <div className="text-[10px] text-blue-300/80">
                  {t.roleLocalDesc}
                </div>
              </button>
              <button
                onClick={() => {
                  onRoleChange('verification_agent');
                  setRoleDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs transition ${
                  role === 'verification_agent'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-blue-900/60 hover:text-white'
                }`}
              >
                <div>{t.roleAgent}</div>
                <div className="text-[10px] text-blue-300/80">
                  {t.roleAgentDesc}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Slide-Out Navigation Drawer from Left (Desktop & Mobile) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop with smooth blur & fade */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={handleClose}
            aria-hidden="true"
          />
          {/* Drawer container from Left */}
          <div className="relative w-80 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-300 border-r border-blue-900/40">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
