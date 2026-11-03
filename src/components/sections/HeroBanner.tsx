import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, FileText, Server, ShieldCheck, Activity, Award } from 'lucide-react';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

export const HeroBanner: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[var(--color-primary)]/15 to-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{t('hero.statutoryBadge')}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>ISO/IEC 27001:2022 Certified</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-5 rtl:space-y-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.25] rtl:leading-[1.8] rtl:text-2xl rtl:sm:text-4xl rtl:lg:text-5xl">
            {t('hero.titleLine1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-emerald-600 to-teal-500 block sm:inline py-1">
              {t('hero.titleLine2')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed rtl:leading-loose">
            {t('hero.subtitle')}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link to="/tenders">
              <Button variant="primary" size="lg" icon={<FileText className="w-4 h-4" />}>
                {t('hero.ctaPrimary')}
              </Button>
            </Link>

            <Link to="/services">
              <Button
                variant="secondary"
                size="lg"
                icon={<Server className="w-4 h-4" />}
                className="bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                {t('services.exploreAll')}
              </Button>
            </Link>

            <Link to="/about">
              <Button variant="ghost" size="lg" icon={<ArrowIcon className="w-4 h-4" />}>
                {t('hero.ctaSecondary')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-6">
          {[
            { id: 'stat-fiber-reach', label: t('hero.stat1Desc'), val: t('hero.stat1'), icon: <Activity className="w-4 h-4 text-emerald-500" /> },
            { id: 'stat-security-tier', label: t('hero.stat2Desc'), val: t('hero.stat2'), icon: <ShieldCheck className="w-4 h-4 text-sky-500" /> },
            { id: 'stat-exchanges', label: t('hero.stat3Desc'), val: t('hero.stat3'), icon: <Server className="w-4 h-4 text-amber-500" /> },
            { id: 'stat-sla-uptime', label: 'Uptime SLA / 24x7', val: '99.99%', icon: <Award className="w-4 h-4 text-purple-500" /> },
          ].map((metric) => (
            <div
              key={metric.id}
              className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors"
            >
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                {metric.icon}
                <span className="truncate">{metric.label}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                {metric.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
