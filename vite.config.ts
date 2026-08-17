import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If this ever ships to GitHub Pages under https://<user>.github.io/<repo>/,
// set base to '/<repo>/'. Vercel and a custom domain both want '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
