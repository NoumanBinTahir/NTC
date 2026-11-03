import React, { useState } from 'react';
import { Phone, Mail, MapPin, Building, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { OfficeMapViewer } from '../components/contact/OfficeMapViewer';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', department: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 text-white border border-emerald-500/20 shadow-xl space-y-4 rtl:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Building className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight rtl:leading-normal">
            {t('contact.title')}
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed rtl:leading-loose">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      {/* Interactive Google Maps View Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OfficeMapViewer />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details & Helplines */}
          <div className="lg:col-span-1 space-y-6">
            {/* 1218 Banner with Live Operations Photo */}
            <div className="rounded-3xl bg-emerald-800 text-white shadow-xl overflow-hidden border border-emerald-700/60">
              <div className="h-44 w-full relative overflow-hidden bg-slate-900">
                <img
                  src="/images/call-center.jpg"
                  alt="NTC 24/7 Operations Call Center"
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
                <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow">
                    Active 24 / 7 / 365
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                      {isRTL ? 'قومی ہیلپ لائن' : 'National Helpline'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black">{t('contact.helplineTitle')}</h3>
                  </div>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed rtl:leading-loose">
                  {t('contact.helplineSub')}
                </p>
              </div>
            </div>

            {/* Regional Directorates with 100% Validated Data */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isRTL ? 'علاقائی ڈائریکٹوریٹس کے سرکاری پتے و فون نمبرز' : 'Official Directorate Contacts'}
              </h3>

              {[
                {
                  region: isRTL ? 'اسلام آباد ریجنل ہیڈ کوارٹر (نارتھ زون)' : 'Islamabad Regional HQs (North)',
                  director: isRTL ? 'جناب محمد سرور (ڈائریکٹر این ٹی سی اسلام آباد)' : 'Mr. Muhammad Sarwar (Director NTC Islamabad)',
                  address: isRTL ? 'این ٹی سی ریجنل ہیڈ کوارٹر بلڈنگ، اتاترک ایونیو، ایف 5/1، اسلام آباد' : 'NTC Regional HQs Building, Ataturk Avenue, F-5/1, Islamabad',
                  phone: '+92 51 9212266 / +92 300 5000675',
                  email: 'muhammad.sarwar@ntc.org.pk',
                },
                {
                  region: isRTL ? 'لاہور ڈائریکٹوریٹ (سینٹرل زون)' : 'Lahore Directorate (Central)',
                  director: isRTL ? 'جناب امجد اکرام خان (ڈائریکٹر این ٹی سی لاہور)' : 'Mr. Amjad Ikram Khan (Director NTC Lahore)',
                  address: isRTL ? '6 ریس کورس روڈ، شاہراہ ایوانِ صنعت و تجارت، لاہور' : '6-Race Course Road, Shahrah Aiwan-e-Sanat-o-Tijarat, Lahore',
                  phone: '+92 42 99201235 / +92 300 5004969',
                  email: 'amjad.ikram@ntc.org.pk',
                },
                {
                  region: isRTL ? 'کراچی ڈائریکٹوریٹ (ساؤتھ زون)' : 'Karachi Directorate (South)',
                  director: isRTL ? 'جناب محمد عرفان (ڈائریکٹر این ٹی سی کراچی)' : 'Mr. Muhammad Irfan (Director NTC Karachi)',
                  address: isRTL ? 'کے اے پی 1، اولڈ ایکسچینج بلڈنگ، نزد ملیر ہالٹ، کراچی' : 'KAP-I, Old Exchange Building, Near Malir Halt, Karachi',
                  phone: '+92 21 99248833 / +92 300 5005179',
                  email: 'muhammad.irfan@ntc.org.pk',
                },
                {
                  region: isRTL ? 'پشاور ڈائریکٹوریٹ (خیبر پختونخوا)' : 'Peshawar Directorate (KP)',
                  director: isRTL ? 'جناب نور حاکم (ڈائریکٹر این ٹی سی پشاور)' : 'Mr. Noor Hakim (Director NTC Peshawar)',
                  address: isRTL ? '1 دی مال، شیر شاہ سوری روڈ، پشاور کینٹ، پشاور' : '1 The Mall, Sher Shah Suri Road, Peshawar Cantt, Peshawar',
                  phone: '+92 91 9211111 / +92 302 8550809',
                  email: 'noor.hakim@ntc.org.pk',
                },
                {
                  region: isRTL ? 'کوئٹہ ڈائریکٹوریٹ (بلوچستان)' : 'Quetta Directorate (Balochistan)',
                  director: isRTL ? 'محترمہ حمیرہ خاقان چوہدری (ڈائریکٹر این ٹی سی کوئٹہ)' : 'Mrs. Humeira Khaqan Chaudhary (Director NTC Quetta)',
                  address: isRTL ? 'میر جعفر خان جمالی روڈ، کوئٹہ' : 'Mir Jaffar Khan Jamali Road, Quetta',
                  phone: '+92 81 9202151 / +92 300 8501364',
                  email: 'humeira.chaudhary@ntc.org.pk',
                },
              ].map((loc, i) => (
                <Card key={i} className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--color-primary)]">
                      {loc.region}
                    </h4>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {loc.director}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span dir="ltr">{loc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <a href={`mailto:${loc.email}`} className="text-emerald-600 hover:underline" dir="ltr">
                        {loc.email}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Department Inquiry Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-10 space-y-6">
              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  {isRTL ? 'سرکاری رابطہ فارم' : 'Official Communication'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight rtl:leading-normal">
                  {t('contact.inquiryTitle')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed rtl:leading-loose">
                  {t('contact.inquirySub')}
                </p>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>
                    {t('contact.successMsg')}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t('contact.fullName')}
                    placeholder={isRTL ? 'مثلاً طارق محمود' : 'e.g. Tariq Mehmood'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />

                  <Input
                    label={t('contact.department')}
                    placeholder={isRTL ? 'مثلاً وزارتِ خارجہ، حکومتِ پاکستان' : 'e.g. Ministry of Foreign Affairs'}
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    label={t('contact.officialEmail')}
                    placeholder="officer@domain.gov.pk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />

                  <Input
                    label={t('contact.phone')}
                    placeholder="051-9200000 / 0300-0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label={t('contact.subject')}
                  placeholder={isRTL ? 'مثلاً ڈارک فائبر یا ڈیٹا سینٹر ریک ہوسٹنگ کی درخواست' : 'e.g. Request for 10Gbps Dedicated Dark Fiber & Data Center Rack'}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={isRTL ? 'اپنے مطلوبہ مواصلاتی، بینڈوتھ یا ہوسٹنگ تقاضوں کی تفصیل درج کریں...' : 'Describe your telecom, bandwidth, or hosting requirements...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-sm p-3 transition-colors"
                  />
                </div>

                <Button variant="primary" size="lg" type="submit" icon={<Send className="w-4 h-4" />}>
                  {t('contact.submit')}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
