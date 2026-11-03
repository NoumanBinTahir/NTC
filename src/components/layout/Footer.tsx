import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      {/* 24x7 Call Center Banner */}
      <div className="bg-gradient-to-r from-emerald-900/60 to-slate-900 border-b border-emerald-500/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {t('contact.helplineTitle')}
              </h3>
              <p className="text-sm text-slate-300">
                {t('contact.helplineSub')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors duration-150 shadow-md"
            >
              {t('nav.contact')}
            </Link>
            <Link
              to="/tenders"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors duration-150 shadow-md"
            >
              {t('hero.ctaPrimary')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About NTC */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/ntc-logo-dark.png"
                alt="National Telecommunication Corporation"
                className="h-12 w-auto object-contain flex-shrink-0"
              />
              <div className="flex flex-col space-y-1">
                <span className="font-extrabold text-xl text-white tracking-wider leading-tight rtl:leading-normal">{t('nav.ntc')}</span>
                <span className="block text-[11px] text-slate-400 font-medium leading-tight rtl:leading-normal">{t('nav.govt')}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed rtl:leading-loose">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400 font-semibold">
              <Award className="w-4 h-4" />
              <span>ISO/IEC 27001:2022 Certified</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 rtl:space-y-3.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/tenders" className="hover:text-emerald-400 transition-colors">{t('nav.tenders')}</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">{t('nav.services')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: National Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('footer.nationalServices')}
            </h4>
            <ul className="space-y-2.5 rtl:space-y-3.5 text-xs text-slate-400">
              <li>{t('services.card1Title')}</li>
              <li>{t('services.card2Title')}</li>
              <li>{t('services.card3Title')}</li>
              <li>{t('services.card4Title')}</li>
              <li>{t('services.card5Title')}</li>
            </ul>
          </div>

          {/* Column 4: Official Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('footer.headquarters')}
            </h4>
            <div className="space-y-2.5 rtl:space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>NTC HQs, Sector G-5/2 & F-5/1, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Tel: +92-51-9245555 | UAN: 1218</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Email: Webmaster@ntc.net.pk</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://pmdu.gov.pk"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>{t('footer.pmdu')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t('footer.rights')}
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400">{t('footer.privacy')}</Link>
            <Link to="/about" className="hover:text-slate-400">{t('footer.terms')}</Link>
            <Link to="/contact" className="hover:text-slate-400">{t('footer.helpline')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
