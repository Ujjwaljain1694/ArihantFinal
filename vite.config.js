import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/youtube-rss': {
        target: 'https://www.youtube.com',
        changeOrigin: true,
        // Rewrite: /api/youtube-rss?channel_id=X → /feeds/videos.xml?channel_id=X
        rewrite: (path) => path.replace(/^\/api\/youtube-rss/, '/feeds/videos.xml'),
        secure: true,
        configure: (proxy) => {
          proxy.on('error', (err) => console.error('[vite proxy error]', err));
          proxy.on('proxyRes', (res) => console.log('[vite proxy] YouTube RSS status:', res.statusCode));
        },
      },
    },
  },
})


