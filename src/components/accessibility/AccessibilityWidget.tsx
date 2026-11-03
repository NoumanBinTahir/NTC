import React from 'react';
import {
  Accessibility, X, RotateCcw, Type, Eye, Link as LinkIcon,
  MousePointer, Pause, Volume2, VolumeX,
  BookOpen, AlignJustify, ScanLine, Maximize2,
  AlignLeft, Ruler, ImageOff, Droplets
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLanguage } from '../../context/LanguageContext';

export const AccessibilityWidget: React.FC = () => {
  const {
    isWidgetOpen, setIsWidgetOpen,
    textSize, cycleTextSize,
    contrastMode, cycleContrastMode,
    lineHeight, cycleLineHeight,
    textAlign, cycleTextAlign,
    saturation, cycleSaturation,
    highlightLinks, toggleHighlightLinks,
    readableFont, toggleReadableFont,
    textSpacing, toggleTextSpacing,
    bigCursor, toggleBigCursor,
    pauseAnimations, togglePauseAnimations,
    readingMask, toggleReadingMask,
    readingRuler, toggleReadingRuler,
    hideImages, toggleHideImages,
    resetAll, readAloud, isSpeaking, stopSpeaking,
  } = useAccessibility();

  const { t, isRTL } = useLanguage();

  const hasActiveModifiers =
    textSize !== 'normal' ||
    contrastMode !== 'normal' ||
    lineHeight !== 'normal' ||
    textAlign !== 'normal' ||
    saturation !== 'normal' ||
    highlightLinks ||
    readableFont ||
    textSpacing ||
    bigCursor ||
    pauseAnimations ||
    readingMask ||
    readingRuler ||
    hideImages;

  return (
    <>
      {/* Floating UserWay-style Trigger Button (Locked to bottom-left to avoid Theme Customizer) */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 print:hidden">
        <button
          onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          aria-label="Open Accessibility Menu"
          title="Accessibility & Usability Suite"
          className="relative p-3.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-400 group"
        >
          <Accessibility className="w-6 h-6 animate-pulse" />
          <span className="sr-only">Accessibility Controls</span>
          
          {/* Active indicator dot if any feature is turned on */}
          {hasActiveModifiers && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white ring-2 ring-blue-700" />
          )}
        </button>
      </div>

      {/* Accessibility Drawer / Panel */}
      {isWidgetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm print:hidden animate-fade-in">
          <div
            className={`w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-white/15 backdrop-blur-sm">
                  <Accessibility className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-lg leading-tight">
                    {t('accessibility.widgetTitle')}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-blue-100 opacity-90 mt-0.5">
                    {t('accessibility.widgetDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetAll}
                  title={t('accessibility.resetAll')}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('accessibility.resetAll')}</span>
                </button>

                <button
                  onClick={() => setIsWidgetOpen(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Feature Tiles Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(92vh-130px)]">
              {/* Text-To-Speech Bar */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 sm:p-2.5 rounded-xl ${isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-blue-600 text-white'}`}>
                    {isSpeaking ? <VolumeX className="w-4 sm:w-5 h-4 sm:h-5" /> : <Volume2 className="w-4 sm:w-5 h-4 sm:h-5" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {isSpeaking ? t('accessibility.screenReaderActive') : t('accessibility.screenReader')}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                      Web Speech Synthesis assistive narration
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => isSpeaking ? stopSpeaking() : readAloud()}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isSpeaking
                      ? 'bg-rose-600 text-white hover:bg-rose-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSpeaking ? 'Stop' : 'Speak'}
                </button>
              </div>

              {/* Comprehensive Accessibility Control Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {/* 1. Text Size */}
                <button
                  onClick={cycleTextSize}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    textSize !== 'normal'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Type className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.textSize')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {textSize}
                  </span>
                </button>

                {/* 2. Contrast Mode */}
                <button
                  onClick={cycleContrastMode}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    contrastMode !== 'normal'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.contrast')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {contrastMode}
                  </span>
                </button>

                {/* 3. Line Height / Spacing */}
                <button
                  onClick={cycleLineHeight}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    lineHeight !== 'normal'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Maximize2 className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.lineHeight')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {lineHeight}
                  </span>
                </button>

                {/* 4. Text Alignment */}
                <button
                  onClick={cycleTextAlign}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    textAlign !== 'normal'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <AlignLeft className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.textAlign')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {textAlign}
                  </span>
                </button>

                {/* 5. Highlight Links */}
                <button
                  onClick={toggleHighlightLinks}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    highlightLinks
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <LinkIcon className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.highlightLinks')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {highlightLinks ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* 6. Readable Font */}
                <button
                  onClick={toggleReadableFont}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    readableFont
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.readableFont')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {readableFont ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* 7. Text Spacing */}
                <button
                  onClick={toggleTextSpacing}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    textSpacing
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <AlignJustify className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.textSpacing')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {textSpacing ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* 8. Big Cursor */}
                <button
                  onClick={toggleBigCursor}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    bigCursor
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <MousePointer className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.bigCursor')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {bigCursor ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* 9. Reading Mask Guide */}
                <button
                  onClick={toggleReadingMask}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    readingMask
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <ScanLine className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.readingMask')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {readingMask ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* 10. Laser Reading Ruler */}
                <button
                  onClick={toggleReadingRuler}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    readingRuler
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Ruler className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.readingRuler')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {readingRuler ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* 11. Hide Images (Cognitive) */}
                <button
                  onClick={toggleHideImages}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    hideImages
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <ImageOff className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.hideImages')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {hideImages ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* 12. Saturation */}
                <button
                  onClick={cycleSaturation}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    saturation !== 'normal'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Droplets className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.saturation')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {saturation}
                  </span>
                </button>

                {/* 13. Pause Animations */}
                <button
                  onClick={togglePauseAnimations}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    pauseAnimations
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Pause className="w-5 h-5" />
                  <span className="text-xs font-bold">{t('accessibility.pauseAnimations')}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {pauseAnimations ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="text-[11px] sm:text-xs">WCAG 2.2 AAA Sovereign Assistive Engine</span>
              <button
                onClick={() => setIsWidgetOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                {t('accessibility.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
