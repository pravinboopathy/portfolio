# Theme Configuration Guide

## Changing Your Accent Color

Your portfolio uses a **Kanagawa-inspired dark theme** with configurable accent colors. The theme is currently set to **Kanagawa Spring Green**.

### Method 1: Using config.json (Recommended - Coming Soon)

**Note:** Theme selector feature is planned. Once implemented, you'll be able to:
1. Use an interactive theme selector in the sidebar to preview themes
2. Edit `config.json` to permanently save your choice
3. No code editing required!

### Method 2: Manual Configuration (Current)

**For now, to change the theme:**

1. Open `config.json` in the project root (create if it doesn't exist)
2. Add or update the theme configuration:
   ```json
   {
     "theme": {
       "selectedPalette": "kanagawa-spring-green"
     }
   }
   ```
3. Replace `'kanagawa-spring-green'` with any available palette (see below)
4. Restart the dev server to see changes

**Alternative (temporary):**
1. Edit `src/config/theme.ts` directly
2. Find: `export const selectedPalette: PaletteName = 'kanagawa-spring-green';`
3. Replace with your choice
4. Save - dev server will auto-reload

### Available Color Palettes

#### Kanagawa Theme Colors
These colors are from the authentic Kanagawa Neovim theme palette:

- `'kanagawa-spring-green'` - Natural, earthy green (#98BB6C) **← Current**
- `'kanagawa-crystal-blue'` - Soft, muted blue (#7E9CD8)
- `'kanagawa-autumn-yellow'` - Warm, golden yellow (#DCA561)
- `'kanagawa-sakura-pink'` - Delicate cherry blossom pink (#D27E99)
- `'kanagawa-wave-aqua'` - Ocean-inspired teal (#7AA89F)

#### Standard Colors
Modern Tailwind-inspired accent colors:

- `'amber'` - Warm amber (#fbbf24)
- `'teal'` - Cool teal (#2dd4bf)
- `'slate'` - Neutral slate (#94a3b8) - maximum minimalism
- `'orange'` - Vibrant orange (#fb923c)
- `'indigo'` - Elegant indigo (#818cf8)
- `'emerald'` - Fresh emerald (#34d399)
- `'rose'` - Warm rose (#fb7185)
- `'sky'` - Bright sky (#38bdf8)
- `'lime'` - Electric lime (#a3e635)

### Example Configuration

**config.json:**
```json
{
  "theme": {
    "selectedPalette": "kanagawa-crystal-blue"
  }
}
```

**Or in src/config/theme.ts (temporary):**
```typescript
export const selectedPalette: PaletteName = 'kanagawa-crystal-blue';
```

### Preview All Colors

**Current:** Visit `/colors` in your browser while the dev server is running to see all 14 color options with live examples.

Example: `http://localhost:4321/colors`

**Coming Soon:** An interactive theme selector will be added to the sidebar, allowing you to:
- Preview all 14 themes instantly
- Switch between themes with one click
- Save your preference to localStorage
- Copy theme name to add to `config.json` for permanent use

## Base Theme Colors

The following Kanagawa colors are used regardless of your accent color choice:

- **Background:** `#1F1F28` (sumiInk1)
- **Text:** `#DCD7BA` (fujiWhite)
- **Secondary Text:** `#C8C093` (oldWhite)
- **Code Blocks:** `#16161D` (sumiInk0)

These create the signature dark, warm aesthetic inspired by "The Great Wave off Kanagawa" painting.

## Advanced Customization

If you want to create your own custom color palette:

1. Open `src/config/theme.ts`
2. Add a new entry to the `colorPalettes` object:

```typescript
'my-custom-color': {
  name: 'My Custom Color',
  primary: '#your-hex-color',        // Main accent
  primaryHover: '#your-hover-color',  // Hover state
  description: 'Your description'
},
```

3. Update the `PaletteName` type to include your new palette
4. Set `selectedPalette` to your new palette name

## Typography

The theme uses:
- **Base font size:** 20px
- **Line height:** 1.75
- **Font family:** System font stack (for performance)

These create a comfortable, readable experience with generous whitespace.
