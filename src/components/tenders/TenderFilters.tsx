import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { TenderCategory, TenderFilterState } from '../../types/tender';
import { useLanguage } from '../../context/LanguageContext';

interface TenderFiltersProps {
  filters: TenderFilterState;
  onChange: (updated: TenderFilterState) => void;
  categories: TenderCategory[];
  totalResults: number;
}

export const TenderFilters: React.FC<TenderFiltersProps> = ({
  filters,
  onChange,
  categories,
  totalResults,
}) => {
  const { t, isRTL } = useLanguage();

  const statusTabs = [
    { id: 'all', label: isRTL ? 'تمام ٹینڈرز' : 'All Tenders' },
    { id: 'active', label: t('tenders.statusActive') },
    { id: 'corrigendum', label: t('tenders.statusCorrigendum') },
    { id: 'closed', label: t('tenders.statusClosed') },
  ] as const;

  return (
    <div className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={t('tenders.searchPlaceholder')}
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 overflow-x-auto w-full md:w-auto">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange({ ...filters, status: tab.id })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filters.status === tab.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories & Sorting bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 pe-1">
            <Filter className="w-3.5 h-3.5" /> {isRTL ? 'شعبہ:' : 'Sector:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filters.category === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat === 'All' && isRTL ? 'تمام کیٹیگریز' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 ms-auto">
          <span>
            {isRTL ? (
              <>تعداد: <strong>{totalResults}</strong> نوٹسز</>
            ) : (
              <>Found <strong>{totalResults}</strong> tender{totalResults === 1 ? '' : 's'}</>
            )}
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <select
              id="tender-sort-select"
              aria-label={isRTL ? 'ترتیب منتخب کریں' : 'Sort tenders by'}
              value={filters.sortBy}
              onChange={(e) =>
                onChange({ ...filters, sortBy: e.target.value as TenderFilterState['sortBy'] })
              }
              className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="closingDateAsc" className="dark:bg-slate-900">
                {isRTL ? 'قریب ترین آخری تاریخ' : 'Closing Soonest'}
              </option>
              <option value="closingDateDesc" className="dark:bg-slate-900">
                {isRTL ? 'دور ترین آخری تاریخ' : 'Closing Latest'}
              </option>
              <option value="publishedDesc" className="dark:bg-slate-900">
                {isRTL ? 'حالیہ شائع شدہ' : 'Recently Published'}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
