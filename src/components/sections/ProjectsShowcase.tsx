import React from 'react';
import { ShieldCheck, Server, Globe, Award, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProjectsShowcase: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3 rtl:space-y-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            {t('projects.badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('projects.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed rtl:leading-loose">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* 3 Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1: NDC */}
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-emerald-500 transition-all hover:shadow-xl group flex flex-col justify-between">
            <div>
              <div className="h-48 w-full overflow-hidden bg-slate-900 relative">
                <img
                  src="/images/iso-certificate.jpg"
                  alt="ISO/IEC 27001 Certification National Data Center"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 start-3 p-2 rounded-xl bg-emerald-500 text-white shadow-lg">
                  <Server className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {t('projects.pillar1Tag')}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('projects.pillar1Title')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('projects.pillar1Desc')}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-200/60 dark:border-slate-700/60 mt-4">
              <ul className="space-y-2 pt-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isRTL ? 'دوہری متوازی بجلی اور کولنگ فیڈز' : 'Dual concurrent power & cooling feeds'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isRTL ? 'بایومیٹرک اور فزیکل سیکیورٹی حصار' : 'Physical biometric & perimeter security'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 2: DRC Lahore */}
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-sky-500 transition-all hover:shadow-xl group flex flex-col justify-between">
            <div>
              <div className="h-48 w-full overflow-hidden bg-slate-900 relative">
                <img
                  src="/images/slider-drc.jpg"
                  alt="Disaster Recovery Center DRC Lahore"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 start-3 p-2 rounded-xl bg-sky-500 text-white shadow-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {t('projects.pillar2Tag')}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('projects.pillar2Title')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('projects.pillar2Desc')}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-200/60 dark:border-slate-700/60 mt-4">
              <ul className="space-y-2 pt-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{isRTL ? 'مسلسل سنکرونس ڈیٹا ریپلیکیشن' : 'Continuous synchronous database mirroring'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{isRTL ? 'فوری سب منٹ RTO اور زیرو ڈیٹا ضیاع' : 'Rapid sub-minute RTO & zero RPO failover'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 3: ccTLD Pakistan */}
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-amber-500 transition-all hover:shadow-xl group flex flex-col justify-between">
            <div>
              <div className="h-48 w-full overflow-hidden bg-slate-900 relative">
                <img
                  src="/images/dot-pakistan.jpg"
                  alt="ccTLD Dot Pakistan Urdu Registry"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 start-3 p-2 rounded-xl bg-amber-500 text-white shadow-lg">
                  <Globe className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {t('projects.pillar3Tag')}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('projects.pillar3Title')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('projects.pillar3Desc')}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-200/60 dark:border-slate-700/60 mt-4">
              <ul className="space-y-2 pt-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{isRTL ? 'ڈی این ایس پارکنگ اور DNSSEC سائننگ' : 'DNS parking & DNSSEC zone signing'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{isRTL ? 'قومی زبان اردو میں ویب مواد کی ترویج' : 'Native Urdu content ecosystem enablement'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Strategic Alliances & Enterprise Presence Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/60 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  {t('projects.alliancesTitle')}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t('projects.alliancesSub')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Tier III Certified</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>ISO 27001:2022</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
            {/* Microsoft SPLA */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center gap-4 shadow-sm hover:border-emerald-500 transition-colors">
              <div className="w-16 h-12 flex-shrink-0 bg-white rounded-lg p-1.5 flex items-center justify-center border border-slate-100">
                <img
                  src="/images/microsoft-spla.png"
                  alt="Microsoft SPLA Partner"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t('projects.partnerMS')}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('projects.partnerMSDesc')}</p>
              </div>
            </div>

            {/* VMware Cloud */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center gap-4 shadow-sm hover:border-emerald-500 transition-colors">
              <div className="w-16 h-12 flex-shrink-0 bg-white rounded-lg p-1.5 flex items-center justify-center border border-slate-100">
                <img
                  src="/images/vmware-partner.jpg"
                  alt="VMware VCPP Partner"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t('projects.partnerVM')}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('projects.partnerVMDesc')}</p>
              </div>
            </div>

            {/* Enterprise AirWatch */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center gap-4 shadow-sm hover:border-emerald-500 transition-colors">
              <div className="w-16 h-12 flex-shrink-0 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-1.5 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 font-black text-xs">
                EMM
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t('projects.partnerAir')}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('projects.partnerAirDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
