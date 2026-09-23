import cadastralSurveyWatermark from '../assets/images/cadastral_survey_watermark_1790089443239.jpg';
import blueprintPlanWatermark from '../assets/images/blueprint_plan_watermark_1790089462834.jpg';
import goldenFarmlandWatermark from '../assets/images/golden_farmland_watermark_1790089478152.jpg';
import verdantEstateWatermark from '../assets/images/verdant_estate_watermark_1790089492569.jpg';

export interface WallpaperOption {
  id: string;
  name: string;
  subtitle: string;
  src: string;
  description: string;
  themeColor: string;
}

export const WALLPAPERS: WallpaperOption[] = [
  {
    id: 'cadastral_survey',
    name: 'Cadastral Survey & Beacons',
    subtitle: 'Surveyed plot pins over lush agricultural terrain',
    src: cadastralSurveyWatermark,
    description: 'Aerial parcel boundary demarcated with illuminated GPS surveyor beacons and mountain horizon.',
    themeColor: '#0b1e36',
  },
  {
    id: 'blueprint_plan',
    name: 'Architectural Blueprint & Plan',
    subtitle: 'Cadastral site map & topographical elevation contours',
    src: blueprintPlanWatermark,
    description: 'Technical master deed layout and surveyor architectural drawings held over valley development.',
    themeColor: '#1e293b',
  },
  {
    id: 'golden_farmland',
    name: 'Golden Sunrise Savannah',
    subtitle: 'Fertile agricultural fields under warm morning dawn',
    src: goldenFarmlandWatermark,
    description: 'Panoramic sunrise over expansive East African farmland and geometric agricultural parcels.',
    themeColor: '#78350f',
  },
  {
    id: 'verdant_estate',
    name: 'Verdant Mailo Meadow',
    subtitle: 'Expansive tranquil green estate under soft skies',
    src: verdantEstateWatermark,
    description: 'Pristine green pastureland and pastoral land ownership terrain with open skyline.',
    themeColor: '#064e3b',
  },
];

export type WatermarkIntensity = 'delicate' | 'subtle' | 'standard' | 'pronounced' | 'none';

export const INTENSITY_VALUES: Record<WatermarkIntensity, { opacity: number; label: string }> = {
  delicate: { opacity: 0.04, label: 'Delicate (4%)' },
  subtle: { opacity: 0.08, label: 'Subtle (8%)' },
  standard: { opacity: 0.12, label: 'Formal Standard (12%)' },
  pronounced: { opacity: 0.18, label: 'Pronounced (18%)' },
  none: { opacity: 0, label: 'Off (0%)' },
};
