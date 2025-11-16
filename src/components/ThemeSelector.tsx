import { useState, useEffect, useRef } from 'react';
import type { ColorPalette } from '../config/theme';
import './ThemeSelector.css';

interface ThemeSelectorProps {
  currentTheme: string;
  themes: Record<string, ColorPalette>;
}

export default function ThemeSelector({ currentTheme, themes }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check localStorage on mount for saved preview theme
    const preview = localStorage.getItem('theme-preview');
    if (preview && preview in themes) {
      setSelectedTheme(preview);
      applyTheme(preview);
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const applyTheme = (themeName: string) => {
    const theme = themes[themeName];
    if (!theme) return;

    // Update all CSS variables for instant preview
    const root = document.documentElement;

    // Background colors
    root.style.setProperty('--bg-primary', theme.background);
    root.style.setProperty('--bg-secondary', theme.backgroundAlt);
    root.style.setProperty('--bg-tertiary', theme.backgroundTertiary);
    root.style.setProperty('--bg-dark', theme.backgroundDark);

    // Text colors
    root.style.setProperty('--text-primary', theme.text);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--text-muted', theme.textMuted);

    // Accent colors
    root.style.setProperty('--accent-primary', theme.accent);
    root.style.setProperty('--accent-hover', theme.accentHover);

    // Border colors
    root.style.setProperty('--border-default', theme.border);
    root.style.setProperty('--border-hover', theme.borderHover);

    // Save to localStorage for persistence
    localStorage.setItem('theme-preview', themeName);
  };

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    applyTheme(themeName);
    setIsOpen(false);
  };

  // Get all themes as a flat list
  const allThemes = Object.entries(themes);
  const currentThemeData = themes[selectedTheme];

  return (
    <div className="theme-selector">
      <label className="theme-label">Theme</label>

      <div className="theme-dropdown" ref={dropdownRef}>
        <button
          className="theme-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="theme-button-content">
            <span
              className="color-dot"
              style={{ backgroundColor: currentThemeData?.accent || '#98BB6C' }}
              aria-hidden="true"
            />
            <span className="theme-name">{currentThemeData?.name || 'Kanagawa Dark'}</span>
          </span>
          <svg
            className={`chevron ${isOpen ? 'open' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6l4 4 4-4"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="theme-menu" role="listbox">
            {allThemes.map(([key, theme]) => (
              <button
                key={key}
                className={`theme-option ${selectedTheme === key ? 'selected' : ''}`}
                onClick={() => handleThemeChange(key)}
                role="option"
                aria-selected={selectedTheme === key}
              >
                <span
                  className="color-dot"
                  style={{ backgroundColor: theme.accent }}
                  aria-hidden="true"
                />
                <span className="theme-option-name">{theme.name}</span>
                {selectedTheme === key && (
                  <svg
                    className="check-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8l2.5 2.5L12 5"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="theme-status">Saved in browser</p>
    </div>
  );
}
