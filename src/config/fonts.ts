/**
 * Font Configuration
 *
 * This file controls the fonts used throughout the site.
 * Fonts are configurable via config.json in the project root.
 *
 * Available font presets include:
 * - System fonts (no external loading, best performance)
 * - Google Fonts (loaded from Google CDN)
 */

export type FontPreset = {
  name: string;
  stack: string;
  googleFontsUrl?: string; // If provided, will load from Google Fonts
};

// Font presets available for use
export const fontPresets = {
  // System fonts (no external loading)
  'system-ui': {
    name: 'System UI',
    stack: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  'system-serif': {
    name: 'System Serif',
    stack: "Georgia, 'Times New Roman', Times, serif",
  },
  'system-mono': {
    name: 'System Mono',
    stack: "'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  },

  // Google Fonts - Sans Serif
  'inter': {
    name: 'Inter',
    stack: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
  'roboto': {
    name: 'Roboto',
    stack: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  },
  'source-sans-pro': {
    name: 'Source Sans Pro',
    stack: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap',
  },
  'fira-sans': {
    name: 'Fira Sans',
    stack: "'Fira Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap',
  },
  'ibm-plex-sans': {
    name: 'IBM Plex Sans',
    stack: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap',
  },
  'dm-sans': {
    name: 'DM Sans',
    stack: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
  },
  'space-grotesk': {
    name: 'Space Grotesk',
    stack: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
  },

  // Google Fonts - Serif
  'playfair-display': {
    name: 'Playfair Display',
    stack: "'Playfair Display', Georgia, serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
  },
  'merriweather': {
    name: 'Merriweather',
    stack: "'Merriweather', Georgia, serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap',
  },
  'lora': {
    name: 'Lora',
    stack: "'Lora', Georgia, serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap',
  },

  // Google Fonts - Monospace
  'jetbrains-mono': {
    name: 'JetBrains Mono',
    stack: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
  },
  'fira-code': {
    name: 'Fira Code',
    stack: "'Fira Code', 'SF Mono', Consolas, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap',
  },
  'source-code-pro': {
    name: 'Source Code Pro',
    stack: "'Source Code Pro', 'SF Mono', Consolas, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;700&display=swap',
  },
  'ibm-plex-mono': {
    name: 'IBM Plex Mono',
    stack: "'IBM Plex Mono', 'SF Mono', Consolas, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap',
  },
} as const;

export type FontPresetName = keyof typeof fontPresets;

type FontConfig = {
  body: string;
  heading: string;
  code: string;
};

// Load configuration from config.json
let configData: { fonts?: FontConfig } = {
  fonts: {
    body: 'system-ui',
    heading: 'system-ui',
    code: 'system-mono',
  },
};

try {
  configData = await import('../../config.json');
} catch (error) {
  console.warn('config.json not found, using default fonts');
}

// Validate and get font selections
const getFontPreset = (key: string): FontPreset => {
  if (key in fontPresets) {
    return fontPresets[key as FontPresetName];
  }
  console.warn(`Font preset "${key}" not found, using system-ui`);
  return fontPresets['system-ui'];
};

export const selectedFonts = {
  body: getFontPreset(configData?.fonts?.body || 'system-ui'),
  heading: getFontPreset(configData?.fonts?.heading || 'system-ui'),
  code: getFontPreset(configData?.fonts?.code || 'system-mono'),
};

// Get unique Google Fonts URLs to load
export const googleFontsUrls = [
  ...new Set(
    [selectedFonts.body, selectedFonts.heading, selectedFonts.code]
      .filter((font) => font.googleFontsUrl)
      .map((font) => font.googleFontsUrl!)
  ),
];
