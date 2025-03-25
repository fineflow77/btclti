// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// ルート要素を取得
const rootElement = document.getElementById('root');

// ルート要素が存在しない場合のエラーハンドリング
if (!rootElement) {
  throw new Error('Root element not found. Please ensure there is a <div id="root"> in your index.html.');
}

// React 18 の新しい createRoot API を使用してアプリケーションをレンダリング
const root = createRoot(rootElement);

// レンダリング処理
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);