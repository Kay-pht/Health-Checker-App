# ベースイメージとしてNode.jsを使用
FROM node:20.18.0 AS build

# ルートディレクトリに移動
WORKDIR /app
COPY package-lock.json ./

# フロントエンドのビルド
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install --package-lock-only
COPY frontend ./
RUN npm run build

# バックエンドのビルド
WORKDIR /app/backend
COPY backend/package.json ./
RUN npm install --package-lock-only
COPY backend ./
RUN npm run build

# 本番環境用のイメージを作成
FROM node:20.18.0 AS production

# フロントエンドのビルド成果物をコピー
WORKDIR /app/dist/frontend
COPY --from=build /app/dist/frontend ./

# バックエンドのビルド成果物をコピー
WORKDIR /app/dist/backend
COPY --from=build /app/dist/backend ./
COPY --from=build /app/backend/node_modules ./node_modules


# バックエンドのサーバーを起動
WORKDIR /app/dist/backend
CMD ["node", "server.mjs"]