import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, ShieldCheck, Database, Globe, Network, Cpu } from 'lucide-react';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const ModernCarousel: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const slides = [
    {
      id: 'slide-1',
      badge: t('carousel.slide1Badge'),
      title: t('carousel.slide1Title'),
      subtitle: isRTL ? 'وفاقی کلاؤڈ اور ڈیٹا خود مختاری' : 'Tier III ISO 27001 Sovereign Cloud',
      description: t('carousel.slide1Desc'),
      ctaText: t('carousel.slide1Cta'),
      ctaLink: '/services',
      icon: <Database className="w-8 h-8 text-emerald-400" />,
      bgGradient: 'from-slate-950 via-emerald-950/90 to-slate-900',
      imageAlt: 'NTC National Data Center Server Racks',
      imageSrc: '/images/slider-datacenter.jpg',
    },
    {
      id: 'slide-2',
      badge: t('carousel.slide2Badge'),
      title: t('carousel.slide2Title'),
      subtitle: isRTL ? 'صفر سیکنڈ ڈیٹا ضیاع' : 'Zero Data Loss Sovereign Resilience',
      description: t('carousel.slide2Desc'),
      ctaText: t('carousel.slide2Cta'),
      ctaLink: '/about',
      icon: <ShieldCheck className="w-8 h-8 text-sky-400" />,
      bgGradient: 'from-slate-950 via-sky-950/90 to-slate-900',
      imageAlt: 'NTC Disaster Recovery Facility',
      imageSrc: '/images/slider-drc.jpg',
    },
    {
      id: 'slide-3',
      badge: t('carousel.slide3Badge'),
      title: t('carousel.slide3Title'),
      subtitle: isRTL ? 'ملک گیر خودکار آپٹیکل رنگز' : 'High-Density Terabit Backbone',
      description: t('carousel.slide3Desc'),
      ctaText: t('carousel.slide3Cta'),
      ctaLink: '/services',
      icon: <Network className="w-8 h-8 text-teal-400" />,
      bgGradient: 'from-slate-950 via-teal-950/90 to-slate-900',
      imageAlt: 'Optical Fiber Splicing and NGN Exchange',
      imageSrc: '/images/slider-optical.jpg',
    },
    {
      id: 'slide-4',
      badge: t('carousel.slide4Badge'),
      title: t('carousel.slide4Title'),
      subtitle: isRTL ? 'قومی زبان کا خود مختار ڈومین' : 'Managing National Urdu Domain Space',
      description: t('carousel.slide4Desc'),
      ctaText: t('carousel.slide4Cta'),
      ctaLink: '/services',
      icon: <Globe className="w-8 h-8 text-amber-400" />,
      bgGradient: 'from-slate-950 via-amber-950/85 to-slate-900',
      imageAlt: 'Global Internet Exchange & Urdu Domain Space',
      imageSrc: '/images/dot-pakistan.jpg',
    },
    {
      id: 'slide-5',
      badge: isRTL ? 'عالمی کلاؤڈ شراکت داری' : 'Microsoft SPLA & VMware Cloud',
      title: isRTL ? 'مائیکروسافٹ اور وی ایم ویئر شراکت' : 'Enterprise Hybrid Cloud Alliances',
      subtitle: isRTL ? 'پبلک پرائیویٹ پارٹنرشپ ماڈل' : '1st On-Prem Airwatch Cloud in APJ',
      description: isRTL
        ? 'این ٹی سی مائیکروسافٹ ایس پی ایل اے اور وی ایم ویئر وی سی پی پی سرٹیفائیڈ پارٹنر کے طور پر حکومتی اداروں کو ہائبرڈ کلاؤڈ سروسز فراہم کرتا ہے۔'
        : 'NTC is the 1st in Asia-Pacific & Japan (APJ) and 1 of 3 globally for On-Prem Airwatch Public Cloud Provider through official VCPP and Microsoft SPLA public-private partnerships.',
      ctaText: isRTL ? 'شراکت داری کی تفصیلات' : 'Partner Solutions',
      ctaLink: '/services',
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      bgGradient: 'from-slate-950 via-purple-950/90 to-slate-900',
      imageAlt: 'Cloud Infrastructure and Enterprise Virtualization',
      imageSrc: '/images/slider-meeting.jpg',
    },
  ];

  const total = slides.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (isRTL) {
      if (diff > 50) prevSlide();
      if (diff < -50) nextSlide();
    } else {
      if (diff > 50) nextSlide();
      if (diff < -50) prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      dir="ltr"
    >
      {/* Slides Container - locked in LTR for clean transform-x math */}
      <div
        className="flex transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="min-w-full relative flex items-center justify-between p-6 sm:p-12 lg:p-20 text-white min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] overflow-hidden"
          >
            {/* Background Image with Dark Gradient Tint */}
            <img
              src={slide.imageSrc}
              alt={slide.imageAlt}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-30 filter scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-95`} />

            {/* Ambient Background Glow Effect */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Left/Content Column */}
            <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {slide.badge}
              </div>

              <div className="space-y-2 sm:space-y-3 rtl:space-y-4">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight rtl:leading-[1.8] rtl:text-xl rtl:sm:text-3xl rtl:lg:text-4xl">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-xl font-medium text-emerald-300/90 rtl:leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {slide.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to={slide.ctaLink}>
                  <Button variant="primary" size="md" icon={<ArrowIcon className="w-4 h-4" />}>
                    {slide.ctaText}
                  </Button>
                </Link>
                <Link to="/tenders">
                  <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
                    {t('nav.tenders')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Graphic / Floating Card with Real Image (Desktop) */}
            <div className={`hidden lg:flex relative z-10 items-center justify-center flex-1 ${isRTL ? 'pr-12' : 'pl-12'}`}>
              <div className="relative p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl max-w-sm space-y-4 transform hover:scale-105 transition-all duration-300">
                <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/20 shadow-inner relative group">
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 text-xs font-semibold text-white drop-shadow">
                    {slide.badge}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    {isRTL ? 'قومی اسٹریٹجک اثاثہ' : 'National Strategic Asset'}
                  </div>
                  <div className="text-base font-bold text-white">
                    {slide.title}
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2 text-xs text-slate-300 border-t border-white/10">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {isRTL ? 'فعال' : 'Operational'}
                  </span>
                  <span>•</span>
                  <span>{isRTL ? 'حکومتِ پاکستان' : 'Govt. of Pakistan'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={isRTL ? nextSlide : prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={isRTL ? prevSlide : nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Modern Pill Progress Dots */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? 'w-6 sm:w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
