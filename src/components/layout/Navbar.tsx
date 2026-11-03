import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Shield, FileText, Server, Info, PhoneCall, Globe, Accessibility, Phone, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleDarkMode } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const { openWidget } = useAccessibility();

  const navItems = [
    { name: t('nav.home'), path: '/', icon: <Shield className="w-4 h-4" /> },
    { name: t('nav.tenders'), path: '/tenders', icon: <FileText className="w-4 h-4" />, badge: t('nav.activeBids') },
    { name: t('nav.services'), path: '/services', icon: <Server className="w-4 h-4" /> },
    { name: t('nav.about'), path: '/about', icon: <Info className="w-4 h-4" /> },
    { name: t('nav.contact'), path: '/contact', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  return (
    <nav
      style={{
        backgroundColor: 'var(--color-navbar-bg)',
        color: 'var(--color-navbar-text)',
      }}
      className="sticky top-0 z-30 shadow-md border-b-2 border-emerald-600 dark:border-emerald-500 transition-colors duration-200 backdrop-blur-md bg-opacity-95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[64px] sm:min-h-[80px] py-1 sm:py-2">
          {/* Logo Brand - Free-standing & Prominent */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group py-1">
            <img
              src={isDark ? "/images/ntc-logo-dark.png" : "/images/ntc-logo-light.png"}
              alt="National Telecommunication Corporation"
              className="h-11 sm:h-14 xl:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md shrink-0"
            />

            <div className="flex flex-col justify-center gap-0.5 sm:gap-1 rtl:gap-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-base sm:text-xl xl:text-2xl tracking-tight text-slate-900 dark:text-white leading-tight rtl:leading-normal">
                  {t('nav.ntc')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm shrink-0 leading-normal">
                  {t('nav.govt')}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight leading-snug rtl:leading-normal hidden sm:block">
                {t('nav.fullTitle')}
              </div>
              <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-emerald-700 dark:text-emerald-400 leading-normal hidden xl:block rtl:hidden">
                {t('nav.subTitle')}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 xl:gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                {item.name}
                {item.badge && (
                  <span className="text-[9px] xl:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Accessibility Button */}
            <button
              onClick={openWidget}
              className="ms-1 p-2 rounded-xl border border-blue-300 dark:border-blue-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              title={language === 'en' ? 'Accessibility Suite' : 'رسائی و آسانی کی سہولیات'}
              aria-label="Open Accessibility Menu"
            >
              <Accessibility className="w-4 h-4" />
            </button>

            {/* Quick Language Toggle in Navbar */}
            <button
              onClick={toggleLanguage}
              className="ms-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'en' ? 'اردو' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu Trigger & Quick Actions */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button
              onClick={openWidget}
              className="p-2 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/30"
              title="Accessibility"
              aria-label="Open Accessibility Menu"
            >
              <Accessibility className="w-4 h-4" />
            </button>

            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs border border-emerald-500/30"
            >
              {language === 'en' ? 'اردو' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (2026 Enhanced) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-slide-up">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold min-h-[48px] transition-colors ${
                  isActive ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}

          {/* Quick Helpline & Theme Control in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <a
              href="tel:1218"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t('topbar.helpline')}</span>
            </a>

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
