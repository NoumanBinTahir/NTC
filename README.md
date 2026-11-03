# National Telecommunication Corporation (NTC) — Official Web Portal (2026 Redesign)

A modern, accessible, and high-performance sovereign web portal for the **National Telecommunication Corporation (NTC)**, Government of Pakistan.

---

## 🚀 Key Highlights & Architectural Features

### 1. Bilingual Engine (English & Urdu RTL)
- **Fluid Bi-Directional Layouts:** Instant switching between English (LTR) and Urdu (RTL).
- **Nastaliq Typography Engineering:** Specialized line-height calibration and font-metrics for *Noto Nastaliq Urdu* and *Gulzar* that eliminate letter collisions and vertical ascender/descender overlaps.
- **Urdu Ligature Protection:** Preserves cursive Arabic/Urdu ligatures even under extensive text-spacing modifiers (`letter-spacing: normal !important`).

### 2. WCAG 2.2 AAA Sovereign Accessibility Suite (UserWay-Style)
Includes 13 interactive assistive toggles accessible via a floating action widget, navbar, or keyboard shortcuts:
- **Responsive Text Sizing:** Scaled safely on mobile (`110% - 126%`) and desktop (`115% - 140%`) without horizontal container blowout.
- **High-Contrast Modes:** High Contrast Yellow-on-Black (`#ffff00` on `#000000`), Grayscale, and Smart Invert (with re-inverted images/media).
- **Line Height Modes:** Normal, Relaxed, and Loose line-spacing scoped to content text.
- **Readable Font:** Dyslexia-friendly sans-serif in English and clean horizontal Naskh (`Noto Sans Arabic` / `Tahoma`) in Urdu.
- **Text Spacing & Word Expansion:** Increases inter-word spacing while safeguarding cursive ligatures.
- **Reading Mask & Laser Reading Ruler:** Focus guide with multi-touch support (`touchstart`, `touchmove`) on mobile and cursor tracking on desktop.
- **Text-to-Speech (TTS):** Native Web Speech API synthesis with pause/resume and localized accent detection.
- **Cognitive Distraction Prevention:** Hide images mode and pause animations toggle.

### 3. Responsive 2026 Mobile Optimization
- Zero horizontal overflow across all viewport sizes (`375px` mobile, `768px` tablet, `1280px`+ desktop).
- Anti-collision layout for floating widgets (Accessibility Suite anchored to bottom-left, Theme Customizer anchored to bottom-right).
- Responsive header brand with clean 2-line structure and verified clearances.

### 4. Interactive Directorate Directory & Tenders
- **Interactive Geographic Directorate Directory:** Integrated Google Maps view for Regional Headquarters in Islamabad, Lahore, Karachi, Peshawar, and Quetta.
- **Public Procurement & Tenders Portal:** Aligned with Federal PPRA and E-PADS standards with live search, filters, category tabs, and PDF tender document previews.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + PostCSS
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Google Fonts (*Noto Nastaliq Urdu*, *Gulzar*, *Plus Jakarta Sans*, *Inter*)

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.0 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/NoumanBinTahir/NTC.git
cd NTC

# Install dependencies
npm install
```

### Running Development Server

```bash
npm run dev
# Live locally at http://localhost:5173/
```

### Building for Production

```bash
npm run build
```

### Previewing Production Build

```bash
npm run preview
# Preview server at http://localhost:4173/
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
