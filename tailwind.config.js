// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btc-navy': '#1a202c',     // 基本背景色（ダークグレー）
        'btc-dark': '#111827',     // より濃い背景（ヘッダー、フッター用）
        'btc-surface': '#242937',  // カード、フォーム背景
        'btc-price': '#FF9500',    // ビットコイン色（オレンジ）
        'btc-median': '#4CAF50',   // 中央価格（緑）
        'btc-support': '#E57373',  // 下限価格（赤）
        'btc-text': '#E2E8F0',     // 基本テキスト色
        'btc-text-soft': '#94A3B8', // 薄めのテキスト
        'btc-highlight': '#1E3A8A', // ハイライト色（ディープブルー）
        'btc-accent': '#FBBF24',   // アクセント色（ゴールド）
      },
    },
  },
  plugins: [],
};