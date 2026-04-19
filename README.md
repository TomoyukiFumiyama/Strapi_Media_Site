# Strapi Media Site Scaffold

Version: 0.0.11

Strapi 5 + Next.js App Router を用いたメディアサイトのひな形です。

- CMS: `cms/`
- Frontend: `web/`
- Plan source: `.agents/PLANS.md`
- Changelog: `.agents/CHANGELOG.md`
- Architecture: `.agents/ARCHITECTURE.md`
- Content operations: `.agents/CONTENT_OPERATIONS.md`

## ローカル起動（Node.js）

### Web
1. `cd web`
2. `npm install`
3. `cp .env.local.example .env.local` を実行
4. 必要に応じて `.env.local` を編集
5. `npm run dev`

`web/.env.local.example` の内容:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=your-secret
STRAPI_USE_MOCK=true
```

`STRAPI_USE_MOCK=true` の場合、Strapi未起動でもモックデータで最低限の画面確認ができます。

## TypeScriptのコンパイル方法（ビルド）

TypeScript は `next build` 実行時に型チェック/ビルドされます。

1. `cd web`
2. `npm install`
3. `npm run typecheck`（TypeScriptの静的型チェック）
4. `npm run build`（本番ビルド。`.next/` が生成される）
5. `npm run start`（本番モードで起動）

## ローカル起動（Docker）

リポジトリルートで以下を実行してください。

1. `docker compose build`
2. `docker compose up -d`
3. ブラウザで `http://localhost:3000` を開く
4. 停止するときは `docker compose down`

この Docker 構成では `STRAPI_USE_MOCK=true` を設定済みのため、まずは最小構成のサイトを確認できます。

## ローカルデプロイ方法（本番相当）

### Dockerを使う場合（推奨）
1. リポジトリルートで `docker compose build`
2. `docker compose up -d`
3. `docker compose ps` でコンテナ稼働を確認
4. `http://localhost:3000` でアプリ確認

### Node.jsを使う場合（Webのみ）
1. `cd web`
2. `npm ci`
3. `cp .env.local.example .env.production.local`
4. `npm run build`
5. `npm run start`

## VPS上のデプロイ方法

### GitHub Actions経由でデプロイ（推奨）
対象Workflow: `.github/workflows/web-ci-cd.yml`

1. GitHub Secrets に以下を設定
   - `VPS_HOST`
   - `VPS_USER`
   - `VPS_SSH_KEY`
   - `VPS_PORT`（任意。未設定時は `22`）
   - `VPS_DEPLOY_PATH`（例: `/var/www/strapi-media-site`）
2. `main` ブランチへ push
3. Workflow が VPS へソース同期し、`docker compose up -d --build` を実行

### 手動デプロイ（SSH）
1. VPSにSSH接続して `VPS_DEPLOY_PATH` へ移動
2. 最新コードを配置（`git pull` など）
3. `docker compose up -d --build` を実行
4. `docker compose ps` と `docker compose logs -f` で確認

## サンプル確認ルート

- `/`
- `/blog`
- `/blog/start-strapi-nextjs-blog`
- `/case-studies`
- `/case-studies/local-seo-lp-case`
- `/resources`
- `/resources/strapi-nextjs-checklist`
- `/resources/strapi-nextjs-checklist/thanks`
- `/areas/tokyo/web-production`
