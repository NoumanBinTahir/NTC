import React, { useState } from 'react';
import { Award, Quote, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { useLanguage } from '../../context/LanguageContext';

export const MDMessage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-800/60 dark:to-emerald-950/20 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* MD Avatar / Profile Card */}
          <div className="flex-shrink-0 text-center space-y-3">
            <div className="relative inline-block">
              <div className="w-36 h-44 sm:w-44 sm:h-52 rounded-2xl bg-gradient-to-tr from-emerald-800 to-slate-800 p-1.5 shadow-2xl mx-auto overflow-hidden">
                <img
                  src="/images/ali-farhan-md.jpg"
                  alt={t('md.mdName')}
                  className="w-full h-full object-cover object-top rounded-xl shadow-inner"
                />
              </div>
              <div className={`absolute -bottom-2 ${isRTL ? '-left-2' : '-right-2'} p-2 rounded-xl bg-emerald-600 text-white shadow-lg border-2 border-white dark:border-slate-900`}>
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                {t('md.mdName')}
              </h3>
              <p className="text-xs text-[var(--color-primary)] font-semibold uppercase tracking-wider">
                {t('md.mdTitle')}
              </p>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              <Quote className="w-4 h-4" />
              <span>{t('md.sectionBadge')}</span>
            </div>

            <blockquote className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic border-s-4 border-[var(--color-primary)] ps-4">
              {t('md.quote')}
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isRTL
                ? 'وفاقی اور صوبائی حکومتوں، مسلح افواج اور حساس ترین اداروں کے سرکاری مواصلاتی نیٹ ورک کے طور پر، این ٹی سی آپٹیکل فائبر، خود مختار کلاؤڈ اور سائبر ڈیفنس کے شعبوں میں ملک کی سربراہی کر رہا ہے۔'
                : 'Serving as the official telecom and ICT backbone for the Federal and Provincial Governments, Armed Forces, and strategic institutions, NTC is accelerating optical modernization, cloud adoption, and national cybersecurity posture.'}
            </p>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                {isRTL ? 'منیجنگ ڈائریکٹر کا مکمل بیان پڑھیں' : "Read Full Managing Director's Message"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Message Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="2xl"
        title={isRTL ? 'منیجنگ ڈائریکٹر کا سرکاری پیغام' : "Managing Director's Official Statement"}
      >
        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <img
              src="/images/ali-farhan-md.jpg"
              alt={t('md.mdName')}
              className="w-14 h-16 rounded-xl object-cover object-top shadow-md border border-slate-200 dark:border-slate-700"
            />
            <div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {t('md.mdName')}
              </h4>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {t('md.mdTitle')}
              </p>
            </div>
          </div>

          <p>
            {isRTL ? (
              <><strong>نیشنل ٹیلی کمیونیکیشن کارپوریشن (NTC)</strong> حکومتِ پاکستان کا مجاز ادارہ ہے۔ ہمارا وسیع پورٹ فولیو فکسڈ ٹیلی فونی، گرین لائنز، براڈ بینڈ انٹرنیٹ، ای میل، ڈیٹا سینٹر سلوشنز، ویڈیو کانفرنسنگ، وی پی این، ریڈیو وائرلیس نیٹ ورکنگ، کو-لوکیشن، موبائل براڈ بینڈ اور کال سینٹر سروسز پر مشتمل ہے۔</>
            ) : (
              <>The <strong>National Telecommunication Corporation (NTC)</strong> serves as the official Telecom and ICT service provider for the Government of Pakistan. Our extensive service portfolio includes basic Telephony, Green Lines, Broadband Internet, Email, Intranet, Data Center Solutions, Video Conferencing, Virtual Private Networks (VPN), Radio Wireless Networking, Colocation, Mobile Broadband (MBB), SMS, and Call Center Services.</>
            )}
          </p>

          <p>
            {isRTL
              ? 'یہ خدمات وفاقی اور صوبائی حکومتوں، مسلح افواج، دفاعی منصوبوں اور دیگر تمام سرکاری اداروں کو فراہم کی جاتی ہیں۔'
              : 'These services are delivered to the Federal and Provincial Governments, Armed Forces, Defense-related projects, and other government entities as the Federal Government may determine.'}
          </p>

          <p>
            {isRTL ? (
              <>جدید صلاحیتیں جیسا کہ <strong>آرٹیفیشل انٹیلی جنس (AI)، 5G، جی پون (GPON) اور ایل ای او سیٹلائٹ کنیکٹیویٹی</strong>، اور ڈیٹا کے وسیع حجم کو ذخیرہ اور پروسیس کرنے کی طاقت، ہمارے کام کرنے کے انداز کو یکسر بدل رہی ہیں۔ این ٹی سی اس ڈیجیٹل انقلاب کے پیش نظر پاکستان بھر میں محفوظ ترین آئی سی ٹی انفراسٹرکچر فراہم کرنے کے لیے پرعزم ہے۔</>
            ) : (
              <>Modern capabilities like <strong>AI, 5G, GPON, and Low Earth Orbit (LEO) Satellite connectivity</strong>, as well as immense capacities to store, transmit, and process huge data volumes, are reshaping the way we think and operate. NTC stands resolute at the forefront of this digital revolution to provide sovereign, secure ICT infrastructure across Pakistan.</>
            )}
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              {t('md.milestonesTitle')}:
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>{t('md.m1Title')}:</strong> {t('md.m1Desc')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>{t('md.m2Title')}:</strong> {t('md.m2Desc')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>{t('md.m3Title')}:</strong> {t('md.m3Desc')}</span>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </section>
  );
};
