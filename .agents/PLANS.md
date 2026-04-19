# PLANS.md

## 目的
このファイルは**これから行う作業計画（マイルストーン）だけ**を管理する。完了済みタスクは本ファイルに残さず、履歴は `.agents/CHANGELOG.md` で管理する。

## 運用ルール
- 記載対象は未着手・進行中の計画のみ。
- タスク完了時は、該当項目を `PLANS.md` から削除する。
- 完了内容の記録は `.agents/CHANGELOG.md` に集約する。
- 常に「次に何をやるか」が一目で分かる状態を維持する。

## マイルストーン（今後の作業計画）

### M6. Strapi公開フロー自動化
- Strapiの publish / unpublish Webhook から Next.js `/api/revalidate` を直接叩く構成を追加する。
- モデル単位の再検証パス定義を管理ファイル化し、運用担当が変更しやすい構造にする。

### M7. コンテンツ品質ゲートの自動チェック
- `CONTENT_OPERATIONS.md` の必須項目を機械判定する pre-publish 検証スクリプトを追加する。
- 不足項目（SEO未設定、relation未設定、画像未設定）を管理画面運用で検知できるようにする。

### M8. 主要ページのE2Eテスト導入
- `blog` / `case-studies` / `resources` / `local-page` の主要導線を Playwright で自動化する。
- 資料ダウンロード導線（詳細→thanks）と local-page の導線を回帰テストに含める。

### M9. 観測性（Observability）強化
- Next.js と API ルートのエラーログ収集基盤（例: Sentry）を導入する。
- デプロイ後のヘルスチェック結果を通知（Slack等）する。

### M10. パフォーマンス最適化
- block単位で不要な client component 化を見直す。
- 画像最適化戦略（サイズ・フォーマット・キャッシュ）を文書化し、LCP改善を進める。
