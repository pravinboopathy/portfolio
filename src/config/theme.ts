/**
 * Theme Configuration
 *
 * This file controls the color palette for the entire site.
 * Change the `selectedPalette` to switch between different accent colors.
 */

export type ColorPalette = {
  name: string;
  primary: string;      // Main accent color for links and headings
  primaryHover: string; // Hover state for links and buttons
  description: string;
};

// All available color palettes
export const colorPalettes = {
  // Kanagawa Theme Colors (inspired by rebelot/kanagawa.nvim)
  'kanagawa-spring-green': {
    name: 'Kanagawa Spring Green',
    primary: '#98BB6C',
    primaryHover: '#76946A',
    description: 'Natural, earthy green inspired by Japanese landscapes'
  },
  'kanagawa-crystal-blue': {
    name: 'Kanagawa Crystal Blue',
    primary: '#7E9CD8',
    primaryHover: '#9CABCA',
    description: 'Soft, muted blue that\'s calming and sophisticated'
  },
  'kanagawa-autumn-yellow': {
    name: 'Kanagawa Autumn Yellow',
    primary: '#DCA561',
    primaryHover: '#C0A36E',
    description: 'Warm, golden yellow like autumn leaves'
  },
  'kanagawa-sakura-pink': {
    name: 'Kanagawa Sakura Pink',
    primary: '#D27E99',
    primaryHover: '#E46876',
    description: 'Delicate cherry blossom pink, uniquely Japanese'
  },
  'kanagawa-wave-aqua': {
    name: 'Kanagawa Wave Aqua',
    primary: '#7AA89F',
    primaryHover: '#6A9589',
    description: 'Ocean-inspired teal, straight from the great wave'
  },

  // Standard Tailwind-inspired Colors
  'amber': {
    name: 'Warm Amber',
    primary: '#fbbf24',
    primaryHover: '#f59e0b',
    description: 'Adds warmth and personality while maintaining minimalism'
  },
  'teal': {
    name: 'Cool Teal',
    primary: '#2dd4bf',
    primaryHover: '#14b8a6',
    description: 'Modern, tech-forward, professional'
  },
  'slate': {
    name: 'Neutral Slate',
    primary: '#94a3b8',
    primaryHover: '#cbd5e1',
    description: 'Maximum minimalism with almost no color at all'
  },
  'orange': {
    name: 'Vibrant Orange',
    primary: '#fb923c',
    primaryHover: '#f97316',
    description: 'Energetic and bold, perfect for standing out'
  },
  'indigo': {
    name: 'Elegant Indigo',
    primary: '#818cf8',
    primaryHover: '#6366f1',
    description: 'Sophisticated purple-blue, creative yet professional'
  },
  'emerald': {
    name: 'Fresh Emerald',
    primary: '#34d399',
    primaryHover: '#10b981',
    description: 'Natural and calming green'
  },
  'rose': {
    name: 'Warm Rose',
    primary: '#fb7185',
    primaryHover: '#f43f5e',
    description: 'Unique and inviting pink-red'
  },
  'sky': {
    name: 'Bright Sky',
    primary: '#38bdf8',
    primaryHover: '#0ea5e9',
    description: 'Light and airy blue, open and approachable'
  },
  'lime': {
    name: 'Electric Lime',
    primary: '#a3e635',
    primaryHover: '#84cc16',
    description: 'High-energy yellow-green'
  },
} as const;

export type PaletteName = keyof typeof colorPalettes;

/**
 * SELECT YOUR COLOR PALETTE HERE
 *
 * Options:
 * - 'kanagawa-spring-green' (default)
 * - 'kanagawa-crystal-blue'
 * - 'kanagawa-autumn-yellow'
 * - 'kanagawa-sakura-pink'
 * - 'kanagawa-wave-aqua'
 * - 'amber'
 * - 'teal'
 * - 'slate'
 * - 'orange'
 * - 'indigo'
 * - 'emerald'
 * - 'rose'
 * - 'sky'
 * - 'lime'
 */
export const selectedPalette: PaletteName = 'kanagawa-spring-green';

// Export the active color palette
export const theme = colorPalettes[selectedPalette];

// Kanagawa base colors (used regardless of accent color)
export const kanagawaColors = {
  background: '#1F1F28',      // sumiInk1 - main background
  backgroundAlt: '#2A2A37',   // sumiInk2 - lighter background
  backgroundDark: '#16161D',  // sumiInk0 - dark background for code blocks
  foreground: '#DCD7BA',      // fujiWhite - main text
  foregroundAlt: '#C8C093',   // oldWhite - secondary text
};
