import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Printer, FileText, AlertCircle } from 'lucide-react';
import { Tender } from '../../types/tender';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { getTenderPdfUrl, revokeTenderPdfUrl } from '../../services/tenderStorage';

interface TenderPDFViewerProps {
  tender: Tender | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TenderPDFViewer: React.FC<TenderPDFViewerProps> = ({
  tender,
  isOpen,
  onClose,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    let loadedUrl = '';
    if (tender && isOpen) {
      setLoading(true);
      getTenderPdfUrl(tender)
        .then((url) => {
          if (active) {
            loadedUrl = url;
            setPdfUrl(url);
            setLoading(false);
          } else {
            revokeTenderPdfUrl(url);
          }
        })
        .catch((err) => {
          console.error('Failed to load PDF URL', err);
          if (active) setLoading(false);
        });
    }
    return () => {
      active = false;
      if (loadedUrl) {
        revokeTenderPdfUrl(loadedUrl);
      }
    };
  }, [tender, isOpen]);

  if (!tender) return null;

  const handlePrint = () => {
    const iframe = document.getElementById('tender-pdf-frame') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="6xl"
      title={
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900 dark:text-slate-100">
                Tender Document Preview
              </span>
              <Badge variant="emerald" size="sm">
                Ref: {tender.refNo}
              </Badge>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-normal truncate max-w-md">
              {tender.title}
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-[75vh]">
        {/* Document Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold">Category:</span>
            <span>{tender.category}</span>
            <span>•</span>
            <span className="font-semibold">Closing:</span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">{tender.closingDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Printer className="w-4 h-4" />}
              onClick={handlePrint}
            >
              Print
            </Button>

            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Open in New Tab
              </Button>
            </a>

            <a href={pdfUrl} download={tender.fileName || `${tender.refNo}.pdf`}>
              <Button
                variant="primary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
              >
                Download PDF
              </Button>
            </a>
          </div>
        </div>

        {/* Document Embedded Container */}
        <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 relative">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Loading tender document...
              </p>
            </div>
          ) : pdfUrl.match(/\.(png|jpe?g)$/i) ? (
            <div className="w-full h-full overflow-auto p-4 flex flex-col items-center justify-center bg-slate-900/95">
              <div className="text-xs font-semibold text-emerald-400 mb-2">
                Official Scanned Tender Notice Published by NTC
              </div>
              <img
                src={pdfUrl}
                alt={tender.title}
                className="max-w-full max-h-[60vh] object-contain shadow-2xl rounded-lg border border-slate-700 bg-white"
              />
            </div>
          ) : pdfUrl.match(/\.(docx?)$/i) ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4 bg-white dark:bg-slate-900">
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                <FileText className="w-14 h-14" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Official Tender Dossier (.doc format)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This tender document was officially issued by NTC Directorate in Word format ({tender.fileName}). Click below to download the official document directly.
                </p>
              </div>
              <a href={pdfUrl} download={tender.fileName}>
                <Button variant="primary" size="lg" icon={<Download className="w-4 h-4" />}>
                  Download Document ({((tender.fileSizeBytes || 0) / 1024).toFixed(0)} KB)
                </Button>
              </a>
            </div>
          ) : (
            <>
              <iframe
                id="tender-pdf-frame"
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={`Tender PDF: ${tender.title}`}
                sandbox="allow-scripts allow-popups allow-downloads"
              />

              {/* Fallback download banner if iframe is restricted */}
              <div className="hidden supports-no-pdf:flex absolute inset-0 bg-white dark:bg-slate-900 flex-col items-center justify-center p-6 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-amber-500" />
                <h3 className="text-lg font-bold">PDF Preview</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Your device browser does not support embedded PDF view. Click below to download the tender file.
                </p>
                <a href={pdfUrl} download={tender.fileName}>
                  <Button variant="primary">Download Document ({tender.fileName})</Button>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
