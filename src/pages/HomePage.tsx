import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { HeroBanner } from '../components/sections/HeroBanner';
import { ModernCarousel } from '../components/carousel/ModernCarousel';
import { HeroSpotlight } from '../components/home/HeroSpotlight';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { MDMessage } from '../components/sections/MDMessage';
import { ProjectsShowcase } from '../components/sections/ProjectsShowcase';
import { ArticlesSection } from '../components/home/ArticlesSection';
import { TenderTable } from '../components/tenders/TenderTable';
import { TenderPDFViewer } from '../components/tenders/TenderPDFViewer';
import { Button } from '../components/common/Button';
import { Tender } from '../types/tender';
import { getAllTenders } from '../services/tenderStorage';
import { CMS_CHANGE_EVENT } from '../services/cmsStorage';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [recentTenders, setRecentTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const loadTenders = () => {
    getAllTenders().then((tenders) => {
      setRecentTenders(tenders.slice(0, 4));
    });
  };

  useEffect(() => {
    loadTenders();
    window.addEventListener(CMS_CHANGE_EVENT, loadTenders);
    return () => window.removeEventListener(CMS_CHANGE_EVENT, loadTenders);
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. New-Style Showcase Carousel & Dynamic Spotlight */}
      <div className="space-y-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1 rtl:space-y-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  {t('carousel.featuredHighlights')}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {t('carousel.milestoneTitle')}
                </h2>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                {t('carousel.touchHint')}
              </span>
            </div>

            <ModernCarousel />
          </div>
        </div>

        {/* Dynamic Admin-Controlled Hero Spotlight */}
        <HeroSpotlight />
      </div>

      {/* 3. Core Services Grid */}
      <ServicesGrid />

      {/* 4. Leadership & Managing Director's Message */}
      <MDMessage />

      {/* 5. Infrastructure & Strategic Alliances */}
      <ProjectsShowcase />

      {/* 6. Official Articles & Strategic Publications Section (CMS Driven) */}
      <ArticlesSection />

      {/* 7. Active Tenders Home Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              {t('tenders.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('tenders.latestTenders')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t('tenders.subtitle')}
            </p>
          </div>

          <Link to="/tenders">
            <Button variant="primary" icon={<ArrowIcon className="w-4 h-4" />}>
              {t('tenders.viewAllTenders')}
            </Button>
          </Link>
        </div>

        <TenderTable
          tenders={recentTenders}
          onViewPdf={(tender) => setSelectedTender(tender)}
        />
      </section>

      {/* PDF Modal Reader */}
      <TenderPDFViewer
        tender={selectedTender}
        isOpen={Boolean(selectedTender)}
        onClose={() => setSelectedTender(null)}
      />
    </div>
  );
};
