import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, Lock, Unlock, FileText, Newspaper, BookOpen,
  LayoutTemplate, Plus, Trash2, CheckCircle2, Eye, Upload, Save,
  AlertTriangle, RefreshCw
} from 'lucide-react';
import { getAllTenders, deleteTender, toggleTenderStatus } from '../../services/tenderStorage';
import {
  getNews, saveNews, getArticles, saveArticles,
  getHomeConfig, saveHomeConfig, CMS_CHANGE_EVENT
} from '../../services/cmsStorage';
import { Tender } from '../../types/tender';
import { NewsItem, Article, HomePageConfig } from '../../types/cms';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { TenderUploadModal } from '../../components/tenders/TenderUploadModal';
import { TenderPDFViewer } from '../../components/tenders/TenderPDFViewer';

export const AdminPortalPage: React.FC = () => {
  // Authentication Barrier
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ntc_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'tenders' | 'news' | 'articles' | 'mainpage'>('tenders');

  // Datasets
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [homeConfig, setHomeConfig] = useState<HomePageConfig>(getHomeConfig());

  // Modals state
  const [uploadTenderOpen, setUploadTenderOpen] = useState(false);
  const [previewTender, setPreviewTender] = useState<Tender | null>(null);

  // News Modal State
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [newsForm, setNewsForm] = useState<Omit<NewsItem, 'id'>>({
    title: '',
    category: 'Announcement',
    date: new Date().toISOString().split('T')[0],
    summary: '',
    priority: 'normal',
    isPublished: true,
    linkUrl: '',
  });

  // Articles Modal State
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [articleForm, setArticleForm] = useState<Omit<Article, 'id'>>({
    title: '',
    category: 'Cloud & Data Center',
    author: 'Director Technical Secretariat',
    publishedDate: new Date().toISOString().split('T')[0],
    readTime: '4 min read',
    coverImage: '/images/slider-datacenter.jpg',
    summary: '',
    content: '',
    isFeatured: true,
  });

  // Success Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = () => {
    getAllTenders().then(setTenders);
    setNews(getNews());
    setArticles(getArticles());
    setHomeConfig(getHomeConfig());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleCmsUpdate = () => {
      setNews(getNews());
      setArticles(getArticles());
      setHomeConfig(getHomeConfig());
    };
    window.addEventListener(CMS_CHANGE_EVENT, handleCmsUpdate);
    return () => window.removeEventListener(CMS_CHANGE_EVENT, handleCmsUpdate);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Officer Passcode: ntc2026
    if (passcode.trim() === 'ntc2026' || passcode.trim() === 'admin') {
      sessionStorage.setItem('ntc_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError(false);
      loadData();
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ntc_admin_auth');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Tender handlers
  const handleDeleteTender = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this procurement notice?')) {
      await deleteTender(id);
      loadData();
      showToast('Tender deleted successfully.');
    }
  };

  const handleStatusChange = async (id: string, status: Tender['status']) => {
    await toggleTenderStatus(id, status);
    loadData();
    showToast(`Tender status changed to ${status}.`);
  };

  // News handlers
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: NewsItem = {
      ...newsForm,
      id: `news-${Date.now()}`,
    };
    const updated = [newItem, ...news];
    saveNews(updated);
    setNews(updated);
    setNewsModalOpen(false);
    setNewsForm({
      title: '',
      category: 'Announcement',
      date: new Date().toISOString().split('T')[0],
      summary: '',
      priority: 'normal',
      isPublished: true,
      linkUrl: '',
    });
    showToast('News announcement published successfully.');
  };

  const handleDeleteNews = (id: string) => {
    if (window.confirm('Delete this news notice?')) {
      const updated = news.filter((n) => n.id !== id);
      saveNews(updated);
      setNews(updated);
      showToast('News notice deleted.');
    }
  };

  const handleToggleNewsPublished = (id: string) => {
    const updated = news.map((n) =>
      n.id === id ? { ...n, isPublished: !n.isPublished } : n
    );
    saveNews(updated);
    setNews(updated);
  };

  // Article handlers
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const newArt: Article = {
      ...articleForm,
      id: `art-${Date.now()}`,
    };
    const updated = [newArt, ...articles];
    saveArticles(updated);
    setArticles(updated);
    setArticleModalOpen(false);
    setArticleForm({
      title: '',
      category: 'Cloud & Data Center',
      author: 'Director Technical Secretariat',
      publishedDate: new Date().toISOString().split('T')[0],
      readTime: '4 min read',
      coverImage: '/images/slider-datacenter.jpg',
      summary: '',
      content: '',
      isFeatured: true,
    });
    showToast('Article published successfully.');
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Delete this published article?')) {
      const updated = articles.filter((a) => a.id !== id);
      saveArticles(updated);
      setArticles(updated);
      showToast('Article deleted.');
    }
  };

  // Main Page Config handler
  const handleSaveHomeConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveHomeConfig(homeConfig);
    showToast('Main page alerts and spotlight updated live!');
  };

  // 1. If not authenticated, render the secure officer barrier
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full p-8 space-y-6 shadow-2xl border-slate-300 dark:border-slate-800">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              NTC Officer Authentication
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Restricted portal for authorized National Telecommunication Corporation administrative officers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Administrative Passcode *
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter officer passcode..."
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Invalid passcode. Please use authorized officer credentials (default: <strong>ntc2026</strong>).</span>
              </div>
            )}

            <Button variant="primary" size="lg" className="w-full" type="submit" icon={<Unlock className="w-4 h-4" />}>
              Verify & Enter Console
            </Button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            This private URL is not linked in public menus. Share discreetly.
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-slide-up text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>NTC Central Administrative CMS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Executive Officer Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Manage live tenders, publish official news bulletins, draft policy articles, and control the main page announcement ticker in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={<RefreshCw className="w-4 h-4" />} onClick={loadData}>
            Refresh
          </Button>
          <Button variant="danger" size="sm" icon={<Lock className="w-4 h-4" />} onClick={handleLogout}>
            Exit Console
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'tenders', label: 'Tenders & Procurement', icon: <FileText className="w-4 h-4" />, count: tenders.length },
          { id: 'news', label: 'News & Announcements', icon: <Newspaper className="w-4 h-4" />, count: news.length },
          { id: 'articles', label: 'Articles & Publications', icon: <BookOpen className="w-4 h-4" />, count: articles.length },
          { id: 'mainpage', label: 'Main Page Control', icon: <LayoutTemplate className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: TENDERS MANAGEMENT */}
      {activeTab === 'tenders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Procurement Notices & Live Tenders
              </h2>
              <p className="text-xs text-slate-500">
                Uploaded tender documents are instantly published to the public /tenders portal with in-app PDF preview.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={<Upload className="w-4 h-4" />}
              onClick={() => setUploadTenderOpen(true)}
            >
              + Upload New Tender PDF
            </Button>
          </div>

          <Card className="overflow-x-auto p-0 border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                  <th className="p-4">Tender Ref</th>
                  <th className="p-4">Title & Description</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Closing Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {tenders.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {t.refNo}
                    </td>
                    <td className="p-4 max-w-sm">
                      <div className="font-semibold text-slate-900 dark:text-white">{t.title}</div>
                      <div className="text-[11px] text-slate-500 truncate">{t.fileName}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">{t.category}</td>
                    <td className="p-4 font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap">
                      {t.closingDate}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={t.status}
                        onChange={(e) => handleStatusChange(t.id, e.target.value as any)}
                        className="text-xs px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                      >
                        <option value="active">Active</option>
                        <option value="closing-soon">Closing Soon</option>
                        <option value="corrigendum">Corrigendum</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setPreviewTender(t)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash2 className="w-3.5 h-3.5" />}
                        onClick={() => handleDeleteTender(t.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* TAB 2: NEWS & ANNOUNCEMENTS */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Official News & Bulletins
              </h2>
              <p className="text-xs text-slate-500">
                Breaking announcements automatically appear in the top alert ticker on the main page.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setNewsModalOpen(true)}
            >
              + Publish News Announcement
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n) => (
              <Card key={n.id} className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={n.priority === 'breaking' ? 'red' : n.priority === 'high' ? 'amber' : 'emerald'} size="sm">
                      {n.category} • {n.priority.toUpperCase()}
                    </Badge>
                    <span className="text-[11px] text-slate-400">{n.date}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                    {n.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleNewsPublished(n.id)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      n.isPublished ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {n.isPublished ? 'Published' : 'Hidden'}
                  </button>

                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={() => handleDeleteNews(n.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ARTICLES & PUBLICATIONS */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Articles & Strategic Thought Leadership
              </h2>
              <p className="text-xs text-slate-500">
                Articles appear on the main page for visitors and prospective partners to read.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setArticleModalOpen(true)}
            >
              + Create New Article
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <Card key={art.id} className="overflow-hidden p-0 flex flex-col justify-between">
                <div>
                  <div className="h-40 w-full overflow-hidden bg-slate-900">
                    <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-2">
                    <Badge variant="emerald" size="sm">
                      {art.category}
                    </Badge>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-400">By {art.author}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={() => handleDeleteArticle(art.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MAIN PAGE CONTROL CENTER */}
      {activeTab === 'mainpage' && (
        <form onSubmit={handleSaveHomeConfig} className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Main Page Alerts & Live Highlight Controls
            </h2>
            <p className="text-xs text-slate-500">
              Customize the announcements ticker and featured banner appearing at the top of the portal.
            </p>
          </div>

          {/* Top Ticker Settings */}
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Announcement Ticker (Top of Page)
              </h3>
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={homeConfig.announcementTicker.enabled}
                  onChange={(e) =>
                    setHomeConfig({
                      ...homeConfig,
                      announcementTicker: {
                        ...homeConfig.announcementTicker,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Active on Main Page</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Badge Label *"
                value={homeConfig.announcementTicker.badge}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    announcementTicker: {
                      ...homeConfig.announcementTicker,
                      badge: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Action Link Text"
                value={homeConfig.announcementTicker.linkText || ''}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    announcementTicker: {
                      ...homeConfig.announcementTicker,
                      linkText: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Action Link URL"
                value={homeConfig.announcementTicker.linkUrl || ''}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    announcementTicker: {
                      ...homeConfig.announcementTicker,
                      linkUrl: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Ticker Message Content *
              </label>
              <textarea
                rows={2}
                value={homeConfig.announcementTicker.text}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    announcementTicker: {
                      ...homeConfig.announcementTicker,
                      text: e.target.value,
                    },
                  })
                }
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>
          </Card>

          {/* Strategic Spotlight Banner Settings */}
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Strategic Spotlight Banner (Under Carousel)
              </h3>
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={homeConfig.heroSpotlight.enabled}
                  onChange={(e) =>
                    setHomeConfig({
                      ...homeConfig,
                      heroSpotlight: {
                        ...homeConfig.heroSpotlight,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Active on Main Page</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Headline *"
                value={homeConfig.heroSpotlight.headline}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    heroSpotlight: {
                      ...homeConfig.heroSpotlight,
                      headline: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Badge *"
                value={homeConfig.heroSpotlight.badge}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    heroSpotlight: {
                      ...homeConfig.heroSpotlight,
                      badge: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Subtext Description *
              </label>
              <textarea
                rows={2}
                value={homeConfig.heroSpotlight.subtext}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    heroSpotlight: {
                      ...homeConfig.heroSpotlight,
                      subtext: e.target.value,
                    },
                  })
                }
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="CTA Button Text"
                value={homeConfig.heroSpotlight.ctaText}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    heroSpotlight: {
                      ...homeConfig.heroSpotlight,
                      ctaText: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="CTA Button URL"
                value={homeConfig.heroSpotlight.ctaUrl}
                onChange={(e) =>
                  setHomeConfig({
                    ...homeConfig,
                    heroSpotlight: {
                      ...homeConfig.heroSpotlight,
                      ctaUrl: e.target.value,
                    },
                  })
                }
              />
            </div>
          </Card>

          <Button variant="primary" size="lg" type="submit" icon={<Save className="w-5 h-5" />}>
            Save & Publish Changes Live
          </Button>
        </form>
      )}

      {/* Tender Upload Modal */}
      <TenderUploadModal
        isOpen={uploadTenderOpen}
        onClose={() => setUploadTenderOpen(false)}
        onTenderCreated={() => {
          loadData();
          showToast('Tender uploaded and published successfully!');
        }}
      />

      {/* Tender Preview Modal */}
      <TenderPDFViewer
        isOpen={!!previewTender}
        tender={previewTender}
        onClose={() => setPreviewTender(null)}
      />

      {/* Create News Modal */}
      <Modal
        isOpen={newsModalOpen}
        onClose={() => setNewsModalOpen(false)}
        maxWidth="lg"
        title="Publish Official News Notice"
      >
        <form onSubmit={handleSaveNews} className="space-y-4">
          <Input
            label="Announcement Title *"
            required
            placeholder="e.g. NTC Establishes New Regional Optical Center..."
            value={newsForm.title}
            onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <select
                value={newsForm.category}
                onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              >
                <option value="Announcement">Announcement</option>
                <option value="Press Release">Press Release</option>
                <option value="Corrigendum">Corrigendum</option>
                <option value="Service Alert">Service Alert</option>
                <option value="Procurement">Procurement</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Priority *
              </label>
              <select
                value={newsForm.priority}
                onChange={(e) => setNewsForm({ ...newsForm, priority: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              >
                <option value="normal">Normal</option>
                <option value="high">High Priority</option>
                <option value="breaking">Breaking Alert (Top Ticker)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              News Summary *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Provide a concise briefing for visitors..."
              value={newsForm.summary}
              onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
            />
          </div>

          <Input
            label="External Link URL (Optional)"
            placeholder="https://..."
            value={newsForm.linkUrl || ''}
            onChange={(e) => setNewsForm({ ...newsForm, linkUrl: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" type="button" onClick={() => setNewsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Publish Notice
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Article Modal */}
      <Modal
        isOpen={articleModalOpen}
        onClose={() => setArticleModalOpen(false)}
        maxWidth="2xl"
        title="Draft Strategic Technology Publication"
      >
        <form onSubmit={handleSaveArticle} className="space-y-4">
          <Input
            label="Article Title *"
            required
            placeholder="e.g. Modernizing Government Cloud..."
            value={articleForm.title}
            onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <select
                value={articleForm.category}
                onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              >
                <option value="Cloud & Data Center">Cloud & Data Center</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="National Telecom Policy">National Telecom Policy</option>
                <option value="Digital Transformation">Digital Transformation</option>
              </select>
            </div>

            <Input
              label="Author / Directorate *"
              value={articleForm.author}
              onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
              required
            />
          </div>

          <Input
            label="Cover Image URL *"
            value={articleForm.coverImage}
            onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })}
            placeholder="/images/slider-datacenter.jpg"
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Brief Executive Summary *
            </label>
            <textarea
              rows={2}
              required
              placeholder="One or two sentences highlighting the core thesis..."
              value={articleForm.summary}
              onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Full Article Body Content (Markdown supported) *
            </label>
            <textarea
              rows={6}
              required
              placeholder="Use ### for subheadings and empty lines for paragraphs..."
              value={articleForm.content}
              onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" type="button" onClick={() => setArticleModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Publish Article
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
