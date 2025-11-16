/**
 * Theme Configuration
 *
 * This file controls the complete color scheme for the entire site.
 * Each theme defines background, text, and accent colors.
 */

export type ColorPalette = {
  name: string;
  description: string;

  // Background colors
  background: string;         // Main background
  backgroundAlt: string;      // Cards, sidebar
  backgroundTertiary: string; // Hover states
  backgroundDark: string;     // Code blocks

  // Text colors
  text: string;               // Main body text
  textSecondary: string;      // Secondary/muted text
  textMuted: string;          // Very muted text

  // Accent colors
  accent: string;             // Links, highlights
  accentHover: string;        // Hover states

  // Border colors (derived from background)
  border: string;
  borderHover: string;
};

// Complete theme presets - each defines a full color scheme
export const colorPalettes = {
  'kanagawa-dark': {
    name: 'Kanagawa Dark',
    description: 'Natural, earthy theme inspired by Japanese landscapes',
    background: '#1F1F28',
    backgroundAlt: '#2A2A37',
    backgroundTertiary: '#363646',
    backgroundDark: '#16161D',
    text: '#DCD7BA',
    textSecondary: '#C8C093',
    textMuted: '#727169',
    accent: '#98BB6C',
    accentHover: '#76946A',
    border: '#2A2A37',
    borderHover: '#363646',
  },
  'kanagawa-blue': {
    name: 'Kanagawa Blue',
    description: 'Soft, muted blue with warm text tones',
    background: '#1F1F28',
    backgroundAlt: '#2A2A37',
    backgroundTertiary: '#363646',
    backgroundDark: '#16161D',
    text: '#DCD7BA',
    textSecondary: '#C8C093',
    textMuted: '#727169',
    accent: '#7E9CD8',
    accentHover: '#9CABCA',
    border: '#2A2A37',
    borderHover: '#363646',
  },
  'tokyo-night': {
    name: 'Tokyo Night',
    description: 'Deep blue background with bright cyan accents',
    background: '#1a1b26',
    backgroundAlt: '#24283b',
    backgroundTertiary: '#2f3549',
    backgroundDark: '#16161e',
    text: '#c0caf5',
    textSecondary: '#a9b1d6',
    textMuted: '#565f89',
    accent: '#7aa2f7',
    accentHover: '#7dcfff',
    border: '#24283b',
    borderHover: '#2f3549',
  },
  'gruvbox-dark': {
    name: 'Gruvbox Dark',
    description: 'Warm, retro-inspired theme with earthy tones',
    background: '#282828',
    backgroundAlt: '#3c3836',
    backgroundTertiary: '#504945',
    backgroundDark: '#1d2021',
    text: '#ebdbb2',
    textSecondary: '#d5c4a1',
    textMuted: '#928374',
    accent: '#fabd2f',
    accentHover: '#fe8019',
    border: '#3c3836',
    borderHover: '#504945',
  },
  'nord': {
    name: 'Nord',
    description: 'Arctic, bluish theme with cool tones',
    background: '#2e3440',
    backgroundAlt: '#3b4252',
    backgroundTertiary: '#434c5e',
    backgroundDark: '#2b303b',
    text: '#eceff4',
    textSecondary: '#d8dee9',
    textMuted: '#4c566a',
    accent: '#88c0d0',
    accentHover: '#8fbcbb',
    border: '#3b4252',
    borderHover: '#434c5e',
  },
  'dracula': {
    name: 'Dracula',
    description: 'Dark purple theme with vibrant pink accents',
    background: '#282a36',
    backgroundAlt: '#343746',
    backgroundTertiary: '#44475a',
    backgroundDark: '#21222c',
    text: '#f8f8f2',
    textSecondary: '#e6e6e6',
    textMuted: '#6272a4',
    accent: '#ff79c6',
    accentHover: '#bd93f9',
    border: '#343746',
    borderHover: '#44475a',
  },
  'monokai': {
    name: 'Monokai',
    description: 'Classic dark theme with yellow-green accents',
    background: '#272822',
    backgroundAlt: '#3e3d32',
    backgroundTertiary: '#49483e',
    backgroundDark: '#1e1f1c',
    text: '#f8f8f2',
    textSecondary: '#cfcfc2',
    textMuted: '#75715e',
    accent: '#a6e22e',
    accentHover: '#e6db74',
    border: '#3e3d32',
    borderHover: '#49483e',
  },
} as const;

export type PaletteName = keyof typeof colorPalettes;

// Load configuration from config.json
let configData: { theme?: { selectedTheme?: string } } = { theme: { selectedTheme: 'kanagawa-dark' } };
try {
  configData = await import('../../config.json');
} catch (error) {
  console.warn('config.json not found, using default theme');
}

/**
 * Selected theme (loaded from config.json)
 *
 * To change the theme permanently:
 * 1. Edit config.json in the project root
 * 2. Change the "theme.selectedTheme" value
 * 3. Restart the dev server
 *
 * Available themes:
 * - 'kanagawa-dark' (default) - Natural earthy theme
 * - 'kanagawa-blue' - Muted blue with warm tones
 * - 'tokyo-night' - Deep blue with cyan accents
 * - 'gruvbox-dark' - Warm retro theme
 * - 'nord' - Arctic bluish theme
 * - 'dracula' - Purple with pink accents
 * - 'monokai' - Classic dark theme
 */
export const selectedTheme: PaletteName =
  (configData?.theme?.selectedTheme && configData.theme.selectedTheme in colorPalettes)
    ? configData.theme.selectedTheme as PaletteName
    : 'kanagawa-dark';

// Export the active theme
export const theme = colorPalettes[selectedTheme];
