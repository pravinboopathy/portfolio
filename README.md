# Personal Portfolio

A modern, fast portfolio website built with Astro, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Fast**: Built with Astro's Islands Architecture - ships minimal JavaScript
- 🎨 **Dark/Light Mode**: Toggle between themes with persistent preference
- 📝 **Blog**: Markdown-based blog with tags and reading time
- 🚀 **Projects Showcase**: Easy-to-update project cards with demos and GitHub links
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🔍 **SEO Ready**: Meta tags and semantic HTML for better search visibility

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

### Personal Information

1. **Update placeholders** in the following files:
   - `src/pages/index.astro` - Your name, bio, tagline
   - `src/components/Footer.astro` - Social links and email
   - `src/components/Header.astro` - Site name/logo

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

### Customizing Colors

Edit the accent colors in `src/styles/global.css`:

```css
:root {
  --accent: 59 130 246; /* Blue-500 RGB */
}
```

Or modify the Tailwind config for global theme changes.

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
├── public/               # Static assets (images, favicon, etc.)
├── src/
│   ├── components/      # Reusable UI components
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
- **Interactivity**: [React](https://react.dev) (for dark mode toggle)
- **Deployment**: GitHub Pages / Vercel / Netlify

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

Feel free to use this template for your own portfolio!
