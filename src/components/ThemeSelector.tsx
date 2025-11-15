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

    // Update CSS variables for instant preview
    document.documentElement.style.setProperty('--accent-primary', theme.primary);
    document.documentElement.style.setProperty('--accent-hover', theme.primaryHover);

    // Save to localStorage for persistence
    localStorage.setItem('theme-preview', themeName);
  };

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    applyTheme(themeName);
    setIsOpen(false);
  };

  // Group themes into Kanagawa and Standard categories
  const kanagawaThemes = Object.entries(themes).filter(([key]) =>
    key.startsWith('kanagawa-')
  );
  const standardThemes = Object.entries(themes).filter(([key]) =>
    !key.startsWith('kanagawa-')
  );

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
              style={{ backgroundColor: currentThemeData?.primary || '#98BB6C' }}
              aria-hidden="true"
            />
            <span className="theme-name">{currentThemeData?.name || 'Spring Green'}</span>
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
            {/* Kanagawa Themes */}
            <div className="theme-group">
              <div className="theme-group-label">Kanagawa Themes</div>
              {kanagawaThemes.map(([key, theme]) => (
                <button
                  key={key}
                  className={`theme-option ${selectedTheme === key ? 'selected' : ''}`}
                  onClick={() => handleThemeChange(key)}
                  role="option"
                  aria-selected={selectedTheme === key}
                >
                  <span
                    className="color-dot"
                    style={{ backgroundColor: theme.primary }}
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

            {/* Standard Themes */}
            <div className="theme-group">
              <div className="theme-group-label">Standard Themes</div>
              {standardThemes.map(([key, theme]) => (
                <button
                  key={key}
                  className={`theme-option ${selectedTheme === key ? 'selected' : ''}`}
                  onClick={() => handleThemeChange(key)}
                  role="option"
                  aria-selected={selectedTheme === key}
                >
                  <span
                    className="color-dot"
                    style={{ backgroundColor: theme.primary }}
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
          </div>
        )}
      </div>

      <p className="theme-status">Saved in browser</p>
    </div>
  );
}
