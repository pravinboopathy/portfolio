# Feature Implementation: Theme Selector & Config System

**Status:** Not Yet Implemented
**Priority:** High
**Estimated Complexity:** Medium

## Feature Overview

Add a user-facing theme selector component and migrate from hardcoded theme configuration to a JSON-based configuration system. This allows users to preview and switch between 14 color palettes without editing code.

---

## Current State

### What's Already Implemented

1. **14 Pre-defined Color Palettes**
   - Location: `src/config/theme.ts`
   - 5 Kanagawa themes + 9 standard themes
   - Each palette has `primary` and `primaryHover` colors

2. **Theme System Architecture**
   - `src/config/theme.ts` - Theme definitions and exports
   - `src/components/ThemeProvider.astro` - Injects CSS variables
   - `src/styles/global.css` - Base Kanagawa colors and CSS variables
   - Currently reads from hardcoded `selectedPalette` variable

3. **Color Preview Page**
   - Location: `src/pages/colors.astro`
   - Shows all 14 themes with examples
   - **Will be removed** after theme selector is implemented

4. **Current Theme Selection Method**
   - Edit `src/config/theme.ts`
   - Change line: `export const selectedPalette: PaletteName = 'kanagawa-spring-green';`
   - Restart dev server

### Tech Stack

- **Framework:** Astro v4+ with TypeScript
- **Styling:** Tailwind CSS (v4)
- **Interactive Components:** React (for theme selector)
- **CSS Variables:** Used for dynamic theming

### File Structure

```
src/
├── config/
│   └── theme.ts          # Theme definitions (14 palettes)
├── components/
│   ├── ThemeProvider.astro   # Injects theme CSS vars
│   └── Sidebar.astro         # Vertical navigation (desktop + mobile)
├── styles/
│   └── global.css        # Kanagawa base colors + CSS variables
└── pages/
    └── colors.astro      # Preview page (to be removed)
```

---

## Feature Requirements

### 1. Create Extensible `config.json`

**Location:** Project root (`/config.json`)

**Purpose:** Single source of truth for all site configuration, not just theme.

**Schema:**
```json
{
  "theme": {
    "selectedPalette": "kanagawa-spring-green"
  },
  "site": {
    "name": "Your Name",
    "title": "Software Engineer",
    "email": "your.email@example.com"
  },
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://twitter.com/yourusername"
  }
}
```

**Validation:**
- `theme.selectedPalette` must be one of 14 valid palette names
- All fields are optional (fallback to defaults if missing)
- TypeScript interface should enforce types

### 2. Update Theme System to Read from config.json

**File to modify:** `src/config/theme.ts`

**Current implementation:**
```typescript
export const selectedPalette: PaletteName = 'kanagawa-spring-green'; // Hardcoded
```

**New implementation:**
```typescript
import configData from '../../config.json';

export const selectedPalette: PaletteName =
  (configData?.theme?.selectedPalette as PaletteName) || 'kanagawa-spring-green';
```

**Fallback behavior:**
- If `config.json` doesn't exist → use default
- If `selectedPalette` is invalid → use default + log warning
- If localStorage has a preview theme → use that (temporary override)

### 3. Create ThemeSelector Component

**File to create:** `src/components/ThemeSelector.tsx`

**Technology:** React component (hydrated with `client:load`)

**Component Specifications:**

```typescript
interface ThemeSelectorProps {
  currentTheme: string;
  themes: Record<string, ColorPalette>;
}
```

**Features:**
1. **Dropdown/Select Menu**
   - Grouped by category (Kanagawa vs Standard)
   - Shows theme name + color swatch
   - Current theme highlighted

2. **Live Preview**
   - Updates CSS variables on selection
   - No page reload required
   - Instant visual feedback

3. **Persistence**
   - Save selection to `localStorage` key: `theme-preview`
   - Survives page refresh
   - Can be cleared/reset

