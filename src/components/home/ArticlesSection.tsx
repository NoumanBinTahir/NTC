import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Article } from '../../types/cms';
import { getArticles, CMS_CHANGE_EVENT } from '../../services/cmsStorage';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ArticleReaderModal } from '../articles/ArticleReaderModal';
import { useLanguage } from '../../context/LanguageContext';

export const ArticlesSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [articles, setArticles] = useState<Article[]>(getArticles());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const handleUpdate = () => {
      setArticles(getArticles());
    };
    window.addEventListener(CMS_CHANGE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_CHANGE_EVENT, handleUpdate);
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 rtl:space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              {t('articles.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('articles.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed rtl:leading-loose">
              {t('articles.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((art) => (
            <Card
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group cursor-pointer overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-500 transition-all p-0"
            >
              <div>
                <div className="h-48 w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 start-3">
                    <Badge variant="emerald" size="sm">
                      {art.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{art.publishedDate}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-normal">
                  <User className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{art.author}</span>
                </span>

                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{t('articles.readArticle')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ArticleReaderModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
