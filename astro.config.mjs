// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lafieradeportiva.com',
  output: 'static', // Set to static for GitHub Pages
  integrations: [mdx(), sitemap()],
  redirects: {
    '/articles/featured-article': '/articles/el-gigante-dormido',
    '/articles/secondary-article-1': '/articles/chicago-stars-fc',
    '/articles/secondary-article-2': '/articles/messi-regresa-a-chicago',
    '/videos/video-1': '/videos/brian-gutierrez-guty',
    '/videos/video-2': '/videos/lfd-2025-stars-fire',
    '/videos/video-3': '/videos/lfd-2025-aranatv',
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/studio/**', '**/docs/**'],
      },
    },
  },
});
