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
