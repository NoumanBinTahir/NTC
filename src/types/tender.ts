export type TenderCategory = 
  | 'All'
  | 'IT & Software'
  | 'Data Center & Cloud'
  | 'Optical Fiber & Media'
  | 'Power & Batteries'
  | 'Civil & Maintenance'
  | 'Security & Surveillance';

export type TenderStatus = 'active' | 'closing-soon' | 'closed' | 'corrigendum';

export interface Tender {
  id: string;
  refNo: string;
  type: string; // e.g., "Invitation To E-Bids", "RFP", "EOI"
  title: string;
  category: TenderCategory;
  publishedDate: string;
  closingDate: string;
  status: TenderStatus;
  corrigendumNotes?: string;
  pdfUrl: string; // Blob URL or static asset URL
  fileName: string;
  fileSizeBytes?: number;
  uploadedAt: string;
  isUploadedByUser?: boolean;
}

export interface TenderFilterState {
  searchQuery: string;
  category: TenderCategory;
  status: 'all' | 'active' | 'closed' | 'corrigendum';
  sortBy: 'closingDateAsc' | 'closingDateDesc' | 'publishedDesc';
}
