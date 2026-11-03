import React, { useState, useEffect, useMemo } from 'react';
import { FileText, ShieldAlert, AlertCircle } from 'lucide-react';
import { Tender, TenderCategory, TenderFilterState } from '../types/tender';
import { getAllTenders } from '../services/tenderStorage';
import { CMS_CHANGE_EVENT } from '../services/cmsStorage';
import { TenderFilters } from '../components/tenders/TenderFilters';
import { TenderTable } from '../components/tenders/TenderTable';
import { TenderPDFViewer } from '../components/tenders/TenderPDFViewer';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES: TenderCategory[] = [
  'All',
  'IT & Software',
  'Data Center & Cloud',
  'Optical Fiber & Media',
  'Power & Batteries',
  'Civil & Maintenance',
];

export const TendersPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<TenderFilterState>({
    searchQuery: '',
    category: 'All',
    status: 'all',
    sortBy: 'closingDateAsc',
  });

  const loadData = () => {
    getAllTenders()
      .then((data) => {
        setTenders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load tenders', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
    window.addEventListener(CMS_CHANGE_EVENT, loadData);
    return () => window.removeEventListener(CMS_CHANGE_EVENT, loadData);
  }, []);

  const filteredTenders = useMemo(() => {
    return tenders
      .filter((tender) => {
        // Search query match
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesTitle = tender.title.toLowerCase().includes(q);
          const matchesRef = tender.refNo.toLowerCase().includes(q);
          const matchesCategory = tender.category.toLowerCase().includes(q);
          if (!matchesTitle && !matchesRef && !matchesCategory) return false;
        }

        // Category filter
        if (filters.category !== 'All' && tender.category !== filters.category) {
          return false;
        }

        // Status filter
        if (filters.status !== 'all' && tender.status !== filters.status) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'closingDateAsc') {
          return new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime();
        }
        if (filters.sortBy === 'closingDateDesc') {
          return new Date(b.closingDate).getTime() - new Date(a.closingDate).getTime();
        }
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      });
  }, [tenders, filters]);

  return (
    <div className="py-8 sm:py-12 bg-slate-50/50 dark:bg-slate-950/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Page Banner Header */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-500/20">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <FileText className="w-3.5 h-3.5" />
              <span>{t('tenders.badge')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t('tenders.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('tenders.subtitle')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs space-y-2 max-w-xs shrink-0">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{isRTL ? 'پی پی آر اے اور ای پیڈز کے عین مطابق' : 'PPRA & E-PADS Compliant'}</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {isRTL
                ? 'تمام ٹینڈرز پبلک پرائیویٹ پروکیورمنٹ رولز 2004 کے تحت شائع کیے جاتے ہیں اور بولیاں شفافیت سے مانیٹر ہوتی ہیں۔'
                : 'Tenders are published in accordance with Public Procurement Rules 2004. Bidders must register through the EPADS system.'}
            </p>
          </div>
        </div>

        {/* Live Filter Bar */}
        <TenderFilters
          filters={filters}
          onChange={setFilters}
          categories={CATEGORIES}
          totalResults={filteredTenders.length}
        />

        {/* Tender Listing */}
        {loading ? (
          <div className="text-center py-24 space-y-3">
            <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-500">
              {isRTL ? 'ٹینڈرز لوڈ ہو رہے ہیں...' : 'Loading active tenders...'}
            </p>
          </div>
        ) : (
          <TenderTable
            tenders={filteredTenders}
            onViewPdf={(t) => setSelectedTender(t)}
          />
        )}

        {/* Contractor Advisory Note */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-xs text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div className="space-y-1.5 rtl:space-y-2.5 leading-relaxed rtl:leading-loose">
            <span className="font-bold block">{isRTL ? 'تمام بولی دہندگان کے لیے اہم ہدایت:' : 'Notice to All Bidders:'}</span>
            <p>
              {isRTL
                ? 'تمام تجاویز اور بولیاں مطلوبہ سیکیورٹی بیانہ کے ساتھ ای پیڈز پورٹل پر جمع ہونی چاہئیں۔ نامکمل یا تاخیر سے جمع کروائی گئی بولیاں قبول نہیں کی جائیں گی۔ تمام بولیاں این ٹی سی ہیڈ کوارٹرز، سیکٹر G-5/2 اسلام آباد میں کھولی جائیں گی۔'
                : 'All bids must be accompanied by the required bid security as specified in the respective tender document. Late or incomplete bids shall not be accepted. Bids will be opened publicly via E-PADS at NTC Headquarters, Sector G-5/2, Islamabad.'}
            </p>
          </div>
        </div>
      </div>

      {/* Embedded In-App PDF Viewer Modal */}
      <TenderPDFViewer
        tender={selectedTender}
        isOpen={Boolean(selectedTender)}
        onClose={() => setSelectedTender(null)}
      />
    </div>
  );
};
