import React, { useState } from 'react';
import { Phone, Globe, Server, Database, Shield, Wifi, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card } from '../common/Card';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const ServicesGrid: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'telecom' | 'data' | 'cloud' | 'security'>('all');

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  const services = [
    {
      id: 'pots',
      category: 'telecom' as const,
      title: t('services.card1Title'),
      description: t('services.card1Desc'),
      icon: <Phone className="w-5 h-5" style={{ color: 'var(--color-icon)' }} />,
      features: isRTL
        ? ['محفوظ گرین لائنز', 'بین الوزارتی ہاٹ لائن', 'زیرو کال ڈراپ سوئچنگ']
        : ['Encrypted Green Lines', 'Inter-Ministerial Hotline', 'Zero Call Drop Optical Switching'],
      image: '/images/pots-services.jpg',
    },
    {
      id: 'data-services',
      category: 'data' as const,
      title: t('services.card2Title'),
      description: t('services.card2Desc'),
      icon: <Globe className="w-5 h-5" style={{ color: 'var(--color-icon)' }} />,
      features: isRTL
        ? ['ڈارک فائبر اور لیزڈ سرکٹس', 'ایم پی ایل ایس وی پی این', 'ہائی بینڈوڈتھ سمیٹرک لائنز']
        : ['Dark Fiber & Leased Lines', 'MPLS VPN Architecture', 'High Density Symmetric Bandwidth'],
      image: '/images/data-services.jpg',
    },
    {
      id: 'data-center',
      category: 'cloud' as const,
      title: t('services.card4Title'),
      description: t('services.card4Desc'),
      icon: <Database className="w-5 h-5" style={{ color: 'var(--color-icon)' }} />,
      features: isRTL
        ? ['آئی ایس او 27001 سرٹیفائیڈ', 'ٹیئر تھری کلاؤڈ ڈیزائن', '24/7 بلاتعطل بجلی و کولنگ']
        : ['ISO 27001:2022 Certified', 'Tier III Resilient Topology', '24/7 Redundant Power & Cooling'],
      image: '/images/colocation-services.jpg',
    },
    {
      id: 'broadband',
      category: 'telecom' as const,
      title: t('services.card5Title'),
      description: t('services.card5Desc'),
      icon: <Server className="w-5 h-5" style={{ color: 'var(--color-icon)' }} />,
      features: isRTL
        ? ['ایف ٹی ٹی ایچ اور جی پون', 'محکمہ جاتی تیز رفتار انٹرنیٹ', 'محفوظ آئی پی پولز']
        : ['FTTH & GPON Core', 'Departmental High Speed Net', 'Secure Dedicated IP Pools'],
      image: '/images/slider-datacenter.jpg',
    },
    {
      id: 'media-conf',
      category: 'data' as const,
      title: t('services.card3Title'),
      description: t('services.card3Desc'),
      icon: <Wifi className="w-5 h-5" style={{ color: 'var(--color-icon)' }} />,
      features: isRTL
        ? ['ایوانِ صدر و پی ایم او برج', 'اعلیٰ سیکیورٹی ای وی سی لنکس', 'ملک گیر ویڈیو اجلاس']
        : ['Presidency & PMO Bridges', 'Encrypted HD Video Links', 'Nationwide Virtual Conferences'],
      image: '/images/mobile-broadband.jpg',
    },
    {
      id: 'drc-backup',
      category: 'security' as const,
      title: t('services.card6Title'),
      description: t('services.card6Desc'),
      icon: <Shield className="w-5 h-5" style={{ color: 'var(--color-icon)' }} />,
      features: isRTL
        ? ['اسلام آباد و لاہور سنکرونائزیشن', 'صفر سیکنڈ ڈیٹا ضیاع', 'ملٹری گریڈ سائبر تحفظ']
        : ['Islamabad & Lahore Sync', 'Zero-Second RTO Protection', 'Military Grade Cyber Defense'],
      image: '/images/call-center.jpg',
    },
  ];

  const filtered = activeTab === 'all' ? services : services.filter((s) => s.category === activeTab);

  const tabs = [
    { id: 'all', label: isRTL ? 'تمام خدمات' : 'All Services' },
    { id: 'cloud', label: isRTL ? 'کلاؤڈ و ڈیٹا سینٹر' : 'Cloud & DC' },
    { id: 'data', label: isRTL ? 'ڈیٹا و فائبر' : 'Data & Fiber' },
    { id: 'telecom', label: isRTL ? 'ٹیلی فونی و انٹرنیٹ' : 'Telephony & Net' },
    { id: 'security', label: isRTL ? 'سائبر و ڈیزاسٹر ریکوری' : 'Cyber & DRC' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 rtl:space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              {t('services.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('services.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed rtl:leading-loose">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap min-h-[36px] flex items-center justify-center ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <Card key={service.id} hoverable className="flex flex-col justify-between group overflow-hidden p-0 border border-slate-200 dark:border-slate-800">
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 start-3 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 shadow-lg backdrop-blur-sm">
                  {service.icon}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[var(--color-primary)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
                  >
                    <span>{isRTL ? 'تکنیکی تفصیلات ملاحظہ کریں' : 'Learn Specifications'}</span>
                    <ChevronIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
