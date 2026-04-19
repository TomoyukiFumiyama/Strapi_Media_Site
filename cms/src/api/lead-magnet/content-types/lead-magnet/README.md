# lead-magnet ディレクトリ README

## ディレクトリの役割
`lead-magnet` content-type の最終スキーマ定義を配置するディレクトリです。

## 配下ファイルと役割
- `schema.json`: `lead-magnet` の Collection Type スキーマ定義。API 経由で管理するフィールドとリレーションの制約を定義します。主な属性: title, slug, resource_type, summary, cover_image, download_file, external_file_url, gate_enabled, form_provider, form_id, thank_you_heading, thank_you_body, thank_you_cta, related_services, related_posts, related_case_studies, landing_blocks, seo, is_featured。

## 入力ガイド（運用）
### 必須
- `title`, `slug`, `resource_type`, `summary`
- `gate_enabled`
- `seo.meta_title`, `seo.meta_description`

### 推奨
- `cover_image`
- `download_file` または `external_file_url`
- `form_provider`, `form_id`
- `thank_you_heading`, `thank_you_body`
- `related_posts`, `related_case_studies`, `related_services`

## 公開前チェック
- ダウンロード導線とサンクス文言が整っているか
- 関連記事/事例から遷移できる relation があるか
- フォーム連携情報（provider/id）が設定済みか

## 運用メモ
- 詳細運用ルールは `.agents/CONTENT_OPERATIONS.md` を参照してください。
