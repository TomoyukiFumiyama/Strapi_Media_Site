# CHANGELOG

## 0.0.13 – 求人・コラム向けcontent-type追加
- `job-posting` を追加し、大量の求人情報を地域・サービス・検索条件と紐づけて管理できるようにした
- `job-search-condition` を追加し、よく検索される条件を補助マスタ化
- `job-listing-page` を追加し、地域別・条件別の求人一覧ページに求人とコラムセクションを個別設定できる構造を追加
- `column-article` / `column-category` と `blocks.column-section` を追加し、求人ページ向けのコラム記事運用を可能にした
- Strapi factory / config のコメントを日本語化し、拡張箇所と責務を分かりやすくした
- `.agents/ARCHITECTURE.md` / `.agents/CONTENT_OPERATIONS.md` に求人・コラム運用の対象content-typeを追記
- `README.md` の Version を `0.0.13` に更新

## 0.0.12 – Strapi Docker実行環境の追加
- `cms/package.json` を追加し、`@strapi/strapi` / 主要Strapi plugin を `^5.0.0` で取得するCMS実行プロジェクト化
- `cms/Dockerfile` / `cms/.dockerignore` / `cms/.env.example` と Strapi `config/*` を追加し、Docker上でStrapiを起動可能にした
- 既存content-typeごとに Strapi REST API 用 controller / route / service を追加
- `docker-compose.yml` を更新し、`cms` と `web` の両方を起動して `web` から `http://cms:1337` を参照する構成へ変更
- `README.md` に CMS / Web の起動手順、Docker構成、API token 初期設定を追記
- `README.md` の Version を `0.0.12` に更新

## 0.0.11 – M1〜M5の実装（運用ガイド・取得最適化・テスト拡張）
- `.agents/CONTENT_OPERATIONS.md` を追加し、主要content-typeの入力ガイド（必須/推奨）と公開前チェックリストを明文化
- `web/src/lib/strapi/populate.ts` / `queries.ts` を更新し、一覧/詳細ごとに取得項目をモデル単位で最適化
- `web/src/lib/strapi/mappers.ts` / `types/page-models.ts` を拡張し、null・relation未設定時のフォールバックと local-page 情報整形を強化
- `web/src/components/templates/local-page-template.tsx` と mock data を更新し、地域固有情報・FAQ・関連導線を表示可能に改善
- metadata / query / mapper / revalidate-path のテストを追加し、優先順位・slug・再検証パスを固定化
- `README.md` の Version を `0.0.11` に更新

## 0.0.10 – `.agents/` への運用ドキュメント集約とデプロイ手順強化
- `.agent/` を `.agents/` にリネームし、`PLANS.md` を移設
- 既存の `CHANGELOG.md` を `.agents/CHANGELOG.md` へ移設
- `.agents/ARCHITECTURE.md` を新規追加し、開発/運用の推奨アーキテクチャ詳細を記述
- `README.md` にローカルデプロイ方法と VPS デプロイ方法を追記
- `README.md` の Version を `0.0.10` に更新

## 0.0.9 – README不要ディレクトリの整理
- `cms/` 配下で README 以外の直接配置ファイルが存在しないディレクトリの `README.md` を削除
- `schema.json` / component JSON を直接持つディレクトリの README のみ残す運用に整理
- `README.md` の Version を `0.0.9` に更新

## 0.0.8 – `cms/` 配下の全ディレクトリにREADMEを整備
- `cms/` 以下の各ディレクトリに `README.md` を追加し、ディレクトリ責務を明文化
- 各 README に配下ファイル（schema / component JSON）の役割と主要属性を記載
- `README.md` の Version を `0.0.8` に更新

## 0.0.7 – `.env.local` 記述例ファイルを追加
- `web/.env.local.example` を追加し、ローカル開発に必要な環境変数の雛形をファイル化
- `README.md` を更新し、`.env.local.example` から `.env.local` を作成する手順に変更
- `README.md` の Version を `0.0.7` に更新

## 0.0.6 – CI/CD Workflowの各実行ステップに説明コメントを追加
- `.github/workflows/web-ci-cd.yml` の CI/CD 各 step に日本語コメントを追加し、何を実行しているかを明確化
- `README.md` の Version を `0.0.6` に更新

## 0.0.5 – TypeScriptコンパイル手順とVPS向けCI/CD Workflow追加
- `README.md` に TypeScript の型チェック・ビルド・起動手順（`typecheck` / `build` / `start`）を追加
- `README.md` に VPS デプロイ向け GitHub Secrets 設定項目を追記
- `.github/workflows/web-ci-cd.yml` を追加し、`web` の CI（install/typecheck/build）と `main` push 時の VPS デプロイ（scp + ssh + docker compose）を定義

## 0.0.4 – ミニマム動作サイト実装とDocker手順追加
- `STRAPI_USE_MOCK=true` で動くモックデータ供給を実装し、一覧/詳細/サンクス/地域差分ページの最小導線を確認可能にした
- ホームページにサンプル導線を追加し、主要ルートを即時確認できるようにした
- `web/package.json` に `dev/build/start` スクリプトを追加して実行可能状態を明確化した
- `web/Dockerfile` と `docker-compose.yml` を追加してローカルDocker起動を可能にした
- `README.md` に Docker 起動手順とサンプル確認ルートを追記した

## 0.0.3 – PLANS.md運用ルールと計画フォーマットを更新
- `.agent/PLANS.md` のMarkdown崩れを修正し、未完了マイルストーン専用フォーマットへ再構成
- `驚きと発見（調査で分かったこと）` 章を追加
- `AGENTS.md` に「PLANS.mdは完了タスクを削除して常に最新化する」運用ルールを追加

## 0.0.2 – MVPひな形を実データ接続ベースへ拡張
- Next.js 各一覧/詳細ページを features 経由の Strapi 取得フローへ更新
- Dynamic Zone block renderer を component 分岐描画に更新
- metadata 生成ロジックをページSEO・フォールバック優先で統一
- revalidate API をモデル別パスマッピング対応に拡張
- download API に入力バリデーションを追加

## 0.0.1 – Strapi5 / Next.js ひな形の初期構築
- Strapi の content-type / component / dynamic zone 用スキーマを追加
- Next.js App Router のルート骨組みとテンプレート雛形を追加
- Strapi REST クライアント / query / mapper / metadata の最小実装を追加
- revalidate API と resources download API の導線を追加
