# Theme Configuration Guide

## Changing Your Accent Color

Your portfolio uses a **Kanagawa-inspired dark theme** with configurable accent colors. The theme is currently set to **Kanagawa Spring Green**.

### How to Change the Accent Color

1. Open `src/config/theme.ts`
2. Find the line that says `export const selectedPalette: PaletteName = 'kanagawa-spring-green';`
3. Replace `'kanagawa-spring-green'` with any of the available options below
4. Save the file - the dev server will automatically reload with your new color!

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

```typescript
// In src/config/theme.ts
export const selectedPalette: PaletteName = 'kanagawa-crystal-blue';
```

### Preview All Colors

Visit `/colors` in your browser while the dev server is running to see all 14 color options with live examples of links, buttons, and text.

Example: `http://localhost:4321/colors`

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
