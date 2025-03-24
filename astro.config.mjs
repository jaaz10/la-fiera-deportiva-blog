// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lafieradeportiva.com',
  output: 'static', // Set to static for GitHub Pages
  integrations: [mdx(), sitemap()],
  // Remove the Node.js adapter completely
});