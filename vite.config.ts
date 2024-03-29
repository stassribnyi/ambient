import { defineConfig } from 'vite';
import path from 'path';

import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  manifest: {
    name: 'Ambient',
    short_name: 'Ambient',
    description: 'It is simple and user-friendly page with up-to-date weather forecasts for your favorite locations.',
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'android-chrome-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'maskable-icon.png',
        sizes: '225x225',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'maskable-icon.png',
        sizes: '225x225',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: 'screenshot-wide.png',
        sizes: '650x480',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Ambient Desktop',
      },
      {
        src: 'screenshot-narrow.png',
        sizes: '450x925',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Ambient Mobile',
      },
    ],
    theme_color: '#11191f',
    background_color: '#11191f',
    display: 'standalone',
    scope: '/ambient/',
    start_url: '/ambient/',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  base: '/ambient/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@typings': path.resolve(__dirname, './src/typings'),
    },
  },
});