4. **User Instructions**
   - Show subtle hint: "To save permanently, edit config.json"
   - Optional: "Copy to clipboard" button for theme name

**CSS Variables to Update:**
```css
:root {
  --accent-primary: <theme.primary>;
  --accent-hover: <theme.primaryHover>;
}
```

**LocalStorage Structure:**
```json
{
  "theme-preview": "kanagawa-crystal-blue"
}
```

**Component Design (Minimalist):**

```
┌─────────────────────────┐
│ Theme                  │
│ ┌────────────────────┐ │
│ │ ● Spring Green  ▼  │ │  ← Dropdown with color dot
│ └────────────────────┘ │
│ Saved in browser       │  ← Status text
└─────────────────────────┘

When expanded:
┌─────────────────────────┐
│ Kanagawa Themes        │
│ ● Spring Green          │ ← Current
│ ○ Crystal Blue          │
│ ○ Autumn Yellow         │
│ ○ Sakura Pink           │
│ ○ Wave Aqua             │
│                         │
│ Standard Themes         │
│ ○ Amber                 │
│ ○ Teal                  │
│ ... (9 more)            │
└─────────────────────────┘
```

### 4. Integrate ThemeSelector into Sidebar

**File to modify:** `src/components/Sidebar.astro`

**Location:** Bottom of sidebar navigation, above any footer content

**Integration:**
```astro
import ThemeSelector from './ThemeSelector';
import { theme, colorPalettes } from '../config/theme';

<!-- In sidebar content -->
<ThemeSelector
  client:load
  currentTheme={theme.name}
  themes={colorPalettes}
/>
```

**Styling:**
- Match sidebar's minimalist aesthetic
- Small, unobtrusive
- Subtle borders consistent with theme
- Responsive (hide label on very small screens if needed)

### 5. Remove Color Preview Page

**File to delete:** `src/pages/colors.astro`

**Reason:** Replaced by interactive theme selector

**Migration:** Users can now preview themes directly via the selector

---

## Technical Implementation Details

### TypeScript Interfaces

**config/types.ts (create if needed):**
```typescript
export interface SiteConfig {
  theme: {
    selectedPalette: string;
  };
  site?: {
    name?: string;
    title?: string;
    email?: string;
  };
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}
```

### Theme Loading Logic

**Priority order (highest to lowest):**
1. localStorage (temporary preview)
2. config.json (permanent)
3. hardcoded default ('kanagawa-spring-green')

**Implementation:**
```typescript
// In theme.ts or new config loader
function getSelectedTheme(): PaletteName {
  // Check localStorage first (for preview)
  if (typeof window !== 'undefined') {
    const preview = localStorage.getItem('theme-preview');
    if (preview && preview in colorPalettes) {
      return preview as PaletteName;
    }
  }

  // Check config.json
  try {
    const config = await import('../../config.json');
    const palette = config.theme?.selectedPalette;
    if (palette && palette in colorPalettes) {
      return palette as PaletteName;
    }
  } catch (error) {
    console.warn('config.json not found, using default theme');
  }

  // Fallback to default
  return 'kanagawa-spring-green';
}
```

### React Component Implementation

**ThemeSelector.tsx structure:**

```tsx
import { useState, useEffect } from 'react';

interface ThemeSelectorProps {
  currentTheme: string;
  themes: Record<string, ColorPalette>;
}

export default function ThemeSelector({ currentTheme, themes }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const preview = localStorage.getItem('theme-preview');
    if (preview && preview in themes) {
      setSelectedTheme(preview);
      applyTheme(preview);
    }
  }, []);

  const applyTheme = (themeName: string) => {
    const theme = themes[themeName];
    if (!theme) return;

    // Update CSS variables
    document.documentElement.style.setProperty('--accent-primary', theme.primary);
    document.documentElement.style.setProperty('--accent-hover', theme.primaryHover);

    // Save to localStorage
    localStorage.setItem('theme-preview', themeName);
  };

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    applyTheme(themeName);
    setIsOpen(false);
  };

  // Group themes
  const kanagawaThemes = Object.entries(themes).filter(([key]) =>
    key.startsWith('kanagawa-')
  );
  const standardThemes = Object.entries(themes).filter(([key]) =>
    !key.startsWith('kanagawa-')
  );

  return (
    <div className="theme-selector">
      {/* Implementation here */}
    </div>
  );
}
```

