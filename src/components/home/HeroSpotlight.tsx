import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { getHomeConfig, CMS_CHANGE_EVENT } from '../../services/cmsStorage';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSpotlight: React.FC = () => {
  const { isRTL } = useLanguage();
  const [config, setConfig] = useState(getHomeConfig());

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const handleUpdate = () => {
      setConfig(getHomeConfig());
    };
    window.addEventListener(CMS_CHANGE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_CHANGE_EVENT, handleUpdate);
  }, []);

  if (!config.heroSpotlight.enabled) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/30 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                {config.heroSpotlight.badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {config.heroSpotlight.headline}
              </h4>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
              {config.heroSpotlight.subtext}
            </p>
          </div>
        </div>

        <Link
          to={config.heroSpotlight.ctaUrl || '/about'}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shrink-0 shadow-sm"
        >
          <span>{config.heroSpotlight.ctaText || (isRTL ? 'مزید تفصیلات' : 'Learn More')}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
