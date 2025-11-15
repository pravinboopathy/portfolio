// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Update this with your GitHub username and repo name
  // site: 'https://yourusername.github.io',
  // base: '/your-repo-name',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});