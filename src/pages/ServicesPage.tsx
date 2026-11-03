import React from 'react';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { Server, Shield, Award, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ServicesPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 text-white border border-emerald-500/20 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Server className="w-3.5 h-3.5" />
            <span>{t('services.badge')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {t('services.title')}
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <ServicesGrid />

      {/* Service SLA & Certification Guarantee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {isRTL ? 'آئی ایس او 27001 سرٹیفائیڈ' : 'ISO/IEC 27001 Certified'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isRTL
                ? 'ہمارا ٹیئر تھری ڈیٹا سینٹر بین الاقوامی انفارمیشن سیکیورٹی معیارات پر پورا اترتا ہے جس سے حکومتی ڈیٹا مکمل خودمختار رہتا ہے۔'
                : 'Our Tier III Data Center is verified under rigorous international information security standards ensuring confidentiality, integrity, and sovereign protection.'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {isRTL ? '99.99% مسلسل سروس کی ضمانت' : '99.99% Uptime Commitment'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isRTL
                ? 'دوہرے خودکار آپٹیکل رنگز، بلاتعطل ڈیزل جنریٹرز اور ڈیزاسٹر ریکوری سینٹر لاہور کسی بھی تعطل کو ناممکن بناتے ہیں۔'
                : 'Dual-ring optical topologies, uninterrupted diesel generator backup, and automated geo-failover to DRC Lahore provide rock-solid continuity.'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {isRTL ? '24/7 فوری تکنیکی معاونت (1218)' : 'Dedicated Rapid Response'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isRTL
                ? 'این ٹی سی نیٹ ورک آپریشنز سینٹر (NOC) اور تربیت یافتہ فیلڈ انجینئرز اسلام آباد، لاہور، کراچی، پشاور، اور کوئٹہ میں 24 گھنٹے مامور ہیں۔'
                : '24x7 NTC Network Operations Center (NOC) and Field Engineer squads stationed across Islamabad, Lahore, Karachi, Peshawar, and Quetta.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
