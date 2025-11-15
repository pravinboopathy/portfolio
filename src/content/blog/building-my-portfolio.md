---
title: "Building My Portfolio with Astro"
description: "A deep dive into how I built this portfolio website using Astro and Tailwind CSS"
date: 2025-01-15
tags: ["astro", "webdev", "portfolio"]
---

## Why I Chose Astro

When deciding on a tech stack for my portfolio, I wanted something that was:

- Fast and lightweight
- Easy to maintain
- SEO-friendly
- Fun to work with

Astro checked all these boxes and more!

### The Islands Architecture

One of Astro's killer features is its "Islands Architecture." By default, Astro ships **zero JavaScript** to the browser. You only add JavaScript where you need it.

For example, my dark mode toggle is a React component, but the rest of the site is just static HTML:

```astro
<DarkModeToggle client:load />
```

The `client:load` directive tells Astro to hydrate this component on the client side.

### Content Collections

Astro's content collections make it incredibly easy to manage blog posts and projects. I just drop a markdown file in the appropriate folder, and it automatically shows up on the site.

```typescript
const projects = await getCollection('projects');
```

### Performance

The site loads in under a second and scores 100 on Lighthouse. That's the power of shipping minimal JavaScript!

## Lessons Learned

- **Start simple**: I focused on getting the core features right before adding bells and whistles
- **Design systems matter**: Using Tailwind made it easy to maintain consistent styling
- **Content first**: The best portfolio is one that's actually published, even if it's not perfect

## What's Next

I plan to add:

- Blog post search functionality
- More interactive project demos
- RSS feed for blog posts

Stay tuned!
