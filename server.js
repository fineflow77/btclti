// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ES モジュールで __dirname を使用するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS設定
app.use(cors({ origin: 'http://localhost:5173' })); // Viteデフォルトポートを指定
app.use(express.json());

// パブリックディレクトリの設定 - weekly.json ファイルのために重要
app.use(express.static(path.join(__dirname, 'public')));

// ビルドされたアプリの静的ファイル配信
app.use(express.static(path.join(__dirname, 'dist')));

// SPA用のルート設定 - すべての他のルートをindex.htmlにリダイレクト
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
    console.log(`公開ディレクトリ: ${path.join(__dirname, 'public')}`);
    console.log(`静的ファイルディレクトリ: ${path.join(__dirname, 'dist')}`);
});