# ベースイメージ
FROM node:16 AS builder

# 作業ディレクトリの設定
WORKDIR /app

# フロントエンドのビルド
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# バックエンドのセットアップ
COPY backend ./backend
RUN cd backend && npm install

# 実行環境の設定
FROM node:16

WORKDIR /app

# ビルド済みのフロントエンドとバックエンドをコピー
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/backend ./backend

# サーバーの起動
CMD ["node", "backend/src/server.mts"]