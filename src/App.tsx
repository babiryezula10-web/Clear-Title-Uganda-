import React, { useState, useEffect } from 'react';
import {
  PropertyRecord,
  LandAlert,
  EscrowAccount,
  CaseMessage,
  UserProfile,
  LanguageCode,
  UserRole,
  LandTransaction,
  ActivityItem,
} from './types';
import {
  initialProperties,
  initialAlerts,
  initialEscrow,
  initialMessages,
  initialUserProfile,
  initialTransactions,
  initialActivities,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { FormalWelcomePage } from './components/FormalWelcomePage';
import { WatermarkBackground } from './components/WatermarkBackground';
import { Dashboard } from './components/Dashboard';
import { NewVerificationFlow } from './components/NewVerificationFlow';
import { RiskScoreReportView } from './components/RiskScoreReportView';
import { EscrowTrackerView } from './components/EscrowTrackerView';
import { LandAlertsView } from './components/LandAlertsView';
import { TrustCertificateView } from './components/TrustCertificateView';
import { ChatbotWidget } from './components/ChatbotWidget';
import { AgentPortal } from './components/AgentPortal';
import { SettingsView } from './components/SettingsView';
import { AuthModal } from './components/AuthModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SplashScreen } from './components/SplashScreen';
import { TransactionWizardModal } from './components/TransactionWizardModal';
import { VerificationReportModal } from './components/VerificationReportModal';
import { LearnCentreView } from './components/LearnCentreView';
import { TransactionTimelineView } from './components/TransactionTimelineView';
import { HelpSupportModal } from './components/HelpSupportModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import formalAppIcon from './assets/images/formal_ctu_icon_1790180602124.jpg';
import cadastralSurveyIcon from './assets/images/cadastral_survey_watermark_1790089443239.jpg';
import {
  MessageSquare,
  Menu,
  ShieldCheck,
  Plus,
  Globe,
  ChevronDown,
  User,
  Check,
  Wifi,
  WifiOff,
  Landmark,
  Layers,
  Sparkles,
  Search,
  HelpCircle,
} from 'lucide-react';
import { languageNames, translations } from './data/translations';
import { useOnlineStatus } from './hooks/useOnlineStatus';

export default function App() {
  const isOnline = useOnlineStatus();

  // State Initialization with LocalStorage fallbacks
  const [currentTab, setCurrentTab] = useState<string>(() => {
    return localStorage.getItem('ctu_tab') || 'welcome';
  });

  const [language, setLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem('ctu_lang') as LanguageCode) || 'en';
  });

  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('ctu_role') as UserRole) || 'diaspora_buyer';
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ctu_profile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [properties, setProperties] = useState<PropertyRecord[]>(() => {
    const saved = localStorage.getItem('ctu_properties');
    return saved ? JSON.parse(saved) : initialProperties;
  });

  const [alerts, setAlerts] = useState<LandAlert[]>(() => {
    const saved = localStorage.getItem('ctu_alerts');
    return saved ? JSON.parse(saved) : initialAlerts;
  });

  const [escrow, setEscrow] = useState<EscrowAccount>(() => {
    const saved = localStorage.getItem('ctu_escrow');
    return saved ? JSON.parse(saved) : initialEscrow;
  });

  const [messages, setMessages] = useState<CaseMessage[]>(() => {
    const saved = localStorage.getItem('ctu_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [transactions, setTransactions] = useState<LandTransaction[]>(() => {
    const saved = localStorage.getItem('ctu_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('ctu_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [selectedProperty, setSelectedProperty] = useState<PropertyRecord>(
    () => properties[0] || initialProperties[0]
  );

  const [reportProperty, setReportProperty] = useState<PropertyRecord>(
    () => properties[0] || initialProperties[0]
  );

  // Splash screen state (shown once per session by default, replayable anytime)
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return !sessionStorage.getItem('ctu_seen_splash');
  });

  const [transactionWizardOpen, setTransactionWizardOpen] = useState(false);
  const [verificationReportModalOpen, setVerificationReportModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [topLangDropdownOpen, setTopLangDropdownOpen] = useState(false);

  // Active translation dictionary
  const t = translations[language] || translations.en;

  // Offline Sync Management
  const [pendingSyncQueue, setPendingSyncQueue] = useState<PropertyRecord[]>(() => {
    const saved = localStorage.getItem('ctu_pending_sync');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('ctu_tab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('ctu_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('ctu_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('ctu_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('ctu_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('ctu_escrow', JSON.stringify(escrow));
  }, [escrow]);

  useEffect(() => {
    localStorage.setItem('ctu_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ctu_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ctu_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('ctu_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Global search shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddNewTransaction = (newTx: LandTransaction) => {
    setTransactions([newTx, ...transactions]);
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'completed',
      title: 'New Transaction Launched',
      subtitle: `${newTx.propertyTitle} • ${newTx.location}`,
      date: '23 September 2026',
      transactionRef: newTx.id,
    };
    setActivities([newAct, ...activities]);
    setCurrentTab('transactions');
  };

  useEffect(() => {
    localStorage.setItem('ctu_pending_sync', JSON.stringify(pendingSyncQueue));
  }, [pendingSyncQueue]);

  // Handler to add a new verification case
  const handleAddNewVerification = (newProp: Partial<PropertyRecord>) => {
    const fullProp: PropertyRecord = {
      id: `prop-${Date.now()}`,
      titleRef: newProp.titleRef || 'WAK-BUS-102/88',
      parcelId: newProp.parcelId || 'Plot 88, Block 102',
      district: newProp.district || 'Wakiso',
      county: newProp.county || 'Busiro',
      subCounty: newProp.subCounty || 'Ssisa',
      village: newProp.village || 'Kajjansi',
      approxSize: newProp.approxSize || '25 Decimals (0.25 Acres)',
      tenureType: newProp.tenureType || 'Mailo',
      registeredOwners: newProp.registeredOwners || ['Pending Registry Search'],
      sellerName: newProp.sellerName || 'Verified Seller',
      sellerNIN: newProp.sellerNIN || 'CM000000000000',
      status: 'pending',
      stage: 'inquiry',
      currentRiskScore: 75,
      dealValueUGX: newProp.dealValueUGX || 120000000,
      dealValueUSD: newProp.dealValueUSD || 32000,
      coordinates: newProp.coordinates || { lat: 0.3976, lng: 32.4831 },
      monitoredForAlerts: true,
      serviceTier: newProp.serviceTier || 'verification_inspection',
      purpose: newProp.purpose || 'buying_new',
      offlineCreated: newProp.offlineCreated,
      documents: newProp.documents || [],
      riskReport: {
        id: `rep-${Date.now()}`,
        overallScore: 75,
        rating: 'pending',
        summarySentence:
          'Inquiry registered. Ministry White Page registry search ordered and cadastral surveyor dispatched for boundary verification.',
        issuedAt: new Date().toLocaleDateString('en-GB') + ' 10:00 EAT',
        verifiedByAgent: 'Surv. David Byaruhanga (Field Lead)',
        categories: {
          ownershipChain: {
            name: 'Ownership Chain',
            score: 75,
            status: 'warning',
            plainExplanation: 'Registry search in progress at Ministerial Zonal Office.',
          },
          encumbranceStatus: {
            name: 'Encumbrance & Caveats',
            score: 80,
            status: 'excellent',
            plainExplanation: 'Initial system scan indicates no active court caveats.',
          },
          disputeHistory: {
            name: 'Local LC1 History',
            score: 70,
            status: 'warning',
            plainExplanation: 'Field agent scheduled to interview LC1 village chairman.',
          },
          boundaryMatch: {
            name: 'Boundary Precision',
            score: 75,
            status: 'warning',
            plainExplanation: 'Boundary beacons pending physical GPS positioning verification.',
          },
          sellerIdentityConfidence: {
            name: 'Seller Authorization',
            score: 75,
            status: 'warning',
            plainExplanation: 'Checking NIRA identity and Letters of Administration if applicable.',
          },
        },
        auditLogs: [
          {
            timestamp: new Date().toLocaleDateString('en-GB') + ' 10:15 EAT',
            action: 'Intake Dossier Generated',
            actor: 'System Auto-Sentinel',
            verifiedProof: 'Ministry Zonal Registry search ref #WAK-2026',
          },
          {
            timestamp: new Date().toLocaleDateString('en-GB') + ' 10:30 EAT',
            action: 'Assigned to Wakiso Zonal Field Surveyor',
            actor: 'Surv. David Byaruhanga',
            verifiedProof: 'Cadastral boundary inspection scheduled',
          },
        ],
      },
    };

    if (!navigator.onLine) {
      setPendingSyncQueue((prev) => [...prev, fullProp]);
    }

    setProperties([fullProp, ...properties]);
    setSelectedProperty(fullProp);
    setCurrentTab('risk_report');
  };

  // Sync offline queue
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setPendingSyncQueue([]);
      setIsSyncing(false);
      const newAlert: LandAlert = {
        id: `alt-sync-${Date.now()}`,
        propertyId: 'all',
        parcelTitle: 'Offline Queue Synchronized',
        district: 'National Registry',
        timestamp: 'Just now',
        eventType: 'routine_clear',
        severity: 'low',
        message: 'All offline verifications synced with National Land Registry database.',
        read: false,
      };
      setAlerts([newAlert, ...alerts]);
    }, 1500);
  };

  // Chat message sending to surveyor
  const handleSendMessage = (text: string) => {
    const userMsg: CaseMessage = {
      id: `msg-${Date.now()}`,
      caseId: selectedProperty.id,
      senderName: userProfile.name,
      senderRole: role === 'diaspora_buyer' ? 'Diaspora Buyer' : 'Local Property Owner',
      avatarText: userProfile.name.slice(0, 2).toUpperCase() || 'ME',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const replyMsg: CaseMessage = {
        id: `msg-rep-${Date.now()}`,
        caseId: selectedProperty.id,
        senderName: 'Surv. David Byaruhanga',
        senderRole: 'Licensed Field Surveyor (#UG-382)',
        avatarText: 'DB',
        text: `Received regarding ${selectedProperty.parcelId}. We checked the boundary marker beacons on ground today. Ministry zonal records confirm the registry volume matches.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOfficialUpdate: true,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  // Land alert subscription
  const handleAddAlertSubscription = (parcelTitle: string, district: string) => {
    const newAlert: LandAlert = {
      id: `alt-${Date.now()}`,
      propertyId: 'custom',
      parcelTitle,
      district,
      timestamp: 'Just now',
      eventType: 'routine_clear',
      severity: 'low',
      message: `24/7 Title Monitoring activated for ${parcelTitle}. Routine baseline search clear.`,
      read: false,
    };
    setAlerts([newAlert, ...alerts]);
  };

  const handleClearAlert = (alertId: string) => {
    setAlerts(alerts.filter((a) => a.id !== alertId));
  };

  // Internal Agent property update
  const handleUpdateProperty = (updated: PropertyRecord) => {
    setProperties(properties.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProperty.id === updated.id) {
      setSelectedProperty(updated);
    }
  };

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  // Active Tab Title Translation for Header
  const getTabTitle = () => {
    switch (currentTab) {
      case 'welcome':
      case 'landing':
        return t.navWelcome || 'Welcoming Portal';
      case 'dashboard':
        return t.navDashboard;
      case 'transactions':
        return 'Transactions & Escrow';
      case 'learn':
        return 'Learn Before You Buy';
      case 'risk_report':
        return t.navRiskReport;
      case 'escrow':
        return t.navEscrow;
      case 'alerts':
        return t.navAlerts;
      case 'certificate':
        return t.navCertificate;
      case 'advisor':
        return t.navAdvisor;
      case 'agent_portal':
        return t.navAgentPortal;
      case 'settings':
        return t.navSettings;
      case 'new_verification':
        return t.verificationTitle;
      default:
        return t.navDashboard;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex font-sans selection:bg-blue-200 relative">
      {/* Watermarked Sovereign Wallpaper Background Layer (Contextual to current tab) */}
      <WatermarkBackground currentTab={currentTab} />

      {/* 1. Left Sidebar Navigation Dock (Slide-out drawer closed by default on all screens) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setMobileSidebarOpen(false);
        }}
        language={language}
        onSelectLanguage={setLanguage}
        role={role}
        onRoleChange={setRole}
        onOpenAuth={() => setAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onNewVerification={() => {
          setTransactionWizardOpen(true);
          setMobileSidebarOpen(false);
        }}
        unreadAlertsCount={unreadAlertsCount}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper: Full width, spacious, with closed sidebar by default */}
      <div className="flex-1 flex flex-col min-w-0 w-full transition-all">
        {/* Top App Header with global Language switcher, Page title, and quick actions */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
            {/* Left: 3-Lines Hamburger Menu Button + App Icon & Title */}
            <div className="flex items-center gap-3">
              <button
                id="global-3lines-menu-btn"
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 sm:p-2.5 text-slate-800 hover:text-blue-900 hover:bg-blue-50/80 rounded-xl border border-slate-200/90 bg-white/90 shadow-2xs transition flex items-center gap-1.5 cursor-pointer group"
                aria-label="Open navigation sidebar"
                title="Click the 3 lines in the left corner to open dashboard and navigation"
              >
                <Menu className="w-5 h-5 text-slate-800 group-hover:scale-110 transition" />
                <span className="text-xs font-bold text-slate-700 hidden sm:inline">Menu</span>
              </button>

              <div className="flex items-center gap-2.5">
                {/* Official Formal Clear Title Uganda Emblem */}
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-amber-400 shadow-xs shrink-0 bg-[#0b1e36]">
                  <img
                    src={formalAppIcon}
                    alt="CLEAR TITLE UGANDA"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 ring-1 ring-amber-400/40 rounded-xl pointer-events-none" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm sm:text-base text-[#0b1e36] uppercase tracking-wider">
                    CLEAR TITLE UGANDA
                  </span>
                  {currentTab !== 'welcome' && (
                    <>
                      <span className="text-slate-300 hidden md:inline">|</span>
                      <span className="text-xs font-bold text-blue-900 hidden md:inline">
                        {getTabTitle()}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Middle: Section 14 Global Search Bar */}
            <button
              id="topbar-search-btn"
              onClick={() => setGlobalSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs transition cursor-pointer max-w-xs w-full"
              title="Search properties, transactions, and references (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Search property, transaction or ref...</span>
              <kbd className="ml-auto text-[10px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
            </button>

            {/* Right: Global Language Switcher, Help, Role Badge, and CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Mobile Search Button */}
              <button
                onClick={() => setGlobalSearchOpen(true)}
                className="md:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 transition"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Section 13: Need Help? Button */}
              <button
                id="topbar-help-btn"
                onClick={() => setHelpModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer shadow-2xs"
                title="Need Help? Contact Support & Help Centre"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden sm:inline">Need Help?</span>
              </button>

              {/* Online/Offline indicator */}
              <div
                className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  isOnline
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {isOnline ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.offlineReady}</span>
                  </>
                )}
              </div>

              {/* Global Quick Language Switcher Dropdown */}
              <div className="relative">
                <button
                  id="topbar-language-selector-btn"
                  onClick={() => setTopLangDropdownOpen(!topLangDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100/80 text-blue-950 text-xs font-bold transition shadow-2xs"
                  title="Switch Language (All views update)"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-700" />
                  <span className="hidden sm:inline">
                    {languageNames[language]?.nativeName || 'English'}
                  </span>
                  <span className="sm:hidden font-mono uppercase text-[11px]">
                    {language}
                  </span>
                  <ChevronDown className="w-3 h-3 text-blue-700" />
                </button>

                {topLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-blue-200 shadow-xl py-1.5 z-50 animate-in fade-in">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      {t.preferredLanguage}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {(Object.keys(languageNames) as LanguageCode[]).map((code) => {
                        const item = languageNames[code];
                        const isSelected = language === code;
                        return (
                          <button
                            key={code}
                            onClick={() => {
                              setLanguage(code);
                              setTopLangDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition ${
                              isSelected
                                ? 'bg-blue-50 font-bold text-blue-900'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div>
                              <span className="font-semibold">{item.nativeName}</span>
                              <span className="text-[10px] text-slate-400 ml-1.5">
                                ({item.label})
                              </span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-blue-700" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Start Transaction CTA in Top Header */}
              <button
                id="topbar-new-verification-btn"
                onClick={() => setTransactionWizardOpen(true)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+ Start Transaction</span>
                <span className="sm:hidden">+ Start</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 pb-16 relative z-10">
          {(currentTab === 'welcome' || currentTab === 'landing') && (
            <FormalWelcomePage
              onEnterDashboard={() => setCurrentTab('dashboard')}
              onStartVerification={() => setTransactionWizardOpen(true)}
              onViewRiskReport={() => {
                setSelectedProperty(properties[0]);
                setCurrentTab('risk_report');
              }}
              onExploreEscrow={() => {
                setSelectedProperty(properties[0]);
                setCurrentTab('escrow');
              }}
              onViewCertificate={() => {
                setSelectedProperty(properties[0]);
                setCurrentTab('certificate');
              }}
              onOpenAdvisor={() => setCurrentTab('advisor')}
              onOpenMenu={() => setMobileSidebarOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onOpenLearn={() => setCurrentTab('learn')}
              onReplaySplash={() => setShowSplash(true)}
              language={language}
            />
          )}

          {currentTab === 'dashboard' && (
            <Dashboard
              userName={userProfile.name}
              userRole={role}
              properties={properties}
              transactions={transactions}
              activities={activities}
              alerts={alerts}
              messages={messages}
              onStartNewVerification={() => setCurrentTab('new_verification')}
              onStartNewTransaction={() => setTransactionWizardOpen(true)}
              onViewRiskReport={(prop) => {
                setSelectedProperty(prop);
                setCurrentTab('risk_report');
              }}
              onViewVerificationReport={(prop) => {
                setReportProperty(prop);
                setVerificationReportModalOpen(true);
              }}
              onViewEscrow={(prop) => {
                setSelectedProperty(prop);
                setCurrentTab('escrow');
              }}
              onViewCertificate={(prop) => {
                setSelectedProperty(prop);
                setCurrentTab('certificate');
              }}
              onViewAlerts={() => setCurrentTab('alerts')}
              onViewTransactions={() => setCurrentTab('transactions')}
              onSendMessage={handleSendMessage}
              language={language}
            />
          )}

          {currentTab === 'transactions' && (
            <TransactionTimelineView
              transactions={transactions}
              properties={properties}
              onStartNewTransaction={() => setTransactionWizardOpen(true)}
              onViewEscrow={() => setCurrentTab('escrow')}
              onViewPropertyReport={(prop) => {
                setReportProperty(prop);
                setVerificationReportModalOpen(true);
              }}
            />
          )}

          {currentTab === 'learn' && (
            <LearnCentreView
              onStartVerification={() => setTransactionWizardOpen(true)}
              onContactAdvocate={() => setCurrentTab('advisor')}
            />
          )}

          {currentTab === 'new_verification' && (
            <NewVerificationFlow
              onSubmit={handleAddNewVerification}
              onCancel={() => setCurrentTab('dashboard')}
              language={language}
            />
          )}

          {currentTab === 'risk_report' && (
            <RiskScoreReportView
              property={selectedProperty}
              allProperties={properties}
              onSelectProperty={setSelectedProperty}
              onProceedToEscrow={(prop) => {
                setSelectedProperty(prop);
                setCurrentTab('escrow');
              }}
              onViewCertificate={(prop) => {
                setSelectedProperty(prop);
                setCurrentTab('certificate');
              }}
              language={language}
            />
          )}

          {currentTab === 'escrow' && (
            <EscrowTrackerView
              escrow={escrow}
              property={selectedProperty}
              onUpdateEscrow={setEscrow}
              language={language}
            />
          )}

          {currentTab === 'alerts' && (
            <LandAlertsView
              alerts={alerts}
              properties={properties}
              onAddAlertSubscription={handleAddAlertSubscription}
              onClearAlert={handleClearAlert}
              language={language}
            />
          )}

          {currentTab === 'certificate' && (
            <TrustCertificateView
              property={
                properties.find((p) => p.status === 'clear') || selectedProperty
              }
              allProperties={properties}
              onSelectProperty={setSelectedProperty}
              language={language}
            />
          )}

          {currentTab === 'advisor' && (
            <div className="max-w-5xl mx-auto px-4 py-4">
              <ChatbotWidget
                mode="fullscreen"
                properties={properties}
                language={language}
              />
            </div>
          )}

          {currentTab === 'agent_portal' && (
            <AgentPortal
              properties={properties}
              onUpdateProperty={handleUpdateProperty}
              language={language}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              userProfile={userProfile}
              onUpdateProfile={setUserProfile}
              language={language}
              onSelectLanguage={setLanguage}
              currentRole={role}
              onRoleChange={setRole}
            />
          )}
        </main>

        {/* Floating Chat Bubble (available on all screens when not on advisor tab) */}
        {currentTab !== 'advisor' && (
          <>
            {floatingChatOpen ? (
              <ChatbotWidget
                mode="floating"
                properties={properties}
                language={language}
                onCloseFloating={() => setFloatingChatOpen(false)}
              />
            ) : (
              <div className="fixed bottom-5 right-5 z-40 group">
                {/* Interactive Tooltip on hover with dynamic translation */}
                <div
                  id="floating-chat-tooltip"
                  role="tooltip"
                  className="absolute bottom-full right-0 mb-3 pointer-events-none opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 ease-out"
                >
                  <div className="bg-[#0b1e36] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl border border-blue-900/60 whitespace-nowrap flex items-center gap-1.5">
                    <span>{t.advisorTooltip}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </div>
                  {/* Tooltip arrow pointing to the button */}
                  <div className="w-2.5 h-2.5 bg-[#0b1e36] rotate-45 absolute -bottom-1 right-6 border-r border-b border-blue-900/60"></div>
                </div>

                <button
                  id="floating-chat-bubble-btn"
                  onClick={() => setFloatingChatOpen(true)}
                  aria-describedby="floating-chat-tooltip"
                  className="bg-blue-800 hover:bg-blue-900 text-white p-3.5 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                  aria-label="Open Land Law Advisor Chat"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                  <span className="text-xs font-bold hidden sm:inline">{t.advisorTitle}</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* Section 1: Splash Screen Experience */}
        {showSplash && (
          <SplashScreen
            onComplete={() => {
              setShowSplash(false);
              sessionStorage.setItem('ctu_seen_splash', 'true');
            }}
          />
        )}

        {/* Section 6: 7-Step Start New Land Transaction Wizard Modal */}
        <TransactionWizardModal
          isOpen={transactionWizardOpen}
          onClose={() => setTransactionWizardOpen(false)}
          onCreated={handleAddNewTransaction}
        />

        {/* Section 8: Clear Title Verification Report Modal */}
        <VerificationReportModal
          property={reportProperty}
          isOpen={verificationReportModalOpen}
          onClose={() => setVerificationReportModalOpen(false)}
          onViewCertificate={() => {
            setSelectedProperty(reportProperty);
            setCurrentTab('certificate');
          }}
        />

        {/* Section 14: Global Search Modal */}
        <GlobalSearchModal
          isOpen={globalSearchOpen}
          onClose={() => setGlobalSearchOpen(false)}
          properties={properties}
          transactions={transactions}
          onSelectProperty={(p) => {
            setSelectedProperty(p);
            setCurrentTab('risk_report');
          }}
          onSelectTransaction={(t) => {
            setCurrentTab('transactions');
          }}
          onOpenReport={(p) => {
            setReportProperty(p);
            setVerificationReportModalOpen(true);
          }}
        />

        {/* Section 13: Need Help? Support Center Modal */}
        <HelpSupportModal
          isOpen={helpModalOpen}
          onClose={() => setHelpModalOpen(false)}
          onOpenAdvisor={() => setCurrentTab('advisor')}
          onOpenLearn={() => setCurrentTab('learn')}
        />

        {/* Offline Indicator & Sync trigger */}
        <OfflineIndicator
          pendingSyncCount={pendingSyncQueue.length}
          onTriggerSync={handleTriggerSync}
          isSyncing={isSyncing}
        />

        {/* Auth Modal for Local / Diaspora */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentRole={role}
          onLoginSuccess={(newRole, userType) => {
            setRole(newRole);
            setUserProfile({
              ...userProfile,
              userType,
              role: newRole,
            });
            setIsLoggedIn(true);
          }}
        />
      </div>
    </div>
  );
}
