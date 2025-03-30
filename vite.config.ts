import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [],
      },
      jsxRuntime: 'automatic',
    }),
  ],
  // ベースパスを相対パスに設定
  base: './',
  server: {
    port: 5173,
    host: '127.0.0.1',
    proxy: {
      '/api/binance': {
        target: 'https://api.binance.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/binance/, ''),
      },
      '/api/coingecko': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/coingecko/, ''),
      },
      '/api/blockchain': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/blockchain/, ''),
      },
    },
  },
  build: {
    // 出力ディレクトリを指定（Vercelの設定と一致させる）
    outDir: 'dist',
    // SPAのためのヒストリーAPIフォールバック
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'recharts': ['recharts'],
          'utils': ['date-fns', 'lucide-react', 'phosphor-react'],
        },
      },
    },
  },
  // 開発サーバーでのヒストリーフォールバック
  // これはビルド時には影響しませんが、開発時に役立ちます
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});