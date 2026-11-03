import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { ColorPalettePreset, ThemeColors, ThemeContextType, PRESETS } from '../types/theme';

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

  // Sync colors to CSS custom properties
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

  // Persist dark mode class & storage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ntc_dark_mode', String(isDark));
  }, [isDark]);

  // Persist custom colors when active
  useEffect(() => {
    if (preset === 'custom') {
      localStorage.setItem('ntc_custom_colors', JSON.stringify(colors));
    }
  }, [colors, preset]);

  // Pure dark mode toggle (no side effects in state setter)
  const toggleDarkMode = useCallback(() => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (preset !== 'custom') {
      const p = PRESETS.find((item) => item.id === preset) || PRESETS[0];
      setColors(nextDark ? p.dark : p.light);
    }
  }, [isDark, preset]);

  const applyPreset = useCallback((presetId: ColorPalettePreset) => {
    setPreset(presetId);
    localStorage.setItem('ntc_theme_preset', presetId);
    const target = PRESETS.find((p) => p.id === presetId) || PRESETS[0];
    const newColors = isDark ? target.dark : target.light;
    setColors(newColors);
    localStorage.removeItem('ntc_custom_colors');
  }, [isDark]);

  const updateColor = useCallback((key: keyof ThemeColors, value: string) => {
    setPreset('custom');
    localStorage.setItem('ntc_theme_preset', 'custom');
    setColors((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'primary') {
        updated.primaryHover = value;
      }
      return updated;
    });
  }, []);

  const applyMasterColor = useCallback((masterHex: string) => {
    setPreset('custom');
    localStorage.setItem('ntc_theme_preset', 'custom');
    setColors((prev) => ({
      ...prev,
      primary: masterHex,
      primaryHover: masterHex,
      iconColor: masterHex,
      navbarBg: isDark ? '#020617' : masterHex,
      navbarText: '#ffffff',
    }));
  }, [isDark]);

  const resetTheme = useCallback(() => {
    applyPreset('federal-emerald');
  }, [applyPreset]);

  // Stable memoized context value to prevent unneeded consumer rerenders
  const contextValue = useMemo<ThemeContextType>(() => ({
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
  }), [
    isDark,
    toggleDarkMode,
    preset,
    applyPreset,
    colors,
    updateColor,
    applyMasterColor,
    resetTheme,
    isCustomizerOpen,
  ]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
