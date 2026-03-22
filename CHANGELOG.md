# CHANGELOG

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
