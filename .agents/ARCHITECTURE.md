# ARCHITECTURE.md

## 目的
本ドキュメントは、Strapi 5 + Next.js App Router 構成の本プロジェクトにおける、開発・運用の両面で再現性と保守性を最大化するための推奨アーキテクチャを定義する。

---

## 1. 全体アーキテクチャ（責務分離）

### 1-1. システム境界
- **Strapi（CMS）**
  - content-type / component の定義
  - 編集UI（管理画面）
  - REST API 配信
- **Next.js（Frontend）**
  - ルーティング（App Router）
  - 表示ロジック（templates / blocks）
  - SEO metadata 出力
  - 再検証（revalidation）

### 1-2. データフロー
1. 編集者が Strapi 管理画面で公開コンテンツを更新
2. Next.js が `lib/strapi/client` から REST API を取得
3. `query` で `populate` を制御
4. `mapper` で null 安全なアプリ内型へ変換
5. `features` / `templates` / `blocks` で描画
6. 公開・更新時は対象パスのみ再検証

---

## 2. アプリケーション層設計（Next.js）

### 2-1. 推奨レイヤー
- `src/app/*`
  - ルート定義と最小限の orchestrator
  - 取得 + テンプレート呼び出しまで
- `src/features/*`
  - ドメイン単位の取得/整形/ユースケース集約
- `src/lib/strapi/*`
  - client / query builder / mapper / metadata helper
- `src/components/templates/*`
  - ページ骨組み
- `src/components/blocks/*`
  - Dynamic Zone block 表示

### 2-2. 依存方向
`app -> features -> lib` の単方向依存を維持する。
`templates` は `features` から受け取った整形済みデータのみ描画し、API 直接呼び出しは行わない。

---

## 3. コンテンツモデル設計（Strapi）

### 3-1. 主役 content-types
- `blog-post`
- `case-study`
- `local-page`
- `lead-magnet`
- `job-posting`
- `job-listing-page`
- `column-article`

### 3-2. 補助マスタ
- `service`
- `area`
- `author`
- `blog-category`
- `tag`
- `office`
- `job-search-condition`
- `column-category`

### 3-3. 設計原則
- 表示都合でデータを重複保持しない（relation 優先）
- Dynamic Zone は意味が明確な block のみ許可
- `slug` は全公開ページで必須化

---

## 4. API・取得戦略

### 4-1. REST API標準化
- 初期は REST を標準
- GraphQL は必要性が明確になるまで採用しない

### 4-2. `populate` 運用
- 一覧用 query と詳細用 query を分離
- `populate=*` は禁止
- relation / media / blocks を明示的に列挙

### 4-3. mapper の責務
- Strapi 生レスポンスを UI に渡さない
- null / 未設定 relation / 欠損 media を吸収
- UI では mapper 後の型のみ利用

---

## 5. SEO / SSG / ISR

### 5-1. metadata 一元化
- `title / description / canonical / og:image / robots` の解決順序を固定
- ページ個別実装を避け、共通 helper へ寄せる

### 5-2. 再生成方針
- 一覧と詳細で revalidate 単位を分離
- Strapi publish / unpublish 時は影響パスのみ `revalidatePath`
- 不要な全体再ビルドを避ける

---

## 6. セキュリティ

- API トークンをクライアントへ露出しない
- 環境変数をコードへ直書きしない
- フォーム入力はサーバー側でバリデーション
- 外部 URL / rich-text 埋め込みはサニタイズ前提

---

## 7. 開発運用（DevEx）

### 7-1. ドキュメント運用
- 未来計画: `.agents/PLANS.md`
- 変更履歴: `.agents/CHANGELOG.md`
- 設計原則: `AGENTS.md` / `.agents/ARCHITECTURE.md`

### 7-2. テスト方針
- mapper: ユニットテスト必須
- metadata: 生成ルールのスナップショット/ユニットテスト
- local-page: slug 構築ロジックを必須テスト

### 7-3. リリース運用
- ローカルは Docker で本番相当確認
- VPS は GitHub Actions で自動デプロイ
- デプロイ後はヘルスチェック + 主要ルート確認

---

## 8. 将来拡張の推奨

- Strapi の Webhook で Next.js 再検証 API を直接起動
- 画像最適化の外部ストレージ移行（S3 等）
- Observability（Sentry / logs / uptime）を導入し障害検知を自動化
- 段階的に E2E を整備し編集〜公開導線を回帰テスト化
