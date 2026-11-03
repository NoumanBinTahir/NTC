import { NewsItem, Article, HomePageConfig } from '../types/cms';

const NEWS_KEY = 'ntc_cms_news_v1';
const ARTICLES_KEY = 'ntc_cms_articles_v1';
const HOME_CONFIG_KEY = 'ntc_cms_home_config_v1';
export const CMS_CHANGE_EVENT = 'ntc_cms_updated';

export const subscribeCms = (callback: () => void) => {
  window.addEventListener(CMS_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CMS_CHANGE_EVENT, callback);
};

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'NTC Migrates Entire Procurement System to Federal E-PADS (PPRA)',
    category: 'Procurement',
    date: '2026-10-31',
    summary: 'In compliance with PPRA directions, all prospective bidders must submit electronic bids exclusively through the E-PADS portal.',
    priority: 'breaking',
    isPublished: true,
    linkUrl: 'https://eprocure.gov.pk',
  },
  {
    id: 'news-2',
    title: 'ISO/IEC 27001:2022 Surveillance Audit Successfully Cleared for National Data Center',
    category: 'Announcement',
    date: '2026-10-25',
    summary: 'The National Data Center Islamabad and DRC Lahore successfully maintained international information security compliance with zero non-conformities.',
    priority: 'high',
    isPublished: true,
  },
  {
    id: 'news-3',
    title: 'NTC Expands High-Speed Optical Fiber Ring to 12 New Districts in Balochistan & KP',
    category: 'Press Release',
    date: '2026-10-18',
    summary: 'Phase-IV of sovereign inter-district telecommunication network brings military-grade connectivity to regional government offices.',
    priority: 'normal',
    isPublished: true,
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Strengthening Sovereign Cloud Infrastructure: Inside NTC’s Tier III National Data Center',
    category: 'Cloud & Data Center',
    author: 'Director Data Center Services',
    publishedDate: '2026-10-28',
    readTime: '5 min read',
    coverImage: '/images/slider-datacenter.jpg',
    summary: 'How Pakistan protects state data, military workloads, and e-governance applications through domestic infrastructure without reliance on foreign cloud servers.',
    content: `Under the vision of Digital Pakistan and sovereign data governance, the National Telecommunication Corporation (NTC) operates the foremost Tier III National Data Center in Islamabad alongside a real-time Disaster Recovery Center (DRC) in Lahore.

### Sovereign Cloud vs. Foreign Commercial Clouds
Critical federal government datasets—including national registries, judicial records, defense communications, and cabinet archives—cannot be subjected to international jurisdictional overreach or off-shore cloud tap points. NTC provides physically isolated, encrypted colocation and Infrastructure as a Service (IaaS) adhering strictly to ISO/IEC 27001 standards.

### Dual-Power and N+1 Redundancy
With dual independent 11kV commercial grid feeds, uninterruptible rotary battery systems, and on-site fuel reserves guaranteeing 72+ continuous operational hours, NTC Data Center delivers 99.982% uptime SLA to over 150 ministries and state bodies.`,
    isFeatured: true,
  },
  {
    id: 'art-2',
    title: 'The Backbone of Federal Governance: Optical Fiber Self-Healing Rings Explained',
    category: 'National Telecom Policy',
    author: 'Technical Operations Directorate',
    publishedDate: '2026-10-20',
    readTime: '4 min read',
    coverImage: '/images/slider-optical.jpg',
    summary: 'Deep dive into DWDM optical transmission infrastructure and 50-millisecond automatic protection switching across northern and southern axes.',
    content: `NTC’s nationwide optical transmission backbone spans over 5,000 government installations across 100+ cities. The network is architected using Dense Wavelength Division Multiplexing (DWDM) in self-healing optical rings.

### Instant Protection Switching
In the event of an inadvertent fiber cut due to highway construction or civil works, optical protection switches automatically re-route traffic within 50 milliseconds—completely transparent to government video conferencing, e-Office document signing, and data transmission.`,
    isFeatured: true,
  },
  {
    id: 'art-3',
    title: 'Securing Pakistan’s Local Language Cyberspace: ccTLD .پاکستان Sovereign Administration',
    category: 'Cyber Security',
    author: 'Sovereign Domain Registry Desk',
    publishedDate: '2026-10-15',
    readTime: '3 min read',
    coverImage: '/images/dot-pakistan.jpg',
    summary: 'The technical and cultural importance of administering the Urdu country code Top-Level Domain (ccTLD) under sovereign mandate.',
    content: `To ensure inclusive digital access for non-English speakers and reinforce national identity in global root servers, NTC serves as the statutory administrator of the .پاکستان internationalized domain name (IDN).

Equipped with DNSSEC zone signing, redundant anycast root nameservers, and direct coordination with ICANN, NTC ensures Pakistan’s sovereign domain space remains resilient against DNS cache poisoning and distributed denial-of-service (DDoS) vectors.`,
    isFeatured: false,
  },
];

