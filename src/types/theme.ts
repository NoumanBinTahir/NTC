export type ColorPalettePreset = 
  | 'federal-emerald'
  | 'telecom-blue'
  | 'corporate-slate'
  | 'vibrant-cyan'
  | 'executive-purple'
  | 'custom';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  navbarBg: string;
  navbarText: string;
  iconColor: string;
  cardBg: string;
  cardBorder: string;
}

export interface PresetOption {
  id: ColorPalettePreset;
  name: string;
  description: string;
  primaryPreview: string;
  navbarPreview: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  preset: ColorPalettePreset;
  applyPreset: (presetId: ColorPalettePreset) => void;
  colors: ThemeColors;
  updateColor: (key: keyof ThemeColors, value: string) => void;
  applyMasterColor: (color: string) => void;
  resetTheme: () => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
}

export const PRESETS: PresetOption[] = [
  {
    id: 'federal-emerald',
    name: 'Federal Emerald (Default)',
    description: 'National official identity with high-contrast emblem highlighting.',
    primaryPreview: '#047857',
    navbarPreview: '#ffffff',
    light: {
      primary: '#047857',
      primaryHover: '#065f46',
      navbarBg: '#ffffff',
      navbarText: '#0f172a',
      iconColor: '#059669',
      cardBg: '#ffffff',
      cardBorder: '#e2e8f0',
    },
    dark: {
      primary: '#10b981',
      primaryHover: '#34d399',
      navbarBg: '#090e1a',
      navbarText: '#f8fafc',
      iconColor: '#10b981',
      cardBg: '#0f172a',
      cardBorder: '#1e293b',
    },
  },
  {
    id: 'telecom-blue',
    name: 'Digital Telecom Blue',
    description: 'High-tech enterprise aesthetic inspired by national fiber and satellite.',
    primaryPreview: '#0284c7',
    navbarPreview: '#082f49',
    light: {
      primary: '#0284c7',
      primaryHover: '#0369a1',
      navbarBg: '#082f49',
      navbarText: '#ffffff',
      iconColor: '#0284c7',
      cardBg: '#ffffff',
      cardBorder: '#e2e8f0',
    },
    dark: {
      primary: '#38bdf8',
      primaryHover: '#7dd3fc',
      navbarBg: '#031422',
      navbarText: '#f8fafc',
      iconColor: '#38bdf8',
      cardBg: '#0f172a',
      cardBorder: '#1e293b',
    },
  },
  {
    id: 'corporate-slate',
    name: 'Executive Slate & Navy',
    description: 'Sleek, minimalist corporate palette with high contrast readability.',
    primaryPreview: '#334155',
    navbarPreview: '#0f172a',
    light: {
      primary: '#334155',
      primaryHover: '#1e293b',
      navbarBg: '#0f172a',
      navbarText: '#ffffff',
      iconColor: '#475569',
      cardBg: '#ffffff',
      cardBorder: '#e2e8f0',
    },
    dark: {
      primary: '#94a3b8',
      primaryHover: '#cbd5e1',
      navbarBg: '#020617',
      navbarText: '#f8fafc',
      iconColor: '#94a3b8',
      cardBg: '#0f172a',
      cardBorder: '#1e293b',
    },
  },
  {
    id: 'vibrant-cyan',
    name: 'Cyber Future Cyan',
    description: 'Modern, high-energy cyber security & cloud infrastructure theme.',
    primaryPreview: '#06b6d4',
    navbarPreview: '#164e63',
    light: {
      primary: '#0891b2',
      primaryHover: '#0e7490',
      navbarBg: '#164e63',
      navbarText: '#ffffff',
      iconColor: '#0891b2',
      cardBg: '#ffffff',
      cardBorder: '#e2e8f0',
    },
    dark: {
      primary: '#22d3ee',
      primaryHover: '#67e8f9',
      navbarBg: '#082f3a',
      navbarText: '#f8fafc',
      iconColor: '#22d3ee',
      cardBg: '#0f172a',
      cardBorder: '#1e293b',
    },
  },
];
