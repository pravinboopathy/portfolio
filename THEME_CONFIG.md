# Theme Configuration Guide

## Overview

Your portfolio uses a complete theming system with 7 curated dark themes. Each theme defines background colors, text colors, accent colors, and borders for a cohesive look.

## Changing Your Theme

Edit `config.json` in the project root:

```json
{
  "theme": {
    "selectedTheme": "kanagawa-blue"
  }
}
```

Replace `"kanagawa-blue"` with any available theme (see below). Restart the dev server to see changes.

## Available Themes

### Kanagawa Dark
**Key:** `kanagawa-dark`

Inspired by "The Great Wave off Kanagawa" painting. Natural, earthy theme with warm beige text and green accents.

- Background: `#1F1F28` (dark charcoal)
- Text: `#DCD7BA` (warm beige)
- Accent: `#98BB6C` (spring green)

### Kanagawa Blue
**Key:** `kanagawa-blue`

Same Kanagawa base with soft, muted blue accents. Calming and sophisticated.

- Background: `#1F1F28` (dark charcoal)
- Text: `#DCD7BA` (warm beige)
- Accent: `#7E9CD8` (crystal blue)

### Tokyo Night
**Key:** `tokyo-night`

Deep blue background with bright cyan accents. Modern and vibrant.

- Background: `#1a1b26` (deep blue-black)
- Text: `#c0caf5` (soft lavender white)
- Accent: `#7aa2f7` (bright blue)

### Gruvbox Dark
**Key:** `gruvbox-dark`

Warm, retro-inspired theme with earthy tones and orange/yellow accents.

- Background: `#282828` (warm dark)
- Text: `#ebdbb2` (cream)
- Accent: `#fabd2f` (golden yellow)

### Nord
**Key:** `nord`

Arctic, north-bluish theme with cool, frost-inspired colors.

- Background: `#2e3440` (polar night)
- Text: `#eceff4` (snow storm white)
- Accent: `#88c0d0` (frost blue)

### Dracula
**Key:** `dracula`

Dark purple theme with vibrant pink accents. Popular among developers.

- Background: `#282a36` (dark purple)
- Text: `#f8f8f2` (white)
- Accent: `#ff79c6` (pink)

### Monokai
**Key:** `monokai`

Classic dark theme with bright yellow-green accents. Familiar to Sublime Text users.

- Background: `#272822` (almost black)
- Text: `#f8f8f2` (white)
- Accent: `#a6e22e` (lime green)

## Example Configurations

**Kanagawa Blue (default):**
```json
{
  "theme": {
    "selectedTheme": "kanagawa-blue"
  }
}
```

**Tokyo Night:**
```json
{
  "theme": {
    "selectedTheme": "tokyo-night"
  }
}
```

**Gruvbox Dark:**
```json
{
  "theme": {
    "selectedTheme": "gruvbox-dark"
  }
}
```

## How It Works

1. **Build time**: `ThemeProvider.astro` reads the selected theme from `config.json` and injects CSS variables into the HTML
2. **CSS Variables**: All colors are defined as CSS variables (`--bg-primary`, `--text-primary`, `--accent-primary`, etc.)
3. **Consistent styling**: Components use these CSS variables, so changing the theme updates all colors site-wide

## CSS Variables

Each theme sets these CSS variables:

```css
:root {
  /* Background colors */
  --bg-primary: ...;      /* Main background */
  --bg-secondary: ...;    /* Cards, sidebar */
  --bg-tertiary: ...;     /* Hover states */
  --bg-dark: ...;         /* Code blocks */

  /* Text colors */
  --text-primary: ...;    /* Main body text */
  --text-secondary: ...;  /* Secondary text */
  --text-muted: ...;      /* Very muted text */

  /* Accent colors */
  --accent-primary: ...;  /* Links, highlights */
  --accent-hover: ...;    /* Hover states */

  /* Border colors */
  --border-default: ...;
  --border-hover: ...;
}
```

## Adding Custom Themes

To create your own theme, edit `src/config/theme.ts`:

```typescript
'my-custom-theme': {
  name: 'My Custom Theme',
  description: 'Your description here',
  background: '#your-bg-color',
  backgroundAlt: '#your-alt-bg',
  backgroundTertiary: '#your-tertiary-bg',
  backgroundDark: '#your-dark-bg',
  text: '#your-text-color',
  textSecondary: '#your-secondary-text',
  textMuted: '#your-muted-text',
  accent: '#your-accent-color',
  accentHover: '#your-accent-hover',
  border: '#your-border-color',
  borderHover: '#your-border-hover',
},
```

Then set `"selectedTheme": "my-custom-theme"` in `config.json`.

## Typography

The theme uses (not affected by color scheme):
- **Base font size:** 20px
- **Line height:** 1.75
- **Font family:** System font stack (for performance)

These create a comfortable, readable experience with generous whitespace.
