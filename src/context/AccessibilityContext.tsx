import React, { createContext, useContext, useState, useEffect } from 'react';

export type TextSize = 'normal' | 'large' | 'xlarge' | 'huge';
export type ContrastMode = 'normal' | 'high' | 'grayscale' | 'invert';
export type LineHeightMode = 'normal' | 'relaxed' | 'loose';
export type TextAlignMode = 'normal' | 'left' | 'center' | 'right' | 'justify';
export type SaturationMode = 'normal' | 'low' | 'high';

export interface AccessibilityState {
  textSize: TextSize;
  contrastMode: ContrastMode;
  lineHeight: LineHeightMode;
  textAlign: TextAlignMode;
  saturation: SaturationMode;
  highlightLinks: boolean;
  readableFont: boolean;
  textSpacing: boolean;
  bigCursor: boolean;
  pauseAnimations: boolean;
  readingMask: boolean;
  readingRuler: boolean;
  hideImages: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  isWidgetOpen: boolean;
  setIsWidgetOpen: (open: boolean) => void;
  openWidget: () => void;
  closeWidget: () => void;
  setTextSize: (size: TextSize) => void;
  cycleTextSize: () => void;
  setContrastMode: (mode: ContrastMode) => void;
  cycleContrastMode: () => void;
  cycleLineHeight: () => void;
  cycleTextAlign: () => void;
  cycleSaturation: () => void;
  toggleHighlightLinks: () => void;
  toggleReadableFont: () => void;
  toggleTextSpacing: () => void;
  toggleBigCursor: () => void;
  togglePauseAnimations: () => void;
  toggleReadingMask: () => void;
  toggleReadingRuler: () => void;
  toggleHideImages: () => void;
  resetAll: () => void;
  readAloud: (text?: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const DEFAULT_STATE: AccessibilityState = {
  textSize: 'normal',
  contrastMode: 'normal',
  lineHeight: 'normal',
  textAlign: 'normal',
  saturation: 'normal',
  highlightLinks: false,
  readableFont: false,
  textSpacing: false,
  bigCursor: false,
  pauseAnimations: false,
  readingMask: false,
  readingRuler: false,
  hideImages: false,
};

const STORAGE_KEY = 'ntc_accessibility_prefs_v1';

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const openWidget = () => setIsWidgetOpen(true);
  const closeWidget = () => setIsWidgetOpen(false);

  // Sync state to DOM classes & localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save accessibility state to localStorage', e);
    }

    const docEl = document.documentElement;

    // 1. Text sizing
    docEl.classList.remove('a11y-text-large', 'a11y-text-xlarge', 'a11y-text-huge');
    if (state.textSize === 'large') docEl.classList.add('a11y-text-large');
    if (state.textSize === 'xlarge') docEl.classList.add('a11y-text-xlarge');
    if (state.textSize === 'huge') docEl.classList.add('a11y-text-huge');

    // 2. Contrast
    docEl.classList.remove('a11y-contrast-high', 'a11y-contrast-grayscale', 'a11y-contrast-invert');
    if (state.contrastMode === 'high') docEl.classList.add('a11y-contrast-high');
    if (state.contrastMode === 'grayscale') docEl.classList.add('a11y-contrast-grayscale');
    if (state.contrastMode === 'invert') docEl.classList.add('a11y-contrast-invert');

    // 3. Highlight links
    if (state.highlightLinks) docEl.classList.add('a11y-highlight-links');
    else docEl.classList.remove('a11y-highlight-links');

    // 4. Readable font
    if (state.readableFont) docEl.classList.add('a11y-readable-font');
    else docEl.classList.remove('a11y-readable-font');

    // 5. Text spacing
    if (state.textSpacing) docEl.classList.add('a11y-text-spacing');
    else docEl.classList.remove('a11y-text-spacing');

    // 6. Big cursor
    if (state.bigCursor) docEl.classList.add('a11y-big-cursor');
    else docEl.classList.remove('a11y-big-cursor');

    // 7. Pause animations
    if (state.pauseAnimations) docEl.classList.add('a11y-pause-animations');
    else docEl.classList.remove('a11y-pause-animations');

    // 8. Line Height
    docEl.classList.remove('a11y-line-relaxed', 'a11y-line-loose');
    if (state.lineHeight === 'relaxed') docEl.classList.add('a11y-line-relaxed');
    if (state.lineHeight === 'loose') docEl.classList.add('a11y-line-loose');

    // 9. Text Align
    docEl.classList.remove('a11y-align-left', 'a11y-align-center', 'a11y-align-right', 'a11y-align-justify');
    if (state.textAlign === 'left') docEl.classList.add('a11y-align-left');
    if (state.textAlign === 'center') docEl.classList.add('a11y-align-center');
    if (state.textAlign === 'right') docEl.classList.add('a11y-align-right');
    if (state.textAlign === 'justify') docEl.classList.add('a11y-align-justify');

    // 10. Hide Images
    if (state.hideImages) docEl.classList.add('a11y-hide-images');
    else docEl.classList.remove('a11y-hide-images');

