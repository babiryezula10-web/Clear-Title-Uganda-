/**
 * Clear Title Uganda - TypeScript Definitions
 */

export type LanguageCode =
  | 'en' // English
  | 'lg' // Luganda
  | 'nyn' // Runyankole / Runyakitara
  | 'ach' // Acholi
  | 'teo' // Ateso
  | 'laj' // Lango
  | 'sw'; // Swahili

export type UserRole = 'diaspora_buyer' | 'local_owner' | 'verification_agent' | 'admin';

export type LandTenure = 'Mailo' | 'Freehold' | 'Leasehold' | 'Customary';

export type VerificationStage =
  | 'inquiry'
  | 'document_check'
  | 'physical_inspection'
  | 'risk_score_issued'
  | 'escrow_active'
  | 'registration_confirmed'
  | 'completed';

export type RiskRating = 'clear' | 'pending' | 'flagged'; // green/blue, amber, red
export type PropertyStatus = RiskRating;

export type ServiceTier = 'verification_only' | 'verification_inspection' | 'full_escrow';
export type VerificationPurpose = 'buying_new' | 'inheriting_family' | 'dispute_resolution' | 'monitoring_own';

export interface RiskCategoryScore {
  name: string;
  score: number; // 0 - 100
  status: 'excellent' | 'warning' | 'critical';
  plainExplanation: string;
}

export interface RiskReport {
  id: string;
  overallScore: number; // 0 - 100
  rating: RiskRating;
  summarySentence: string;
  issuedAt: string;
  verifiedByAgent: string;
  categories: {
    ownershipChain: RiskCategoryScore;
    encumbranceStatus: RiskCategoryScore;
    disputeHistory: RiskCategoryScore;
    boundaryMatch: RiskCategoryScore;
    sellerIdentityConfidence: RiskCategoryScore;
  };
  auditLogs: {
    timestamp: string;
    action: string;
    actor: string;
    verifiedProof: string;
  }[];
}

export interface PropertyRecord {
  id: string;
  titleRef: string; // e.g. WAK-BUS-102/45
  parcelId: string; // Plot 45, Block 102
  district: string;
  county: string;
  subCounty: string;
  village: string;
  approxSize: string; // e.g. 50 Decimals (0.50 Acres)
  tenureType: LandTenure;
  registeredOwners: string[];
  sellerName: string;
  sellerNIN: string;
  status: RiskRating;
  stage: VerificationStage;
  currentRiskScore?: number;
  dealValueUGX: number;
  dealValueUSD: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  monitoredForAlerts: boolean;
  documents: VaultDocument[];
  riskReport?: RiskReport;
  escrowId?: string;
  offlineCreated?: boolean;
  serviceTier?: ServiceTier;
  purpose?: VerificationPurpose;
}

export interface VaultDocument {
  id: string;
  name: string;
  type: 'title_copy' | 'national_id' | 'power_of_attorney' | 'survey_map' | 'search_cert' | 'spousal_consent';
  uploadedAt: string;
  fileSize: string;
  verified: boolean;
  offlineCached?: boolean;
}

export interface LandAlert {
  id: string;
  propertyId: string;
  parcelTitle: string;
  district: string;
  timestamp: string;
  eventType: 'registry_search' | 'boundary_survey' | 'caveat_lodged' | 'subdivision_request' | 'routine_clear';
  severity: 'low' | 'medium' | 'high';
  message: string;
  read: boolean;
}

export interface EscrowMilestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  completedAt?: string;
  amountReleased?: number;
}

export interface EscrowAccount {
  id: string;
  propertyId: string;
  parcelId: string;
  buyerName: string;
  sellerName: string;
  totalAmountUGX: number;
  totalAmountUSD: number;
  fundsHeldUGX: number;
  fundsHeldUSD: number;
  bankTrustRef: string; // Stanbic Uganda Escrow Trust
  status: 'funds_held' | 'conditions_pending' | 'registration_confirmed' | 'funds_released';
  milestones: EscrowMilestone[];
  conditions: {
    description: string;
    verified: boolean;
  }[];
}

export interface CaseMessage {
  id: string;
  caseId: string;
  senderName: string;
  senderRole: string;
  avatarText: string;
  timestamp: string;
  text: string;
  isOfficialUpdate?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone: string;
  userType: 'local' | 'diaspora';
  role: UserRole;
  location: string;
  preferredLanguage: LanguageCode;
  twoFactorEnabled: boolean;
  notifications: {
    sms: boolean;
    whatsapp: boolean;
    email: boolean;
  };
}

export interface ActivityItem {
  id: string;
  type: 'completed' | 'action_required' | 'under_review' | 'flagged';
  title: string;
  subtitle: string;
  date: string;
  propertyId?: string;
  transactionRef?: string;
}

export interface LandTransaction {
  id: string; // e.g. CTU-001245
  propertyId: string;
  propertyTitle: string; // Plot 245, Block 18
  location: string; // Wakiso, Busiro
  buyerName: string;
  sellerName: string;
  amountUGX: number;
  amountUSD: number;
  status: 'verified' | 'pending_review' | 'action_required' | 'completed';
  currentStep: number; // 1 to 7
  date: string;
  timeline: {
    buyerVerified: boolean;
    sellerVerified: boolean;
    propertyVerified: boolean;
    saleAgreementUploaded: boolean;
    transferInProgress: boolean;
    registrationPending: boolean;
    escrowHeld: boolean;
    completed: boolean;
  };
  advocateAssigned?: string;
  escrowRef?: string;
}
