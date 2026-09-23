import React from 'react';
import cadastralSurveyWatermark from '../assets/images/cadastral_survey_watermark_1790089443239.jpg';
import blueprintPlanWatermark from '../assets/images/blueprint_plan_watermark_1790089462834.jpg';
import goldenFarmlandWatermark from '../assets/images/golden_farmland_watermark_1790089478152.jpg';
import verdantEstateWatermark from '../assets/images/verdant_estate_watermark_1790089492569.jpg';

interface WatermarkBackgroundProps {
  currentTab?: string;
}

export const WatermarkBackground: React.FC<WatermarkBackgroundProps> = ({
  currentTab = 'welcome',
}) => {
  // Select contextual high-res land registry watermark tailored to the active view
  const getWallpaperForTab = () => {
    switch (currentTab) {
      case 'risk_report':
      case 'new_verification':
        return {
          src: blueprintPlanWatermark,
          theme: 'Technical Cadastral Blueprint & Elevation Contours',
          label: 'SURVEY PLANS & DEED BLUEPRINT',
        };
      case 'escrow':
        return {
          src: goldenFarmlandWatermark,
          theme: 'Golden Savannah Farmland & Escrow Trust',
          label: 'ESCROW DEPOSITORY & ARABLE HOLDINGS',
        };
      case 'advisor':
      case 'agent_portal':
      case 'settings':
        return {
          src: verdantEstateWatermark,
          theme: 'Verdant Mailo Estate & Agricultural Topography',
          label: 'CUSTOMARY & MAILO TENURE SENTINEL',
        };
      case 'certificate':
      case 'alerts':
      case 'dashboard':
      case 'welcome':
      case 'landing':
      default:
        return {
          src: cadastralSurveyWatermark,
          theme: 'Cadastral Survey & Demarcated Beacons',
          label: 'NATIONAL LAND REGISTRY CADASTRAL GRID',
        };
    }
  };

  const activeWallpaper = getWallpaperForTab();

  return (
    <div
      id="app-wallpaper-watermark-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Authentic Photographic Land Registry Watermark Background - Enhanced Visibility */}
      <div
        key={activeWallpaper.src}
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-100"
        style={{
          backgroundImage: `url(${activeWallpaper.src})`,
          opacity: 0.38,
          filter: 'contrast(120%) brightness(98%) saturate(110%)',
        }}
      />

      {/* 2. Soft institutional atmospheric tint to ensure WCAG AAA text legibility while keeping watermark visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-slate-50/30 to-white/50" />

      {/* 3. Subtle Sovereign Registry Security Watermark Lattice - Enhanced Visibility */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.09] pointer-events-none">
        <div className="w-[160vw] h-[160vh] -rotate-12 flex flex-col justify-around text-slate-900 font-mono text-[11px] sm:text-xs tracking-[0.35em] uppercase font-black whitespace-nowrap overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex justify-around py-4 border-b border-slate-900/15">
              <span>REPUBLIC OF UGANDA</span>
              <span>•</span>
              <span>MINISTRY OF LANDS, HOUSING & URBAN DEVELOPMENT</span>
              <span>•</span>
              <span>REGISTRATION OF TITLES ACT CAP 230</span>
              <span>•</span>
              <span>NATIONAL LAND INFORMATION SYSTEM (NLIS)</span>
              <span>•</span>
              <span>VERIFIED CADASTRAL GROUND TRUTH</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Official Heraldic & Cadastral Compass Circular Watermark Seal (Center-Right) */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full border-2 border-blue-900/20 pointer-events-none flex items-center justify-center opacity-[0.09]">
        <div className="w-[85%] h-[85%] rounded-full border border-dashed border-blue-900/30 flex items-center justify-center p-6 text-center">
          <div className="space-y-2 text-[#0b1e36]">
            <p className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase">
              • THE REPUBLIC OF UGANDA •
            </p>
            <p className="text-base sm:text-lg font-black tracking-wider uppercase font-serif">
              OFFICIAL TITLE WATERMARK
            </p>
            <p className="text-[9px] font-mono tracking-widest uppercase">
              ACT CAP 230 • SECTION 59 GUARANTEE
            </p>
          </div>
        </div>
      </div>

      {/* 5. Discrete Sovereign Watermark Indicator */}
      <div className="absolute bottom-2 left-6 text-[10px] font-mono text-slate-500/90 tracking-widest uppercase flex items-center gap-2 pointer-events-none bg-white/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-slate-200/50">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-700 animate-pulse"></span>
        <span>UGANDA CADASTRAL REGISTRY WATERMARK • {activeWallpaper.label}</span>
      </div>
    </div>
  );
};
