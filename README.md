# Strapi Media Site Scaffold

Version: 0.0.14

Strapi 5 + Next.js App Router を用いたメディアサイトのひな形です。

Strapi は公式の汎用 Docker イメージではなく、プロジェクト内の `cms/Dockerfile` からビルドします。`cms/package.json` では `@strapi/strapi` を `^5.0.0` にしているため、Docker build 時点で取得可能な最新の Strapi 5 系をインストールします。

- CMS: `cms/`（Strapi 実行プロジェクト、content-type / component / API 定義）
- Frontend: `web/`（Next.js App Router）
- Plan source: `.agents/PLANS.md`
- Changelog: `.agents/CHANGELOG.md`
- Architecture: `.agents/ARCHITECTURE.md`
- Content operations: `.agents/CONTENT_OPERATIONS.md`
- Prompt log: `.agents/PROMPTS.md`


## プロンプトログ運用

今後このリポジトリで受けた作業指示プロンプトは、作業開始時または完了時に `.agents/PROMPTS.md` へ追記します。記録時は日時、依頼概要、原文を残し、完了履歴そのものは従来通り `.agents/CHANGELOG.md` に集約します。

## Strapiメディアアップロード（Cloudflare R2）

このStrapiアプリはVPS上でCMS本体を動かし、管理画面からアップロードされた画像・ファイルのみをCloudflare R2へ保存する構成です。ローカル永続ボリューム `public/uploads` には依存しません。

CMSでは Strapi Upload plugin のS3互換providerを利用し、Cloudflare R2の接続情報を環境変数から読み込みます。VPS / Docker / Node.js いずれの起動方式でも、以下を設定してください。

```env
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
CLOUDFLARE_R2_BUCKET=your-bucket-name
CLOUDFLARE_R2_PUBLIC_URL=your-public-r2-or-custom-domain-url
CLOUDFLARE_R2_REGION=auto
```

Cloudflare R2側では、Strapi専用bucketとR2 API tokenを作成し、必要最小限のbucket権限だけを付与してください。`CLOUDFLARE_R2_PUBLIC_URL` にはR2の公開配信URLまたは独自ドメインを設定します。公開配信URLや独自ドメインを利用する場合は、R2 bucketの公開設定・CORS・キャッシュ方針を別途Cloudflare側で管理します。

## 主要 content-type

既存のブログ/導入事例/地域差分/資料ダウンロードに加え、求人メディア運用向けに以下を用意しています。

- `job-posting`: 大量の求人情報を登録する主役 content-type
- `job-search-condition`: よく検索される条件（雇用形態、働き方、給与、福利厚生など）の補助マスタ
- `job-listing-page`: 地域別・条件別・地域×条件別の求人一覧ページを個別にカスタマイズする content-type
- `column-article`: 求人一覧や求人詳細に差し込むコラム記事
- `column-category`: コラム記事の分類マスタ

`job-listing-page` は `area` / `job_search_condition` / `featured_jobs` / `featured_columns` / `content_blocks` を持つため、地域別ページやよく検索される条件別ページごとに、求人一覧と短いコラムセクションを組み合わせて編集できます。

## ローカル起動（Node.js）

### CMS
1. `cd cms`
2. `npm install`
3. `cp .env.example .env` を実行
4. `.env` の secret 値を必要に応じて変更
5. `npm run develop`
6. `http://localhost:1337/admin` で管理者ユーザーを作成

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
STRAPI_USE_MOCK=false
```

`STRAPI_USE_MOCK=false` の場合、Next.js は実際の Strapi REST API を参照します。Strapi未起動でフロントだけ確認したい場合のみ `STRAPI_USE_MOCK=true` に変更してください。

### Strapi API 接続の初期設定
Docker / Node.js どちらで起動した場合も、初回は Strapi 管理画面で以下を設定してください。

1. `http://localhost:1337/admin` で管理者ユーザーを作成
2. Content Manager で必要なコンテンツを作成・公開
3. Settings → API Tokens で Read-only token を作成
4. `web/.env.local` の `STRAPI_API_TOKEN` に token を設定

公開権限を使う場合は、Settings → Users & Permissions plugin → Roles → Public で必要な find / findOne 権限を明示的に許可してください。

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

この Docker 構成では `cms` と `web` の両方を起動し、`web` コンテナは `STRAPI_URL=http://cms:1337` で Strapi REST API に接続します。CMSのアップロードファイルはCloudflare R2へ保存するため、`CLOUDFLARE_R2_*` 環境変数を設定してください。初回起動後は `http://localhost:1337/admin` で管理者ユーザーを作成してください。

## ローカルデプロイ方法（本番相当）

### Dockerを使う場合（推奨）
1. リポジトリルートで `docker compose build`
2. `docker compose up -d`
3. `docker compose ps` でコンテナ稼働を確認
4. `http://localhost:3000` でアプリ確認

### Node.jsを使う場合（CMS + Web）
1. `cd cms`
2. `npm ci`
3. `cp .env.example .env`
4. `npm run build`
5. `npm run start`
6. 別ターミナルで `cd web`
7. `npm ci`
8. `cp .env.local.example .env.production.local`
9. `npm run build`
10. `npm run start`

### Node.jsを使う場合（Webのみ・外部Strapi接続）
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