### CSS Variables Update

**Current CSS vars (in global.css):**
```css
:root {
  --accent-primary: #98BB6C;  /* Default Spring Green */
  --accent-hover: #76946A;
}
```

**These get overridden by:**
1. ThemeProvider.astro (at build time from config.json)
2. ThemeSelector.tsx (at runtime via JavaScript)

---

## Step-by-Step Implementation Checklist

### Phase 1: Configuration System

- [ ] Create `config.json` in project root with full schema
- [ ] Create TypeScript interface for config (`SiteConfig`)
- [ ] Update `src/config/theme.ts` to read from config.json
- [ ] Add fallback logic for missing config
- [ ] Test: Change theme in config.json, restart server, verify theme changes

### Phase 2: ThemeSelector Component

- [ ] Create `src/components/ThemeSelector.tsx`
- [ ] Implement dropdown UI (grouped by Kanagawa/Standard)
- [ ] Add color swatch indicators
- [ ] Implement localStorage persistence
- [ ] Implement CSS variable updates (live preview)
- [ ] Add status text ("Saved in browser")
- [ ] Style component to match sidebar aesthetic
- [ ] Test: Select theme, verify instant update, refresh page, verify persistence

### Phase 3: Integration

- [ ] Add ThemeSelector to `Sidebar.astro`
- [ ] Pass current theme and palettes as props
- [ ] Add `client:load` directive
- [ ] Test on desktop and mobile
- [ ] Verify sidebar layout isn't broken

### Phase 4: Cleanup & Documentation

- [ ] Delete `src/pages/colors.astro`
- [ ] Update `THEME_CONFIG.md` to reflect new process
- [ ] Update `CLAUDE.md` if needed
- [ ] Test full workflow:
  - [ ] Use selector to preview themes
  - [ ] Edit config.json to save permanently
  - [ ] Restart server, verify config.json theme is applied
  - [ ] Clear localStorage, verify config.json is still used

### Phase 5: Git Commits

Create clean commits without Claude attribution:

1. "Add extensible config.json for site configuration"
2. "Update theme system to read from config.json"
3. "Add interactive theme selector component"
4. "Integrate theme selector into sidebar"
5. "Remove static color preview page"

---

## Testing Checklist

### Functionality Tests

- [ ] **Config.json exists:** Theme from config is applied
- [ ] **Config.json missing:** Default theme is applied
- [ ] **Invalid theme in config:** Default theme is applied + warning logged
- [ ] **Theme selector changes theme:** CSS updates instantly
- [ ] **Page refresh after selector use:** localStorage theme persists
- [ ] **Clear localStorage:** Config.json theme is used
- [ ] **Config.json + localStorage both set:** localStorage takes priority
- [ ] **Change config.json:** Restart server, new theme applies

### UI Tests

- [ ] **Desktop:** Theme selector visible in sidebar
- [ ] **Mobile:** Theme selector accessible (may need to open hamburger menu first)
- [ ] **Dropdown opens:** All 14 themes visible
- [ ] **Grouped correctly:** Kanagawa themes separated from standard
- [ ] **Current theme highlighted:** Visual indicator of active theme
- [ ] **Color swatches shown:** Easy visual identification
- [ ] **Minimalist styling:** Matches overall site aesthetic

### Edge Cases

- [ ] **Rapid theme switching:** No performance issues
- [ ] **Multiple tabs open:** Theme change in one tab doesn't break others
- [ ] **Browser with localStorage disabled:** Graceful degradation
- [ ] **Invalid theme name in localStorage:** Ignored, config.json used

