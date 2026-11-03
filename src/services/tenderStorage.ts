import { get, set } from 'idb-keyval';
import { Tender } from '../types/tender';
import { INITIAL_TENDERS } from './seedTenders';

const TENDERS_STORAGE_KEY = 'ntc_tenders_metadata_v1';
const PDF_BLOB_PREFIX = 'ntc_tender_pdf_blob_';

export async function getAllTenders(): Promise<Tender[]> {
  try {
    const stored = await get<Tender[]>(TENDERS_STORAGE_KEY);
    if (!stored || stored.length === 0) {
      // Seed default tenders
      await set(TENDERS_STORAGE_KEY, INITIAL_TENDERS);
      return INITIAL_TENDERS;
    }
    return stored;
  } catch (error) {
    console.warn('Failed to read tenders from IndexedDB, falling back to seeds', error);
    return INITIAL_TENDERS;
  }
}

export async function saveTender(
  tenderData: Omit<Tender, 'id' | 'uploadedAt' | 'pdfUrl'>,
  pdfFile?: File
): Promise<Tender> {
  const currentTenders = await getAllTenders();
  const id = `tender-upload-${Date.now()}`;
  
  let pdfUrl = '';
  if (pdfFile) {
    try {
      // Store raw binary in IndexedDB
      await set(`${PDF_BLOB_PREFIX}${id}`, pdfFile);
      pdfUrl = URL.createObjectURL(pdfFile);
    } catch (e) {
      console.error('Failed to store PDF blob in IndexedDB', e);
    }
  }

  const newTender: Tender = {
    ...tenderData,
    id,
    pdfUrl,
    fileName: pdfFile ? pdfFile.name : 'tender-document.pdf',
    fileSizeBytes: pdfFile ? pdfFile.size : 0,
    uploadedAt: new Date().toISOString(),
    isUploadedByUser: true,
  };

  const updatedTenders = [newTender, ...currentTenders];
  await set(TENDERS_STORAGE_KEY, updatedTenders);
  return newTender;
}

export async function getTenderPdfUrl(tender: Tender): Promise<string> {
  // If uploaded by user, check IndexedDB first
  if (tender.isUploadedByUser) {
    try {
      const blob = await get<Blob>(`${PDF_BLOB_PREFIX}${tender.id}`);
      if (blob) {
        return URL.createObjectURL(blob);
      }
    } catch (e) {
      console.warn('Failed to retrieve PDF blob from IndexedDB', e);
    }
  }

  if (tender.pdfUrl) {
    return tender.pdfUrl;
  }

  // Generate a dynamic placeholder PDF data URI as fallback
  return generatePlaceholderPdfDataUri(tender);
}

export async function deleteTender(id: string): Promise<void> {
  const current = await getAllTenders();
  const filtered = current.filter((t) => t.id !== id);
  await set(TENDERS_STORAGE_KEY, filtered);
}

export async function toggleTenderStatus(id: string, newStatus: Tender['status']): Promise<Tender[]> {
  const current = await getAllTenders();
  const updated = current.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
  await set(TENDERS_STORAGE_KEY, updated);
  return updated;
}

// Generate a valid minimal PDF Data URI on the fly so visitors can view realistic tender sheets
function generatePlaceholderPdfDataUri(tender: Tender): string {
  // Simple PDF 1.4 minimal byte document with text content
  const content = `
%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 320 >> stream
BT
/F1 20 Tf
50 720 Td
(GOVERNMENT OF PAKISTAN) Tj
/F1 16 Tf
0 -30 Td
(NATIONAL TELECOMMUNICATION CORPORATION) Tj
/F1 13 Tf
0 -40 Td
(TENDER REFERENCE: ${tender.refNo}) Tj
0 -25 Td
(TITLE: ${tender.title.replace(/[()]/g, '')}) Tj
0 -25 Td
(CATEGORY: ${tender.category}) Tj
0 -25 Td
(BID CLOSING DATE: ${tender.closingDate}) Tj
0 -40 Td
(For details, contact Director Procurement, NTC HQs, Islamabad.) Tj
ET
endstream
endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000615 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
694
%%EOF`;

  const blob = new Blob([content], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}