    // 11. Saturation
    docEl.classList.remove('a11y-sat-low', 'a11y-sat-high');
    if (state.saturation === 'low') docEl.classList.add('a11y-sat-low');
    if (state.saturation === 'high') docEl.classList.add('a11y-sat-high');
  }, [state]);

  const setTextSize = (textSize: TextSize) => setState((s) => ({ ...s, textSize }));
  const cycleTextSize = () => {
    const cycle: TextSize[] = ['normal', 'large', 'xlarge', 'huge'];
    const nextIdx = (cycle.indexOf(state.textSize) + 1) % cycle.length;
    setTextSize(cycle[nextIdx]);
  };

  const setContrastMode = (contrastMode: ContrastMode) => setState((s) => ({ ...s, contrastMode }));
  const cycleContrastMode = () => {
    const cycle: ContrastMode[] = ['normal', 'high', 'grayscale', 'invert'];
    const nextIdx = (cycle.indexOf(state.contrastMode) + 1) % cycle.length;
    setContrastMode(cycle[nextIdx]);
  };

  const cycleLineHeight = () => {
    const cycle: LineHeightMode[] = ['normal', 'relaxed', 'loose'];
    const nextIdx = (cycle.indexOf(state.lineHeight) + 1) % cycle.length;
    setState((s) => ({ ...s, lineHeight: cycle[nextIdx] }));
  };

  const cycleTextAlign = () => {
    const cycle: TextAlignMode[] = ['normal', 'left', 'center', 'right', 'justify'];
    const nextIdx = (cycle.indexOf(state.textAlign) + 1) % cycle.length;
    setState((s) => ({ ...s, textAlign: cycle[nextIdx] }));
  };

  const cycleSaturation = () => {
    const cycle: SaturationMode[] = ['normal', 'low', 'high'];
    const nextIdx = (cycle.indexOf(state.saturation) + 1) % cycle.length;
    setState((s) => ({ ...s, saturation: cycle[nextIdx] }));
  };

  const toggleHighlightLinks = () => setState((s) => ({ ...s, highlightLinks: !s.highlightLinks }));
  const toggleReadableFont = () => setState((s) => ({ ...s, readableFont: !s.readableFont }));
  const toggleTextSpacing = () => setState((s) => ({ ...s, textSpacing: !s.textSpacing }));
  const toggleBigCursor = () => setState((s) => ({ ...s, bigCursor: !s.bigCursor }));
  const togglePauseAnimations = () => setState((s) => ({ ...s, pauseAnimations: !s.pauseAnimations }));
  const toggleReadingMask = () => setState((s) => ({ ...s, readingMask: !s.readingMask, readingRuler: false }));
  const toggleReadingRuler = () => setState((s) => ({ ...s, readingRuler: !s.readingRuler, readingMask: false }));
  const toggleHideImages = () => setState((s) => ({ ...s, hideImages: !s.hideImages }));

  const resetAll = () => {
    stopSpeaking();
    setState(DEFAULT_STATE);
  };

  // Text-To-Speech
  const readAloud = (customText?: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device/browser.');
      return;
    }

    window.speechSynthesis.cancel();

    if (isSpeaking && !customText) {
      stopSpeaking();
      return;
    }

    const textToRead = customText || document.title + '. ' + (document.querySelector('main')?.innerText?.slice(0, 500) || '');
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        isWidgetOpen,
        setIsWidgetOpen,
        openWidget,
        closeWidget,
        setTextSize,
        cycleTextSize,
        setContrastMode,
        cycleContrastMode,
        cycleLineHeight,
        cycleTextAlign,
        cycleSaturation,
        toggleHighlightLinks,
        toggleReadableFont,
        toggleTextSpacing,
        toggleBigCursor,
        togglePauseAnimations,
        toggleReadingMask,
        toggleReadingRuler,
        toggleHideImages,
        resetAll,
        readAloud,
        isSpeaking,
        stopSpeaking,
      }}
    >
      {children}
      {/* Visual Reading Mask Guide Bar */}
      {state.readingMask && <ReadingMaskOverlay />}
      {/* Visual Reading Ruler Laser Line */}
      {state.readingRuler && <ReadingRulerOverlay />}
    </AccessibilityContext.Provider>
  );
};

const ReadingRulerOverlay: React.FC = () => {
  const [mouseY, setMouseY] = useState<number>(() => typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ('clientY' in e) {
        setMouseY(e.clientY);
      } else if (e.touches && e.touches.length > 0) {
        setMouseY(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchstart', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchstart', handleMove);
    };
  }, []);

  return (
    <div
      className="a11y-reading-ruler"
      style={{ top: `${mouseY}px` }}
    />
  );
};

const ReadingMaskOverlay: React.FC = () => {
  const [mouseY, setMouseY] = useState<number>(() => typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ('clientY' in e) {
        setMouseY(e.clientY);
      } else if (e.touches && e.touches.length > 0) {
        setMouseY(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchstart', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchstart', handleMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div
        className="absolute left-0 right-0 h-16 bg-yellow-300/25 border-y-2 border-yellow-500 shadow-lg backdrop-blur-[0.5px] transition-all duration-75"
        style={{ top: `${Math.max(0, mouseY - 32)}px` }}
      />
    </div>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