---

## Success Criteria

✅ **User Experience:**
- User can change theme without editing code
- Theme changes are instant (no page reload)
- Theme choice persists in browser
- Clear path to save theme permanently (edit config.json)
- No broken functionality from /colors page removal

✅ **Code Quality:**
- Clean separation of config vs code
- TypeScript interfaces for type safety
- Fallback logic for missing/invalid config
- Minimal JavaScript (only theme selector is interactive)
- Consistent with existing code style

✅ **Documentation:**
- config.json structure documented
- Theme selector usage explained
- Migration guide from old method

---

## File Checklist

**Files to Create:**
- [ ] `/config.json` - Site configuration
- [ ] `src/components/ThemeSelector.tsx` - Theme selector component
- [ ] (Optional) `src/config/types.ts` - TypeScript interfaces

**Files to Modify:**
- [ ] `src/config/theme.ts` - Read from config.json
- [ ] `src/components/Sidebar.astro` - Add ThemeSelector
- [ ] `CLAUDE.md` - Already updated ✓
- [ ] `THEME_CONFIG.md` - Already updated ✓

**Files to Delete:**
- [ ] `src/pages/colors.astro` - Replaced by ThemeSelector

---

## Code Examples

### Example config.json
```json
{
  "theme": {
    "selectedPalette": "kanagawa-spring-green"
  },
  "site": {
    "name": "John Doe",
    "title": "Software Engineer",
    "email": "john@example.com"
  },
  "social": {
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe"
  }
}
```

### Example ThemeSelector Integration in Sidebar.astro
```astro
---
import ThemeSelector from './ThemeSelector';
import { theme, colorPalettes } from '../config/theme';
---

<nav id="sidebar" class="sidebar">
  <div class="sidebar-content">
    <!-- Logo/Header -->
    <div class="sidebar-header">
      <a href="/" class="logo-link">
        <span class="logo-text">Portfolio</span>
      </a>
    </div>

    <!-- Navigation Links -->
    <ul class="nav-list">
      <li><a href="/" class="nav-link">About</a></li>
      <li><a href="/#projects" class="nav-link">Projects</a></li>
      <li><a href="/blog" class="nav-link">Blog</a></li>
      <li><a href="/#contact" class="nav-link">Contact</a></li>
    </ul>

    <!-- Theme Selector (NEW) -->
    <div class="theme-selector-wrapper">
      <ThemeSelector
        client:load
        currentTheme={theme.name}
        themes={colorPalettes}
      />
    </div>
  </div>
</nav>
```

---

## Notes for Implementation

### Performance Considerations

- Theme selector component should be small and load quickly
- Use `client:load` (not `client:visible`) so it's available immediately
- CSS variable updates are instant (no reflow/repaint issues)
- localStorage is synchronous, fast enough for this use case

### Accessibility

- Dropdown should be keyboard navigable
- Color swatches should have aria-labels
- Current theme should be announced to screen readers
- Focus states clearly visible

### Browser Compatibility

- CSS variables: All modern browsers (IE11 not supported)
- localStorage: Universal support
- React: No compatibility issues

### Future Enhancements

Potential features to add later:
- Export current theme as CSS file
- Create custom themes via color picker
- Share theme via URL parameter (e.g., `?theme=custom`)
- Theme preview mode with side-by-side comparison

---

## Questions to Clarify (if needed)

1. Should theme selector be collapsible (to save space)?
2. Should there be a "Reset to default" button?
3. Should config.json be committed to git (with placeholder values)?
4. Should there be a notification when theme is changed?
5. Mobile: Should theme selector be in hamburger menu or always visible?

**Recommended Defaults:**
1. No - keep it visible (it's small)
2. Yes - helpful for users
3. Yes - with placeholder values as template
4. Optional - subtle toast/banner
5. In hamburger menu (more space)

---

This feature will significantly improve UX by removing the need to edit code files. Good luck with the implementation!
