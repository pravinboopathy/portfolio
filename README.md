# Personal Portfolio

A modern, fast portfolio website built with Astro, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Fast**: Built with Astro's Islands Architecture - ships minimal JavaScript
- 🎨 **7 Curated Themes**: Complete color schemes (Kanagawa, Tokyo Night, Nord, Gruvbox, Dracula, Monokai)
- 📝 **Blog**: Markdown-based blog with tags and reading time (toggleable via config)
- 🚀 **Projects Showcase**: Easy-to-update project cards with demos and GitHub links
- 📱 **Responsive**: Mobile-first design with sidebar navigation
- 🔍 **SEO Ready**: Meta tags and semantic HTML for better search visibility
- ⚙️ **Config-based**: Centralized configuration via `config.json`

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

## Customization

### Site Configuration

Edit `config.json` in the project root:

```json
{
  "theme": {
    "selectedTheme": "kanagawa-blue"
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
  },
  "features": {
    "blog": false
  }
}
```

**Available themes:**
- `kanagawa-dark` - Natural earthy theme with green accents
- `kanagawa-blue` - Soft blue with warm tones
- `tokyo-night` - Deep blue with cyan accents
- `gruvbox-dark` - Warm retro theme with orange accents
- `nord` - Arctic bluish theme with frost accents
- `dracula` - Purple theme with pink accents
- `monokai` - Classic dark theme with lime accents

See `THEME_CONFIG.md` for detailed theme documentation.

### Personal Information

1. **Update placeholders** in the following files:
   - `config.json` - Your name, email, social links
   - `src/pages/index.astro` - Your bio and about section
   - `src/components/Footer.astro` - Footer content
   - `src/components/Sidebar.astro` - Site name/logo

2. **Add your photo** (optional):
   - Place your photo in `public/` directory
   - Reference it in your pages

### Adding Projects

Create a new markdown file in `src/content/projects/`:

```markdown
---
title: "My Awesome Project"
description: "A brief description of what it does"
tech: ["React", "Node.js", "MongoDB"]
demoUrl: "https://demo.example.com"
githubUrl: "https://github.com/yourusername/project"
featured: true
order: 1
---

Optional full project description goes here.
```

### Adding Blog Posts

Create a new markdown file in `src/content/blog/`:

```markdown
---
title: "My First Blog Post"
description: "A brief description for SEO and previews"
date: 2025-01-14
tags: ["webdev", "javascript"]
---

Your blog post content here...
```

### Customizing Themes

Change `theme.selectedTheme` in `config.json` to switch between complete color schemes:

```json
{
  "theme": {
    "selectedTheme": "tokyo-night"
  }
}
```

Each theme controls background colors, text colors, accent colors, and borders for a cohesive look. Restart the dev server after changing the theme.

## Deployment

### GitHub Pages

1. **Update `astro.config.mjs`**:
   ```js
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/your-repo-name',
     // ...
   });
   ```

2. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: GitHub Actions

3. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

The GitHub Action will automatically build and deploy your site!

### Alternative Deployment Options

- **Vercel**: Connect your GitHub repo at [vercel.com](https://vercel.com)
- **Netlify**: Connect your GitHub repo at [netlify.com](https://netlify.com)
- **Cloudflare Pages**: Connect your GitHub repo at [pages.cloudflare.com](https://pages.cloudflare.com)

All three offer free hosting with automatic deployments on git push.

## Development Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

```
/
├── config.json          # Site configuration (theme, features, info)
├── public/               # Static assets (images, favicon, etc.)
├── src/
│   ├── components/      # Reusable UI components
│   ├── config/          # Theme definitions
│   ├── content/         # Content collections
│   │   ├── blog/       # Blog posts (markdown)
│   │   └── projects/   # Project data (markdown)
│   ├── layouts/        # Page layouts
│   ├── pages/          # File-based routing
│   └── styles/         # Global styles
├── .github/
│   └── workflows/      # GitHub Actions for deployment
└── astro.config.mjs    # Astro configuration
```

## Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Language**: TypeScript
- **Deployment**: GitHub Pages (static output)

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

Feel free to use this template for your own portfolio!
