import React from 'react';
import { Phone, Shield, Sun, Moon, Globe, AlertCircle, Accessibility } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const TopBar: React.FC = () => {
  const { isDark, toggleDarkMode } = useTheme();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { openWidget } = useAccessibility();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[40px] py-1 sm:py-0 flex items-center justify-between gap-3">
        {/* Left Helpline & Official status */}
        <div className="flex items-center gap-3 sm:gap-6 truncate">
          <div className="flex items-center gap-1.5 font-medium text-emerald-400 truncate">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t('topbar.tagline')}</span>
          </div>

          <div className={`hidden md:flex items-center gap-2 ${isRTL ? 'pr-4 border-r' : 'pl-4 border-l'} border-slate-700 shrink-0`}>
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <a href="tel:1218" className="font-bold text-white hover:text-amber-300">
              {t('topbar.helpline')}
            </a>
          </div>
        </div>

        {/* Right Tools & Language */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Breaking Ticker Highlight */}
          <div className="hidden xl:flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
            <AlertCircle className="w-3 h-3 text-emerald-400" />
            <span>ISO/IEC 27001 Certified Sovereign Data Center</span>
          </div>

          {/* UserWay-Style Accessibility Button */}
          <button
            onClick={openWidget}
            className="flex items-center gap-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 hover:text-white px-2.5 py-1 rounded-full border border-blue-500/40 transition-all text-xs font-bold"
            title={language === 'en' ? 'Accessibility & Usability Menu' : 'رسائی و آسانی کی سہولیات'}
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">A11y</span>
          </button>

          {/* Urdu / English Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-white px-3 py-1 rounded-full border border-emerald-500/40 transition-all text-xs font-bold shadow-sm"
            title={language === 'en' ? 'Switch to Urdu (اردو)' : 'انگریزی میں تبدیل کریں'}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>

          {/* Quick Theme Switch */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </div>
    </div>
  );
};
