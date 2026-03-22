# Strapi Media Site Scaffold

Version: 0.0.7

Strapi 5 + Next.js App Router を用いたメディアサイトのひな形です。

- CMS: `cms/`
- Frontend: `web/`
- Plan source: `.agent/PLANS.md`

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

## CI/CD（VPS向け）

GitHub Actions Workflow: `.github/workflows/web-ci-cd.yml`

### CI
- `web` で `npm install`
- `npm run typecheck`
- `npm run build`

### CD（`main` push時）
`main` への push 時に、以下の GitHub Secrets を使って VPS へデプロイします。

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_PORT`（任意。未設定時は `22`）
- `VPS_DEPLOY_PATH`（例: `/var/www/strapi-media-site`）

Workflow は VPS 上にソースを同期し、`docker compose up -d --build` を実行します。

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