export const INITIAL_HOME_CONFIG: HomePageConfig = {
  announcementTicker: {
    enabled: true,
    text: 'E-PADS NOTICE: All prospective bidders for NTC tenders must submit technical & financial bids via PPRA e-procurement portal.',
    badge: 'Official Directive',
    linkText: 'Read Tender Guidelines',
    linkUrl: '/tenders',
  },
  heroSpotlight: {
    enabled: true,
    headline: 'Digital Pakistan Sovereign Network: 100+ Cities Connected',
    subtext: 'Providing secure telecom, leased lines, Tier III cloud hosting, and e-Office infrastructure to federal and provincial governments.',
    badge: 'National Backbone',
    ctaText: 'Explore Official Mandate',
    ctaUrl: '/about',
  },
};

let cachedNews: NewsItem[] | null = null;
let cachedArticles: Article[] | null = null;
let cachedConfig: HomePageConfig | null = null;

export function dispatchCmsChange() {
  window.dispatchEvent(new CustomEvent(CMS_CHANGE_EVENT));
}

// News
export function getNews(): NewsItem[] {
  if (cachedNews) return cachedNews;
  try {
    const data = localStorage.getItem(NEWS_KEY);
    if (!data) {
      localStorage.setItem(NEWS_KEY, JSON.stringify(INITIAL_NEWS));
      cachedNews = INITIAL_NEWS;
      return cachedNews;
    }
    cachedNews = JSON.parse(data);
    return cachedNews || INITIAL_NEWS;
  } catch {
    cachedNews = INITIAL_NEWS;
    return cachedNews;
  }
}

export function saveNews(newsList: NewsItem[]): void {
  cachedNews = newsList;
  localStorage.setItem(NEWS_KEY, JSON.stringify(newsList));
  dispatchCmsChange();
}

// Articles
export function getArticles(): Article[] {
  if (cachedArticles) return cachedArticles;
  try {
    const data = localStorage.getItem(ARTICLES_KEY);
    if (!data) {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(INITIAL_ARTICLES));
      cachedArticles = INITIAL_ARTICLES;
      return cachedArticles;
    }
    cachedArticles = JSON.parse(data);
    return cachedArticles || INITIAL_ARTICLES;
  } catch {
    cachedArticles = INITIAL_ARTICLES;
    return cachedArticles;
  }
}

export function saveArticles(articlesList: Article[]): void {
  cachedArticles = articlesList;
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articlesList));
  dispatchCmsChange();
}

// Home Config
export function getHomeConfig(): HomePageConfig {
  if (cachedConfig) return cachedConfig;
  try {
    const data = localStorage.getItem(HOME_CONFIG_KEY);
    if (!data) {
      localStorage.setItem(HOME_CONFIG_KEY, JSON.stringify(INITIAL_HOME_CONFIG));
      cachedConfig = INITIAL_HOME_CONFIG;
      return cachedConfig;
    }
    cachedConfig = JSON.parse(data);
    return cachedConfig || INITIAL_HOME_CONFIG;
  } catch {
    cachedConfig = INITIAL_HOME_CONFIG;
    return cachedConfig;
  }
}

export function saveHomeConfig(config: HomePageConfig): void {
  cachedConfig = config;
  localStorage.setItem(HOME_CONFIG_KEY, JSON.stringify(config));
  dispatchCmsChange();
}
