import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { TopBar } from './components/layout/TopBar';
import { AnnouncementTicker } from './components/home/AnnouncementTicker';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ThemeCustomizer } from './components/customizer/ThemeCustomizer';
import { AccessibilityWidget } from './components/accessibility/AccessibilityWidget';

// Lazy load route pages for maximum speed and sub-second initial bundle
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const TendersPage = lazy(() => import('./pages/TendersPage').then(m => ({ default: m.TendersPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AdminPortalPage = lazy(() => import('./pages/admin/AdminPortalPage').then(m => ({ default: m.AdminPortalPage })));

const LoadingSpinner = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
    <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Loading NTC Portal...</span>
  </div>
);

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AccessibilityProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
              {/* Top Info Bar with Language & Emergency Helpline */}
              <TopBar />

              {/* Real-Time Breaking News & Announcement Ticker (CMS Driven) */}
              <AnnouncementTicker />

              {/* Sticky Navigation */}
              <Navbar />

              {/* Main Route Content */}
              <main className="flex-1">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tenders" element={<TendersPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    
                    {/* Private Administrator & Executive Officer Portals (Hidden from Public Menus) */}
                    <Route path="/portal-admin-secure" element={<AdminPortalPage />} />
                    <Route path="/officer-portal" element={<AdminPortalPage />} />
                    
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </Suspense>
              </main>

              {/* Footer */}
              <Footer />

              {/* Built-in UserWay Accessibility Suite (Screen reader, text sizing, contrast, reading mask) */}
              <AccessibilityWidget />

              {/* Floating Live Theme & Color Customizer */}
              <ThemeCustomizer />
            </div>
          </BrowserRouter>
        </AccessibilityProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
