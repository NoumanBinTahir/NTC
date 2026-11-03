import React from 'react';
import { Eye, Calendar, Tag, AlertTriangle, FileText } from 'lucide-react';
import { Tender } from '../../types/tender';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

interface TenderTableProps {
  tenders: Tender[];
  onViewPdf: (tender: Tender) => void;
}

export const TenderTable: React.FC<TenderTableProps> = ({ tenders, onViewPdf }) => {
  const { t, isRTL } = useLanguage();

  if (tenders.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
        <FileText className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          {isRTL ? 'کوئی ٹینڈر آپ کی تلاش سے مطابقت نہیں رکھتا' : 'No tenders match your filter criteria'}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {isRTL
            ? 'تلاش کے الفاظ تبدیل کریں یا اوپر موجود کیٹیگری ٹیب سے "تمام" منتخب کریں۔'
            : "Try clearing your search terms or selecting 'All' in the category tabs above."}
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: Tender['status'], notes?: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="emerald">{t('tenders.statusActive')}</Badge>;
      case 'closing-soon':
        return <Badge variant="amber">{t('tenders.statusClosingSoon')}</Badge>;
      case 'corrigendum':
        return (
          <Badge variant="purple" className="truncate max-w-[140px]" title={notes || t('tenders.statusCorrigendum')}>
            <AlertTriangle className="w-3 h-3" /> {t('tenders.statusCorrigendum')}
          </Badge>
        );
      case 'closed':
        return <Badge variant="slate">{t('tenders.statusClosed')}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-start text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 text-start">{t('tenders.refNo')}</th>
              <th className="px-6 py-4 text-start">{t('tenders.description')}</th>
              <th className="px-6 py-4 text-start">{t('tenders.category')}</th>
              <th className="px-6 py-4 text-start">{t('tenders.closingDate')}</th>
              <th className="px-6 py-4 text-start">{t('tenders.status')}</th>
              <th className="px-6 py-4 text-end">{t('tenders.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {tenders.map((tender) => (
              <tr
                key={tender.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                {/* Ref No */}
                <td className="px-6 py-4 font-mono font-bold text-xs text-slate-900 dark:text-slate-100 whitespace-nowrap text-start">
                  {tender.refNo}
                  {tender.isUploadedByUser && (
                    <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-normal">
                      {isRTL ? 'افسر اپ لوڈ' : 'Officer Upload'}
                    </span>
                  )}
                </td>

                {/* Title */}
                <td className="px-6 py-4 text-start">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 max-w-md leading-snug">
                    {tender.title}
                  </div>
                  {tender.corrigendumNotes && (
                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{tender.corrigendumNotes}</span>
                    </div>
                  )}
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {isRTL ? 'تاریخِ اشاعت: ' : 'Published: '} {tender.publishedDate}
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap text-start">
                  <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{tender.category}</span>
                  </span>
                </td>

                {/* Closing Date */}
                <td className="px-6 py-4 whitespace-nowrap text-start">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{tender.closingDate}</span>
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap text-start">
                  {getStatusBadge(tender.status, tender.corrigendumNotes)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-end whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onViewPdf(tender)}
                      icon={<Eye className="w-3.5 h-3.5" />}
                    >
                      {t('tenders.viewDoc')}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-3">
        {tenders.map((tender) => (
          <div
            key={tender.id}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {tender.refNo}
              </span>
              {getStatusBadge(tender.status, tender.corrigendumNotes)}
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {tender.title}
            </h4>

            {tender.corrigendumNotes && (
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{tender.corrigendumNotes}</span>
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
              <span>{tender.category}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {isRTL ? 'آخری تاریخ: ' : 'Due: '} {tender.closingDate}
              </span>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onViewPdf(tender)}
              icon={<Eye className="w-4 h-4" />}
              className="w-full"
            >
              {t('tenders.viewDoc')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
