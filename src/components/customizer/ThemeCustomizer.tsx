import React, { useState } from 'react';
import {
  Palette,
  X,
  Sun,
  Moon,
  Sparkles,
  RotateCcw,
  Check,
  Layers,
  Wand2,
} from 'lucide-react';
import { useTheme, PRESETS } from '../../context/ThemeContext';
import { ColorPickerItem } from './ColorPickerItem';
import { Button } from '../common/Button';

export const ThemeCustomizer: React.FC = () => {
  const {
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
  } = useTheme();

  const [masterColorInput, setMasterColorInput] = useState('#047857');
  const [copied, setCopied] = useState(false);

  const handleCopyThemeJson = () => {
    const config = {
      isDark,
      preset,
      colors,
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsCustomizerOpen(true)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 p-3.5 rounded-full bg-[var(--color-primary)] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/20 group flex items-center gap-2"
        aria-label="Open Theme Customizer"
        title="Open Theme & Color Customizer"
      >
        <Palette className="w-5 h-5 animate-pulse" />
        <span className="hidden group-hover:inline-block text-xs font-bold tracking-wide pr-1">
          Customize Theme
        </span>
      </button>

      {/* Backdrop */}
      {isCustomizerOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsCustomizerOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 border-l border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-out flex flex-col ${
          isCustomizerOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Design & Color Customizer
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customize colors independently or apply one palette
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. Dark Mode Toggle */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-amber-400 shadow-sm">
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 block">
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  High-contrast government theme
                </span>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                isDark ? 'bg-[var(--color-primary)]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 2. One-Click Color Presets */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Color Presets</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {PRESETS.map((p) => {
                const isSelected = preset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: p.primaryPreview }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-sm -ml-1"
                        style={{ backgroundColor: p.navbarPreview }}
                      />
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[var(--color-primary)] ml-auto" />
                      )}
                    </div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                      {p.name.split(' (')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Apply One Color to All (Master Tint) */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Wand2 className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Apply One Color to All</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Set a master accent color to automatically sync the navbar, buttons, and icons together.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={masterColorInput}
                onChange={(e) => setMasterColorInput(e.target.value)}
                className="w-9 h-9 rounded-lg cursor-pointer border-0 bg-transparent p-0"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => applyMasterColor(masterColorInput)}
                className="flex-1"
              >
                Sync All Colors
              </Button>
            </div>
          </div>

          {/* 4. Granular Independent Customization */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Independent Element Overrides
            </div>

            <ColorPickerItem
              label="1. Top & Main Navbar"
              description="Background color for header bars"
              value={colors.navbarBg}
              onChange={(val) => updateColor('navbarBg', val)}
            />

            <ColorPickerItem
              label="2. System Icons Color"
              description="Global tint applied to feature & service icons"
              value={colors.iconColor}
              onChange={(val) => updateColor('iconColor', val)}
            />

            <ColorPickerItem
              label="3. Primary Accent & Buttons"
              description="Color for call-to-action buttons, badges, links"
              value={colors.primary}
              onChange={(val) => updateColor('primary', val)}
            />

            <ColorPickerItem
              label="4. Cards & Surfaces"
              description="Background tint for content boxes and feature cards"
              value={colors.cardBg}
              onChange={(val) => updateColor('cardBg', val)}
              swatches={['#FFFFFF', '#F8FAFC', '#F1F5F9', '#0F172A', '#1E293B']}
            />
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={resetTheme} icon={<RotateCcw className="w-4 h-4" />}>
            Reset
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCopyThemeJson}>
            {copied ? 'Copied Config!' : 'Export Theme JSON'}
          </Button>
        </div>
      </div>
    </>
  );
};
