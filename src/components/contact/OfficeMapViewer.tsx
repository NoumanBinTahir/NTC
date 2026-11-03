import React, { useState } from 'react';
import { MapPin, Phone, Mail, Printer, Navigation, Building2, CheckCircle2 } from 'lucide-react';

interface OfficeLocation {
  id: string;
  city: string;
  directorate: string;
  directorName: string;
  address: string;
  tel: string;
  cell: string;
  fax: string;
  email: string;
  mapEmbedUrl: string;
  googleMapsLink: string;
}

const OFFICIAL_LOCATIONS: OfficeLocation[] = [
  {
    id: 'isb',
    city: 'Islamabad (Headquarters)',
    directorate: 'Director NTC Islamabad & Regional HQs',
    directorName: 'Mr. Muhammad Sarwar',
    address: 'NTC Regional HQs Building, Ataturk Avenue, Sector F-5/1, Islamabad',
    tel: '+92 51 9212266',
    cell: '+92 300 5000675',
    fax: '+92 51 9211721',
    email: 'muhammad.sarwar@ntc.org.pk',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d53091.232272286026!2d73.05393467846184!3d33.72959191725383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m5!1s0x38dfc080362ee513%3A0x657856f592c5d036!2sN.T.C.%2C+Ataturk+Avenue%2C+F-5%2C+Islamabad%2C+Pakistan!3m2!1d33.7295255!2d73.08904!4m0!5e0!3m2!1sen!2sus!4v1526289411897',
    googleMapsLink: 'https://maps.google.com/?q=NTC+Headquarters+Islamabad+Sector+F-5',
  },
  {
    id: 'lhr',
    city: 'Lahore (Central)',
    directorate: 'Director NTC Lahore (Central Directorate)',
    directorName: 'Mr. Amjad Ikram Khan',
    address: '6-Race Course Road, Shahrah Aiwan-e-Sanat-o-Tijarat, Lahore',
    tel: '+92 42 99201235',
    cell: '+92 300 5004969',
    fax: '+92 42 99201236',
    email: 'amjad.ikram@ntc.org.pk',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d54401.362768620376!2d74.2984346665788!3d31.549277049918565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x391904b841006d95%3A0x39204b928ebb43aa!2sNational+Telecommunication+Corporation%2C+Shahrah+Aiwan-e-Sanat-o-Tijarat%2C+Lahore!3m2!1d31.549208699999998!2d74.33354!4m0!5e0!3m2!1sen!2s!4v1526291473572',
    googleMapsLink: 'https://maps.google.com/?q=National+Telecommunication+Corporation+Race+Course+Road+Lahore',
  },
  {
    id: 'khi',
    city: 'Karachi (South)',
    directorate: 'Director NTC Karachi (South Directorate)',
    directorName: 'Mr. Muhammad Irfan',
    address: 'KAP-I, Old Exchange Building, Near Malir Halt, Karachi',
    tel: '+92 21 99248833',
    cell: '+92 300 5005179',
    fax: '+92 21 99248855',
    email: 'muhammad.irfan@ntc.org.pk',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d57900.05492403509!2d67.09504458568708!3d24.906390741611084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x3eb339edb60e69d9%3A0x80792e564891af13!2sNTC+Regional+HQ%2C+Karachi!3m2!1d24.8859231!2d67.1700202!4m0!5e0!3m2!1sen!2s!4v1526292321429',
    googleMapsLink: 'https://maps.google.com/?q=NTC+Regional+HQ+Malir+Halt+Karachi',
  },
  {
    id: 'pew',
    city: 'Peshawar (KP)',
    directorate: 'Director NTC Peshawar',
    directorName: 'Mr. Noor Hakim',
    address: '1 The Mall, Sher Shah Suri Road, Peshawar Cantt, Peshawar',
    tel: '+92 91 9211111',
    cell: '+92 302 8550809',
    fax: '+92 91 9211011',
    email: 'noor.hakim@ntc.org.pk',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3398.639033525749!2d71.53295747569986!3d34.02698814148163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x38d9165a8f6040d7%3A0x7b3061952298c092!2sNTC%2C+Peshawar!3m2!1d34.0280256!2d71.5342892!4m0!5e0!3m2!1sen!2s!4v1526290699196',
    googleMapsLink: 'https://maps.google.com/?q=NTC+Peshawar+Sher+Shah+Suri+Road',
  },
  {
    id: 'qta',
    city: 'Quetta (Balochistan)',
    directorate: 'Director NTC Quetta',
    directorName: 'Mrs. Humeira Khaqan Chaudhary',
    address: 'Mir Jaffar Khan Jamali Road, Quetta',
    tel: '+92 81 9202151',
    cell: '+92 300 8501364',
    fax: '+92 81 9202153',
    email: 'humeira.chaudhary@ntc.org.pk',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3448.3129955319!2d67.00386730072786!3d30.19961296809128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x3ed2de2efdbca7eb%3A0xf18f05183be9ce25!2sNTC+Tower+At+PTCL+Exchange%2C+Quetta%2C+Mir+Jafar+Khan+Jamali+Road%2C+Quetta!3m2!1d30.199541999999997!2d67.007228!4m0!5e0!3m2!1sen!2s!4v1526291714458',
    googleMapsLink: 'https://maps.google.com/?q=NTC+Tower+Mir+Jaffar+Khan+Jamali+Road+Quetta',
  },
  {
    id: 'mux',
    city: 'Multan (South Punjab)',
    directorate: 'Director NTC Multan',
    directorName: 'Mr. Muhammad Saeed',
    address: 'Central Exchange LMQ Road, Nawan Sheher, Near Chowk Dera Adda, Multan',
    tel: '+92 61 9201111',
    cell: '+92 302 8550817',
    fax: '+92 61 9200110',
    email: 'm.saeed@ntc.org.pk',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3448.5992324341396!2d71.45095025072773!3d30.191440218479244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x393b33e069a5984d%3A0x69ddf7070818057f!2sNTC+Multan%2C+Multan!3m2!1d30.1937!2d71.45501449999999!4m0!5e0!3m2!1sen!2s!4v1526291933608',
    googleMapsLink: 'https://maps.google.com/?q=NTC+Multan+LMQ+Road',
  },
  {
    id: 'rwp',
    city: 'Rawalpindi',
    directorate: 'Head NTC Rawalpindi',
    directorName: 'Mr. Irfan Rafi',
    address: 'NTC Microwave Colony, IJP Road, Rawalpindi / Islamabad',
    tel: '+92 51 9278283',
    cell: '+92 300 5001983',
    fax: '+92 51 9278282',
    email: 'irfan.rafi@ntc.org.pk',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d427533.6534760647!2d72.42962349934142!3d33.15882639160558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x3920b85d20c30187%3A0xa2546cae6c1af770!2sNTC+Microwave+Station%2C+Wanhar!3m2!1d32.880898099999996!2d72.178345!4m0!5e0!3m2!1sen!2s!4v1526290492341',
    googleMapsLink: 'https://maps.google.com/?q=NTC+Microwave+Colony+IJP+Road',
  },
];

