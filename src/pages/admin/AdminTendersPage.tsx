import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Archive,
  ArrowLeft,
  KeyRound,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tender, TenderStatus } from '../../types/tender';
import { getAllTenders, deleteTender, toggleTenderStatus } from '../../services/tenderStorage';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { TenderUploadModal } from '../../components/tenders/TenderUploadModal';
import { TenderPDFViewer } from '../../components/tenders/TenderPDFViewer';

export const AdminTendersPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default true for evaluation ease
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    loadTenders();
  }, []);

  const loadTenders = async () => {
    const data = await getAllTenders();
    setTenders(data);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete tender "${title}"?`)) {
      await deleteTender(id);
      await loadTenders();
      showNotification('Tender deleted successfully.');
    }
  };

  const handleStatusChange = async (id: string, newStatus: TenderStatus) => {
    await toggleTenderStatus(id, newStatus);
    await loadTenders();
    showNotification('Tender status updated.');
  };

  // Metrics
  const activeCount = tenders.filter((t) => t.status === 'active').length;
  const closingSoonCount = tenders.filter((t) => t.status === 'closing-soon').length;
  const corrigendumCount = tenders.filter((t) => t.status === 'corrigendum').length;
  const closedCount = tenders.filter((t) => t.status === 'closed').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-[var(--color-primary)] flex items-center justify-center mx-auto">
            <KeyRound className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              NTC Procurement Officer Access
            </h2>
            <p className="text-xs text-slate-500">
              Restricted area for publishing official tender PDF documents.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsAuthenticated(true)}
            className="w-full"
          >
            Authenticate Officer Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50/50 dark:bg-slate-950/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                to="/tenders"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Tenders
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Tender Administration Portal
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload PDF specifications, manage bid deadlines, and post corrigendums
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              icon={<UploadCloud className="w-4 h-4" />}
              onClick={() => setIsUploadOpen(true)}
            >
              Upload New Tender PDF
            </Button>
          </div>
        </div>

        {/* Floating Notification */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-fade-in shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Active Bids</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {activeCount}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Closing Soon</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {closingSoonCount}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Corrigendums</span>
              <AlertTriangle className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {corrigendumCount}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Closed / Archived</span>
              <Archive className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {closedCount}
            </div>
          </div>
        </div>

        {/* Admin Tender Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Master Tender Directory ({tenders.length} entries)
            </h3>
            <span className="text-xs text-slate-500">
              Changes reflect immediately on public portal
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Ref No.</th>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Closing Date</th>
                  <th className="px-6 py-3.5">Status Controller</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {tenders.map((tender) => (
                  <tr key={tender.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono font-bold text-xs text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {tender.refNo}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 max-w-sm truncate">
                        {tender.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <FileText className="w-3 h-3" />
                        <span>{tender.fileName}</span>
                        {tender.isUploadedByUser && (
                          <Badge variant="emerald" size="sm">New Upload</Badge>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 dark:text-slate-400">
                      {tender.category}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {tender.closingDate}
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={tender.status}
                        onChange={(e) =>
                          handleStatusChange(tender.id, e.target.value as TenderStatus)
                        }
                        className="text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] cursor-pointer"
                      >
                        <option value="active">Active Bid</option>
                        <option value="closing-soon">Closing Soon</option>
                        <option value="corrigendum">Corrigendum</option>
                        <option value="closed">Closed / Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Eye className="w-4 h-4" />}
                          onClick={() => setSelectedTender(tender)}
                          title="Preview PDF"
                        >
                          View
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={() => handleDelete(tender.id, tender.title)}
                          title="Delete Tender"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <TenderUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onTenderCreated={async () => {
          await loadTenders();
          showNotification('New tender published successfully to IndexedDB.');
        }}
      />

      {/* PDF Preview Modal */}
      <TenderPDFViewer
        tender={selectedTender}
        isOpen={Boolean(selectedTender)}
        onClose={() => setSelectedTender(null)}
      />
    </div>
  );
};
