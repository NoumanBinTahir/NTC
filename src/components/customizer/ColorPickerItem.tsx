import React from 'react';

interface ColorPickerItemProps {
  label: string;
  description?: string;
  value: string;
  onChange: (newColor: string) => void;
  swatches?: string[];
}

const DEFAULT_SWATCHES = [
  '#00401A', // Pak Green
  '#047857', // Emerald
  '#0284C7', // Telecom Blue
  '#0369A1', // Deep Blue
  '#0F172A', // Slate 900
  '#334155', // Slate 700
  '#0891B2', // Cyan
  '#7C3AED', // Violet
  '#DC2626', // Red
  '#D97706', // Amber
];

export const ColorPickerItem: React.FC<ColorPickerItemProps> = ({
  label,
  description,
  value,
  onChange,
  swatches = DEFAULT_SWATCHES,
}) => {
  return (
    <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
            {label}
          </span>
          {description && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              {description}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            id={`color-picker-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            aria-label={`Select ${label} custom color`}
            type="color"
            value={value.startsWith('#') ? value : '#047857'}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0 overflow-hidden"
          />
          <span className="text-xs font-mono uppercase text-slate-600 dark:text-slate-300">
            {value}
          </span>
        </div>
      </div>

      {/* Quick Swatches */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1">
        {swatches.map((swatch) => (
          <button
            key={swatch}
            type="button"
            aria-label={`Select ${swatch} preset for ${label}`}
            onClick={() => onChange(swatch)}
            className={`w-5 h-5 rounded-md border transition-transform ${
              value.toLowerCase() === swatch.toLowerCase()
                ? 'scale-110 border-white ring-2 ring-emerald-500'
                : 'border-slate-300 dark:border-slate-600 hover:scale-105'
            }`}
            style={{ backgroundColor: swatch }}
            title={swatch}
          />
        ))}
      </div>
    </div>
  );
};
