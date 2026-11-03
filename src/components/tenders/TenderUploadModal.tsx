import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Tender, TenderCategory, TenderStatus } from '../../types/tender';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { saveTender } from '../../services/tenderStorage';

interface TenderUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTenderCreated: (newTender: Tender) => void;
}

const CATEGORIES: TenderCategory[] = [
  'IT & Software',
  'Data Center & Cloud',
  'Optical Fiber & Media',
  'Power & Batteries',
  'Civil & Maintenance',
  'Security & Surveillance',
];

export const TenderUploadModal: React.FC<TenderUploadModalProps> = ({
  isOpen,
  onClose,
  onTenderCreated,
}) => {
  const [title, setTitle] = useState('');
  const [refNo, setRefNo] = useState('');
  const [category, setCategory] = useState<TenderCategory>('IT & Software');
  const [closingDate, setClosingDate] = useState('');
  const [status, setStatus] = useState<TenderStatus>('active');
  const [corrigendumNotes, setCorrigendumNotes] = useState('');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF document (.pdf format only)');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds 25 MB limit.');
      return;
    }
    setError(null);
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !refNo.trim() || !closingDate) {
      setError('Please fill out all required fields (Title, Ref No, Closing Date).');
      return;
    }
    if (!selectedFile) {
      setError('Please attach a PDF tender document.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const created = await saveTender(
        {
          refNo: refNo.trim().toUpperCase(),
          type: 'Invitation To E-Bids',
          title: title.trim(),
          category,
          publishedDate: new Date().toISOString().split('T')[0],
          closingDate,
          status,
          corrigendumNotes: corrigendumNotes.trim() ? corrigendumNotes.trim() : undefined,
          fileName: selectedFile.name,
          fileSizeBytes: selectedFile.size,
          isUploadedByUser: true,
        },
        selectedFile
      );

      onTenderCreated(created);
      onClose();
      // Reset form
      setTitle('');
      setRefNo('');
      setClosingDate('');
      setSelectedFile(null);
      setCorrigendumNotes('');
    } catch (err) {
      console.error('Error creating tender', err);
      setError('Failed to save tender to storage. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-[var(--color-primary)]" />
          <span>Upload New Tender (Admin Portal)</span>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="EPADS / Tender Ref No. *"
            placeholder="e.g. P165890 or DIR-RWP/04/2026"
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label htmlFor="tender-category-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Category / Sector *
            </label>
            <select
              id="tender-category-select"
              aria-label="Category / Sector"
              value={category}
              onChange={(e) => setCategory(e.target.value as TenderCategory)}
              className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Tender Title & Scope *"
          placeholder="e.g. Procurement of High-Capacity Router Hardware for Regional Data Exchange"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Bid Submission Deadline *"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label htmlFor="tender-status-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Initial Status
            </label>
            <select
              id="tender-status-select"
              aria-label="Initial Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TenderStatus)}
              className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            >
              <option value="active">Active Bid</option>
              <option value="closing-soon">Closing Soon</option>
              <option value="corrigendum">Corrigendum Issued</option>
            </select>
          </div>
        </div>

        {status === 'corrigendum' && (
          <Input
            label="Corrigendum Extension Details"
            placeholder="e.g. Bid opening date extended till 30th November 2026."
            value={corrigendumNotes}
            onChange={(e) => setCorrigendumNotes(e.target.value)}
          />
        )}

        {/* Drag and drop file upload area */}
        <div className="space-y-1.5">
          <label htmlFor="tender-pdf-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Tender PDF Document *
          </label>

          <input
            id="tender-pdf-input"
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelected(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div
            role={!selectedFile ? 'button' : undefined}
            tabIndex={!selectedFile ? 0 : undefined}
            aria-label={!selectedFile ? 'Upload tender PDF document dropzone' : undefined}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !selectedFile && fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (!selectedFile && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors duration-150 ${
              !selectedFile ? 'cursor-pointer' : ''
            } ${
              dragActive
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : selectedFile
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800/40'
            }`}
          >
            {selectedFile ? (
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {selectedFile.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB • PDF Document attached
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove selected PDF file"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-4"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto text-slate-600 dark:text-slate-300">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Click to select or drag and drop tender PDF
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Only PDF files up to 25MB are accepted for official publishing
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" type="button" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? 'Publishing Tender...' : 'Publish to Tender Portal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
