import React, { useState } from 'react';
import {
  MapPin,
  User,
  HelpCircle,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Compass,
  WifiOff,
} from 'lucide-react';
import { PropertyRecord, ServiceTier, VerificationPurpose, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface NewVerificationFlowProps {
  onSubmit: (newProperty: Partial<PropertyRecord>) => void;
  onCancel: () => void;
  language: LanguageCode;
}

const DISTRICT_COORDINATES: Record<string, { lat: number; lng: number; county: string; subCounty: string }> = {
  Wakiso: { lat: 0.3976, lng: 32.4831, county: 'Busiro', subCounty: 'Ssisa' },
  Kampala: { lat: 0.3476, lng: 32.5825, county: 'Kyadondo', subCounty: 'Central Division' },
  Mukono: { lat: 0.3541, lng: 32.7482, county: 'Kyaggwe', subCounty: 'Nama' },
  Mpigi: { lat: 0.2255, lng: 32.3275, county: 'Mawokota', subCounty: 'Mpigi Town' },
  Jinja: { lat: 0.4356, lng: 33.2032, county: 'Butembe', subCounty: 'Walukuba' },
  Mbarara: { lat: -0.6072, lng: 30.6545, county: 'Kashari', subCounty: 'Biharwe' },
  Gulu: { lat: 2.7747, lng: 32.2990, county: 'Aswa', subCounty: 'Laroo-Pece' },
};

export const NewVerificationFlow: React.FC<NewVerificationFlowProps> = ({
  onSubmit,
  onCancel,
  language,
}) => {
  const t = translations[language] || translations.en;
  const isOnline = useOnlineStatus();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  // Step 1: Location
  const [district, setDistrict] = useState('Wakiso');
  const [county, setCounty] = useState('Busiro');
  const [subCounty, setSubCounty] = useState('Ssisa');
  const [village, setVillage] = useState('Kajjansi');
  const [blockNumber, setBlockNumber] = useState('102');
  const [plotNumber, setPlotNumber] = useState('88');
  const [tenureType, setTenureType] = useState<'Mailo' | 'Freehold' | 'Leasehold' | 'Customary'>('Mailo');
  const [coordinates, setCoordinates] = useState({ lat: 0.3976, lng: 32.4831 });

  // Step 2: Seller Details
  const [sellerName, setSellerName] = useState('');
  const [sellerNIN, setSellerNIN] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [spousalConsentStatus, setSpousalConsentStatus] = useState<
    'consented' | 'not_applicable' | 'pending' | 'refused'
  >('pending');
  const [sellerRelationship, setSellerRelationship] = useState('sole_owner');

  // Step 3: Purpose
  const [purpose, setPurpose] = useState<VerificationPurpose>('buying_new');
  const [dealValueUGX, setDealValueUGX] = useState('150,000,000');

  // Step 4: Documents
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'Scan_of_Title_Deed_Draft.pdf',
  ]);

  // Step 5: Service Tier
  const [selectedTier, setSelectedTier] = useState<ServiceTier>('verification_inspection');

  const handleDistrictChange = (d: string) => {
    setDistrict(d);
    if (DISTRICT_COORDINATES[d]) {
      setCounty(DISTRICT_COORDINATES[d].county);
      setSubCounty(DISTRICT_COORDINATES[d].subCounty);
      setCoordinates({
        lat: DISTRICT_COORDINATES[d].lat,
        lng: DISTRICT_COORDINATES[d].lng,
      });
    }
  };

  const handleComplete = () => {
    const newProperty: Partial<PropertyRecord> = {
      titleRef: `${district.substring(0, 3).toUpperCase()}-${county.substring(0, 3).toUpperCase()}-${blockNumber}/${plotNumber}`,
      parcelId: `Plot ${plotNumber}, Block ${blockNumber}`,
      district,
      county,
      subCounty,
      village,
      approxSize: '25 Decimals (0.25 Acres)',
      tenureType,
      registeredOwners: [sellerName || 'Pending Registry Search Confirmation'],
      sellerName: sellerName || 'Verified Seller Under Review',
      sellerNIN: sellerNIN || 'CM000000000000',
      status: 'pending',
      stage: 'inquiry',
      currentRiskScore: 75,
      dealValueUGX: parseInt(dealValueUGX.replace(/,/g, ''), 10) || 120000000,
      dealValueUSD: 35000,
      coordinates,
      monitoredForAlerts: true,
      serviceTier: selectedTier,
      purpose,
      offlineCreated: !isOnline,
      documents: uploadedFiles.map((f, i) => ({
        id: `upl-${Date.now()}-${i}`,
        name: f,
        type: 'title_copy',
        uploadedAt: 'Just now',
        fileSize: '2.4 MB',
        verified: false,
        offlineCached: true,
      })),
    };

    onSubmit(newProperty);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-blue-100">
          <div>
            <h1 className="text-xl font-extrabold text-[#0b1e36]">
              {t.verificationTitle}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.verificationSubtitle}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            {t.cancel}
          </button>
        </div>

        {/* 5-Step Progress Tracker */}
        <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
          {[
            { n: 1, name: t.step1Title },
            { n: 2, name: t.step2Title },
            { n: 3, name: t.step3Title },
            { n: 4, name: t.step4Title },
            { n: 5, name: t.step5Title },
          ].map((s) => (
            <div
              key={s.n}
              className={`p-2 rounded-lg border transition ${
                step === s.n
                  ? 'border-blue-700 bg-blue-50 text-blue-900 font-bold'
                  : step > s.n
                  ? 'border-blue-200 bg-slate-50 text-slate-700 font-semibold'
                  : 'border-slate-100 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span>{s.n}.</span>
                <span className="hidden sm:inline truncate">{s.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isOnline && (
        <div className="mb-4 p-3 rounded-xl bg-blue-950 text-white text-xs flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-blue-300 shrink-0" />
          <span>{t.offlineModeNotice}</span>
        </div>
      )}

      {/* Step Contents */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 space-y-6">
        {/* STEP 1: LOCATION */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>{t.step1Title}: {t.parcelLocationTitle}</span>
            </div>

            <p className="text-xs text-slate-500">
              {t.parcelLocationDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.district} *
                </label>
                <select
                  value={district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-700"
                >
                  {Object.keys(DISTRICT_COORDINATES).map((d) => (
                    <option key={d} value={d}>
                      {d} {t.district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.tenure} *
                </label>
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-700"
                >
                  <option value="Mailo">Mailo Land</option>
                  <option value="Freehold">Freehold Title</option>
                  <option value="Leasehold">Leasehold</option>
                  <option value="Customary">Customary Land</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.county}
                </label>
                <input
                  type="text"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.subCounty}
                </label>
                <input
                  type="text"
                  value={subCounty}
                  onChange={(e) => setSubCounty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.village}
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Kajjansi Town"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.blockNumber} *
                  </label>
                  <input
                    type="text"
                    required
                    value={blockNumber}
                    onChange={(e) => setBlockNumber(e.target.value)}
                    placeholder="e.g. 102"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.plotNumber} *
                  </label>
                  <input
                    type="text"
                    required
                    value={plotNumber}
                    onChange={(e) => setPlotNumber(e.target.value)}
                    placeholder="e.g. 88"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map Pin */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-blue-700" />
                  <span>National Geodetic Grid</span>
                </span>
                <span className="text-[11px] font-mono text-blue-800">
                  {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
                </span>
              </div>
              <div className="h-28 bg-white rounded-lg border border-blue-200 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:12px_12px]"></div>
                <div className="relative text-center p-3">
                  <div className="w-7 h-7 rounded-full bg-blue-800 text-white flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-1">
                    {t.plotNumber} {plotNumber}, {t.blockNumber} {blockNumber}, {district}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SELLER DETAILS */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <User className="w-4 h-4" />
              <span>{t.step2Title}: {t.sellerDetailsTitle}</span>
            </div>

            <p className="text-xs text-slate-500">
              {t.sellerDetailsDesc}
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.sellerFullName} *
                </label>
                <input
                  type="text"
                  required
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="e.g. Ssalongo Godfrey Mukasa"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.sellerNIN}
                  </label>
                  <input
                    type="text"
                    value={sellerNIN}
                    onChange={(e) => setSellerNIN(e.target.value)}
                    placeholder="e.g. CM840211019XKL"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.sellerPhone}
                  </label>
                  <input
                    type="tel"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="+256 700 000 000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.spousalConsentTitle}
                </label>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  <label
                    onClick={() => setSpousalConsentStatus('consented')}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition ${
                      spousalConsentStatus === 'consented'
                        ? 'border-blue-700 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="spousal"
                      checked={spousalConsentStatus === 'consented'}
                      onChange={() => setSpousalConsentStatus('consented')}
                      className="text-blue-700"
                    />
                    <span>{t.spousalConsentYes}</span>
                  </label>

                  <label
                    onClick={() => setSpousalConsentStatus('not_applicable')}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition ${
                      spousalConsentStatus === 'not_applicable'
                        ? 'border-blue-700 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="spousal"
                      checked={spousalConsentStatus === 'not_applicable'}
                      onChange={() => setSpousalConsentStatus('not_applicable')}
                      className="text-blue-700"
                    />
                    <span>{t.spousalConsentNo}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PURPOSE */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>{t.step3Title}: {t.verificationPurposeTitle}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'buying_new', title: t.purposeBuying },
                { id: 'inheriting_family', title: t.purposeInheriting },
                { id: 'dispute_resolution', title: t.purposeDispute },
                { id: 'monitoring_own', title: t.purposeMonitoring },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPurpose(p.id as any)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                    purpose === p.id
                      ? 'border-blue-700 bg-blue-50 text-blue-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{p.title}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.purchasePriceUGX}
              </label>
              <input
                type="text"
                value={dealValueUGX}
                onChange={(e) => setDealValueUGX(e.target.value)}
                placeholder="e.g. 150,000,000"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                {t.transactionValueDesc}
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: DOCUMENTS UPLOAD */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Upload className="w-4 h-4" />
              <span>{t.step4Title}: {t.uploadDocsTitle}</span>
            </div>

            {/* Drag & Drop Zone */}
            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center bg-blue-50/30 hover:bg-blue-50/60 transition cursor-pointer">
              <Upload className="w-8 h-8 text-blue-700 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">
                {t.uploadDocsDesc}
              </p>
              <button
                type="button"
                onClick={() =>
                  setUploadedFiles([
                    ...uploadedFiles,
                    `Deed_Upload_${uploadedFiles.length + 1}.pdf`,
                  ])
                }
                className="mt-3 px-3 py-1.5 bg-blue-800 text-white rounded-lg text-xs font-bold hover:bg-blue-900 transition"
              >
                + Add Another File
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700">Uploaded Files ({uploadedFiles.length})</p>
              {uploadedFiles.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                >
                  <span className="font-semibold text-slate-800">{file}</span>
                  <span className="text-[11px] text-blue-700 font-bold">{t.statusClear}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: SERVICE TIER SELECTION */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>{t.step5Title}: {t.tierSelectionTitle}</span>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'verification_only',
                  name: t.tierVerificationOnly,
                  fee: 'UGX 350,000 ($95 USD)',
                },
                {
                  id: 'verification_inspection',
                  name: t.tierVerificationInspection,
                  fee: 'UGX 950,000 ($260 USD)',
                  recommended: true,
                },
                {
                  id: 'full_escrow',
                  name: t.tierFullEscrow,
                  fee: '1.5% Escrow Trust (Stanbic Bank)',
                },
              ].map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedTier === tier.id
                      ? 'border-blue-700 bg-blue-50/80 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{tier.name}</span>
                      {tier.recommended && (
                        <span className="bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-blue-900">{tier.fee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.back}</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((step + 1) as any)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition flex items-center gap-1.5 shadow-xs"
            >
              <span>{t.nextStep}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition flex items-center gap-2 shadow-md active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.submitVerificationBtn}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
