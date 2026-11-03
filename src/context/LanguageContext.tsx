import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { en } from '../locales/en';
import { ur } from '../locales/ur';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'ntc_language_pref_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (saved === 'ur' || saved === 'en') ? saved : 'en';
  });

  const isRTL = language === 'ur';

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'ur' : 'en'));
  }, []);

  // Keep DOM updated with direction, lang, persistence, and Urdu font class
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    const dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
    
    if (isRTL) {
      document.documentElement.classList.add('font-urdu');
      document.body.classList.add('rtl-layout');
    } else {
      document.documentElement.classList.remove('font-urdu');
      document.body.classList.remove('rtl-layout');
    }
  }, [language, isRTL]);

  // Nested property resolver (e.g. 'nav.home', 'carousel.slide1Title')
  const t = useCallback((path: string): string => {
    const currentDict = language === 'ur' ? ur : en;
    const fallbackDict = en;

    const resolve = (obj: any, keys: string[]) => {
      let current = obj;
      for (const k of keys) {
        if (!current || typeof current !== 'object') return undefined;
        current = current[k];
      }
      return typeof current === 'string' ? current : undefined;
    };

    const keys = path.split('.');
    const result = resolve(currentDict, keys);
    if (result !== undefined) return result;

    const fallback = resolve(fallbackDict, keys);
    if (fallback !== undefined) return fallback;

    return path;
  }, [language]);

  const contextValue = useMemo<LanguageContextType>(
    () => ({ language, isRTL, setLanguage, toggleLanguage, t }),
    [language, isRTL, setLanguage, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
