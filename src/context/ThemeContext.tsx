import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorPalettePreset, PresetOption, ThemeColors, ThemeContextType } from '../types/theme';

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

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('ntc_dark_mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [preset, setPreset] = useState<ColorPalettePreset>(() => {
    const saved = localStorage.getItem('ntc_theme_preset') as ColorPalettePreset;
    return saved || 'federal-emerald';
  });

  const [colors, setColors] = useState<ThemeColors>(() => {
    const savedColors = localStorage.getItem('ntc_custom_colors');
    if (savedColors) {
      try {
        return JSON.parse(savedColors);
      } catch (e) {
        console.error('Failed to parse saved colors', e);
      }
    }
    const targetPreset = PRESETS.find((p) => p.id === (preset || 'federal-emerald')) || PRESETS[0];
    return isDark ? targetPreset.dark : targetPreset.light;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Apply colors to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-hover', colors.primaryHover);
    root.style.setProperty('--color-navbar-bg', colors.navbarBg);
    root.style.setProperty('--color-navbar-text', colors.navbarText);
    root.style.setProperty('--color-icon', colors.iconColor);
    root.style.setProperty('--color-card-bg', colors.cardBg);
    root.style.setProperty('--color-card-border', colors.cardBorder);
  }, [colors]);

  // Handle Dark Mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ntc_dark_mode', String(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      // If using standard preset, switch to its corresponding dark/light mode
      if (preset !== 'custom') {
        const p = PRESETS.find((item) => item.id === preset) || PRESETS[0];
        setColors(next ? p.dark : p.light);
      }
      return next;
    });
  };

  const applyPreset = (presetId: ColorPalettePreset) => {
    setPreset(presetId);
    localStorage.setItem('ntc_theme_preset', presetId);
    const target = PRESETS.find((p) => p.id === presetId) || PRESETS[0];
    const newColors = isDark ? target.dark : target.light;
    setColors(newColors);
    localStorage.removeItem('ntc_custom_colors');
  };

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setPreset('custom');
    localStorage.setItem('ntc_theme_preset', 'custom');
    setColors((prev) => {
      const updated = { ...prev, [key]: value };
      // auto update hover if primary changed
      if (key === 'primary') {
        updated.primaryHover = value;
      }
      localStorage.setItem('ntc_custom_colors', JSON.stringify(updated));
      return updated;
    });
  };

  // "Master Color" feature: applies a chosen tint globally to primary, navbar, and icons
  const applyMasterColor = (masterHex: string) => {
    setPreset('custom');
    localStorage.setItem('ntc_theme_preset', 'custom');
    setColors((prev) => {
      const updated: ThemeColors = {
        ...prev,
        primary: masterHex,
        primaryHover: masterHex,
        iconColor: masterHex,
        navbarBg: isDark ? '#020617' : masterHex,
        navbarText: '#ffffff',
      };
      localStorage.setItem('ntc_custom_colors', JSON.stringify(updated));
      return updated;
    });
  };

  const resetTheme = () => {
    applyPreset('federal-emerald');
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleDarkMode,
        preset,
        applyPreset,
        colors,
        updateColor,
        applyMasterColor,
        resetTheme,
        isCustomizerOpen,
        setIsCustomizerOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
