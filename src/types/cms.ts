export interface NewsItem {
  id: string;
  title: string;
  category: 'Announcement' | 'Press Release' | 'Corrigendum' | 'Service Alert' | 'Procurement';
  date: string;
  summary: string;
  priority: 'breaking' | 'high' | 'normal';
  isPublished: boolean;
  linkUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Cyber Security' | 'Cloud & Data Center' | 'National Telecom Policy' | 'Digital Transformation';
  author: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  summary: string;
  content: string;
  isFeatured: boolean;
}

export interface HomePageConfig {
  announcementTicker: {
    enabled: boolean;
    text: string;
    badge: string;
    linkText?: string;
    linkUrl?: string;
  };
  heroSpotlight: {
    enabled: boolean;
    headline: string;
    subtext: string;
    badge: string;
    ctaText: string;
    ctaUrl: string;
  };
}
