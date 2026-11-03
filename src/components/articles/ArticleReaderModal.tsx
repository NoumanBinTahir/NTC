import React from 'react';
import { Calendar, User, Clock, BookOpen } from 'lucide-react';
import { Article } from '../../types/cms';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ArticleReaderModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  isOpen,
  onClose,
}) => {
  if (!article) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <Badge variant="emerald" size="sm">
              {article.category}
            </Badge>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
              {article.title}
            </h3>
          </div>
        </div>
      }
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
        {/* Article Header & Metadata */}
        <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-emerald-500" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{article.publishedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        {article.coverImage && (
          <div className="rounded-2xl overflow-hidden bg-slate-900 h-64 sm:h-80 w-full relative shadow-md">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Lead Summary */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-sm font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed italic">
          "{article.summary}"
        </div>

        {/* Body Content */}
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {article.content.split('\n\n').map((paragraph) => {
            const pKey = `${article.id}-p-${paragraph.slice(0, 28).replace(/[^\w-]/g, '')}`;
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={pKey} className="text-lg font-bold text-slate-900 dark:text-white pt-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            return <p key={pKey}>{paragraph}</p>;
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Published by National Telecommunication Corporation Technical Secretariat
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Reader
          </Button>
        </div>
      </div>
    </Modal>
  );
};
