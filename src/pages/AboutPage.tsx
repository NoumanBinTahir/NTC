import React from 'react';
import { Shield, Target, CheckCircle2, Building2, Network, Award, Server } from 'lucide-react';
import { MDMessage } from '../components/sections/MDMessage';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 text-white border border-emerald-500/20 shadow-xl space-y-4 rtl:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('about.badge')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight rtl:leading-normal">
            {t('about.title')}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed rtl:leading-loose">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Leadership Profile */}
      <MDMessage />

      {/* Corporate Mandate & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 rtl:space-y-5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug rtl:leading-normal">
              {t('about.mandateTitle')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed rtl:leading-loose">
              {t('about.mandateDesc')}
            </p>
            <ul className="space-y-2.5 rtl:space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t('about.mItem1')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t('about.mItem2')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t('about.mItem3')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t('about.mItem4')}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 rtl:space-y-5">
            <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug rtl:leading-normal">
              {t('about.missionTitle')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed rtl:leading-loose font-medium italic">
              {t('about.missionQuote')}
            </p>
            <ul className="space-y-2.5 rtl:space-y-3.5 text-xs text-slate-700 dark:text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>{t('about.stat1')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>{t('about.stat2')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>{t('about.stat3')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>{t('about.stat4')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nationwide Optical Network & Presence */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl rtl:space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                <Network className="w-4 h-4" />
                <span>Strategic Nationwide Reach</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight rtl:leading-normal">
                {t('about.popHeading')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed rtl:leading-loose">
                {t('about.popSub')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center divide-x divide-slate-200 dark:divide-slate-800 rtl:divide-x-reverse py-1">
              <div className="px-1 sm:px-3">
                <div className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">100+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{t('about.citiesLabel')}</div>
              </div>
              <div className="px-1 sm:px-3">
                <div className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">5,000+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{t('about.officesLabel')}</div>
              </div>
              <div className="px-1 sm:px-3">
                <div className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">99.99%</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{t('about.uptimeLabel')}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-white p-2">
              <img
                src="/images/presence-map.png"
                alt="NTC Nationwide Fiber Presence Map"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  <span>{t('about.coreTitle')}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed rtl:leading-loose">
                  {t('about.coreDesc')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>{t('about.ringsTitle')}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed rtl:leading-loose">
                  {t('about.ringsDesc')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{t('about.isoTitle')}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed rtl:leading-loose">
                  {t('about.isoDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
