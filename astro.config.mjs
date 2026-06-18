// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://mvgnlabs.vercel.app',
  srcDir: './src',
  publicDir: './public',
  output: 'static',

  devToolbar: {
    enabled: false,
  },

  vite: {
    css: {
      devSourcemap: true,
    },
  },

  integrations: [mdx(), react()],
});