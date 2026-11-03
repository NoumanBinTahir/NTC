import React, { useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Volume2 } from 'lucide-react';
import { getHomeConfig, getNews, subscribeCms } from '../../services/cmsStorage';

export const AnnouncementTicker: React.FC = () => {
  const config = useSyncExternalStore(subscribeCms, getHomeConfig);
  const news = useSyncExternalStore(subscribeCms, getNews);

  if (!config.announcementTicker.enabled) return null;

  const breakingNews = news.find(n => n.priority === 'breaking' && n.isPublished);
  const displayText = breakingNews ? breakingNews.title : config.announcementTicker.text;
  const badgeText = breakingNews ? 'Breaking Update' : config.announcementTicker.badge;
  const linkUrl = config.announcementTicker.linkUrl || '/tenders';

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider flex-shrink-0 animate-pulse">
            <Volume2 className="w-3 h-3" />
            <span>{badgeText}</span>
          </div>

          <div className="truncate font-medium text-slate-200">
            {displayText}
          </div>
        </div>

        <Link
          to={linkUrl}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex-shrink-0 transition-colors"
        >
          <span>{config.announcementTicker.linkText || 'Read Details'}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