export const OfficeMapViewer: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(OFFICIAL_LOCATIONS[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
          <Building2 className="w-4 h-4" />
          <span>Interactive Geographic Directory</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          NTC Regional Directorates & Live Google Maps
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Select any regional directorate to inspect its exact satellite/street location on Google Maps, verified addresses, and direct phone/fax lines of the presiding Director.
        </p>
      </div>

      {/* City Switcher Buttons */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        {OFFICIAL_LOCATIONS.map((loc) => {
          const isSelected = selectedOffice.id === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setSelectedOffice(loc)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md scale-102 ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
              <span>{loc.city}</span>
            </button>
          );
        })}
      </div>

      {/* Main Google Maps View Box */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl grid grid-cols-1 lg:grid-cols-12">
        {/* Left Info Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Statutory Office</span>
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Official Directorate
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                {selectedOffice.directorate}
              </h3>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                Presiding: {selectedOffice.directorName}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="font-medium leading-relaxed">{selectedOffice.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>
                  <strong>Tel:</strong> {selectedOffice.tel} &nbsp;|&nbsp; <strong>Cell:</strong> {selectedOffice.cell}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Printer className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span><strong>Fax:</strong> {selectedOffice.fax}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a
                  href={`mailto:${selectedOffice.email}`}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  {selectedOffice.email}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href={selectedOffice.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md group"
            >
              <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Open in Official Google Maps & Directions</span>
            </a>
          </div>
        </div>

        {/* Right Map View Box */}
        <div className="lg:col-span-7 h-96 lg:h-auto min-h-[420px] bg-slate-100 dark:bg-slate-950 relative">
          <iframe
            key={selectedOffice.id}
            src={selectedOffice.mapEmbedUrl}
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`NTC Google Map Location - ${selectedOffice.city}`}
          />
        </div>
      </div>
    </div>
  );
};
